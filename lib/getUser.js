import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getUser = async (userId) => {
  console.log(userId);

  const querySnapShot = await getDoc(doc(db, "users", userId));
  const user = {
    ...querySnapShot.data(),
    id: querySnapShot.id,
  };
  console.log(user);
  return user;
};
