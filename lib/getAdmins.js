import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getAdmins = async () => {
  const querySnapShot = await getDocs(collection(db, "admins"));
  const admins = querySnapShot.docs.map((product) => {
    return {
      ...product.data(),
      id: product.id,
    };
  });

  return admins;
};
