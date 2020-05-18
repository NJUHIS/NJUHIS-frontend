<template>
  <Card class="card" dis-hover>
    <Input
      class="ipt"
      prefix="ios-contact"
      v-model="username"
      placeholder="Username"
      clearable
      :disabled="isSubmit"
    />
    <Input
      class="ipt"
      prefix="ios-key"
      v-model="password"
      placeholder="Password"
      type="password"
      :disabled="isSubmit"
      password
      focus
    />
    <Button class="ipt" type="primary" long @click="doSubmit">Login</Button>
  </Card>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    username: "",
    password: "",
    isSubmit: false
  }),
  computed: {},
  methods: {
    doSubmit() {
      document.cookie = "token=testToken";
      this.$router.push({
        path: "/"
      });
    }
  },
  created(){
    //鉴权
    const token = document.cookie.split("=")[1];
    if (token === "testToken") {
      this.$router.replace({
        path: "/"
      });
    }
  }
};
</script>

<style scoped>
.card {
  position: fixed;
  width: 20rem;
  /* height: 20rem; */
  top: calc(50vh - 10rem);
  left: calc(50vw - 10rem);

  display: flex;
  align-items: flex-start;
  justify-content: center;
  box-sizing: border-box;
}
.ipt {
  width: 250px;
  margin: 1rem;
}
</style>
