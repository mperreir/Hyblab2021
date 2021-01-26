<template>
  <div id="wrapper">
    <div id="question">
      <slot name="question" ></slot>
    </div>
    <div id="canari">
      <slot name="canari" ></slot>
    </div>
    <div id="stepper">
      <slot name="stepper" ></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Container"
}
</script>

<style scoped>
#wrapper {
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  display: grid;
  grid-template-columns: 0.9fr 1.2fr 0.9fr;
  grid-template-rows: 0.8fr 1.6fr 0.6fr;
  gap: 0px 0px;
  grid-template-areas:
    "wazo . canari"
    ". question canari"
    "stepper . .";

}

#question {
  align-self: center;
  grid-area: question;
}

#canari {
  align-self: center;
  grid-area: canari;
}

#stepper { grid-area: stepper; }


</style>