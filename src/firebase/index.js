import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAvHiCbuI2bpFsZm6aVedHGcrZhrqW-V0k",
  authDomain: "premium-model-frontend.firebaseapp.com",
  projectId: "premium-model-frontend",
  storageBucket: "premium-model-frontend.appspot.com",
  messagingSenderId: "62996785354",
  appId: "1:62996785354:web:be12debb9741d4fe2aec33",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };