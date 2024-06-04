import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getProduct = async (productId) => {
  const querySnapShot = await getDoc(doc(db, "products", productId));
  const product = { ...querySnapShot.data(), id: querySnapShot.id };
  return product;
};

export const getProductSameCat = async (category) => {
  console.log(category);
  const querySnapShot = await getDocs(
    query(collection(db, "products"), where("category", "==", `${category}`))
  );
  return querySnapShot.docs.map((product) => {
    return {
      ...product.data(),
      id: product.id,
    };
  });
};
