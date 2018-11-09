<template>
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
    top="5vh"
    width="1000px">
        <CartList />
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Close</el-button>
            <el-button type="primary" @click="navigateCheckout">Checkout</el-button>
        </span>
    </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import CartList from '@/components/CartList.vue'
export default {
  name: 'Cart',
  components: {
    CartList
  },
  methods:{
    navigateCheckout (){
        this.dialogVisible = false
        this.$router.push('/Checkout')
    }
  },
  data() {
      return {
        dialogVisible: false,
      };
    },
  computed: {
    cartTotal () {
        return this.$store.getters.cartTotal
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* #Cart .el-dialog {
 max-width: 1000px;
} */

</style>
