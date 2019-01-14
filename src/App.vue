<template>
  <div id="app">
    <el-container>
      <el-header height="auto">
        <div>
          <router-link to="/" id="logo">
            <img id="main-logo" src="@/assets/cup-shop-logo-192x192.png">
            <h1>Cup Shop</h1>
          </router-link>
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
          <a id="ctaLink" href="https://consentua.com" alt="find out more about Consentua"><i class="el-icon-back"></i>Consentua.com</a>
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

  export default {
    components: {
      Cart,
      ConsentuaInfo,
      CookieConsent,
      ConsentStatus
    },
    mounted() {
      this.$alert(
        'This ecommerce site is a demonstration test bed for the consent API <a href="https://consentua.com">Consentua</a>. <br> Purchase some cups. Go to checkout and become an identified and consented to user. <br> Tap the \'Consentua Info\' toggle to see Consentua working in the background. <a href="https://consentua.com/contact">Contact Us</a>',
        'What is this?', {
          confirmButtonText: 'OK',
          dangerouslyUseHTMLString: true
        });
    }
  }
</script>


<style>
  body {
    margin: 0px;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  @keyframes slide {
    0% {
      opacity: 0;
      right: 38px;
    }

    100% {
      right: 0;
      opacity: 1;
    }
  }

  @keyframes slidecontain {
    0% {
      margin-left: -17px;
    }

    100% {
      margin-left: 0px;
    }
  }

  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: solid 1px #e6e6e6;
  }

  .el-header>div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .el-header #logo {
    display: contents;
    color: black;
    text-decoration: none;
  }

  .el-header #logo #main-logo {
    max-height: 50px;
  }

  .el-header .el-menu {
    margin-left: 5px;
  }

  .el-header #ctaLink {
    background: #9A1144;
    display: flex;
    color: #fff;
    padding: 0.8rem;
    /* border-radius: 0.3rem; */
    margin-left: -17px;
    overflow: hidden;
  }

  .el-header #ctaLink .el-icon-back {
    margin-right: 5px;
    position: relative;
    right: 38px;
    text-decoration: none;
    display: block;
  }

  .el-header #ctaLink:hover {
    animation: slidecontain 0.5s ease 0s forwards;
  }

  .el-header #ctaLink:hover .el-icon-back {
    animation: slide 0.5s ease 0s forwards;
  }

  .el-menu.el-menu--horizontal {
    border: none;
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

  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
  .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    outline: 0;
    color: #303133;
    border-bottom: 2px solid #35998F;
  }

  .el-message-box {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
</style>