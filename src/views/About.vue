<template>
<div class="about">
    <div>
        <h1>About The `Cup Shop`</h1>
        <p>This ecommerce site is a demonstration test bed for the consent API <a href="https://consnetua.com">Consentua</a>. Purchase some cups. Go to checkout and become an identified and consented to user. Please do not fill in an order form and actually expect any paper cups to be sent to you.</p>
        <br>
        <a href="https://consentua.com/contact">Contact Us</a>
        <!-- <Map id="about-map" /> -->
        <LocationConsent />
    </div>
    <img src="@/assets/marble_cup.jpg"/>
  </div>
</template>

<style scoped>
.about {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
}

.about p {
    max-width: 700px;
}

.about img {
    min-width: 300px;
    max-width: 50%;
    max-height: 40vh;
    margin: 2rem;
    box-shadow: 2px 5px 10px 0px rgba(0, 0, 0, 0.2);
}

.about #about-map {
    margin-top: 1rem;
    height: 100%;
    max-height: 500px;
    position: relative;
}
</style>

<script>
import Map from "@/components/Map.vue";
import LocationConsent from "@/components/LocationConsent.vue";
export default {
    name: 'About',
    components: {
        Map,
        LocationConsent
    }
}
</script>
