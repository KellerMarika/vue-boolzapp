import friendsList, { messages, emoticons } from "./Arrays.js"


const { createApp } = Vue

createApp({
    data() {
        return {
            friends: friendsList,
            //amico selezionato
            activeFriendIndex: -1,
            //messaggio selezionato
            activeMessageDropdown: -1,

            search: "",
            newPersonalMessage: "",
            //info messaggio
            showMessageInfo: -1,
            //emoicon
            emoticonsActive: false,

            newFriendMessageObj: {
                date: "",
                message: "",
                status: "",
            },
            //array messaggi default 
            possibleReplies: messages,
            //array emoticons
            emoticons,
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
            console.log(this.friends[this.activeFriendIndex].messages.length)
            //console.log(this.activeFriendIndex);
            //console.log("original messages", this.friends[this.activeFriendIndex].messages);
        },

        /**FUNZIONE GENERICA RECUPERO DATA E ORA REALE FORMATO:   yy/yy/yyyy xx:xx
         *
         * @returns 
         */
        getNewMessageDate() {

            //recuper la data in formato completo
            let a = new Date().toISOString();
            console.log(a)
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

        //** FUNZIONE GENERICA CREATE MESSAGE **************//
        createMessage(message, status) {
            this.newFriendMessageObj.message = message
            this.newFriendMessageObj.date = this.getNewMessageDate(),
                this.newFriendMessageObj.status = status;
            //F console.log(this.newFriendMessageObj)
        },

        //** FUNZIONE SEND PERSONAL MESSAGE AND GAIN AUTOMATIC REPLAY **************//
        sendNewPersonalMessageAndReplay() {
            if (this.newPersonalMessage === "") {
                alert("inserisci qualcosa")
                return
            } else {
                this.createMessage(this.newPersonalMessage, "recived");
                //console.log(this.newFriendMessageObj);
                //console.log(this.friends[this.activeFriendIndex].messages);
                this.friends[this.activeFriendIndex].messages.push({
                    ...this.newFriendMessageObj,
                });
                //reset
                this.newPersonalMessage = ""
                //console.log(this.friends[this.activeFriendIndex].messages);


                //vorrei creare un animazione coi pallini come se stesse l'altro utente stesse digitando____________________________________
                setTimeout(() => {
                    let friendReplay = this.randomNumberOfRange(0, this.possibleReplies.length - 1);

                    let friendEmoticon = this.randomNumberOfRange(0, this.emoticons.length - 1)
                    //console.log("replay", friendReplay);

                    this.createMessage(this.possibleReplies[friendReplay] + this.emoticons[friendEmoticon].img, "sent");
                    this.friends[this.activeFriendIndex].messages.push({
                        ...this.newFriendMessageObj,
                    });

                }, 2000);

                //console.log("daje", this.friends[this.activeFriendIndex].messages);
            }
        },

        /************* FUNZIONE GENERA NUMERI RANDOM *****************/
        /**
         * esegue un'estrazione casuale di un numero intero compreso fra i valori passati per argomenti(compresi anchessi)
         * 
         * @param {number} minNumber è il valore minimo del range entro il quale si desidera estrarre il numero dalla funzione
         * @param {number} maxNumber è il valore massimo del range entro il quale si desidera estrarre il numero dalla funzione
         * @returns il valore di returns è compreso fra i valori minNumber e maxNumber  minNumber <=returns <=maxNumber
         */
        randomNumberOfRange(minNumber, maxNumber) {
            return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
        },

        /************* FUNZIONE GENERICA FILTER OBJECTS LIST BY STRING ****************/
        /**filtra l'array del
         * 
         * @param {array} array array di partenza da filtrare (in vue es: this.array)
         * @param {string} arrayElementProprietyToFilter proprietà comune agli elementi dell'array che si desidera filtrare.
         * è necessario specificare tutto il percorso per raggiungere la proprietà con la dot notation
         * deve essere una "stringa" non funziona senza apici 
         * @param {string} filter "stringa" attraverso cui si desidera filtrare la proprietà degli elementi
         * @returns 
         */
        filterObjList(array, arrayElementProprietyToFilter, filter) {
            return array.filter(element => {

                //console.log("search", filter);
                return element[arrayElementProprietyToFilter].toLowerCase().includes(filter.toLowerCase());
            });
        },

        filtredFriends() {
            return this.filterObjList(this.friends, "name", this.search);
        },
        /************* FUNZIONE SPECIFICA SET ACTIVE MESSAGE DROPDOWN ****************/
        setActiveMessageDropdown(messageIndex) {
            this.activeMessageDropdown = messageIndex
            console.log("to delete:", this.activeMessageDropdown, this.friends[this.activeFriendIndex].messages);
            console.log("lenght before delete", this.friends[this.activeFriendIndex].messages.length);
        },

        /************* FUNZIONE SPECIFICA MOSTRA DETTAGLI MESSAGGIO ****************/
        showInfoActiveMessage(messageIndex) {
            this.showMessageInfo = messageIndex
            console.log(messageIndex)

        },
        /************* FUNZIONE SPECIFICA CANCELLA MESSAGGIO ****************/
        deleteActiveMessage(messageIndex) {

            this.friends[this.activeFriendIndex].messages.splice(messageIndex, 1);

            if (this.friends[this.activeFriendIndex].messages.length===1){

            }
            console.log("deleted", messageIndex, this.friends[this.activeFriendIndex].messages);
            console.log("lenght after delete", this.friends[this.activeFriendIndex].messages.length);


        },
        setEmoticonsActive() {
            if (this.activeFriendIndex !== -1) {
                this.emoticonsActive = true
            }
            /*      if(activeFriendIndex!==-1){
                 this.emoticonsActive = true} */
            console.log(this.emoticonsActive);
        },
        addEmojiToMessage(emoji) {
            this.newPersonalMessage += emoji.img
            console.log(this.newPersonalMessage)

        }

    },
    mounted() {
       
    },
}).mount("#app")
