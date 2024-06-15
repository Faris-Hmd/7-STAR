import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getFireDocs = async (coll) => {
  const querySnapShot = await getDocs(collection(db, coll));
  const data = querySnapShot.docs.map((product) => {
    return {
      ...product.data(),
      id: product.id,
    };
  });

  return data;
};
export const getFireDocsQuery = async (coll, a, b, c) => {
  const querySnapShot = await getDocs(
    query(collection(db, coll), where(a, b, c))
  );
  const data = querySnapShot.docs.map((product) => {
    return {
      ...product.data(),
      id: product.id,
    };
  });

  return data;
};

export const getFireDoc = async (coll, id) => {
  const querySnapShot = await getDoc(doc(db, coll, id));
  return {
    ...querySnapShot.data(),
    id: querySnapShot.id,
  };
};
export const getDataFromQuery = (querySnapShot) => {
  return querySnapShot.docs.map((entry) => {
    return {
      ...entry.data(),
      id: entry.id,
    };
  });
};
