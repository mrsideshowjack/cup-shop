<template>
<div class="consent-dashboard" id="consent-dashboard">
    <h2>consent dashboard</h2>
</div>
</template>
<script>
import ConsentuaUIWrapper from '@/js/consentua-embed.js'
export default {
    name: 'consent-dashboard',
    methods:{
        cb_ready(msg){
            console.log("UID is:" + msg.message.uid);
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
        },
        cb_onreceipt(msg){
            console.log(msg);
            
        }
    },
    mounted() {
        // Consentua
        var cid = '266'; // Customer ID
        var sid = '105'; // Consentua service ID
        var skey = 'ad2e97aa-2fbe-4993-92fe-598fc26a33ba'; // Consentua service key
        var tids = ['63','100','98']; // Template ID
        for (let i = 0; i < tids.length; i++) {
            let iframe = document.createElement("iframe");
            iframe.id = "consentua-iframe-" + [i];
            iframe.class = "consentua-iframe";
            document.getElementById('consent-dashboard').appendChild(iframe);
            let cwrap = new ConsentuaUIWrapper(iframe, cid, this.$store.state.consentuaUID, tids[i], sid, skey, this.cb_msg, 'en');
            // set cb
            cwrap.onset = this.cb_set;
            cwrap.onready = this.cb_ready;
            // cwrap.onreceipt = this.cb_onreceipt;
        }
    }
}
</script>
<style>
#consent-dashboard{
    display: flex;
	flex-direction: column;
   align-items: center;
   justify-content: space-evenly;
}
#consent-dashboard iframe{
	border:none;
	max-width: 50vw;
    width: 100%;
}
</style>
