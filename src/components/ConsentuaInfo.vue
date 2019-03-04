<template>
<div id="ConsentuaInfo">
    <section v-show="pages.page1">
        <h2>What is this?</h2>
        <p>This ecommerce site is a demonstration test bed for the consent API <a href="https://consentua.com">Consentua</a>.</p>
        <p>Purchase some cups. Go to checkout and become an identified and consented to user.</p>
        <p>Tap the 'Consentua Info' toggle to see Consentua working in the background. <a href="https://consentua.com/contact">Contact Us</a></p>
    </section>
    <section v-show="pages.page2">
        <h2>Cookie Pop-up</h2>
        <span>Consentua is good for cookies</span>
        <el-button size="small" @click="openCookie" plain>Open cookie popup</el-button>
    </section>
    <section v-show="pages.page3">
        <h2>Add cups to Cart</h2>
        <span>Add some cups then hit 'next'</span>
    </section>
    <section v-show="pages.page4">
        <h2>Checkout 1: show cart</h2>
        <span>Fits inside the user journey</span>
    </section>
    <section v-show="pages.page5">
        <h2>Checkout 2:  Location</h2>
        <span>Split your purposes up - ask at leisure - 'just in time'</span>
    </section>
    <section v-show="pages.page6">
        <h2>Checkout 3: Newsletter Sign Up</h2>
        <span>Showcase different interactions (&CSS)</span>
    </section>
    <section v-show="pages.page7">
        <h2>Behind the Scenes</h2>
        <p>Look proof that consent is recorded.  Hook this up to your backend systems</p>
        <span><i>Templates: </i>'63','100','98'</span>
        <!-- <span><i>Consent Receipt Id: </i></span> -->
        <div id="btn-group">
            <el-button type="warning" size="small" plain @click="clearConsentuaUID">New Consentua UID</el-button>
            <router-link to="/consentua-test">
                <el-button size="small" plain>Consetua API test page</el-button>
            </router-link>
            <router-link to="/map">
                <el-button size="small" plain>Location Map test page</el-button>
            </router-link>
            <el-button size="small" @click="openCookie" plain>Open cookie popup</el-button>
            <a href="https://consentua.com/get-consent-page/">
            <el-button size="small" plain>Get consent page</el-button></a>
        </div>
    </section>
    <section v-show="pages.page8">
        <h2>Dashboard</h2>
        <span>Build consent prefs into user control panels</span>
    </section>
    <section v-show="pages.page9">
        <h2>Contact Consentua here</h2>
        <i class="el-icon-message"></i><br>
        <a href="https://consentua.com/contact">
                <el-button size="small" plain>Contact Consentua</el-button>
        </a>
    </section>
    <section id="consentContain" v-if="consentuaConsents.length > 0">
        <h3>Consents</h3>
        <span v-for="item in consentuaConsents" :key="item.id" class="consent-row">
            <span v-if="item.id == 236">Cookie</span>
            <span v-else-if="item.id == 322">Newsletter</span>
            <span v-else-if="item.id == 326">Location</span>
            <span v-else>{{item.id}}</span>

            <span v-if="item.consent">✅</span>
            <span v-else-if="!item.consent">❌</span>
        </span>
    </section>
    <section>
        <el-button @click="decreasePage" icon="el-icon-arrow-left" v-bind:disabled="selectedPage == 1">Prev</el-button>
        <el-button id="nextBtn" @click="increasePage" v-bind:disabled="selectedPage == 9" class="pulse">Next <i class="el-icon-arrow-right"></i></el-button>
    </section>
</div>
</template>

<script>
export default {
    data() {
        return {
            selectedPage: 1,
            pages: {
                page1: true,
                page2: false,
                page3: false,
                page4: false,
                page5: false,
                page6: false,
                page7: false,
                page8: false,
                page9: false
            }
        };
    },
    methods: {
        clearConsentuaUID() {
            this.$store.commit('clearConsentuaUID');
            window.location.reload();
        },
        openCookie() {
            this.$store.state.cookiePopOpen = true;
        },
        increasePage(){
            if(this.selectedPage < 9) this.selectedPage ++
            document.getElementById('nextBtn').classList.remove('pulse')
        },
        decreasePage(){
            if(this.selectedPage > 1) this.selectedPage --
            document.getElementById('nextBtn').classList.remove('pulse')
        }
    },
    computed: {
        consentuaUID() {
            return this.$store.state.consentuaUID
        },
        consentuaConsents() {
            return this.$store.state.consentuaConsents
        }
    },
    watch: {
        selectedPage: function (selectedPage) {
            switch (selectedPage) {
                case 2:
                    this.openCookie()
                    break;
                case 3:
                    this.$router.push('cups')
                    break;
                case 4:
                    this.$router.push('checkout')
                    break;
                case 8:
                    this.$router.push('consent-dashboard')
                    break;
                default:
                    break;
            }

            // set all pages false
            let keys = Object.keys(this.pages);
            for (let i = 0; i < keys.length; i++) {
                var key = keys[i];
                this.pages[key] = false;
            }
            // show selected page
            let page = 'page' + selectedPage;
            this.pages[page] = true
        }
    }
}
</script>

<style scoped>
#ConsentuaInfo {
    height: 85vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
}

#ConsentuaInfo h2 {
    text-align: center;
    align-self: center;
    margin: 0px 0px 1rem 0px;
}

#btn-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin-top: 1rem;
    width: 100%;
}

#btn-group>* {
    display: flex;
    max-height: 40px;
    margin: 0.2rem;
}

#consentContain{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;
    width: calc(100% - 2rem);
    background-color: rgba(163, 38, 85, 0.4);
    padding: 1rem;
    border-radius: 1rem;
}
#consentContain > h3 {
    margin-top: 0px;
}
#consentContain .consent-row{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
</style>
