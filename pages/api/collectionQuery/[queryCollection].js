/** @format */
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { baseUrl } from "../../_app";
import { db } from "../../../firebase/firebase";
export default async function handler(req, res) {
  const { queryCollection } = req.query;
  const url = new URL(baseUrl + req.url);
  const searchParams = url.searchParams;

  const key = searchParams.get("key");
  const value = searchParams.get("value");

  // console.log(key, value, queryCollection);
  let querySnapShot;

  switch (req.method) {
    case "GET":
      {
        querySnapShot = await getDocs(
          query(
            collection(db, queryCollection),
            where(key, "==", value),
            limit(6)
          )
        );
        if (!querySnapShot.empty) {
          const data = querySnapShot.docs.map((entry) => {
            return {
              name: entry.data().name,
              cost: entry.data().cost,
              breif: entry.data().breif,
              category: entry.data().category,
              img: entry.data().images[0].url,
              id: entry.id,
            };
          });
          // console.log(data);
          res.status(200).json(data);
        } else {
          res.status(200).json([]);
        }
      }

      break;
    default:
      break;
  }
}
