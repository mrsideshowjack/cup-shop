<template>
  <div id="Sidebar" class="sidebar">
  <el-button id="sidebarClose" icon="el-icon-close" circle @click="open=false"></el-button>
  <ConsentuaInfo />
  </div>
</template>

<script>
  import {TweenMax, Power4} from 'gsap'
  import ConsentuaInfo from './ConsentuaInfo.vue'
  export default {
    name: 'sidebar',
    components: {
        ConsentuaInfo
    },
    mounted () {
      TweenMax.set(this.$el, {
        x: this.$el.offsetWidth
      })
      this.toggleSidebar(open)
    },
    computed: {
      open:{
        get: function () {
          return this.$store.state.sidebarOpen
        },
        set: function () {
          this.$store.dispatch('toggleSidebar')
        }
      }
    },
    methods: {
      toggleSidebar(open){
        const dX = open ? 0 : this.$el.offsetWidth
        TweenMax.to(this.$el, 0.6, {
          x: dX,
          ease: Power4.easeOut
        })
      }
    },
    watch: {
      open: function (open) {
        this.toggleSidebar(open)
      }
    }
  }
</script>

<style>
  .sidebar{
    position: fixed;
    right: 0;
    top: 0;
    width: 300px;
    height: 100vh;
    max-width: 90vw;
    background-color: #eee;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    z-index: 9998;
  }
  #sidebarClose{
    align-self: flex-end;
    margin: 1rem 1rem 0px 0px;
  }
</style>