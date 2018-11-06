<template>
    <div id="Potato" class="grid-container">
      <div class="grid-area-img">
        <img :src="potato.imgurl"/>
      </div>
      <div class="grid-area-main">
        <p>{{ potato.description }}</p>
        <el-tag>Origin: {{ potato.origin }}</el-tag>
      </div>
      <div class="grid-area-title">
        <h1>{{ potato.name }}</h1>
        <span id="cta-btn-contain">
          <el-input-number v-model="quantity" :min="1" :max="10"></el-input-number>
          <el-button type="success" icon="el-icon-circle-plus-outline" v-on:click="cartAdd(potatoId)">Add to cart</el-button>
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
  name: 'Potato',
  props: ['potatoId'],
  data () {
    return {
      potato: null,
      quantity: 1
    }
  },
  computed: {
    potatoId() {
      return this.$route.params.potatoId
    },
  },
  mounted () {
    let url = process.env.VUE_APP_API_URL + '/single/' + this.potatoId
    axios
      .get(url)
      .then(response => (this.potato = response.data[0]))
  },
    methods:{
    cartAdd (itemId) {
      this.$store.commit({
        type: 'cartAdd',
        id: itemId,
        amount: this.quantity
        })
    },
    cartRemove (itemId) {
    this.$store.commit({
        type: 'cartRemove',
        id: itemId,
        amount: quantity
        })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #Potato.grid-container {
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
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.52);
 }

.grid-area-img img{
    width: 39vw;
    height: 27vw;
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
