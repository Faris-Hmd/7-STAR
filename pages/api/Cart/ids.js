/** @format */
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
export default async function handler(req, res) {
  const userId = "0dM4MUr7GMs0PcRWNNJv";
  let querySnapShot;

  querySnapShot = await getDocs(collection(db, `Users/${userId}/Cart`));
  const ProductsIds = querySnapShot.docs.map((product) => {
    return { productId: product.data().productId, qu: product.data().qu };
  });

  console.log("ids ============", ProductsIds);

  res.status(200).json(ProductsIds);
}
