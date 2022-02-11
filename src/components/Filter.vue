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
export default {
  props: {
    filter: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      activeFilter: null,
    };
  },

  emits: {
    "change-filter": (value) => typeof value === "string",
  },
  methods: {
    changeFilter() {
      this.$emit("change-filter", this.activeFilter);
    },
  },
};
</script>
