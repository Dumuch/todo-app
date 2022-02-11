<template>
  <div
    class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans"
  >
    <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
      <div class="mb-4">
        <div class="flex mt-4">
          <input
            @keyup.enter="addTodo"
            v-model.trim="todoItem"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker w-full"
            placeholder="What needs to be done?"
          />
        </div>
      </div>
      <TransitionGroup name="list" tag="div">
        <component-todo-item
          v-for="item in getTodoList"
          :key="item.id"
          :todo="item"
          @change-todo="changeTodo"
        ></component-todo-item>
      </TransitionGroup>

      <div class="flex flex-row justify-evenly items-center mt-5 mb-5">
        <span class="text-sm font-bold">{{
          getTodoListWithoutFilter.length
        }}</span>

        <div class="flex flex-row justify-evenly">
          <component-filter
            v-for="item in filterList"
            :key="item.id"
            :filter="item"
            @change-filter="changeFilter"
          ></component-filter>
        </div>
        <button
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          @click="removeTodoCompleted"
          v-if="isCompletedTodo"
        >
          Clear completed
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from "../components/TodoItem.vue";
import Filter from "../components/Filter.vue";

export default {
  name: "Home",
  data() {
    return {
      countTodo: 0,
      filterList: [],
      todoItem: "",
      activeFilter: null,
    };
  },
  components: {
    "component-todo-item": TodoItem,
    "component-filter": Filter,
  },

  mounted() {
    this.filterList = this.$store.getters.getFilterList;
  },

  computed: {
    getTodoList() {
      return this.$store.getters.getTodoListByFilter(this.activeFilter);
    },
    isCompletedTodo() {
      return this.getTodoListWithoutFilter.find(
        (todo) => todo.completed === true
      )
        ? true
        : false;
    },
    getTodoListWithoutFilter() {
      return this.$store.getters.getTodoList;
    },
  },

  methods: {
    addTodo() {
      this.$store.dispatch("addTodo", { todo: this.todoItem });
      this.todoItem = "";
    },
    changeFilter(value) {
      this.activeFilter = value;
      this.$store.dispatch("changeFilter", { filter: this.activeFilter });
    },

    changeTodo(value) {
      this.$store.dispatch("changeTodo", { todo: value });
    },

    removeTodoCompleted() {
      this.$store.dispatch("removeCompletedTodo");
    },
  },
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
