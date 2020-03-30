<template>
  <div class="left-bar">
    <div
      v-for="nav in navs"
      @click="to(nav.url)"
      :key="nav.url"
      :class="{ chosen: currentUrl === nav.url }"
    >
      {{ nav.name }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LeftBar",
  data: () => ({
    navs: [
      {
        name: "财务统计",
        url: "/finstat"
      },
      {
        name: "病患统计",
        url: "/patstat"
      },
      {
        name: "职工统计",
        url: "/staff"
      },
      {
        name: "我的信息",
        url: "/my"
      }
    ]
  }),
  methods: {
    to(url) {
      this.$router.push({
        path: url
      });
    }
  },
  computed: {
    ...mapState(["currentUrl"])
  }
};
</script>

<style scoped>
.left-bar {
  height: 100%;
  width: 13rem;
  box-sizing: border-box;
  padding-top: 1rem;

  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.left-bar > div {
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  text-align: left;

  box-sizing: border-box;
  padding-left: 2rem;
  transition: all 300ms ease-in-out;
  cursor: pointer;
}
.left-bar > div.chosen {
  background: #f0faff;
  border-right: 2px solid #2d8cf0;
  color: #2d8cf0;
  padding-left: 3rem;
}
.left-bar > div:hover {
  background: #f0faff;
  padding-left: 3rem;
}
</style>
