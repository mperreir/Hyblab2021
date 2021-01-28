<template>
  <Container>
    <template #question >
      <div id="launcher">
        <Input @blur="onBlur" :error="error.depart" v-model="depart" class="depart" placeholder="point de départ..." />
        <Input :error="error.arrive" v-model="arrive" class="arrive" placeholder="point d'arrivée..." />
        <ButtonCustom @click="launch" text="C'est parti !" color="blue" />
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
      arrive: undefined,
      message: "Très bien, d’où pars-tu ?",
      error: {depart: false, arrive: false}
    }
  },
  props: {
   actif: Number
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
        return
      }
      this.$router.push({ name: "choix-humeur" });
    },
  },
};
</script>

<style scoped>

#launcher {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: stretch;
  align-items: center;
}

.depart {
  order: 0;
  margin-bottom: 10px;
  flex: 0 1 auto;
  align-self: auto;
}

.arrive {
  order: 0;
  margin-bottom: 50px;
  flex: 0 1 auto;
  align-self: auto;
}
</style>
