<template>
<div class="cups">
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
.cups{
    padding: 1rem;
}
</style>

