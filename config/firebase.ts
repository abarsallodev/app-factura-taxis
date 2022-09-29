import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2NSwLB9uAcAIM5GsaSPPqRz_cPLI0-vg",
  authDomain: "app-facturas-taxi.firebaseapp.com",
  projectId: "app-facturas-taxi",
  storageBucket: "app-facturas-taxi.appspot.com",
  messagingSenderId: "1020076735048",
  appId: "1:1020076735048:web:b2af158bbaae6a2d70f67d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
