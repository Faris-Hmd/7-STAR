import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getProducts = async () => {
  const querySnapShot = await getDocs(collection(db, "Products"));
  const products = querySnapShot.docs.map((product) => {
    return {
      name: product.data().name,
      cost: product.data().cost,
      category: product.data()?.category,
      img: product.data().images[0]?.url,
      id: product.id,
    };
  });

  return products;
};
