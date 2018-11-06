<template>
    <div id="ProductList">
        <div v-for="potato in potatoes">
            <el-card :body-style="{ padding: '0px' }" class="product-card">
            <img :src="potato.imgurl" class="image">
            <div style="padding: 14px;">
                <h3>{{ potato.name }} <el-tag>${{ potato.price }}</el-tag></h3>
                
                <p>{{ fistSentence(potato.description) }}</p>
                <div class="btn-contain bottom clearfix">
                    <router-link :to="{ name: 'potato', params: { potatoId: potato.id }}">
                    <el-button class="button">View</el-button>
                    </router-link>
                    <el-button type="success" icon="el-icon-circle-plus-outline" v-on:click="cartAdd(potato.id)">Add to cart</el-button>
                </div>
            </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ProductList',
  data () {
    return {
      potatoes: null,
    }
  },
  mounted () {
    console.log()
    axios
      .get(process.env.VUE_APP_API_URL + '/all')
      .then(response => (this.potatoes = response.data))
  },
  methods:{
      fistSentence: function(para){
          let sen = para.match(/^(.*?)[.?!]\s/);
          if (sen) {
              return sen[0].toString()
          } else{
              return para
          }
      },
    cartAdd (itemId) {
      this.$store.commit({
        type: 'cartAdd',
        id:itemId,
        amount: 1
        })
    },
    cartRemove (itemId) {
    this.$store.commit({
        type: 'cartRemove',
        id:itemId,
        amount: 1
        })
    }
  },
  computed: {
    cart () {
	    return this.$store.state.cart
    },
    cartTotal () {
        return this.$store.getters.cartTotal
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#ProductList{
  display: grid;
grid: auto / repeat(3, 1fr);
    grid-gap: 40px 20px;
}

#ProductList .product-card{
    justify-self: center;
      align-self: center;
      text-align: center;
}

#ProductList .image{
    width: 100%;
}

#ProductList .btn-contain{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
}
</style>
