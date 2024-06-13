import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getUsers = async () => {
  const querySnapShot = await getDocs(collection(db, "users"));
  const users = querySnapShot.docs.map((product) => {
    return {
      ...product.data(),
      id: product.id,
    };
  });

  return users;
};
