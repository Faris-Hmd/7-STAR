/** @format */
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
export default async function handler(req, res) {
  const { productId } = req.query;

  let querySnapShot;
  console.log(req.method);
  const userId = "0dM4MUr7GMs0PcRWNNJv";
  switch (req.method) {
    case "GET":
      {
        querySnapShot = await getDoc(
          doc(db, `Users/${userId}/Cart/${productId}`)
        );
        // console.log(querySnapShot.exists());
        if (querySnapShot.exists()) {
          res.status(200).json({ status: true, qu: querySnapShot.data().qu });
        } else {
          res.status(200).json({ status: false, qu: 0 });
        }
      }
      break;

    case "POST":
      {
        const { qu } = req.body;
        console.log(qu);
        querySnapShot = await setDoc(
          doc(db, `Users/${userId}/Cart/${productId}`),
          {
            // ...product,
            userId: "0dM4MUr7GMs0PcRWNNJv",
            productId: productId,
            qu: qu,
          }
        );

        res
          .status(200)
          .json({ msg: "تم الاضافة بنجاح", docId: userId + productId });
      }
      break;
    case "DELETE":
      {
        await deleteDoc(doc(db, `Users/${userId}/Cart/${productId}`));
        res.status(200).json({ msg: "تم الحذف بنجاح" });
      }
      break;

    default:
      break;
  }
}
