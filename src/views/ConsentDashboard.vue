<template>
<div class="consent-dashboard" id="consent-dashboard">
    <h2>consent dashboard</h2>
</div>
</template>
<script>
export default {
    name: 'consent-dashboard',
    mounted() {
        // let websdkScript = document.createElement('script')
        // websdkScript.setAttribute('src', 'https://websdk.consentua.com/websdk/consentua-embed.js.php')
        // document.body.appendChild(websdkScript)
        var cid = '57'; // Customer ID
        var sid = '105'; // Consentua service ID
        var skey = 'fa83fb53-1c0b-4ee0-b4bb-a5efe6fd4360'; // Consentua service key
        var tids = ['63','100','98','999999']; // Template ID
        var uid = false;

        var cb = function(msg) {
            console.log("Consent received from Consentua", msg);
        };

        for (let i = 0; i < tids.length; i++) {
            let iframe = document.createElement("iframe");
            iframe.id = "consentua-iframe-" + [i];
            iframe.class = "consentua-iframe";
            document.getElementById('consent-dashboard').appendChild(iframe);
            let cwrap = new ConsentuaUIWrapper(iframe, cid, uid, tids[i], sid, skey, cb, 'en');
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
