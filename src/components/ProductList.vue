<template>
    <div id="ProductList">
        <div v-for="item in db" :key="item.id">
            <el-card :body-style="{ padding: '0px' }" class="product-card">
                <img :src="item.imgurl" class="image">
                <div style="padding: 14px;">
                    <h3>{{ item.name }} <el-tag>${{ item.price }}</el-tag></h3>
                    <p>{{ fistSentence(item.description) }}</p>
                    <div class="btn-contain bottom clearfix">
                        <router-link :to="{ name: 'item', params: { itemId: item.id }}">
                            <el-button class="button">View</el-button>
                        </router-link>
                        <el-button type="success" icon="el-icon-circle-plus-outline" v-on:click="cartAdd(item.id)">Add
                            to cart</el-button>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ProductList',
        methods: {
            fistSentence: function (para) {
                let sen = para.match(/^(.*?)[.?!]\s/);
                if (sen) {
                    return sen[0].toString()
                } else {
                    return para
                }
            },
            cartAdd(itemId) {
                this.$store.commit({
                    type: 'cartAdd',
                    id: itemId,
                    amount: 1
                })
                this.$notify({
                    title: 'Added to cart',
                    message: 'An item has been added to your cart. Click here to checkout',
                    type: 'success',
                    onClick: this.navigateCheckout
                });
            },
            cartRemove(itemId) {
                this.$store.commit({
                    type: 'cartRemove',
                    id: itemId,
                    amount: 1
                })
            },
            navigateCheckout() {
                this.$router.push('/Checkout')
            }
        },
        computed: {
            cart() {
                return this.$store.state.cart
            },
            db() {
                return this.$store.state.db
            },
            cartTotal() {
                return this.$store.getters.cartTotal
            },
            consentuaUID() {
                return this.$store.state.consentuaUID
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #ProductList {
        display: grid;
        grid: auto / repeat(3, 1fr);
        grid-gap: 40px 20px;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    }

    #ProductList .product-card {
        justify-self: center;
        align-self: center;
        text-align: center;
        user-drag: none; 
        user-select: none;
        -moz-user-select: none;
        -webkit-user-drag: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }

    #ProductList .image {
        width: 100%;
        user-drag: none; 
        user-select: none;
        -moz-user-select: none;
        -webkit-user-drag: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }

    #ProductList .btn-contain {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
    }

    @media only screen and (max-width: 440px) {
        #ProductList {
            grid-template-columns: repeat(auto-fit, minmax(186px, 1fr));
        }
    }
</style>