<template>
  <Container>
    <template #question >
      <div id="launcher">
        <div id="inputliste">
        <Input @blur="onBlur" @input="getAdress('depart')" :error="error.depart" v-model="departlabel" class="depart" placeholder="Point de départ..." />
          <ul class="depart-result-list">
            <li v-for="item in suggestionsdepart" :key="item.properties.id" @click="setDepart(item)">
              {{ item.properties.label}}
              </li>
          </ul>
      </div>
      <div id ="inputliste">
        <Input :error="error.arrive" @input="getAdress('arrivee')" v-model="arriveelabel" class="arrive" placeholder="Point d'arrivée..." />
        <ul class="arrivee-result-list">
            <li v-for="item in suggestionarrivee" :key="item.properties.id" @click="setArrivee(item)">
              {{ item.properties.label}}
              </li>
        </ul>
      </div>
              <div id="inputliste">

        <ButtonCustom @click="launch" text="C'est parti !" color="blue" />
              </div>

      </div>
    </template>
    <template #canari>
      <Oiseau :message="message"/>
    </template>
    <template #stepper>
      <Stepper :actif=actif />
    </template>
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
      error: {depart: false, arrive: false}
    }
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
    Oiseau
  },
  methods: {
    onBlur(value) {
      if (value) {
        this.message = "Okay, et quelle est ta destination ?"
      }
    },
    launch() {
      if (!this.depart || !this.arrive) {
        this.error.arrive = !this.arrive;
        this.error.depart = !this.depart;
        this.message = "Je ne peux t'aider si tu ne me dis pas où tu veux aller, mon ami"
        return
      } 
      let path=[this.depart,this.arrive]
      this.$root.$data.setPath(path)
      this.message = "Allons-y !"
      setTimeout(() => {
        const listRoutes = this.$router.getRoutes();
        this.$router.push({name: listRoutes[this.actif + 1].name});
      }, 1500)
    },
    
    setDepart(item){
      this.depart=item;
      this.departlabel=item.properties.label;
      this.suggestionsdepart=[];
    },
    setArrivee(item){
      this.arrive=item;
      this.arriveelabel=item.properties.label;
      this.suggestionarrivee=[];

    },

    async getAdress(task) {     
      if(task=='depart'){
        this.suggestionsdepart=undefined;
        this.depart=undefined;
        //citycode 44109 inclut toute la ville de nantes : 44100 ,44200 ...
        if(this.departlabel.length>4){
          let recherche =this.departlabel.replace(/\s/g, '+')
          let url ='https://api-adresse.data.gouv.fr/search/?q='+ recherche+'&citycode=44109&limit=5';
          let response = await fetch(url);
          await response.json()
          .then(res => res.features)
          .then(suggestions => {
            this.suggestionsdepart=suggestions    
          })
        }
      }
      
      else if(task=='arrivee'){
        this.suggestionarrivee=undefined;
        this.arrive=undefined;
      if(this.arriveelabel.length>4){
        let recherche =this.arriveelabel.replace(/\s/g, '+')
        let url ='https://api-adresse.data.gouv.fr/search/?q='+ recherche+'&citycode=44109&limit=5';
        let response = await fetch(url);
       await response.json()
        .then(res => res.features)
        .then(suggestions => {
          this.suggestionarrivee=suggestions    
        })
      }
      }
    },
  },
};
</script>

<style scoped>

#launcher {
  position : relative
}

#inputliste {
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
.depart-result-list ,.arrivee-result-list{
  margin-top: 0px;
      list-style-type: none;
  border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  background-color: #ffdb27;
  font-size: 10px;
    width:37%;

}
</style>
