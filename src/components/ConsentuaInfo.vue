<template>
    <div id="ConsentuaInfo" >
        <div id="consentua-toggle"><span>Consentua Info </span><el-switch v-model="showConsentuaDetail" ></el-switch></div>
        <!-- Yes I know, but it needs 2 wrappers -->
        <div class="wrapperwrapper" v-if="showConsentuaDetail">
          <div class="wrapper">
        <drag-it-dude>
        <section id="consentua-detail" >
          <h2>Consentua Info</h2>
          <span><i>consentua UID: </i>{{ consentuaUID }}</span>
          <span><i>templates: </i>'63','100','98','999999'</span>
          <span><i>template status: <br></i>
            <span v-for="item in consentuaConsents" :key="item.id">{{item.id}}:{{item.consent}} <span v-if="item.consent">✅</span> <span v-if="!item.consent">❌</span><br></span>
          </span>
          <!-- <span><i>Consent Receipt Id: </i></span> -->
          <span style="margin-top:1rem;">
            <el-button type="warning" size="small" plain @click="clearConsentuaUID">New Consentua UID</el-button>
            <!-- <el-button type="primary" size="small" plain>Get Consent Receipt</el-button> -->
          </span>
        </section>
        </drag-it-dude>
        </div>
        </div>
    </div>
</template>

<script>
import DragItDude from 'vue-drag-it-dude/src/DragItDude.vue';
export default {
  components: {
    DragItDude
  },
  data() {
      return {
        showConsentuaDetail: false,
      }
  },
  methods:{
    clearConsentuaUID(){
      this.$store.commit('clearConsentuaUID');
      window.location.reload(); 
    }
  },
  computed: {
    consentuaUID (){
        return this.$store.state.consentuaUID
    },
    consentuaConsents (){
        return this.$store.state.consentuaConsents
    }
  }
}
</script>

<style scoped>


  #consentua-toggle{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 170px;
    border: 1px solid #dcdfe6;
    color: #606266;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
        margin: 0.5rem;
  }

  .wrapperwrapper{
    position: fixed;
    top: 0;right: 0;bottom: 0;left: 0;
    pointer-events: none;
    user-select: none;
  }

  .wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  pointer-events: none;
  user-select: none;
}

  #consentua-detail{
    pointer-events: initial;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    top: 100px;
    right: 20px;
    background: rgba(154, 17, 68, 0.6);
    color: #000;
    padding: 2rem;
    border-radius: 20px;
    z-index: 5;
    cursor: move;
    user-select: none;
  }
  #consentua-detail h2{
    text-align: center;
    align-self: center;
    margin: 0px 0px 1rem 0px;
  }
</style>
