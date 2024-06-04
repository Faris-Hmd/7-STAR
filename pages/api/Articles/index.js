/** @format */
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { baseUrl } from "../../_app";
export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  const searchParams = url.searchParams;
  const keyword = searchParams.get("keyword");
  let querySnapShot;

  if (keyword === "all") {
    console.log(req.cookies);
    querySnapShot = await getDocs(query(collection(db, "Articles")));
  } else {
    console.log(keyword);
    querySnapShot = await getDocs(
      query(
        collection(db, "Articles"),
        where("keywords", "array-contains", keyword)
      )
    );
  }

  const Articles = querySnapShot.docs.map((artecle) => {
    return {
      title: artecle.data().title,
      category: artecle.data().category,
      breif: artecle.data().breif,
      img: artecle.data().images[0].url,
      id: artecle.id,
      // keywords: artecle.data().keywords,
    };
  });
  console.log(Articles);
  res.status(200).json(Articles);
}
