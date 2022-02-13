import { createStore } from "vuex";
import { filter } from "./modules/filter";
import { todoList } from "./modules/todoList";

export default createStore({
  modules: {
    a: todoList,
    b: filter,
  },
});
