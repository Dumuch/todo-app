export const filter = {
  state: () => ({
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
  }),
  mutations: {
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
    changeFilter(context, data) {
      context.commit("changeFilterFromFilterList", {
        value: data.filter,
      });
    },
  },
  getters: {
    getFilterList: (state) => {
      return state.filterList;
    },
  },
};
