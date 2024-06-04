/** @format */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { getProduct } from "../../../lib/getProduct";
export default async function handler(req, res) {
  const { productId } = req.query;

  let querySnapShot;
  // console.log(req.method);

  switch (req.method) {
    case "GET":
      {
        const product = await getDocs(collection("Orders"));
        // console.log(product);
        res.status(200).json(product);
      }
      break;
    case "POST":
      {
        const product = req.body;
        querySnapShot = await addDoc(collection(db, "Products"), {
          ...product,
          autherId: "0dM4MUr7GMs0PcRWNNJv",
        });
        res
          .status(200)
          .json({ msg: "تم الاضافة بنجاح", docId: querySnapShot.id });
      }

      break;
    case "DELETE":
      {
        await deleteDoc(doc(db, "Products", productId));
        res.status(200).json({ msg: "تم الحذف بنجاح" });
      }
      break;

    case "PUT": {
      const product = req.body;
      // console.log(product);
      await updateDoc(doc(db, "Products", product.id), {
        ...product,
        autherId: "0dM4MUr7GMs0PcRWNNJv",
        keywords: [product.name, product.category, product.cost],
      });
      res.status(200).json({ msg: "تم التعديل بنجاح", docId: product.id });
    }
    default:
      break;
  }
}
