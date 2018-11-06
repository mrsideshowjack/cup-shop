2<template>
    <div id="Cart">
    <el-badge :value="cartTotal" v-if="cartTotal >=1" class="item">
      <el-button @click="dialogVisible = true">
        <svg aria-hidden="true" data-prefix="fal" width="25" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M551.991 64H129.28l-8.329-44.423C118.822 8.226 108.911 0 97.362 0H12C5.373 0 0 5.373 0 12v8c0 6.627 5.373 12 12 12h78.72l69.927 372.946C150.305 416.314 144 431.42 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-17.993-7.435-34.24-19.388-45.868C506.022 391.891 496.76 384 485.328 384H189.28l-12-64h331.381c11.368 0 21.177-7.976 23.496-19.105l43.331-208C578.592 77.991 567.215 64 551.991 64zM240 448c0 17.645-14.355 32-32 32s-32-14.355-32-32 14.355-32 32-32 32 14.355 32 32zm224 32c-17.645 0-32-14.355-32-32s14.355-32 32-32 32 14.355 32 32-14.355 32-32 32zm38.156-192H171.28l-36-192h406.876l-40 192z"></path></svg>
      </el-button>
    </el-badge>

    <el-button v-else @click="openCart()">
        <svg aria-hidden="true" data-prefix="fal" width="25" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M551.991 64H129.28l-8.329-44.423C118.822 8.226 108.911 0 97.362 0H12C5.373 0 0 5.373 0 12v8c0 6.627 5.373 12 12 12h78.72l69.927 372.946C150.305 416.314 144 431.42 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-17.993-7.435-34.24-19.388-45.868C506.022 391.891 496.76 384 485.328 384H189.28l-12-64h331.381c11.368 0 21.177-7.976 23.496-19.105l43.331-208C578.592 77.991 567.215 64 551.991 64zM240 448c0 17.645-14.355 32-32 32s-32-14.355-32-32 14.355-32 32-32 32 14.355 32 32zm224 32c-17.645 0-32-14.355-32-32s14.355-32 32-32 32 14.355 32 32-14.355 32-32 32zm38.156-192H171.28l-36-192h406.876l-40 192z"></path></svg>
    </el-button>

    <el-dialog
    title="Cart"
    :visible.sync="dialogVisible"
    fullscreen>
    <div id="cart-actions">
        <span>Total: <el-tag>${{ totalPrice }}</el-tag></span>
        <el-button @click="clearCart" type="danger">Clear Cart</el-button>
    </div>
    <div v-for="item in cartDetail.data.data">
        <div class="cart-item">
        <img :src="item.imgurl" class="item-image">
        <span class="item-name">{{ item.name }}</span>
        <span class="item-description">{{ item.description }}</span>
        <span class="item-price">${{ item.price }}</span>
        </div>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
    </span>
    </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Cart',
  methods:{
      fistSentence: function(para){
          let sen = para.match(/^(.*?)[.?!]\s/);
          if (sen) {
              return sen[0].toString()
          } else{
              return para
          }
      },
    increment (itemId) {
      this.$store.commit({
        type: 'increment',
        id:itemId,
        amount: 1
        })
    },
    decrement (itemId) {
    this.$store.commit({
        type: 'decrement',
        id:'3',
        amount: 1
        })
    },
    openCart(){
          this.dialogVisible = true
          let url = process.env.VUE_APP_API_URL + '/selected'
          axios
          .post(url, this.cart)
          .then(response => ( this.cartDetail = response ))
          },
    clearCart(){
        console.log('clearing cart');
        
        let resetValue = {data:[],amount:0};
        this.$store.replaceState(resetValue);
        this.cartDetail = resetValue;
    }
  },
  data() {
      return {
        dialogVisible: false,
        cartDetail: {data:[],amount:0}
      };
    },
  computed: {
    cart () {
	    return this.$store.state.cart
    },
    cartTotal () {
        return this.$store.getters.cartTotal
    },
    totalPrice (){   
    return +(Math.round(this.cartDetail.data.amount + "e+2")  + "e-2");
    }
  },
    mounted () {
    let url = process.env.VUE_APP_API_URL + '/selected'
    axios
      .post(url, this.cart)
      .then(response => ( this.cartDetail = response ))
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#Cart{

}

#Cart #cart-icon{
    /* display: inline; */
}
#cart-actions{
    width: 80%;    
    margin: 0px auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.cart-item{
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 2px solid grey;
}

.cart-item img.item-image{
    max-height: 200px;
    padding: 1rem 0.2rem;
}

.cart-item span{
    padding: 1rem;
    text-align: left;
}

.cart-item span.item-name,
.cart-item span.item-price{
    font-weight: 600;
    flex: 1;
}

.cart-item span.item-name{
    min-width: 150px;
    text-align: center;
}

</style>
