import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { st } from "../types/types";
import { months } from "../data/dates";
type sell = {
  year: string;
  totalCost: number;
  midDailyIncom: number;
  ordersNum: number;
  month: number;
};
export default async function getStaticties(year: string) {
  // console.log(year);

  const sellingsSnapshot = await getDocs(
    query(collection(db, "Selling"), where("year", "==", year))
  );

  const sellings: sell[] = sellingsSnapshot.docs.map((sell) => {
    return {
      year: sell.data().year,
      totalCost: sell.data().totalCost,
      midDailyIncom: sell.data().midIncome,
      ordersNum: sell.data().ordersNum,
      month: sell.data().month,
      day: sell.data().day,
    };
  });
  let annyoualStatics: any = [];

  for (let month = 1; month <= 12; month++) {
    const monthlyStatics = sellings.filter((entry) => entry.month === month);
    let ar = [];
    let ar_2 = [];
    for (let entry of monthlyStatics) {
      ar.push(entry.totalCost);
      ar_2.push(entry.ordersNum);
    }
    annyoualStatics.push({
      month: `${months[month - 1]}`,
      totalCost: ar,
      ordersNum: ar_2,
    });
  }
  return annyoualStatics;
}
