<template>
<div class="consent-dashboard" id="consent-dashboard">
    <h2>Consent Dashboard</h2>
    <p>A view of all the consents you have / have not given to our service.</p>
</div>
</template>

<script>
import ConsentuaUIWrapper from '@/js/consentua-embed.js'
export default {
    name: 'consent-dashboard',
    methods: {
        cb_ready(msg) {
            console.log("UID is:" + msg.message.uid);
            if (!this.$store.state.consentuaUID) {
                this.$store.commit({
                    type: 'updateConsentuaUID',
                    value: msg.message.uid
                })
            }
        },
        cb_set(msg) {
            //update cookie when consent is set
            console.log("Consent received from Consentua", msg);
            this.$store.commit({
                type: 'updateConsentuaConsents',
                value: msg.message.consents
            })
        },
        cb_msg(msg) {
            console.warn("Consent received from Consentua", msg);
        },
        cb_onreceipt(msg) {
            console.log(msg);

        }
    },
    mounted() {
        // Consentua
        var tids = ['63', '100', '98']; // Template ID
        for (let i = 0; i < tids.length; i++) {
            let iframe = document.createElement("iframe");
            iframe.id = "consentua-iframe-" + [i];
            iframe.class = "consentua-iframe";
            document.getElementById('consent-dashboard').appendChild(iframe);
            let cwrap = new ConsentuaUIWrapper(iframe, this.$store.state.cid, this.$store.state.consentuaUID, tids[i], this.$store.state.sid, this.$store.state.skey, this.cb_msg, 'en');
            // set cb
            cwrap.onset = this.cb_set;
            cwrap.onready = this.cb_ready;
            // cwrap.onreceipt = this.cb_onreceipt;
        }
    }
}
</script>

<style>
#consent-dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

#consent-dashboard iframe {
    border: none;
    max-width: 50vw;
    width: 100%;
}

@media screen and (max-width: 700px){
    #consent-dashboard iframe {
    max-width: 95vw;
    }
}
</style>
