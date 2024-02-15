import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyA6pwopVjq0YE2mBuHxMNeg_roeDwySSpE",
  authDomain: "sniffnear.firebaseapp.com",
  projectId: "sniffnear",
  storageBucket: "sniffnear.appspot.com",
  messagingSenderId: "107536013939",
  appId: "1:107536013939:web:a571f3fa47133ac1e8e806"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// export app;