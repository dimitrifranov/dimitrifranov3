<template>
  <div>
    <button
      id="baseButton"
      :type="type"
      name="button"
      v-bind="$attrs"
      :class="buttonClass"
      class="text-xs border-black bg-white text-black transition-all duration-100 disabled:opacity-75 disbaled:text-error"
      @click="$emit('clicked')"
    >
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: "button",
    },
    buttonClass: {
      type: String,
      default: "",
    },
    height: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
#baseButton {
  border-width: 3px;
  font-size: xx-small;
}
#baseButton:hover {
  border-width: 5px;
}
</style>
