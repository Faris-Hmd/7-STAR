/** @format */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { getProduct } from "../../../lib/getProduct";
export default async function handler(req, res) {
  const { productId } = req.query;
  // const { data: session } = await getServerSession(req, res, authOptions);
  // console.log(session);
  let querySnapShot;
  // console.log(req.method);

  switch (req.method) {
    case "GET":
      {
        const product = await getProduct(productId);
        // console.log(product);
        res.status(200).json(product);
      }
      break;
    case "POST":
      {
        const product = req.body;
        // console.log(product, "from api");
        querySnapShot = await addDoc(collection(db, "products"), {
          ...product,
          // userId: session.user.id,
        });
        res
          .status(200)
          .json({ msg: "تم الاضافة بنجاح", docId: querySnapShot.id });
      }

      break;
    case "DELETE":
      {
        await deleteDoc(doc(db, "products", productId));
        res.status(200).json({ msg: "تم الحذف بنجاح" });
      }
      break;

    case "PUT": {
      const product = req.body;
      console.log(product, "from api");

      // console.log(product);
      await updateDoc(doc(db, "products", product.id), {
        ...product,
      });
      res.status(200).json({ msg: "تم التعديل بنجاح", docId: product.id });
    }
    default:
      break;
  }
}
