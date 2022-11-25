/* import * as usersList from "./usersList.js"; ___________________perchè?*/

import { usersList } from "./usersList.js"
const { createApp } = Vue

createApp({
    data() {
        return {

        }
    },
    methods: {

    },

    mounted() {
        console.log(usersList)
      /*   console.log(usersList.default) ___________________perchè? */
    },
}).mount("#app")
