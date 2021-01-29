<template>
  <input
      :value="value" :class="{error: error}" class="input"
      @blur="$emit('blur', $event.target.value)"
      @input="$emit('input', $event.target.value)"
  />


</template>

<script>
export default {
  name: "Input",
  props: {
    value: String,
    error: Boolean,
  }
}
</script>

<style scoped lang="scss">
$yellow: #ffdb27;

.input {
  border-radius: 20px;
  background-color: $yellow;
  padding: 20px 20px;
  width:40%;
}

.error {
  background-color: rgb(234, 137, 137);
}

.input:hover ,.input:focus {
  background-color: darken($yellow,10%)
}

.input::placeholder {
  color: white;
  font-weight: bolder;
  opacity: 1;
}
</style>
