
 import usersList from "./usersList.js"

const { createApp } = Vue

createApp({
    data() {
        return {
            users: usersList,
        }

    },
    methods: {

    },

    mounted() {

    },
}).mount("#app")
