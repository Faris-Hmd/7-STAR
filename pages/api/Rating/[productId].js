/** @format */
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { getRating } from "../../../lib/getRating";
export default async function handler(req, res) {
  const { productId } = req.query;

  let querySnapShot;
  // console.log(req.method);
  const userId = "0dM4MUr7GMs0PcRWNNJv";
  switch (req.method) {
    case "GET":
      {
        const rating = await getRating(productId);
        console.log(rating);
        res.status(200).json(rating);
      }
      break;

    case "POST":
      {
        const { rating, userId_ } = req.body;
        // console.log({ rating, userId_ });
        querySnapShot = await setDoc(
          doc(db, `Products/${productId}/Rating/${userId_}`),
          {
            // ...product,
            userId: userId_,
            productId: productId,
            rating: rating,
          }
        );

        res
          .status(200)
          .json({ msg: "تم الاضافة بنجاح", docId: userId_ + productId });
      }
      break;
    case "DELETE":
      {
        await deleteDoc(doc(db, `Products/${productId}/Rating/${userId}`));
        res.status(200).json({ msg: "تم الحذف بنجاح" });
      }
      break;

    default:
      break;
  }
}
