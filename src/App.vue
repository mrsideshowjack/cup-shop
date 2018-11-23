<template>
  <div id="app">
    <el-container>
      <el-header height="auto">
        <div>
        <h1>Cup Shop</h1>
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
        </div>
        <div>
          <ConsentuaInfo />
          <Cart />
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        <ConsentStatus />
        <CookieConsent />
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import Cart from '@/components/Cart.vue'
import ConsentuaInfo from '@/components/ConsentuaInfo.vue'
import CookieConsent from '@/components/CookieConsent.vue'
import ConsentStatus from '@/components/ConsentStatus.vue'
import ConsentuaUIWrapper from '@/js/consentua-embed.js'

export default {
  components: {
    Cart,
    ConsentuaInfo,
    CookieConsent,
    ConsentStatus
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
    align-items: center;
    flex-wrap: wrap;
    border-bottom: solid 1px #e6e6e6;
  }
  .el-header > div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .el-header .el-menu{
    margin-left: 5px;
  }
  .el-menu.el-menu--horizontal {
    border:none;
    align-self: stretch;
  }
  .el-menu--horizontal>.el-menu-item {
    border-bottom: 2px solid transparent;
    height: 100%;
  }
  .el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 2px solid #35998F;
    color: #303133;
    height: 100%;
  }
  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    outline: 0;
    color: #303133;
    border-bottom: 2px solid #35998F;
  }
</style>