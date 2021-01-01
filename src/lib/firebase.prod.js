import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { seedDatabase } from '../seed';

const config = {
    apiKey: "AIzaSyAewQ87QRt23owjdHj2lShsFc6tRf9m0Bo",
    authDomain: "netflix-clone-8ecdb.firebaseapp.com",
    projectId: "netflix-clone-8ecdb",
    storageBucket: "netflix-clone-8ecdb.appspot.com",
    messagingSenderId: "767275750040",
    appId: "1:767275750040:web:944ae5036c0c2f5e00b6ed"
};

const firebase = Firebase.initializeApp(config);

// seedDatabase(firebase);

export { firebase };