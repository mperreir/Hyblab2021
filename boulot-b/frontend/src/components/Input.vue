<template>
  <input  id="input" :placeholder="placeholder" />
</template>

<script>
export default {
  name: "Input",
  props: {
    placeholder: String
  }
}
</script>

<style scoped>

#input {
  border-radius: 5px;
  border: none;
  background-color: #ffdb27;
  padding: 5px 5px 5px 20px;
}

#input:hover ,#input:focus {
  background-color: #fbdc51;
}

#input::placeholder {
  color: white;
  font-weight: bolder;
  opacity: 1;
}
</style>