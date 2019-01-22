<template>
  <div>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      center: { lat: 35.684051, lng: 139.774487 },
      markers: [],
      currentPlace: null
    };
  },

  computed: {
    locationConsent (){
      if (this.consentuaConsents) {
        let locPurp = this.consentuaConsents.find(this.findLocationPurpose)
        return locPurp.consent
      } else{
        return false
      }
    },
    consentuaConsents() {
            return this.$store.state.consentuaConsents
    }
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    addMarker(newMarker) {
      if (newMarker) {
        const marker = {
          lat: newMarker.lat,
          lng: newMarker.lng
        };
        this.markers.push({ position: marker });
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
    // check consents for location data
    if (this.locationConsent) {
      // user has consented to location data, get geopos
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.addMarker(this.center)
      });
    } else {
      this.$message.error('No Consent for Location');
    }

    },
    findLocationPurpose(consent) {
      // finds the consent purpose id that corrisponds to loction data
      return consent.id == 326;
    }
  }
};
</script>