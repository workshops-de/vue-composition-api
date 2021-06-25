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
import { ref, computed, watch, watchEffect, defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    initInput: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const vTitle = computed(() => "-" + props.title + "-");
    const todo = ref(props.initInput);
    const todoLength = ref(0);
    const items = ref(["This", "is"]);
    const itemsQuantity = computed(() => items.value.length);
    const append = ref("");

    watch(items.value, (items) => {
      console.log("watch items.value");
      append.value = "";
      items.forEach((item) => {
        append.value += item + " ";
      });
    });

    watch(
      () => todo.value.length,
      (length) => {
        todoLength.value = length;
      }
    );

    watchEffect(() => {
      if (todo.value.length > 10) {
        alert(`Your current todo '${todo.value}' is getting preeeetty long.`);
      }
    });

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
      vTitle,
      todo,
      todoLength,
      items,
      itemsQuantity,
      append,
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
