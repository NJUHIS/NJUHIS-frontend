<template>
  <div class="top-bar">
    <p>东软HIS医疗系统</p>
    <p class="user-box" @click="to('/my')">欢迎您，{{ username }}</p>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  data: () => ({
    username: "HIS Sir"
  }),
  methods: {
    to(url) {
      this.$router.push({
        path: url
      });
    }
  }
};
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 4rem;
  background: #515a6e;
  box-sizing: border-box;
font-size: 24px;
  padding: 0 4rem;
  color: rgba(255, 255, 255, 0.7);
}
.user-box {
  transition: all 300ms;
}
.user-box:hover {
  color: #fff;
  cursor: pointer;
}
</style>
