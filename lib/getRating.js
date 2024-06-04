import { collection, getCountFromServer, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getRating = async (productId) => {
  const likesRes = await getCountFromServer(
    query(
      collection(db, `Products/${productId}/Rating`),
      where("rating", "==", "like")
    )
  );

  const dislikesRes = await getCountFromServer(
    query(
      collection(db, `Products/${productId}/Rating`),
      where("rating", "==", "dislike")
    )
  );
  const likes = likesRes.data().count;
  const dislikes = dislikesRes.data().count;

  if (likes || dislikes) {
    return {
      likes: likes,
      dislikes: dislikes,
    };
  } else {
    return { rating: null };
  }
};
