<template>
  <div>
    <div id="wrapper">
      <div id="question">

        <div id="canari">
          <div class="flex-item">
            <slot name="canari" ></slot>
          </div>
        </div>
        <slot name="question" ></slot>

      </div>
      <div id="buildings">
        <slot name="buildings"></slot>
      </div>
      <div id="stepper">
        <slot name="stepper" ></slot>
      </div>
      <slot/>
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
    grid-template-rows: 0.7fr 2fr 0.3fr;
    gap: 0 0;
    grid-template-areas:
      ". question ."
      ". question ."
      "stepper stepper stepper";

  }
  #canari {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
    align-items: flex-start;
  }

  .flex-item:nth-child(1) {
    order: 0;
    flex: 0 1 auto;
    align-self: auto;
  }

  #question {
    align-self: center;
    grid-area: question;
  }

  #stepper { grid-area: stepper; }

  #buildings {
    grid-row: 2;
    grid-column: 1;
    align-self: center;
    justify-self: center;
  }

</style>