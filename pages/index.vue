<template>
  <div>
    <div class="flex justify-center background">
      <div class="containing page">
        <div id="home" class="contain" :style="windowStyle">
          <header class="title center-items">
            <img
              src="@/public/logo.svg"
              alt="logo"
              class="h-40 sm:h-56 2xl:h-80 3xl:h-96"
            />
            <h1
              class="leading-none tracking-tighter name text-3xl sm:text-4xl 2xl:text-5xl 3xl:text-7xl pt-10 -ml-8 sm:pt-16 sm:-ml-14"
            >
              <p class="font-semibold font-main">dimitri</p>
              <p class="font-light font-display">franov</p>
            </h1>
          </header>
          <section class="equation center-items">
            <img
              src="@/public/equation.svg"
              alt="equation"
              class="h-28 sm:h-44 2xl:h-60 3xl:h-56"
            />
          </section>
          <section class="new_page">
            <blogPage
              :articles="articles"
              :windowstyle="windowStyle"
              @scroll="scrollTo"
            >
              <template #next_page>
                <codingPage
                  :windowstyle="windowStyle"
                  :articles="articles"
                  @scroll="scrollTo"
                >
                  <template #next_page>
                    <photographyPage
                      :photos="photos"
                      :windowstyle="windowStyle"
                      @scroll="scrollTo"
                    >
                      <template #next_page>
                        <contactPage
                          :windowstyle="windowStyle"
                          @scroll="scrollTo"
                        >
                        </contactPage>
                      </template>
                    </photographyPage>
                  </template>
                </codingPage>
              </template>
            </blogPage>
          </section>
          <section class="text">
            <article class="pt-9 sm:pt-16 flex">
              <h3
                class="tracking-tighter font-light text-3xl sm:text-5xl 2xl:text-6xl w-fit h-fit -rotate-90 origin-top-right -ml-14 sm:-ml-20 2xl:-ml-10"
              >
                hallo
              </h3>
              <div class="mr-10 2xl:mr-60 ml-9 sm:ml-12 2xl:ml-24 2xl:pt-20">
                <p class="text-xs sm:text-base 2xl:text-xl">
                  Und dies ist meine Homepage. Um zum n??chsten Abschnitt zu
                  gelangen kannst du gerne scrollen oder auf das
                  Inhaltsverzeichnis rechts dr??cken. Und dies ist meine
                  Homepage. Um zum n??chsten Abschnitt zu gelangen kannst du
                  gerne scrollen oder auf das Inhaltsverzeichnis rechts dr??cken.
                </p>
                <baseButton class="h-8 w-24 mt-10">mehr ??ber mich</baseButton>
              </div>
            </article>
          </section>
          <div class="content center-items">
            <ul
              class="text-black text-sm sm:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl border-l-2 border-black pl-1 py-4"
            >
              <li
                class="cursor-pointer hover:text-white md:pb-1 3xl:pb-2"
                @click="scrollTo(0)"
              >
                home
              </li>
              <li
                class="cursor-pointer hover:text-white md:pb-1 3xl:pb-2"
                @click="scrollTo(1)"
              >
                blog
              </li>
              <li
                class="cursor-pointer hover:text-white md:pb-1 3xl:pb-2"
                @click="scrollTo(2)"
              >
                projekte
              </li>
              <li
                class="cursor-pointer hover:text-white md:pb-1 3xl:pb-2"
                @click="scrollTo(3)"
              >
                fotografie
              </li>
              <li
                class="cursor-pointer hover:text-white md:pb-1 3xl:pb-2"
                @click="scrollTo(4)"
              >
                kontakt
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- <div class="block w-screen spacer"></div> -->
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import scrollTrigger from "gsap/ScrollTrigger";
import scrollToPlugin from "gsap/ScrollToPlugin";

export default {
  async Data() {
    const { articles } = await useAsyncData("blog", () =>
      queryContent("/blog").only(["title"]).find()
    );
    console.log(articles);
    // const articles = await $content("blog").limit(6).fetch();
    // const photos = await $content("photos").limit(6).fetch();

    return {
      articles,
    };
  },
  data() {
    return {
      windowWidth: 0,
      windowHeight: 0,
    };
  },
  head() {
    return {
      script: [
        { src: "https://identity.netlify.com/v1/netlify-identity-widget.js" },
      ],
    };
  },
  computed: {
    isTooWide() {
      if (this.windowHeight * 1.61803 < this.windowWidth) return true;
      else return false;
    },
    phiWidth() {
      return this.windowHeight * 1.61803;
    },
    phiHeight() {
      return this.windowWidth / 1.61803;
    },
    phiMobileHeight() {
      return Math.round(this.windowWidth * 1.61803);
    },
    windowStyle() {
      if (this.windowWidth <= 1024) {
        return {
          width: "100vw",
          height: this.phiMobileHeight + "px",
          fontSize: "0.001vw",
        };
      } else if (this.isTooWide)
        return {
          height: "100vh",
          width: this.phiWidth + "px",
          fontSize: "0.00618vh",
        };
      else
        return {
          width: "100vw",
          height: this.phiHeight + "px",
          fontSize: "0.001vw",
        };
    },
  },
  mounted() {
    // console.log(this.$route.hash[1]);

    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    window.onresize = () => {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
    };
    // if (this.windowWidth < this.windowHeight) this.articles.length = 4;
    // setTimeout(() => {
    //   this.width = document.getElementById("home").clientWidth;
    //   this.height = document.getElementById("home").clientHeight;
    //   window.addEventListener("resize", () => {
    //     setTimeout(() => {
    //       this.width = document.getElementById("home").clientWidth;
    //       this.height = document.getElementById("home").clientHeight;
    //     }, 1);
    //   });
    // }, 1);

    gsap.defaults({ duration: 1, ease: "none" });
    gsap.registerPlugin(scrollTrigger, scrollToPlugin);
    const tl = gsap.timeline();
    const pages = gsap.utils.toArray(".page");
    let scale = 2.61803;
    for (const id in pages) {
      tl.addLabel(id);
      tl.to(pages[0], {
        scale,
      });
      scale *= 2.61803;
    }
    // const proxy = { blur: 0 }
    // // const blurSetter = gsap.quickSetter('.new_page', 'filter': 'blur', 'px') // fast
    // const clamp = gsap.utils.clamp(0, 1) // don't let the skew go beyond 20 degrees.

    scrollTrigger.create({
      animation: tl,
      // onUpdate: (self) => {
      //   console.log(self.progress)
      //   const blur = clamp(Math.abs(self.getVelocity() / 300))
      //   // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
      //   if (blur > proxy.blur) {
      //     proxy.blur = blur
      //     gsap.to(proxy, {
      //       blur: 0,
      //       duration: 0.8,
      //       ease: 'power3',
      //       overwrite: true,
      //       onUpdate: () =>
      //         gsap.set(pages, {
      //           filter: 'blur(' + proxy.blur.toString() + 'px)',
      //         }),
      //     })
      //   }
      // },
      trigger: ".background",
      scrub: 0,
      pin: true,
      anticipatePin: 1,
      snap: {
        snapTo: "labels", // snap to the closest label in the timeline
        duration: 0.2, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
        delay: 0, // wait 0.2 seconds from the last scroll event before doing the snapping
        ease: "power1.inOut", // the ease of the snap animation ("power3" by default)
      },
      end: () => "+=" + pages.length * this.windowWidth,
    });
    this.scrollToInstant(parseInt(this.$route.hash[1]));
  },
  methods: {
    scrollTo(section) {
      gsap.to(window, { duration: 0.5, scrollTo: section * this.windowWidth });
    },
    scrollToInstant(section) {
      gsap.to(window, {
        duration: 0.001,
        scrollTo: section * this.windowWidth,
      });
    },
  },
};
</script>

<style scoped>
.comfor {
  font-family: Comfortaa;
}
.spacer {
  height: 400px;
}
.background {
  height: 100vh;
  width: 100vw;
  transform-origin: top right;
}

.container {
  height: v-bind(phiMobileHeight);
}

@media only screen and (min-width: 1024px) {
  .contain {
    display: grid;
    grid-template-columns: 1.61803fr 1fr 1.61803fr;
    grid-template-rows: 1fr 1.61803fr;
    grid-template-areas:
      "title equation new_page"
      "text text content";
  }
}

@media only screen and (max-width: 1024px) {
  .contain {
    display: grid;
    grid-template-columns: 1.61803fr 1fr;
    grid-template-rows: 1.61803fr 1fr 1.61803fr;
    grid-template-areas:
      "title new_page"
      "text equation"
      "text content";
  }
}
.title {
  outline: 1px solid black;
  border: 1px solid black;
  color: #000000;
  background-color: #ffffff;
  grid-area: title;
}

.content {
  outline: 1px solid black;
  border: 1px solid black;
  color: aqua;
  background-color: #f7f7f7;
  grid-area: content;
  font-size: 12px;
}

.equation {
  /* outline: 1px solid black; */
  border: 1px solid black;
  color: black;
  background-color: #fafafa;
  grid-area: equation;
}

.text {
  outline: 1px solid black;
  border: 1px solid black;
  background-color: #fcfcfc;
  grid-area: text;
}

.page {
  transform-origin: top right;
}

.new_page {
  color: black;
  transform-origin: top right;
  grid-area: new_page;
}
/* li:hover {
  margin-left: 10px;
  transform: translate(10px);
  transform: scale(1.1);
} */
</style>
