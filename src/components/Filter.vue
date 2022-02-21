<template>
  <div class="ml-2 mr-2">
    <label
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      :class="{ 'bg-blue-700': filter.isActive }"
    >
      <input
        class="hidden"
        type="radio"
        name="filter"
        @change="changeFilter"
        :checked="filter.isActive"
      />
      <span>
        {{ filter.name }}
      </span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: Object,
      required: true,
    },
  },

  emits: {
    "change-filter": (value) => typeof value === "object",
  },

  setup(props, context) {
    const changeFilter = () => {
      context.emit("change-filter", props.filter);
    };
    return { changeFilter };
  },
};
</script>
