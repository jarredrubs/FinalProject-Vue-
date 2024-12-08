import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDa3516kzh1RzcWUf41DeKwC1Ub_JPahxU",
    authDomain: "notenest-485c8.firebaseapp.com",
    projectId: "notenest-485c8",
    storageBucket: "notenest-485c8.firebasestorage.app",
    messagingSenderId: "698842945164",
    appId: "1:698842945164:web:11dfc9b61c03fdde5e0da9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
