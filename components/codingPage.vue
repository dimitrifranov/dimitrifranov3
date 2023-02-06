<template>
  <baseComponent
    id="coding"
    pk="coding"
    :windowstyle="windowstyle"
    @height-change="heightChange"
    @scroll="scroll"
  >
    <template #title> projekte </template>
    <template #next_page>
      <slot name="next_page" />
    </template>
    <template #text>
      <div class="overflow-hidden">
        <div
          class="grid lg:grid-cols-3 grid-cols-1 lg:grid-rows-2 w-full articles lg:p-4 lg:pb-2 pb-3"
        >
          <articlePreview
            v-for="article in articles"
            :key="article.slug"
            :article="article"
          />
        </div>
        <nuxt-link
          to="/blog"
          class="text-base text-white h-1/6 border border-white font-light px-2 py-1 mb-2 mr-6 float-right more"
        >
          mehr Artikel
        </nuxt-link>
      </div>
    </template>
    <template #content />
  </baseComponent>
</template>

<script>
export default {
  props: {
    windowstyle: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ["scroll"],
  data() {
    return {
      height: 0,
    };
  },
  methods: {
    heightChange(e) {
      this.height = e;
    },
    scroll(e) {
      this.$emit("scroll", e);
    },
  },
};
</script>

<style scoped>
.link:hover {
  transform: scale(1.2);
}
.link {
  transition: all 200ms;
}
</style>
