import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

export default async function handler(req, res) {
  const timeStamp = req.query.timeStamp;
  const userId = req.query.userId;
  console.log(req.query);
  switch (req.method) {
    case "GET":
      {
        const orderSnapshot = await getDocs(
          query(
            collection(db, "Orders")
            // where("timeStamp", ">=", parseInt(timeStamp)),
            // where("userId", "==", userId)
          )
        );
        const orders = orderSnapshot.docs.map((order) => {
          return { ...order.data() };
        });
        if (!orderSnapshot.empty) {
          console.log(">>>>>>>>>>>>>>");

          res.status(200).json(orders);
        } else {
          console.log(">>>>>>>>>>>>>>/ empty");

          res.status(200).json([]);
        }
      }
      break;
    case "POST":
      await addingOrder();
  }

  async function addingOrder() {
    {
      const products = req.body;
      // console.log(products);
      let totalCost = 0;
      const dateStamp = new Date();
      const fullDate = `${dateStamp.getFullYear()}-${
        dateStamp.getMonth() + 1
      }-${dateStamp.getDate()}`;
      for (let index = 0; index < products.length; index++) {
        totalCost = totalCost + products[index].cost * products[index].qu;
      }

      const orders = {
        totalCost: totalCost,
        userId: `${1}`,
        productsOrderList: products,
        timeStamp: parseInt(dateStamp.getTime()),
        fullDate: fullDate,
        month: `${dateStamp.getFullYear()}-${dateStamp.getMonth() + 1}`,
        day: `${dateStamp.getDate()}`,
      };
      console.log(orders);
      try {
        const addingRes = await addDoc(collection(db, "Orders"), orders);
        res.status(200).json({ msg: `تم اضافة طلبك` });
      } catch (error) {
        console.log(error);
        res.status(405).json({ msg: "خطأ في العملية" });
      }
    }
  }
}
