import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAdkce_1pqSE9EL0SlSddqhgugI6nFdNLY",
  authDomain: "bussiness-portal-4cf4c.firebaseapp.com",
  projectId: "bussiness-portal-4cf4c",
  storageBucket: "bussiness-portal-4cf4c.firebasestorage.app",
  messagingSenderId: "673512660493",
  appId: "1:673512660493:web:9af09862bc8b7b3b737f44",
  measurementId: "G-1YSG46NQWZ"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);