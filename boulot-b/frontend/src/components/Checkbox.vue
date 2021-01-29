<template>
    <label :class="color">
      <slot/>
      <input
          type="checkbox"
          @change="$emit('input', $event.target.checked)"
      >
      <span class="checkmark"></span>
    </label>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    color: String,
  }
}
</script>

<style scoped lang="scss">
$blue:  #005898;
$yellow: #939300;

label:hover {
  background-color: var(--color-light);
}

input[type='checkbox'] {
  display: none;
}


.yellow {
  --color : #{$yellow};
  --color-dark : #{darken($yellow, 30%)};
  --color-light: #{lighten($yellow,10%)};
  --color-lighter: #{lighten($yellow,30%)};
}

.blue {
  --color : #{$blue};
  --color-dark : #{darken($blue, 10%)};
  --color-light: #{lighten($blue,10%)};
  --color-lighter: #{lighten($blue,30%)};
}

label {
  cursor: pointer;
  margin: 10px;
  display: flex;
  flex-direction: row-reverse;
  padding: 10px 30px 10px ;
  border: 5px solid var(--color-lighter);
  border-radius: 20px;
  color: #fff;
  background-color: var(--color);
  box-shadow: 0 0 20px rgba(0, 0, 0, .2);
}

.checkmark {
  display: block;
  border-radius: 30px;
  border: 5px solid  var(--color-lighter);
  margin-right: 30px;
  height: 15px;
  width: 15px;
  background: #eee;
}

input:checked  + .checkmark {
  background: var(--color-dark);
}


</style>