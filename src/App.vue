<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
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
          <ConsentuaInfo />
          <Cart />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        <CookieConsent />
        <ConsentStatus />
        <router-link to="/consent-dashboard">Consent Dashboard</router-link>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import Cart from '@/components/Cart.vue'
import ConsentuaInfo from '@/components/ConsentuaInfo.vue'
import CookieConsent from '@/components/CookieConsent.vue'
import ConsentStatus from '@/components/ConsentStatus.vue'

export default {
  components: {
    Cart,
    ConsentuaInfo,
    CookieConsent
  },
  mounted() {
   }
}
</script>


<style>
  body{
    margin: 0px;
  }
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