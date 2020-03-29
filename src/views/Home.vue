<template>
  <div class="container">
    <TopBar class="top-bar" />
    <div class="box">
      <LeftBar class="left-bar" />
      <div class="content-box">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "../components/TopBar.vue";
import LeftBar from "../components/LeftBar";
import { mapMutations } from "vuex";

export default {
  name: "Home",
  components: {
    TopBar,
    LeftBar
  },
  data: () => ({
    isCollapsed: false
  }),
  computed: {},
  methods: {
    ...mapMutations(["updateUrl"])
  },
  created() {
    //鉴权
    const token = document.cookie.split("=")[1];
    if (token !== "testToken") {
      this.$router.replace({
        path: "/login"
      });
    }
  },
  mounted() {
    this.updateUrl(this.$route.path);
  }
};
</script>
<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.box {
  flex-shrink: 1;
  flex-grow: 1;
  box-sizing: border-box;
  padding: 2rem;
  overflow: hidden;

  display: flex;
  justify-content: flex-start;
}
.content-box {
  margin-left: 2rem;
  flex-shrink: 1;
  flex-grow: 1;
}
</style>
