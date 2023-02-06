<template>
  <div :id="pk" class="contain new_page page" :style="scaledStyle">
    <section
      class="title center-items font-display text-2xl sm:text-4xl 2xl:text-5xl 3xl:text-7xl"
    >
      <slot name="title" />
    </section>
    <section class="equation center-items">
      <img
        src="equation.png"
        alt="equation"
        class="h-24 sm:h-36 2xl:h-40 3xl:h-56"
      />>
    </section>
    <section class="next_page">
      <slot name="next_page" />
    </section>
    <section class="text">
      <slot name="text" />
    </section>
    <section class="content">
      <!-- <slot name="content" /> -->
      <div class="center-items flex flex-col">
        <ul
          class="text-black text-lg sm:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl"
        >
          <li
            class="hover:text-white cursor-pointer md:pb-1 3xl:pb-2"
            @click="scrollTo(0)"
          >
            Home
          </li>
          <li
            class="hover:text-white cursor-pointer md:pb-1 3xl:pb-2"
            @click="scrollTo(1)"
          >
            Blog
          </li>
          <li
            class="hover:text-white cursor-pointer md:pb-1 3xl:pb-2"
            @click="scrollTo(2)"
          >
            Projekte
          </li>
          <li
            class="hover:text-white cursor-pointer md:pb-1 3xl:pb-2"
            @click="scrollTo(3)"
          >
            Fotografie
          </li>
          <li
            class="hover:text-white cursor-pointer md:pb-1 3xl:pb-2"
            @click="scrollTo(4)"
          >
            Kontakt
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    pk: {
      type: String,
      default: "index",
    },
    id: {
      type: String,
      default: "1",
    },
    windowstyle: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ["scroll", "height-change", "width-change"],
  data() {
    return {
      width: 0,
      height: 0,
    };
  },
  computed: {
    scaleFactor() {
      // if (this.id === '2') return 1
      // else return 0.618 ** parseInt(this.id)
      return 0.3819;
    },
    scaledStyle() {
      return {
        transform: `scale(${this.scaleFactor})`,
        ...this.windowstyle,
      };
    },
  },
  mounted() {
    // const pk = this.pk
    // setTimeout(() => {
    //   this.width = document.getElementById(pk).clientWidth
    //   this.height = document.getElementById(pk).clientHeight
    //   this.$emit('heightChange', this.height)
    //   this.$emit('widthChange', this.width)
    //   window.addEventListener('resize', () => {
    //     setTimeout(() => {
    //       this.width = document.getElementById(pk).clientWidth
    //       this.height = document.getElementById(pk).clientHeight
    //       this.$emit('heightChange', this.height)
    //       this.$emit('widthChange', this.width)
    //     }, 1)
    //   })
    // }, 1)
    setTimeout(() => {
      this.width = document.documentElement.clientWidth;
      this.height = document.documentElement.clientHeight;
      this.$emit("height-change", this.height);
      this.$emit("width-change", this.width);
      window.addEventListener("resize", () => {
        setTimeout(() => {
          this.width = document.documentElement.clientWidth;
          this.height = document.documentElement.clientHeight;
          this.$emit("height-change", this.height);
          this.$emit("width-change", this.width);
        }, 1);
      });
    }, 1);
  },

  methods: {
    scrollTo(e) {
      this.$emit("scroll", e);
    },
  },
};
</script>

<style scoped>
/* .contain {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1.61803fr 1fr 1.61803fr;
  grid-template-rows: 1fr 1.61803fr;
  grid-template-areas:
    'title equation new_page'
    'text text content';
} */
.title {
  /* outline: 2px solid black; */
  border: 2px solid black;
  color: #000000;
  background-color: #ffffff;
  grid-area: title;
}

.content {
  outline: 2px solid black;
  border: 2px solid black;
  /* font-size: 1px; */
  color: black;
  background-color: #f7f7f7;
  grid-area: content;
}

.equation {
  /* outline: 2px solid black; */
  border: 2px solid black;
  color: black;
  background-color: #fafafa;
  grid-area: equation;
}

.text {
  /* outline: 2px solid black; */
  border: 2px solid black;
  color: beige;
  background-color: #fcfcfc;
  grid-area: text;
}
.page {
  position: absolute;
  /* width: 100%;
  height: 100%; */
  top: 0;
  right: 0;
  transform-origin: top right;
  /* transform: scale(0.3819); */
}

.new_page {
  color: black;
  background-color: black;
  transform-origin: top right;
  grid-area: new_page;
}
</style>
