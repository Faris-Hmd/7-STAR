import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function getOrders(date) {
  const snapShot = await getDocs(
    query(
      collection(db, "Orders"),
      where("fullDate", "<", `${date.split("-")[0]}/${date.split("-")[0]}}`)
    )
  );
  const orders = snapShot.docs.map((order) => {
    return {
      ...order.data(),
    };
  });
  console.log(orders);
  return orders;
}
