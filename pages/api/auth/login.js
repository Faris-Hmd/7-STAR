/** @format */
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
export default async function handler(req, res) {
  const { email, password } = req.body;
  console.log(email, password);

  const q = query(collection(db, "Users"), where("email", "==", email));
  const user = await getDocs(q);
  if (!user.empty) {
    console.log(user.docs[0].data());
    res.status(200).json(user.docs[0].data());
  } else {
    res.status(404).json({ msg: "لا يوجد مستخدم بهذا الحساب!" });
  }
}
