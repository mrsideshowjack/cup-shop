<template>
<div id="MapTest">
    <LocationConsent id="LocationConsent" />
    <Map id="mapPageMap"/>
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
#MapTest {
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;
  grid-template-rows: 1fr;
  grid-template-areas: ". .";
}
#MapTest #LocationConsent{
    /* max-width: 20vw; */
}
#MapTest #mapPageMap{
    height: 500px;
        width: 80%;
    max-width: 80vw;
    height: 500px;
}
</style>
