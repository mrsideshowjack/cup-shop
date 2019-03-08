<template>
<div id="LocationConsent">
    <div class="grid-container">
        <div class="icon" v-if="isconsent">
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="location" class="svg-inline--fa fa-location fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 168c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 128c-22.06 0-40-17.94-40-40s17.94-40 40-40 40 17.94 40 40-17.94 40-40 40zm240-64h-49.66C435.49 145.19 366.81 76.51 280 65.66V16c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v49.66C145.19 76.51 76.51 145.19 65.66 232H16c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h49.66C76.51 366.81 145.19 435.49 232 446.34V496c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-49.66C366.81 435.49 435.49 366.8 446.34 280H496c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16zM256 400c-79.4 0-144-64.6-144-144s64.6-144 144-144 144 64.6 144 144-64.6 144-144 144z"></path></svg>
        </div>
        <div class="icon" v-else>
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="location-slash" class="svg-inline--fa fa-location-slash fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M633.99 471.02L36 3.51C29.1-2.01 19.03-.9 13.51 6l-10 12.49C-2.02 25.39-.9 35.46 6 40.98l598 467.51c6.9 5.52 16.96 4.4 22.49-2.49l10-12.49c5.52-6.9 4.41-16.97-2.5-22.49zM320 112c79.4 0 144 64.6 144 144 0 6.72-1.09 13.15-1.99 19.64l42.25 33.03c2.66-9.31 4.84-18.83 6.07-28.67H560c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-49.66C499.49 145.19 430.81 76.51 344 65.66V16c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v49.66c-25.81 3.23-49.69 12.07-71.26 24.48l41.55 32.48C282.92 115.9 300.99 112 320 112zm0 288c-79.4 0-144-64.6-144-144 0-6.72 1.09-13.16 1.99-19.64l-42.25-33.03c-2.66 9.31-4.85 18.83-6.08 28.67H80c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h49.66C140.51 366.81 209.2 435.49 296 446.34V496c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-49.66c25.81-3.23 49.69-12.07 71.26-24.48l-41.55-32.48C357.08 396.1 339.01 400 320 400z"></path></svg>
        </div>
        <div class="consent">
            <iframe scrolling="no" id="location-consent-iframe" src=""></iframe>
        </div>
        <div class="map">
            <Map id="consentMap"/>
    </div>
    </div>

</div>
</template>

<script>
import ConsentuaUIWrapper from '@/js/consentua-embed.js'
import Map from "@/components/Map.vue";
export default {
    name: 'LocationConsent',
    components: {
        Map
    },
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
        let tid = '100'; // Template ID
        var iframe = document.querySelector('#location-consent-iframe');
        var cookie_cwrap = new ConsentuaUIWrapper(iframe, this.$store.state.cid, this.$store.state.consentuaUID, tid, this.$store.state.sid, this.$store.state.skey, this.cb_msg, 'en', {
            ix: "https://ui.consentua.com/ui-onepurpose/ui-onepurpose.html"
        });
        // set cb
        cookie_cwrap.onset = this.cb_set;
        cookie_cwrap.onready = this.cb_ready;
    },
    computed: {
        consents: function () {
            return this.$store.state.consentuaConsents;
        },
        isconsent: function () {
            let template = this.consents.find(x => x.id === '326') || [];
            if (this.consents.length >= 1 && template) {
                return template.consent 
            } else{
                return false;
            }
        }
    },
}
</script>

<style>
#LocationConsent {
    max-width: 800px;
    margin: 1rem auto;
    padding: 1rem;
}

#LocationConsent #consentMap {
    height: 100%;
    width: 100%;
    position: relative;
}

#LocationConsent svg {
    height: 80px;
}

#location-consent-iframe {
    border: none;
    width: 100%;
    background: #fff;
    border-radius: 1rem 1rem 0px 0px;
    margin-bottom: -1rem;
}

.grid-container {
    display: grid;
    grid-template-columns: 0.4fr 2.9fr 0.4fr 0.3fr;
    grid-template-rows: 0.7fr 1.2fr 1.1fr;
    max-height: 550px;
    overflow: hidden;
}

.icon {
    grid-area: 1 / 3 / 2 / 5;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.consent {
    grid-area: 3 / 2 / 4 / 3;
    z-index: 999;
    max-height: 240px;
}

.map {
    grid-area: 1 / 1 / 4 / 5;
    border-radius: 1rem;
}
@media screen and (max-width:500px) {
    .consent{
            grid-area: 3/1/3/5;
    }
}
</style>
