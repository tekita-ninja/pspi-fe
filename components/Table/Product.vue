<template>
  <table class="w-full border-collapse text-xs md:text-base shadow-xl">
    <!-- Header -->
    <thead>
      <tr>
        <th
          v-for="(header, index) in headers"
          :key="index"
          class="px-4 py-2 text-gray-700 border-b border-black"
          :class="index % 2 === 0 ? 'bg-blue-primary' : 'bg-blue-secondary'"
        >
          {{ header }}
        </th>
      </tr>
    </thead>

    <!-- Body -->
    <tbody>
      <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
        <td
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          class="px-4 py-2 border text-gray-800"
          :class="cellIndex % 2 === 0 ? 'bg-blue-primary' : 'bg-blue-secondary'"
        >
          {{ cell }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
export default {
  props: {
    headers: {
      type: Array as () => string[],
      required: true
    },
    rows: {
      type: Array as () => string[][],
      required: true
    }
  }
}
</script>

<style scoped>
table {
  border: none;
}

table td {
  border: none;
}
</style>
