import { initializeApp } from "firebase/app";
import bcrypt from "bcryptjs";
import rAgents from "./r-agents";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  limit,
  serverTimestamp,
  doc,
  runTransaction,
  orderBy,
  onSnapshot,
  addDoc,
  setDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfKhpC9aJxzCGPKjmiBNRR36a7agbIF-4",
  authDomain: "mm-card.firebaseapp.com",
  projectId: "mm-card",
  storageBucket: "mm-card.appspot.com",
  messagingSenderId: "939214824329",
  appId: "1:939214824329:web:f5a6bdc6a0f4487f15b758",
};

initializeApp(firebaseConfig);

const firestore = getFirestore();
const cardsCollection = collection(firestore, "cards");
const studentsCollection = collection(firestore, "students");
const schoolsCollection = collection(firestore, "schools");
const registrationAgentsCollection = collection(
  firestore,
  "registration_agents"
);
const transactionsCollection = collection(firestore, "transactions");
const notificationsCollection = collection(firestore, "notifications");

const loadRegAgents = async () => {
  await Promise.all(
    rAgents.map((rAgent) => {
      const docRef = doc(registrationAgentsCollection);
      const passwordHash = bcrypt.hashSync(rAgent.password, 8);
      const id = docRef.id;
      const { name, email } = rAgent;
      return setDoc(docRef, {
        id,
        name,
        email,
        passwordHash,
      });
    })
  );

  console.log("done!");
};

function main() {
  // loadRegAgents();
}

export default main;