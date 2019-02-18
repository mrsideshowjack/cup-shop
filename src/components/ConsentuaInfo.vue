<template>
<div id="ConsentuaInfo">
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
    <div id="btn-group">
        <el-button type="warning" size="small" plain @click="clearConsentuaUID">New Consentua UID</el-button>
        <router-link to="/consentua-test">
        <el-button size="small" plain>Consetua API test page</el-button>
        </router-link>
        <el-button size="small" @click="openCookie" plain>Open cookie popup</el-button>
        <!-- <el-button type="primary" size="small" plain>Get Consent Receipt</el-button> -->
    </div>
</div>
</template>

<script>
export default {
    methods: {
        clearConsentuaUID() {
            this.$store.commit('clearConsentuaUID');
            window.location.reload();
        },
        openCookie() {
            this.$store.state.cookiePopOpen = true;
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
#ConsentuaInfo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    user-select: none;
}

#ConsentuaInfo h2 {
    text-align: center;
    align-self: center;
    margin: 0px 0px 1rem 0px;
}
#btn-group{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin-top: 1rem;
    width: 100%;
}
#btn-group > * {
    display: flex;
    max-height: 40px;
    margin: 0.2rem;
}
</style>
