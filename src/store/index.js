import { createStore } from "vuex";

import { add, remove, change, get } from "../helpers/localStorage";

export default createStore({
  state: {
    todoList: [],

    filterList: [
      {
        id: 1,
        name: "All",
        value: "all",
        isActive: true,
      },
      {
        id: 2,
        name: "Active",
        value: "active",
        isActive: false,
      },
      {
        id: 3,
        name: "Completed",
        value: "completed",
        isActive: false,
      },
    ],
  },
  mutations: {
    addTodoFromTodoList(state, payload) {
      state.todoList.push(payload.todo);
      add(payload.todo);
    },

    completedTodoFromTodoList(state, payload) {
      state.todoList.map((todo) => {
        if (todo.id === payload.id) {
          todo.completed = !todo.completed;
        }
      });
      change(payload.id);
    },

    removeTodoCompletedFromTodoList(state) {
      state.todoList = state.todoList.filter((todo) => {
        if (todo.completed === false) {
          return todo;
        } else {
          remove(todo.id);
        }
        return;
      });
    },

    changeFilterFromFilterList(state, payload) {
      state.filterList.map((filter) => {
        if (filter.value === payload.value) {
          filter.isActive = true;
        } else {
          filter.isActive = false;
        }
      });
    },
  },
  actions: {
    addTodo(context, data) {
      const todo = {
        id: Date.now(),
        body: data.todo,
        completed: false,
      };
      context.commit("addTodoFromTodoList", { todo });
    },

    changeTodo(context, data) {
      context.commit("completedTodoFromTodoList", { id: data.todo });
    },

    removeCompletedTodo(context) {
      context.commit("removeTodoCompletedFromTodoList");
    },

    changeFilter(context, data) {
      context.commit("changeFilterFromFilterList", { value: data.filter });
    },
  },
  modules: {},
  getters: {
    getTodoList(state) {
      state.todoList = get()?.items ?? [];
      return state.todoList;
    },

    getTodoListByFilter:
      (state) =>
      (value = null) => {
        switch (value) {
          case "all":
            return state.todoList;
          case "completed":
            return state.todoList.filter((todo) => todo.completed === true);
          case "active":
            return state.todoList.filter((todo) => todo.completed === false);
          default:
            return state.todoList;
        }
      },

    getFilterList: (state) => {
      return state.filterList;
    },
  },
});
