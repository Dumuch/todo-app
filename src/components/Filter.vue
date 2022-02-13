<template>
  <div class="ml-2 mr-2">
    <input
      class="hidden"
      type="radio"
      name="filter"
      :value="filter.value"
      :id="filter.id"
      v-model="activeFilter"
      @change="changeFilter"
      :checked="filter.isActive"
    />
    <label
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      :for="filter.id"
      :class="{ 'bg-blue-700': filter.isActive }"
    >
      {{ filter.name }}
    </label>
  </div>
</template>

<script>
import { ref } from "vue";

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
    const activeFilter = ref({});
    const changeFilter = () => {
      context.emit("change-filter", activeFilter);
    };
    return { activeFilter, changeFilter };
  },
};
</script>
