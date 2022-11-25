
import usersList from "./usersList.js"

const { createApp } = Vue

createApp({
    data() {
        return {
            users: usersList,
            userActiveIdex: -1,
        }

    },
    methods: {

        //**/ FUNZIONE RECUPERO ORA DA STRINGA (data + ora) ********//
        /** 
         * @param {*} dateString  formato dateStringa esempio: ""yy/yy/yyyy xx:xx:yy"""
         * @returns "xx/xx"
         */
        extractTimeFromDate(dateString) {
            //console.log(dateString)

            let dateArray = dateString.split(" ")
            //prima trasforma la stringa in un array di 2 elementi [data,ora](il disclaimer è lo spazio(" "))
            //console.log(dateArray)
            dateArray = dateArray.pop().split("")
            //pop recupera come variabile il primo elemento dell'array"00:00:00"
            //split trasforma di nuovo in array la variabile ("lettere" disclaimenr(""))
            //console.log(dateArray)
            //ridefinisco la lunghezza dell'array ottenuto, escludendo gli ultimi caratteri indesiderati (:secondi)
            dateArray.length = 5
            //console.log(dateArray)
            const time = dateArray.join("")
            //join concatena gli elementi di un array in un unico valore di tipo stringa che racchiudo nella variabile time
            //console.log(time)
            return time
            //finalmente qualcosa che mi piace 
        },

        //** FUNZIONE RECUPERO INDEX (al click) **************//

        checkActiveIndex(currentIndex) {
            //console.log(currentIndex);
            this.userActiveIdex = currentIndex;
            console.log(this.userActiveIdex)
        },

    },

    mounted() {


    },
}).mount("#app")


