<template>
  <div class="home">
    <SignInIndex/>
  </div>
</template>

<script>
import SignInIndex from "@/components/signInIndex/SignInIndex.vue";

export default {
  name: "home",
  components: {
    SignInIndex
  }
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
}
</style>
