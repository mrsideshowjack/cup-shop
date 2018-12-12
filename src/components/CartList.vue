<template>
    <div id="CartList">
        <div id="cart-actions">
            <span>Total: <el-tag>${{ totalPrice }}</el-tag></span>
            <el-button @click="clearCart" type="danger">Clear Cart</el-button>
        </div>
        <div id="cart-list">
        <div v-for="(item, index) in cartDetail.data" :key="item.id">
            <div class="cart-item">
            <img :src="item.imgurl" class="item-image">
            <span class="item-name">{{ item.name }}</span>
            <el-input-number class="item-quantity" @change="inputChange" v-model="quantities[index]" :min="0"></el-input-number>
            <span class="item-price">${{ item.price }}</span>
            <el-button type="danger" icon="el-icon-delete" @click="removeItem(item.id)" circle></el-button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CartList',
  methods:{
    clearCart(){
        console.log('clearing cart');
        this.$store.commit('clearCartStorage');
        this.cartDetail = JSON.parse({data:[],amount:0});
    },
    removeItem(item){
        this.$store.commit({
            type: 'cartRemove',
            id: item,
            amount: 'all'
        })
    },
    inputChange(e, newVal){
        console.log(newVal);
        
    }
  },
  computed: {
    cart () {
        return this.$store.state.cart
    },
    cartTotal () {
        return this.$store.getters.cartTotal
    },
    dbSelected (){
        return this.$store.getters.dbGetSelected
    },
    totalPrice (){   
        return +(Math.round(this.cartDetail.amount + "e+2")  + "e-2");
    },
    quantities() {
        return this.cart.map(function(item) {
                return item.quantity;
        });
    },
    cartDetail (){
                console.log(this.dbSelected(this.cart));
                
        return this.dbSelected(this.cart)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#CartList{
    padding: 1rem;
}
#CartList #cart-list{
overflow: auto;
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
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #e4e4e4
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
.cart-item span.item-price,
.cart-item .item-quantity{
    font-weight: 600;
    min-width: 150px;
    flex: 1;
    text-align: center;
}

.cart-item span.item-description{
    flex: auto;
}

</style>
