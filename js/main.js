
import friendsList from "./friendsList.js"

const { createApp } = Vue

createApp({
    data() {
        return {
            friends: friendsList,
            activeFriendIndex: -1,

            newPersonalMessage: "",
            newFriendMessageObj: {
                date: "",
                message: "",
                status: "",

            }
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

            let dateArray = dateString.split(" ");
            //prima trasforma la stringa in un array di 2 elementi [data,ora](il disclaimer è lo spazio(" "))
            //console.log(dateArray)
            dateArray = dateArray.pop().split("");
            //pop recupera come variabile il primo elemento dell'array"00:00:00"
            //split trasforma di nuovo in array la variabile ("lettere" disclaimenr(""))
            //console.log(dateArray)
            //ridefinisco la lunghezza dell'array ottenuto, escludendo gli ultimi caratteri indesiderati (:secondi)
            dateArray.length = 5
            //console.log(dateArray)
            const time = dateArray.join("");
            //join concatena gli elementi di un array in un unico valore di tipo stringa che racchiudo nella variabile time
            //console.log(time)
            return time
            //finalmente qualcosa che mi piace 
        },

        //** FUNZIONE RECUPERO INDEX (al click) **************//

        checkActiveIndex(currentIndex) {
            //console.log(currentIndex);
            this.activeFriendIndex = currentIndex;
            console.log(this.activeFriendIndex);
            console.log("original messages", this.friends[this.activeFriendIndex].messages);
        },

        /**FUNZIONE GENERICA RECUPERO DATA E ORA REALE FORMATO:   yy/yy/yyyy xx:xx
         *
         * @returns 
         */
        getNewMessageDate() {

            //recuper la data in formato completo
            let a = new Date().toISOString();
            //console.log(a)
            //sostituisco tutte le "T" con " "(spazio) poi trasformo la stringa in un array di lettere
            a = a.replace(/T/g, ' ').split("");

            // console.log(a)
            //riduco la lunghezza dell'array a "y/m/d  h:m:s"
            a.length = 19
            //ricongiungo i caratteri in un'unica stringa per poi disgiungerli all'altezza dello spazio (" ") creando un array  di "date" + "time"
            a = a.join("").split(" ");
            //console.log(a);
            //ora modifico solo l'elemento 0 (date) dell'array, separo i caratteri all'altezza dei trattini che vengono eliminati, inverto l'ordine di apparizione dei 3 elementi e li ricongiungo attraverso la "/".
            a[0] = a[0].split("-").reverse().join("/");

            //creo una variabile che continene una stringa che è  frutto della concatenazione dei valori dell'array a
            const newDate = a[0] + " " + a[1]
            //console.log(a);
            return newDate
        },

         //** FUNZIONE SEND MESSAGE **************//

        sendNewPersonalMessage() {

            this.newFriendMessageObj.message = this.newPersonalMessage;
            this.newFriendMessageObj.date = this.getNewMessageDate();
            this.newFriendMessageObj.status = 'trcivrd';
            //console.log(this.newFriendMessageObj);
            //console.log(this.friends[this.activeFriendIndex].messages);
            this.friends[this.activeFriendIndex].messages.push({
                ...this.newFriendMessageObj,
                status: "recived",
            });

            console.log(this.friends[this.activeFriendIndex].messages);
            //set interval di un secondo (funzione sent)
        },
       /* console.log(this.friends[this.activeFriendIndex].messages); */
    },




    mounted() {
    console.log(this.activeFriendIndex);
    console.log(this.newPersonalMessage);
    console.log(this.getNewMessageDate());



},
}).mount("#app")


