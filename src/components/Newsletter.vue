<template>
<div id="Newsletter">
    <i class="el-icon-message"></i>
    <h1>Join the Newsletter!</h1>
    <p>Get the latest news and disscusion about the world of paper cups! 🥤</p>
    <p>(this form is a demonstration, the input is not used in any way)</p>
    <el-form>
        <el-input
        placeholder="email address"
        type="email"
        prefix-icon="el-icon-message"
        v-model="input21">
        </el-input>
    <iframe scrolling="no" id="newsletter-consent-iframe" src=""></iframe>
    <el-button type="primary" native-type="submit">Submit</el-button>
    </el-form>
</div>
</template>

<script>
import ConsentuaUIWrapper from '@/js/consentua-embed.js'
export default {
    name: 'Newsletter',
    methods: {
        cb_ready() {
            // when ready (onload)
        },
        cb_set(msg) {
            //store consents for demo
            this.$store.commit({
                type: 'updateConsentuaConsents',
                value: msg.message.consents
            })
        },
        cb_msg(msg) {
            console.warn("Consent received from Consentua", msg);
        }
    },
    mounted() {
        // Consentua
        let tid = '98'; // Template ID
        var iframe = document.querySelector('#newsletter-consent-iframe');
        var newsletter_cwrap = new ConsentuaUIWrapper(iframe, this.$store.state.cid, this.$store.state.consentuaUID, tid, this.$store.state.sid, this.$store.state.skey, this.cb_msg, 'en',{
                ix: "https://kni-test-node.herokuapp.com/custom-interaction.html"
            });
        // set cb
        newsletter_cwrap.onset = this.cb_set;
        newsletter_cwrap.onready = this.cb_ready;
    }
}
</script>

<style>
#Newsletter{
    max-width: 800px;
    margin: 1rem auto;
    padding: 1rem;
    border: 1px solid #e59191;
    border-radius: 1rem;
}
#Newsletter > i.el-icon-message{
    font-size: 3rem;
}
#newsletter-consent-iframe{
    border:none;
    width: 100%;
}
</style>
