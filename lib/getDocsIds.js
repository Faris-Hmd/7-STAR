import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
export const getDocsIds = async (collection_) => {
  const querySnapShot = await getDocs(collection(db, collection_));
  const docsIds = querySnapShot.docs.map((doc) => doc.id);
  return docsIds;
};
