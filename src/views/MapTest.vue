<template>
<div id="MapTest">
    <LocationConsent id="LocationConsent" />
</div>
</template>

<script>
import Map from "@/components/Map.vue";
import LocationConsent from "@/components/LocationConsent.vue";
export default {
    name: 'MapTest',
    components: {
        Map,
        LocationConsent
    },
    data() {
        return {
        }
    },

}
</script>

<style>
#MapTest #mapPageMap{
    height: 500px;
        width: 80%;
    max-width: 80vw;
    height: 500px;
}
</style>
