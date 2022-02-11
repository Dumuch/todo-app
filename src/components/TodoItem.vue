<template>
  <div class="flex mb-4 items-center">
    <label
      class="relative flex-inline items-center isolate p-4 rounded-2xl w-full"
    >
      <input
        type="checkbox"
        class="relative peer z-20 text-purple-600 rounded-md focus:ring-0"
        :checked="todo.completed"
        @change="completedTodo"
      />
      <span
        class="ml-2 relative z-20"
        v-bind:class="{ 'line-through': todo.completed }"
      >
        {{ todo.body }}</span
      >
      <div
        class="absolute inset-0 bg-white peer-checked:bg-purple-50 peer-checked:border-purple-300 z-10 border rounded-2xl"
      ></div>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      required: true,
      type: Object,
    },
  },

  emits: {
    "change-todo": (value) => typeof value === "number",
  },

  methods: {
    completedTodo() {
      this.$emit("change-todo", this.todo.id);
    },
  },
};
</script>
