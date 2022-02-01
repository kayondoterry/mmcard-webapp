import { initializeApp } from "firebase/app";
import bcrypt from "bcryptjs";
import axios from "axios";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  limit,
  doc,
  runTransaction,
  orderBy,
} from "firebase/firestore";

const API_SEND_ENDPOINT =
  "http://ec2-54-90-7-241.compute-1.amazonaws.com:8080/send";

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

const _singleUserByEmailQuery = (email) => {
  return query(
    registrationAgentsCollection,
    where("email", "==", email),
    limit(1)
  );
};

const _singleCardByCardNumberQuery = (cardNumber) => {
  return query(
    cardsCollection,
    where("cardNumber", "==", cardNumber),
    limit(1)
  );
};

const _allSchoolsQuery = () => {
  return query(schoolsCollection, orderBy("name", "asc"));
};

const _getSingleDocData = async (query) => {
  const snapshot = await getDocs(query);
  const doc = snapshot.docs[0];
  return doc && doc.data();
};

const _getManyDocsData = async (query) => {
  const snapshot = await getDocs(query);
  return snapshot.docs.map((doc) => doc.data());
};

const _getUserWithEmail = async (email) => {
  return _getSingleDocData(_singleUserByEmailQuery(email));
};

const _verifyPassword = (password, passwordHash) => {
  return bcrypt.compareSync(password, passwordHash);
};

const _getCard = async (cardNumber) => {
  const card = await _getSingleDocData(
    _singleCardByCardNumberQuery(cardNumber)
  );
  if (!card) {
    throw new Error("Card not in the database");
  }
  return card;
};

const loginRAgent = async (email, password) => {
  const emailPasswordError = new Error("Invalid email or password");
  const user = await _getUserWithEmail(email);
  if (!user) {
    throw emailPasswordError;
  }
  const isPasswordCorrect = _verifyPassword(password, user.passwordHash);
  if (!isPasswordCorrect) {
    throw emailPasswordError;
  }

  delete user.passwordHash;

  return user;
};

const getCardOwnerName = async (cardNumber) => {
  const invalidCardError = new Error("Invalid Card");
  try {
    const card = await _getCard(cardNumber);
    if (!card.user) {
      throw invalidCardError;
    }
    return card.user.name;
  } catch (error) {
    if (error.message === "Card not in the database") {
      throw invalidCardError;
    }
    throw error;
  }
};

const checkCardAvailability = async (cardNumber) => {
  const card = await _getCard(cardNumber);
  return !card.user;
};

const getSchools = async () => {
  return _getManyDocsData(_allSchoolsQuery());
};

const registerStudent = async ({ name, cardNumber, school }) => {
  if (!name) {
    throw new Error("name is required.");
  }
  if (!cardNumber) {
    throw new Error("card number is required.");
  }
  if (!school) {
    throw new Error("school is required.");
  }
  const isCardAvailable = await checkCardAvailability(cardNumber);
  if (!isCardAvailable) {
    throw new Error("Card is registered to another student");
  }

  const card = await _getCard(cardNumber);
  delete card.user;

  const studentRef = doc(studentsCollection);
  const cardRef = doc(cardsCollection, card.id);

  const studentData = {
    id: studentRef.id,
    name,
    school,
    lastNotificationTimestamp: null,
  };

  const cardData = {
    user: studentData,
  };

  return runTransaction(firestore, async (transaction) => {
    transaction
      .set(studentRef, { ...studentData, card })
      .update(cardRef, { ...cardData });
  });
};

const getServiceFee = (amount) => {
  return Math.ceil(0.06 * amount);
};

const initiateMMSend = async ({ amount, senderNumber, cardNumber }) => {
  return axios.post(API_SEND_ENDPOINT, { amount, senderNumber, cardNumber });
};

const formatNumber = (num) => {
  return Intl.NumberFormat("en-US").format(num);
};

export {
  loginRAgent,
  checkCardAvailability,
  getSchools,
  registerStudent,
  initiateMMSend,
  getCardOwnerName,
  getServiceFee,
  formatNumber
};
