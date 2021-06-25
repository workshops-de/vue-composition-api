<template>
  <div class="todo">
    <p class="text-primary h1">This is a static title</p>

    <div class="form-group d-flex">
      <input v-model="todo" type="text" class="form-control" />
      <button class="btn btn-primary" @click="add">Add</button>
    </div>

    <div class="list-group">
      <div
        class="list-group-item d-flex justify-content-between"
        v-for="(item, index) in items"
        :key="index"
      >
        <span>{{ item }}</span>
        <button class="close" @click="remove(index)">
          <span>&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const todo = ref();
    const items = ref(["This", "is"]);

    const add = () => {
      if (todo.value) {
        items.value.push(todo.value);
        todo.value = "";
      }
    };

    const remove = (index: number) => {
      items.value.splice(index, 1);
    };

    return {
      todo,
      items,
      add,
      remove,
    };
  },
});
</script>

<style lang="scss">
.todo {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: auto;
}
</style>
