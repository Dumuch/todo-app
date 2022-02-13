import { add, remove, change, get } from "@/helpers/localStorage";

export const todoList = {
  state: () => ({
    todoList: [],
  }),
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
  },
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
  },
};
