import firebase from 'firebase'

const config = {
        /* Use aqui as chaves de api do Firebase */
        apiKey: "AIzaSyAbWOBaiT4MtgEUy9cUCq0xdHI4wB4mNSQ",
        authDomain: "gamifield-7e3b4.firebaseapp.com",
        databaseURL: "https://gamifield-7e3b4.firebaseio.com",
        projectId: "gamifield-7e3b4",
        storageBucket: "",
        messagingSenderId: "495682615717",
        appId: "1:495682615717:web:5db64467fde387a5"
};

firebase.initializeApp(config);

export default firebase;
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();