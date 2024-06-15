/** @format */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";

export default async function handler(req, res) {
  const { userId } = req.query;
  let querySnapShot;
  console.log(req.method);

  switch (req.method) {
    case "GET":
      {
        querySnapShot = await getDoc(doc(db, "users", userId));
        const user = { ...querySnapShot.data(), id: querySnapShot.id };
        console.log(userId);
        res.status(200).json(user);
      }
      break;
    case "POST":
      {
        const user = req.body;
        console.log(user);
        const q = query(
          collection(db, "Users"),
          where("email", "==", user.email)
        );
        const cheackUser = await getDocs(q);
        if (cheackUser.empty) {
          querySnapShot = await addDoc(collection(db, "Users"), {
            ...user,
          });
          res
            .status(200)
            .json({ msg: "تم الاضافة بنجاح", docId: querySnapShot.id });
        } else {
          res.status(404).json({ msg: "هذا البريد تم اضافته مسبقا!" });
        }
      }
      break;
    case "DELETE":
      {
        console.log(userId);
        await deleteDoc(doc(db, "Users", userId));
        res.status(200).json({ msg: "تم الحذف بنجاح" });
      }
      break;

    case "PUT": {
      const user = req.body;
      console.log(user);
      await updateDoc(doc(db, "users", userId), {
        ...user,
      });
      res.status(200).json({ msg: "تم التعديل بنجاح", docId: userId });
    }
    default:
      break;
  }
}
