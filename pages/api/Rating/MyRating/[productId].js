/** @format */
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
export default async function handler(req, res) {
  const { productId } = req.query;

  let querySnapShot;
  // console.log(req.method);
  const userId = "0dM4MUr7GMs0PcRWNNJv";
  switch (req.method) {
    case "GET":
      {
        querySnapShot = await getDoc(
          doc(db, `Products/${productId}/Rating/${userId}`)
        );
        // console.log(querySnapShot.data());
        if (querySnapShot.exists())
          res.status(200).json({ rating: querySnapShot.data().rating });
        else res.status(200).json({ rating: null });
      }
      break;

    case "POST":
      {
        const { rating, userId_ } = req.body;
        // console.log({ rating, userId_ });
        querySnapShot = await setDoc(
          doc(db, `Products/${productId}/Rating/${userId_ ? userId_ : userId}`),
          {
            // ...product,
            userId: userId_ ? userId_ : userId,
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
