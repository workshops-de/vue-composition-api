<template>
  <Todo title="Title" init-input="init" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Todo from "./components/Todo.vue";

export default defineComponent({
  name: "App",
  components: {
    Todo,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
