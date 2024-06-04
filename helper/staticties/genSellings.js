import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

export async function genSellings(date) {
  let ordersSnapshot = null;
  let orders = [];
  const dateStamp = new Date(date.date);
  // console.log(dateStamp.getTime());
  const fullDate = date.date;
  // console.log(dateStamp.getTime());
  console.log(fullDate);
  ordersSnapshot = await getDocs(
    query(collection(db, "Orders"), where("fullDate", "==", fullDate))
  );
  if (!ordersSnapshot.empty) {
    orders = ordersSnapshot.docs.map((ord) => {
      return {
        ...ord.data(),
      };
    });
    console.log("orders === ", orders);
    let totalCost = 0;
    for (let order of orders) {
      // console.log(order.totalCost);
      totalCost = totalCost + order.totalCost;
    }
    // console.log(totalCost);
    console.log("-------------------------");

    await setDoc(doc(db, "Selling", fullDate), {
      totalCost: totalCost,
      fullDate: fullDate,
      midIncom: totalCost / 24,
      ordersNum: orders.length,
      year: dateStamp.getFullYear().toString(),
      month: dateStamp.getMonth() + 1,
      day: dateStamp.getDate().toString(),
    });
  } else {
    let totalCost = 0;
    // console.log(totalCost);
    console.log("-------------------------");

    await setDoc(doc(db, "Selling", fullDate), {
      totalCost: totalCost,
      fullDate: fullDate,
      midIncom: totalCost / 24,
      ordersNum: 0,
      year: dateStamp.getFullYear().toString(),
      month: dateStamp.getMonth() + 1,
      day: dateStamp.getDate().toString(),
    });
  }
}
