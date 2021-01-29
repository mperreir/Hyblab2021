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
    error: Boolean
  }
}
</script>

<style scoped>

.input {
  width: 50%;
  font-size: 1.2em;
  border-radius: 7px;
  border: none;
  background-color: #ffdb27;
  padding: 10px 10px 10px 20px;
}

.error {
  background-color: rgb(234, 137, 137);
}

.input:hover ,.input:focus {
  background-color: #fbdc51;
}

.input::placeholder {
  color: white;
  font-weight: bolder;
  opacity: 1;
}
</style>