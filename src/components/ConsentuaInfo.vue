<template>
<div id="ConsentuaInfo">
    <div id="consentua-toggle"><span>Consentua Info </span>
        <el-switch v-model="showConsentuaDetail"></el-switch>
    </div>
        <section id="consentua-detail" v-if="showConsentuaDetail">
                    <h2>Consentua Info</h2>
                    <span><i>Consentua UID: </i>{{ consentuaUID }}</span>
                    <span><i>Templates: </i>'63','100','98'</span>
                    <span><i>Consents: <br></i>
                    <span v-for="item in consentuaConsents" :key="item.id">
                      {{item.id}}:{{item.consent}}
                      <span v-if="item.consent">✅</span>
                    <span v-if="!item.consent">❌</span><br>
                    </span>
                    </span>
                    <!-- <span><i>Consent Receipt Id: </i></span> -->
                    <span style="margin-top:1rem;">
            <el-button type="warning" size="small" plain @click="clearConsentuaUID">New Consentua UID</el-button>
            <router-link to="/consentua-test">
            <br>
            <el-button size="small" plain>Consetua API test page</el-button>
            </router-link>
            <!-- <el-button type="primary" size="small" plain>Get Consent Receipt</el-button> -->
          </span>
    </section>
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
            showConsentuaDetail: true,
        }
    },
    methods: {
        clearConsentuaUID() {
            this.$store.commit('clearConsentuaUID');
            window.location.reload();
        }
    },
    computed: {
        consentuaUID() {
            return this.$store.state.consentuaUID
        },
        consentuaConsents() {
            return this.$store.state.consentuaConsents
        }
    }
}
</script>

<style scoped>
#consentua-toggle {
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

#consentua-detail {
    pointer-events: initial;
    position: fixed;
    right: 0;
    margin-top: 25vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #F5F5F5;
    border: 3px solid #A32655;
    border-right: none;
    padding: 2rem;
    border-radius: 1rem 0px 0px 1rem;
    z-index: 5;
    user-select: none;
}

#consentua-detail h2 {
    text-align: center;
    align-self: center;
    margin: 0px 0px 1rem 0px;
}
</style>
