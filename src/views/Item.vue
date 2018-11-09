<template>
    <div id="Item" class="grid-container">
      <div class="grid-area-img">
        <img :src="item.imgurl"/>
      </div>
      <div class="grid-area-main">
        <p>{{ item.description }}</p>
        <el-tag>Origin: {{ item.origin }}</el-tag>
      </div>
      <div class="grid-area-title">
        <h1>{{ item.name }} <el-rate
          v-model="randRating"
          disabled
          show-score
          text-color="#ff9900">
        </el-rate></h1>
          
        <span id="cta-btn-contain">
          <el-input-number v-model="quantity" :min="1" :max="10"></el-input-number>
          <el-button type="success" icon="el-icon-circle-plus-outline" v-on:click="cartAdd(itemId)">Add to cart</el-button>
        </span>
      </div>
      <div class="grid-area-back">
        <router-link to="/">
            <el-button icon="el-icon-back" circle></el-button>
        </router-link>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'item',
  props: ['itemId'],
  data () {
    return {
      item: null,
      quantity: 1
    }
  },
  computed: {
    itemId() {
      return this.$route.params.itemId
    },
    randRating(){
      return (Math.random() * (5.00 - 1.00 + 1.00) + 1.00).toFixed(1)
    }
  },
  mounted () {
    let url = process.env.VUE_APP_API_URL + '/single/' + this.itemId
    axios
      .get(url)
      .then(response => (this.item = response.data[0]))
  },
    methods:{
    cartAdd (itemId) {
      this.$store.commit({
        type: 'cartAdd',
        id: itemId,
        amount: this.quantity
        })
      this.$notify({
          title: 'Added to cart',
          message: 'An item has been added to your cart. Click here to checkout',
          type: 'success',
          onClick: this.navigateCheckout
      });
    },
    cartRemove (itemId) {
    this.$store.commit({
        type: 'cartRemove',
        id: itemId,
        amount: quantity
        })
    },
    navigateCheckout(){
        this.$router.push('/Checkout')
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #Item.grid-container {
  display: grid;
  height: 100%;
  grid-template-columns: 0.1fr 1.6fr 1.3fr;
  grid-template-rows: 0.8fr 1.2fr;
  grid-gap: 1px 1px;
  grid-template-areas: "grid-area-back grid-area-title grid-area-img" ". grid-area-main grid-area-main";
  padding: 3rem;
}

.grid-area-img { 
  grid-area: grid-area-img;
  padding: 0.3rem;
 }

.grid-area-img img{
    width: 39vw;
    height: 27vw;
    box-shadow: 2px 5px 10px 0px rgba(0, 0, 0, 0.2);
}

.grid-area-main { 
  grid-area: grid-area-main;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  max-width: 50vw;
 }

.grid-area-title { 
  grid-area: grid-area-title;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
 }

.grid-area-title #cta-btn-contain{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.grid-area-back { grid-area: grid-area-back; }
</style>
