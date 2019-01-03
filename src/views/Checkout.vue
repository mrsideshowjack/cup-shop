<template>
  <div id="Checkout">
    <CartList />
    <el-form id="checkout-form" ref="form" :model="form" label-width="120px">
    <h1>Checkout</h1>
    <el-form-item label="Name">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Email Address">
        <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="Phone">
        <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="Address Line 1">
        <el-input v-model="form.address1"></el-input>
    </el-form-item>
    <el-form-item label="Address Line 2">
        <el-input v-model="form.address2"></el-input>
    </el-form-item>
    <el-form-item>
    <el-col :span="11">
        <el-form-item label="City">
            <el-input v-model="form.city"></el-input>
        </el-form-item>
    </el-col>
    <el-col :span="11">
        <el-form-item label="Postcode/zip">
            <el-input v-model="form.postcode"></el-input>
        </el-form-item>
    </el-col>
    </el-form-item>
    <el-form-item label="Country">
        <el-input v-model="form.country"></el-input>
    </el-form-item>
    <el-form-item label="Delivery Date">
        <el-col :span="11">
        <el-date-picker type="date" placeholder="Pick a date" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
        <el-time-picker type="fixed-time" placeholder="Pick a time" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
    </el-form-item>
    <el-form-item :span="11" id="checkout-consent-contain">
        <!-- Consentua -->
        <div id="checkout-consentua"></div>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onSubmit" id="checkout-btn"><svg aria-hidden="true" data-prefix="fal" width="25" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M551.991 64H129.28l-8.329-44.423C118.822 8.226 108.911 0 97.362 0H12C5.373 0 0 5.373 0 12v8c0 6.627 5.373 12 12 12h78.72l69.927 372.946C150.305 416.314 144 431.42 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-17.993-7.435-34.24-19.388-45.868C506.022 391.891 496.76 384 485.328 384H189.28l-12-64h331.381c11.368 0 21.177-7.976 23.496-19.105l43.331-208C578.592 77.991 567.215 64 551.991 64zM240 448c0 17.645-14.355 32-32 32s-32-14.355-32-32 14.355-32 32-32 32 14.355 32 32zm224 32c-17.645 0-32-14.355-32-32s14.355-32 32-32 32 14.355 32 32-14.355 32-32 32zm38.156-192H171.28l-36-192h406.876l-40 192z"></path></svg> Checkout</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
// @ is an alias to /src
import ConsentuaUIWrapper from '@/js/consentua-embed.js'
import CartList from '@/components/CartList.vue'

export default {
  name: 'Checkout',
  components: {
    CartList
  },
  data() {
      return {
        form: {
          name: '',
          email: '',
          phone: '',
          address1: '',
          address2: '',
          city: '',
          postcode: '',
          country: '',
          date1: '',
          date2: '',
        }
      }
    },
    methods: {
      onSubmit() {
        this.$alert('Thanks for your \'order\', please check out <a href="https://consentua.com">Consentua.com</a>', 'Thanks',{
          confirmButtonText: 'OK',
          dangerouslyUseHTMLString: true
        });
        console.log(this.form);
      },
        cb_ready(msg){
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
        var cid = '57'; // Customer ID
        var sid = '105'; // Consentua service ID
        var skey = 'fa83fb53-1c0b-4ee0-b4bb-a5efe6fd4360'; // Consentua service key
        var tids = ['100','98']; // Template ID

        for (let i = 0; i < tids.length; i++) {
            let iframe = document.createElement("iframe");
            iframe.id = "consentua-iframe-" + [i];
            iframe.class = "consentua-iframe";
            document.getElementById('checkout-consentua').appendChild(iframe);
            let cwrap = new ConsentuaUIWrapper(iframe, cid, this.$store.state.consentuaUID, tids[i], sid, skey, this.cb_msg, 'en', {ix:"https://kni-test-node.herokuapp.com/custom-interaction.html"});
            // set cb
            cwrap.onset = this.cb_set;
            cwrap.onready = this.cb_ready;
        }
    },
}
</script>
<style>
#Checkout{
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-wrap: wrap;
}
#Checkout #CartList{
    max-width: 1000px;
}
#Checkout #checkout-form{
    background-color: #f9f9f9;
    padding: 1rem;
    flex: 50%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
}
#Checkout #checkout-btn svg{
    height: 15px;
}
#Checkout #checkout-consentua{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
}
#Checkout #checkout-consentua iframe{
    border:none;
}

#Checkout #checkout-consent-contain .el-form-item__content{
    margin: 0px !important;
}
</style>
