<template>
<div id="Map">
    <l-map class="map" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker"></l-marker>
    </l-map>
</div>
</template>

<script>
import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';
export default {
    name: "Map",
    components: {
        LMap,
        LTileLayer,
        LMarker
    },
    data() {
        return {
            zoom:17,
            center: L.latLng(34.839387, 134.693905),
            url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            marker: L.latLng(34.839387, 134.693905),
        };
    },

    computed: {
        locationConsent() {
            if (this.consentuaConsents[0]) {
                let locPurp = this.consentuaConsents.find(this.findLocationPurpose)
                return locPurp.consent
            } else {
                return false
            }
        },
        consentuaConsents() {
            return this.$store.state.consentuaConsents
        }
    },

    mounted() {
        this.geolocate();
        setTimeout(function () {
            map.invalidateSize();
        }, 0);
    },
    watch: {
        locationConsent: function () {
            this.geolocate();
        }
    },
    methods: {
        geolocate: function () {
            // check consents for location data
            if (this.locationConsent) {
                // user has consented to location data, get geopos
                navigator.geolocation.getCurrentPosition(position => {
                    this.center = L.latLng(position.coords.latitude,position.coords.longitude);
                    this.marker = L.latLng(position.coords.latitude,position.coords.longitude);
                });
            } else {
                // this.$message.error('No Consent for Location');
                //reset map
                this.center = L.latLng(34.839387, 134.693905);
                this.marker = L.latLng(34.839387, 134.693905);
            }

        },
        findLocationPurpose(consent) {
            // finds the consent purpose id that corrisponds to loction data
            return consent.id == 326;
        }
    }
};
</script>
<style scoped>
#Map{
    /* min-height: 400px; */
    /* height: 100%;
    position: relative; */
}
.map{
    position: absolute;
    /* height: 400px; */
    /* height: 100%; */
}
</style>
