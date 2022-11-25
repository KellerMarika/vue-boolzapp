
import usersList from "./usersList.js"

const { createApp } = Vue

createApp({
    data() {
        return {
            users: usersList,
        }

    },
    methods: {
        /* FUNZIONE RECUPERO ORA DA STRINGA data + ora
           trasforma stringa in array (spazio)
           rimuovi il primo dato(splice(0,1))?
           recupera quel dato come variabile
           rimuovi ultimi 2 caratteri dall'unico elemento
       */

        extractTimeFromDate(string) {
            console.log(string)

            let dateArray = string.split(" ")
            //console.log(dateArray)
            dateArray = dateArray.pop().split("")
            //console.log(dateArray)
            dateArray.length = 5
            //console.log(dateArray)
            const date = dateArray.join("")
            //console.log(date)
            return date


        }
    },

    mounted() {

    },
}).mount("#app")


