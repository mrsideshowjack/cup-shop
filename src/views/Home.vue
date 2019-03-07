<template>
<div class="home">
    <section class="hero">
    <h1 id="title">Cup Shop 🥤</h1>
    <img id="heroImg" src="@/assets/cup-shop-logo-512x512.png"> 
    </section>
    <section class="explain">
    <article>
        <h2>What is this?</h2>
        <p>This ecommerce site is a demonstration test bed for the consent API <a href="https://consentua.com">Consentua</a>.</p>
        <p>Purchase some cups. Go to checkout and become an identified and consented to user.</p>
        <p>Tap the 'Consentua Info' toggle to see Consentua working in the background. <a href="https://consentua.com/contact">Contact Us</a></p>
    </article>
    <img src="@/assets/cups.png">
    <img src="@/assets/consentua-logo-colour.svg">
    <article>
        <h2>What is Consentua?</h2>
        <p><a href="https://consentua.com">Consentua™</a> helps build trust. Giving users choice and control over their personal data.</p>
        <p>Consentua is a consent management tool that gives end users that unambiguous, ongoing, freely given consent statement.</p>
        <p>Made up from a very flexible API & Widget that installs seamlessly into your own apps & enterprise systems. </p>
    </article>
    </section>
    <section><Newsletter /></section>
</div>
</template>

<script>
import Newsletter from '@/components/Newsletter.vue'
import {Tweenlite, Power4} from 'gsap'
export default {
    name: 'home',
    components: {
        Newsletter
    },
    mounted() {
        TweenLite.to('#title', 3, {css:{opacity:1,transform: 'rotate(0deg)'}, ease:Power4.easeOut})
        TweenLite.to('#heroImg', 3, {css:{opacity:1,transform: 'translateY(0px)'}, ease:Power4.easeOut})
        TweenLite.to('.explain', 3, {css:{opacity:1,transform: 'translateY(0px)'}, ease:Power4.easeOut}).delay(0.5)
    },
}
</script>

<style scoped>
.hero{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    background: linear-gradient(#ff6262, #e59191, white);
    min-height: 80vh;
}
.hero > h1{
    font-size: 6rem;
    text-shadow: -3px 5px 4px rgba(0, 0, 0, 0.2);
    color: #000;
    opacity: 0;
    transform: rotate(30deg);
}
.hero #heroImg{
    opacity: 0;
    transform: translateY(-200px);
    max-height: 400px;
}
.explain{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: ". ." ". .";
    align-items: center;
    min-height: 50vh;
    padding: 1rem;
    opacity: 0;
    transform: translateY(-200px);
}
.explain > img{
    max-width: 80%;
        width: 100%;
    margin: 0px auto;
}
.explain > article{
    padding: 3rem 2rem;
}
.explain > article:nth-child(2){
    background: #e2e2e2;
}
@media screen and (max-width: 1200px) {
    .explain{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .explain > img{
        max-width: 400px;
        margin: 1rem auto;
    }
}
</style>

