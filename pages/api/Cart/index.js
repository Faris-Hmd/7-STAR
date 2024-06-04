/** @format */
import { collection, getDocs } from "firebase/firestore";
import { baseUrl } from "../../_app";
import { db } from "../../../firebase/firebase";
import { getProduct } from "../../../lib/getProduct";
export default async function handler(req, res) {
  const userId = "0dM4MUr7GMs0PcRWNNJv";
  let products = [];
  let querySnapShot;

  querySnapShot = await getDocs(collection(db, `Users/${userId}/Cart`));

  const ProductsIds = querySnapShot.docs.map((product) => {
    return {
      productId: product.data().productId,
      qu: product.data().qu,
    };
  });

  console.log("ids ============", ProductsIds);

  for (const oneDoc of ProductsIds) {
    const prod = await getProduct(oneDoc.productId);
    products.push({ ...prod, qu: oneDoc.qu });
    console.log("--------------------------------------------------");
    // console.count();
    //   console.log(prod);
  }

  // console.log(products.length);

  res.status(200).json(products);
}
