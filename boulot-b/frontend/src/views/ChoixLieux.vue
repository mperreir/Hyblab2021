<template>
  <Container>
    <template #question >
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
import Stepper from "@/components/Stepper";
import Oiseau from "@/components/Oiseau";

export default {
  name: "ChoixLieux",
  props: {
    actif: Number
  },
  components: {
    Container,
    Stepper,
    Oiseau
  }
}
</script>

<style scoped>


</style>
