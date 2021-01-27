<template>
  <Container>
    <template #question >
      <Question  >
        <ButtonCustom @click="next" text="Oui, très !" color="yellow"/>
        <ButtonCustom  @click="next"  text="Plutôt oui !" color="blue" />
        <ButtonCustom  @click="next" text="Hum bof" color="yellow" />
        <ButtonCustom  @click="next" text="Pas du tout !" color="blue" />
      </Question>
    </template>
    <template #canari>
      <Oiseau/>
    </template>
    <template #stepper>
      <Stepper :actif=actif />
    </template>
  </Container>
</template>

<script>
import Container from "@/views/Container"
import Question from "@/components/Question";
import ButtonCustom from "@/components/ButtonCustom";
import Stepper from "@/components/Stepper";
import Oiseau from "@/components/Oiseau";

export default {
  name: "ChoixHumeur",
  props: {
    actif: Number
  },
  methods: {
    next() {
      this.$router.push({name:"choix-style"})
    }
  },
  components: {
    Question,
    Container,
    ButtonCustom,
    Stepper,
    Oiseau
  }
}
</script>

<style scoped>


</style>
