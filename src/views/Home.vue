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
        <span class="text-sm font-bold">{{ countTodoListWithoutFilter }}</span>

        <div class="flex flex-row justify-evenly">
          <component-filter
            v-for="item in filterList"
            :key="item.id"
            :filter="item"
            @change-filter="changeFilter"
          ></component-filter>
        </div>
        <Transition>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="removeTodoCompleted"
            v-if="isCompletedTodo"
          >
            Clear completed
          </button>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

import TodoItem from "../components/TodoItem.vue";
import Filter from "../components/Filter.vue";

export default {
  name: "Home",

  components: {
    "component-todo-item": TodoItem,
    "component-filter": Filter,
  },

  setup() {
    const store = useStore();

    const countTodo = ref(0);
    const filterList = ref([]);
    const todoItem = ref(null);
    const activeFilter = ref("");

    onMounted(() => {
      filterList.value = store.getters.getFilterList;
    });

    const addTodo = () => {
      store.dispatch("addTodo", { todo: todoItem.value });
      todoItem.value = null;
    };

    const changeFilter = (value) => {
      activeFilter.value = value.value;
      store.dispatch("changeFilter", { filter: activeFilter.value });
    };

    const changeTodo = (id) => {
      store.dispatch("changeTodo", { todo: id });
    };

    const removeTodoCompleted = () => {
      store.dispatch("removeCompletedTodo");
    };

    const getTodoList = computed(() => {
      return store.getters.getTodoListByFilter(activeFilter.value);
    });

    const getTodoListWithoutFilter = computed(() => {
      return store.getters.getTodoList;
    });

    const isCompletedTodo = computed(() => {
      const todoList = getTodoListWithoutFilter.value;
      return todoList.find((todo) => todo.completed === true) ? true : false;
    });

    const countTodoListWithoutFilter = computed(() => {
      return getTodoListWithoutFilter.value.length;
    });

    return {
      countTodo,
      filterList,
      todoItem,
      activeFilter,

      addTodo,
      changeFilter,
      changeTodo,
      removeTodoCompleted,

      getTodoList,
      isCompletedTodo,
      countTodoListWithoutFilter,
    };
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
