<template>
  <div class="about">
    <div>
    <h1>About The `Cup Shop`</h1>
    <p>This ecommerce site is a demonstation test bed for the consent API <a href="https://consnetua.com">Consentua</a>. Please do not fill in an order form and actually expect any paper cups to be sent to you.</p>
    </div>
    <img src="@/assets/marble_cup.jpg"/>
  </div>
</template>
<style scoped>
.about{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.about p{
  max-width: 700px;
}
.about img{
  max-width: 50%;
  max-height: 40vh;
  margin: 2rem;
  box-shadow: 2px 5px 10px 0px rgba(0, 0, 0, 0.2);
}
</style>
