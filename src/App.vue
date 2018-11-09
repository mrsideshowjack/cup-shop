<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">
            <router-link to="/">Home</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/about">About</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <a href="https://github.com/mrsideshowjack/cup-shop">Github</a>
          </el-menu-item>
        </el-menu>
        <Cart />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        <router-link to="/consent-dashboard">Consent Dashboard</router-link>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Cart from '@/components/Cart.vue'

export default {
  components: {
    Cart
  },
   mounted() {
        let websdkScript = document.createElement('script')
        websdkScript.setAttribute('src', 'https://websdk.consentua.com/websdk/consentua-embed.js.php')
        document.body.appendChild(websdkScript)
   }
}
</script>


<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .el-header{
        display: flex;
    justify-content: space-between;
  }
</style>