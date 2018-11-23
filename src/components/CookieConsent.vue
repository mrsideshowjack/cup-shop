<template>
    <div id="CookieConsent" @click="closeCookieModal()">
        <div id="cookie-consent-container">
            <h2>Cookie Consent</h2>
            <iframe scrolling="no" id="cookie-consent-iframe" src=""></iframe>
            <el-button @click="closeCookieModal()">No Thanks</el-button>
        </div>
    </div>
</template>

<script>
import ConsentuaUIWrapper from '@/js/consentua-embed.js'
export default {
    name: 'CookieConsent',
    data() {
      return {
        dialogVisible: false
      };
    },
    methods:{
        openCookieModal(e) {
          document.getElementById('CookieConsent').style.visibility = "visible";
          document.getElementById('CookieConsent').style.top = 0;
          document.getElementById('cookie-consent-container').style.animationName = "animatetop";
          document.getElementById('cookie-consent-container').style.top = 0;
        },
        closeCookieModal(e) {
          document.getElementById('CookieConsent').style.visibility = "hidden";
          document.getElementById('CookieConsent').style.top = "-200vh";
          document.getElementById('cookie-consent-container').style.animationName = "animateout";
          document.getElementById('cookie-consent-container').style.top = "-200vh";
        },
        isConsented(e) {
          //user consented, do stuff:      
          this.$cookie.set('consented_cookie', 'You_gave_your_consent_for_this_cookie', 1);
          //close popup   
          window.setTimeout(function() {
            //wait 950ms before modal close, for animations to finish
            document.getElementById('CookieConsent').style.visibility = "hidden";
            document.getElementById('CookieConsent').style.top = "-200vh";
            document.getElementById('cookie-consent-container').style.animationName = "animateout";
            document.getElementById('cookie-consent-container').style.top = "-200vh";
          }, 950);
        },
        cb_ready(msg){
            console.log(msg.message);
            
            console.log("UID is:" + msg.message.uid);
            console.log(this.$cookie.get('cup_shop_consents'));            
            let cooki = this.$cookie.get('cup_shop_consents') || {}
            if (!cooki["236"]) {
              this.openCookieModal();
            } else{
              this.isConsented();
            }
            //store uid for demo
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
            let c = msg.message.consents || {};
            this.$cookie.set('cup_shop_consents', JSON.stringify(c), 1);
            this.$cookie.set('cup_shop_cuid', msg.message.uid, 1);
            if (c["236"]) {
              this.isConsented();
            }
            //store consents for demo
            this.$store.commit({
                type: 'updateConsentuaConsents',
                value: msg.message.consents
            })
        },
        cb_msg(msg){
            console.warn("Consent received from Consentua", msg);
        }
    },
    beforeCreate() {
        // var websdkScript = document.createElement('script');
        // websdkScript.setAttribute('src', 'https://websdk.consentua.com/websdk/consentua-embed.js.php');
        // document.body.appendChild(websdkScript);
    },
    mounted() {
        // Consentua
        let cid = '57', // Customer ID
            sid = '105', // Consentua service ID
            skey = 'fa83fb53-1c0b-4ee0-b4bb-a5efe6fd4360', // Consentua service key
            tid = '63'; // Template ID
        var iframe = document.querySelector('#cookie-consent-iframe');
        var cookie_cwrap = new ConsentuaUIWrapper(iframe, cid, this.$store.state.consentuaUID, tid, sid, skey, this.cb_msg, 'en',{ix:"https://kni-test-node.herokuapp.com/custom-interaction.html"});
        // set cb
        cookie_cwrap.onset = this.cb_set;
        cookie_cwrap.onready = this.cb_ready;


         // close modal on modal bg click
        // window.onclick = function (e) {
        //   if (e.target == document.getElementById('CookieConsent')) {
        //     this.closeCookieModal();
        //   }
        // }
    }
}
</script>

<style>
/* iframe#cookie-consent-iframe{
    border: none;
    width: 100%;
} */


        @-webkit-keyframes animatetop {
        0% {
          top: -300px;
          opacity: 0;
          -webkit-transform: rotate(-10deg);
                  transform: rotate(-10deg);
        }
        80% {
          top: 20px;
        }
        100% {
          top: 0;
          opacity: 1;
          -webkit-transform: rotate(0deg);
                  transform: rotate(0deg);
        }
      }
    
      @keyframes animatetop {
        0% {
          top: -200vh;
          opacity: 0;
          -webkit-transform: rotate(-10deg);
                  transform: rotate(-10deg);
        }
        80% {
          top: 20px;
        }
        100% {
          top: 0;
          opacity: 1;
          -webkit-transform: rotate(0deg);
                  transform: rotate(0deg);
        }
      }
    
      @keyframes animateout {
        0% {
          top: 0;
          opacity: 1;
          -webkit-transform: rotate(0deg);
                  transform: rotate(0deg);
        }
        100% {
          top: 200vh;
        }
      }
    
      @-webkit-keyframes animatefade {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    
      @keyframes animatefade {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
         #CookieConsent {
        /* display: none; */
        visibility: hidden;
        position: fixed;
        z-index: 1;
        left: 0;
        top: -200vh;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(55, 55, 55, 0.61);
        -webkit-animation-name: animatefade;
                animation-name: animatefade;
        -webkit-animation-duration: 0.4s;
                animation-duration: 0.4s;
      }
    
      #CookieConsent #cookie-consent-container {
        max-height: 90vh;
        position: fixed;
        left: 0;
        right: 0;
        top: -200vh;
        padding: 1rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
        background-color: #fff;
        border-radius: 1.3rem;
        /* -webkit-box-shadow: inset 0 0 9px black;
                box-shadow: inset 0 0 9px black; */
        text-align: center;
        /* -webkit-animation-name: animatetop; */
                /* animation-name: animatetop; */
        -webkit-animation-duration: 0.6s;
                animation-duration: 0.6s;
      }
      #cookie-consent-iframe{
          border: none;
      }
      #cookie-consent-container .btn{
        margin: 0.7rem;
      }
      @media only screen and (min-width: 550px), screen and (min-height: 660px) {
        #cookie-consent-container{
        min-width: 320px;
        max-width: 60vw;
        max-height: 80vh;
        margin: 1rem auto;
      }
      }
</style>
