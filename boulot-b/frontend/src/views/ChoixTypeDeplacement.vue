<template>
  <Container>
    <template #question>
      question
    </template>
    <template #canari>
      canari
    </template>
    <template #stepper>
      stepper
    </template>
  </Container>
</template>

<script>
import Container from "@/views/Container"
export default {
  name: "ChoixTypeDeplacement",
  components: {
    Container
  }
}
</script>

<style scoped>

</style>