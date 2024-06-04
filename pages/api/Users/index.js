/** @format */
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
export default async function handler(req, res) {
  let querySnapShot;
  console.log(req.method);

  switch (req.method) {
    case "GET":
      {
        querySnapShot = await getDocs(collection(db, "Users"));

        const users = querySnapShot.docs.map((user) => {
          console.log({
            ...user.data(),
            id: user.id,
          });
          return {
            ...user.data(),
            id: user.id,
          };
        });
        res.status(200).json(users);
      }
      break;

    default:
      break;
  }
}
