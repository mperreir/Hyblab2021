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

<style scoped>

.input {

  border-top-left-radius: 5px;
    border-top-right-radius: 5px;  border: none;
  background-color: #ffdb27;
  padding: 5px 5px 5px 20px;
  width:40%;
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