<template>
  <Container>
    <template #question>
      <div id="launcher">
        <div class="inputliste">
          <Input
            @blur="onBlurDepart"
            @input="getAddressDepart"
            :error="error.depart"
            v-model="departlabel"
            class="depart"
            placeholder="Point de départ..."
          />
          <ul class="depart-result-list" >
            <li
              class="depart-result-item"
              v-for="item in suggestionsdepart"
              :key="item.properties.id"
              @click="setDepart(item)"
            >
              {{ item.properties.label }}
            </li>
          </ul>
        </div>
        <div class="inputliste" >
          <Input
            @blur="onBlurArrive"
            :error="error.arrive"
            @input="getAddressArrive"
            v-model="arriveelabel"
            class="arrive"
            placeholder="Point d'arrivée..."
          />
          <ul class="arrivee-result-list">
            <li
              class="arrive-result-item"
              v-for="item in suggestionarrivee"
              :key="item.properties.id"
              @click="setArrivee(item)"
            >
              {{ item.properties.label }}
            </li>
          </ul>
        </div>
        <div id="button-launch" class="inputliste">
          <ButtonCustom @click="launch" text="C'est parti !" color="blue" />
        </div>
      </div>
    </template>
    <template #canari>
      <Oiseau :message="message" />
    </template>
    <img id="nuage1" src="@/assets/nuages_svg/nuage3.svg" alt="nuage" />
    <img id="nuage2" src="@/assets/nuages_svg/nuage2.svg" alt="nuage" />
    <img id="nuage3" src="@/assets/nuages_svg/nuage1.svg" alt="nuage" />
    <img id="nuage4" src="@/assets/nuages_svg/nuage3.svg" alt="nuage" />
    <img id="nuage5" src="@/assets/nuages_svg/nuage1.svg" alt="nuage" />

  </Container>
</template>

<script>
import ChoixTypeDeplacement from "./ChoixTypeDeplacement";
import Input from "../components/Input.vue";
import ButtonCustom from "../components/ButtonCustom.vue";
import Container from "@/views/Container";
import Stepper from "@/components/Stepper";
import Oiseau from "@/components/Oiseau";

export default {
  choice: "path",
  name: "ChoixDestination",
  data() {
    return {
      depart: undefined,
      departlabel: undefined,
      arrive: undefined,
      arriveelabel: undefined,
      suggestionsdepart: [],
      suggestionarrivee: [],
      message: "Très bien, d’où pars-tu ?",
      error: { depart: false, arrive: false },
    };
  },
  props: {
    actif: Number,
  },
  components: {
    Container,
    Stepper,
    Input,
    ChoixTypeDeplacement,
    ButtonCustom,
    Oiseau,
  },
  methods: {
    onBlurDepart(value) {
      if (value) {
        this.message = "Okay, et quelle est ta destination ?";
      }
    },
    onBlurArrive(value) {
      if (value) {
        this.message = "Parfait, j'attend ton signal"
      }
    },
    launch() {
      if (!this.depart || !this.arrive) {
        this.error.arrive = !this.arrive;
        this.error.depart = !this.depart;
        this.message = "Je ne peux t'aider si tu ne me dis pas où tu veux aller, mon ami";
        return;
      }
      const path = [this.depart, this.arrive];
      this.$root.$data.setPath(path);
      this.message = "Allons-y !";
      setTimeout(() => {
        this.$root.$data.setActif(this.actif + 1);
      }, 1500);
    },

    setDepart(item) {
      this.depart = item;
      this.departlabel = item.properties.label;
      this.suggestionsdepart = [];
    },
    setArrivee(item) {
      this.arrive = item;
      this.arriveelabel = item.properties.label;
      this.suggestionarrivee = [];
    },

    async getAddress(recherche) {
        const url = `https://api-adresse.data.gouv.fr/search/?q=${recherche}&citycode=44109&limit=5`;
        const response = await fetch(url);
        return response
            .json()
            .then((res) => res.features)
            .then((suggestions) => suggestions);
    },

    async getAddressArrive() {
      const recherche = this.arriveelabel.replace(/\s/g, "+");
      this.suggestionarrivee = await this.getAddress(recherche)
    },

      async getAddressDepart() {
        const recherche = this.departlabel.replace(/\s/g, "+");
        this.suggestionsdepart = await this.getAddress(recherche);
      }

    },
};
</script>

<style scoped lang="scss">
  #launcher {
    position: relative;
  }

  #button-launch {
    margin-top: 80px;
  }

  .inputliste {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: stretch;
    align-items: center;
  }

  .depart {
    order: 0;
    flex: 0 1 auto;
    align-self: auto;
  }

  .arrive {
    order: 0;
    margin-top: 50px;
    flex: 0 1 auto;
    align-self: auto;
  }
  #nuage1, #nuage2, #nuage3, #nuage4, #nuage5 {
    position: absolute;
    z-index: -1;
  }
  #nuage1 {
    top: 60%;
    left: -6%;
    width: 25%;
  }
  #nuage2 {
    top: 55%;
    left: 20%;
    width: 8%;
  }
  #nuage3 {
    top: 30%;
    right: 10%;
    width: 15%;
  }
  #nuage4 {
    bottom: 8%;
    right: -12%;
    width: 50%;
  }
  #nuage5 {
    bottom: -6%;
    left: 25%;
    width: 15%;
  }
  .result-list {
    position: absolute;
    margin-top: 0;
    list-style-type: none;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #ffdb27;
    font-size: 20px;
    width: 37%;
  }

  .depart-result-list {
    @extend .result-list;
    top: 50px;
    z-index: 101;
  }
  .arrivee-result-list {
    @extend .result-list;
    top: 160px;
    z-index: 100;
  }

  .depart-result-item:hover, .arrive-result-item:hover {
    cursor: pointer;
    background-color: darken(#ffdb27, 20%);
  }
</style>
