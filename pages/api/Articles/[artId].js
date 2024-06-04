/** @format */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
export default async function handler(req, res) {
  const { artId } = req.query;
  let querySnapShot;
  console.log(artId);

  switch (req.method) {
    case "GET":
      {
        querySnapShot = await getDoc(doc(db, "Articles", artId));
        const article = { ...querySnapShot.data(), id: querySnapShot.id };
        // console.log(article);
        res.status(200).json(article);
      }
      break;
    case "POST":
      {
        const art = req.body;
        querySnapShot = await addDoc(collection(db, "Articles"), {
          ...art,
          keywords: [art.title, art.category],
        });
        res
          .status(200)
          .json({ msg: "تم اضافة المقال بنجاح", docId: querySnapShot.id });
      }
      break;
    case "DELETE":
      {
        await deleteDoc(doc(db, "Articles", artId));
        res.status(200).json({ msg: "تم الحذف بنجاح" });
      }
      break;

    case "PUT": {
      const art = req.body;
      console.log(art);
      console.log({ ...art }, [art.title, art.category]);
      await setDoc(doc(db, "Articles", art.id), {
        ...art,
        keywords: [art.title, art.category],
      });
      res.status(200).json({ msg: "تم تعديل المقال بنجاح", docId: art.id });
    }
    default:
      break;
  }
}
