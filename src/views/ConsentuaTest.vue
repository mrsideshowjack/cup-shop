<template>
    <div id="ConsentuaTest">
        <h1>Consentua API</h1>
        <p>Test the Consentua API using simple HTTP requests</p>
        <h2 id="details">Details</h2>
        <p>language: {{language}}</p>
        <p>ClientId: {{ClientId}}</p>
        <p>ServiceId: {{ServiceId}}</p>
        <p>token: {{token}}</p>
        <p>user Id: {{consentuaUID}}</p>

        <h2 id="service">Service</h2>
        <el-button type="primary" @click="getService">Get Service</el-button>
        <h4>Request</h4>
        <code>GET https://api.consentua.com/serviceuser/AnonGetServiceUser</code>
        <code>params: {serviceId: {{ServiceId}}, identifier: {{consentuaUID}}   }
        </code>
        <h4>Response</h4>
        <code>{{serviceUser}}</code>

        <h2 id="templates">Templates</h2>
        <el-button type="primary" @click="getTemplates">Get Templates</el-button>
        <h4>Request</h4>
        <code>GET https://api.consentua.com/template/AnonGet</code>
        <code>params: {ClientId: {{ClientId}}, ServiceId: {{ServiceId}}, language: {{language}} }
        </code>
        <h4>Response</h4>
        <code>{{templates}}</code>

        <h2 id="consents">Consents</h2>
        <el-button type="primary" @click="getConsents">Get Consents</el-button>
        <h4>Request</h4>
        <code>POST https://api.consentua.com/userconsent/AnonGetConsents</code>
        <code>body: {ClientId: {{ClientId}}, ServiceId: {{ServiceId}}, UserId: GET FROM SERVICE REQ }
        </code>
        <h4>Response</h4>
        <code>{{consents}}</code>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        name: 'ConsentuaTest',
        data() {
            return {
                dialogVisible: false,
                language: 'en',
                token: 'fa83fb53-1c0b-4ee0-b4bb-a5efe6fd4360',
                ClientId: 266,
                ServiceId: 105,
                serviceUser: null,
                templates: null,
                consents: null
            };
        },
        methods: {
            getService() {
                let title = document.getElementById('service')
                title.classList.add('loading')
                axios.get('https://api.consentua.com/serviceuser/AnonGetServiceUser', {
                        params: {
                            serviceId: this.ServiceId,
                            identifier: this.consentuaUID
                        }
                    })
                    .then(response => (
                        this.serviceUser = response.data,
                        title.classList.remove('loading')
                    ))
            },
            getTemplates() {
                let title = document.getElementById('templates')
                title.classList.add('loading')
                axios.get('https://api.consentua.com/template/AnonGet', {
                        params: {
                            ClientId: this.ClientId,
                            ServiceId: this.ServiceId,
                            language: this.language
                        }
                    })
                    .then(response => (
                        this.templates = response.data,
                        title.classList.remove('loading')
                    ))
            },
            getConsents() {
                let title = document.getElementById('consents')
                title.classList.add('loading')
                axios.post('https://api.consentua.com/userconsent/AnonGetConsents', {
                        ClientId: this.ClientId,
                        ServiceId: this.ServiceId,
                        UserId: this.serviceUser.UserId
                    })
                    .then(response => {
                        this.consents = response.data
                        title.classList.remove('loading')
                    })
            }
        },
        computed: {
            consentuaUID() {
                return this.$store.state.consentuaUID
            },
        },
    }
</script>
<style>
    @keyframes loadBar {
        0% {
            left: -110%;
        }

        100% {
            left: 110%;
        }
    }

    #ConsentuaTest {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #ConsentuaTest>h2 {
        width: 80vw;
        display: block;
        position: relative;
        padding: 0.5rem;
        text-align: center;
        overflow: hidden;
        border-bottom: 2px solid #212121;
    }

    .loading:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 70%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        -webkit-animation: loadBar 2s cubic-bezier(0.09, 0.89, 0.7, 0.71) infinite;
        -moz-animation: loadBar 2s cubic-bezier(0.09, 0.89, 0.7, 0.71) infinite;
        animation: loadBar 2s cubic-bezier(0.09, 0.89, 0.7, 0.71) infinite;
    }
</style>