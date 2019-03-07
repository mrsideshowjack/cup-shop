<template>
<div id="Cups">
    <ProductList />
</div>
</template>

<script>
// @ is an alias to /src
import ProductList from '@/components/ProductList.vue'

export default {
    name: 'cups',
    components: {
        ProductList
    }
}
</script>

<style scoped>
#Cups{
    padding: 1rem;
    background: linear-gradient(to right,white 40%,#f56c6c);
}
</style>

