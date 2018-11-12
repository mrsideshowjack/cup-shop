<template>
    <div id="CookieConsent">
        <!-- <el-button type="text" @click="dialogVisible = true">click to open the Dialog</el-button> -->
        <div id="cookie-consent-container">
            <iframe scrolling="no" id="cookie-consent-iframe" src=""></iframe>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CookieConsent',
    data() {
      return {
        dialogVisible: false
      };
    },
    methods:{
        cb_ready(msg){
            console.log("UID is:" + msg.message.uid);
            //open dialog
            this.dialogVisible = true;
            //store uid
            if (!this.$store.state.consentuaUID) {
                this.$store.commit({
                    type: 'updateConsentuaUID',
                    value: msg.message.uid
                }) 
            }
        },
        cb_set(msg){
            //update cookie when consent is set
            console.log("Consent received from Consentua", msg);
            this.$store.commit({
                type: 'updateConsentuaConsents',
                value: msg.message.consents
            })
        },
        cb_msg(msg){
            console.warn("Consent received from Consentua", msg);
        }
    },
    mounted() {
        // Consentua
        let cid = '57', // Customer ID
            sid = '105', // Consentua service ID
            skey = 'fa83fb53-1c0b-4ee0-b4bb-a5efe6fd4360', // Consentua service key
            tid = '63'; // Template ID
        var iframe = document.querySelector('#cookie-consent-iframe');
        // let iframe = document.createElement("iframe");
            // iframe.id = "cookie-consent-iframe";
        // document.getElementById('cookie-consent-container').appendChild(iframe);
        var cookie_cwrap = new ConsentuaUIWrapper(iframe, cid, this.$store.state.consentuaUID, tid, sid, skey, this.cb_msg, 'en',{ix:"https://kni-test-node.herokuapp.com/custom-interaction.html"});
        // set cb
        cookie_cwrap.onset = this.cb_set;
        cookie_cwrap.onready = this.cb_ready;
    }
}
</script>

<style>
iframe#cookie-consent-iframe{
    border: none;
    width: 100%;
}
</style>
