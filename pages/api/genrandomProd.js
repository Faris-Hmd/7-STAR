/** @format */
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { postRequest } from "../../helper/requests";
import { categories } from "../../data/categories";
import { dates } from "../../data/dates";
import { genSellings } from "../../helper/staticties/genSellings";
export default async function handler(req, res) {
  let querySnapShot;
  const ratingNum = 0;
  const prouctsNum = 10;
  const orderNum = 3;
  const sliceDates = dates.slice(695, 740);
  const imgs = [
    {
      url: "/images/sport.jpg",
    },
    { url: "/images/afocado.webp" },
    { url: "/images/loss.jpg" },
  ];

  const p = {
    images: [
      {
        url: "/images/sport.jpg",
      },
      { url: "/images/afocado.webp" },
      { url: "/images/loss.jpg" },
    ],
    descreption:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste reprehenderit repellat corrupti ducimus id mollitia, magnam deserunt odio qui, iure pariatur tempore soluta. Explicabo aliquid fuga velit odio doloribus excepturi!",
    cost: "8999",
    autherId: "0dM4MUr7GMs0PcRWNNJv",
    name: "سامسونج A11s",
    breif:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste reprehenderit repellat corrupti ducimus id mollitia, magnam deserunt odio qui, iure pariatur tempore soluta. Explicabo aliquid fuga velit odio doloribus excepturi!",
    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste reprehenderit repellat corrupti ducimus id mollitia, magnam deserunt odio qui, iure pariatur tempore soluta. Explicabo aliquid fuga velit odio doloribus excepturi!",
    category: "زيادة الوزن",
  };

  await genProducts();

  const products = await getProducts();

  //generating ratings for products/////////
  // await genRating();
  // generating orders////////////////////////
  await genOrders();

  //////genretating sellings///////////////////////////
  await startGenSelings();

  res.status(200).json("Done!");

  async function getProducts() {
    querySnapShot = await getDocs(collection(db, "Products"));
    const products = querySnapShot.docs.map((product) => {
      return {
        name: product.data().name,
        cost: product.data().cost,
        category: product.data()?.category,
        img: product.data().images[0]?.url,
        id: product.id,
      };
    });
    return products;
  }

  async function genRating() {
    for (let product of products) {
      const randNum = Math.round(Math.random() * ratingNum);
      for (let index = 0; index < randNum; index++) {
        const randRating = (index + randNum) % 3 === 1 ? "dislike" : "like";
        await postRequest({
          route: `Rating/${product.id}`,
          payload: { rating: randRating, userId_: randNum + index },
        });
      }
    }
  }

  async function genProducts() {
    for (let index = 0; index < prouctsNum; index++) {
      console.log(index);
      await postRequest({
        route: "Products/*",
        payload: {
          ...p,
          name: `سامسونج A${index}`,
          cost: index * 99,
          images: [{ url: `${imgs[index % 3].url}` }],
          category: categories[index % 3].value,
        },
      });
    }
  }

  async function genOrders() {
    for (let date of sliceDates) {
      const randNum = Math.round(Math.random() * orderNum) + 1;
      for (let index = 0; index < randNum; index++) {
        const dateStamp = new Date(date.date);
        const fullDate = date.date;

        let randArrayNums = [];
        let productsOrderList = [];
        let totalCost = 0;
        for (let index = 0; index < randNum; index++) {
          const randNum_2 = Math.round(Math.random() * (products.length - 1));
          randArrayNums.push(randNum_2);
        }
        for (const num of randArrayNums) {
          productsOrderList.push(products[num]);
          totalCost = totalCost + products[num].cost;
        }

        const data = {
          totalCost: totalCost,
          userId: `${index + 1}`,
          productsOrderList: productsOrderList,
          timeStamp: parseInt(dateStamp.getTime()),
          fullDate: fullDate,
        };
        // console.log(data);
        await addDoc(collection(db, "Orders"), data);
      }
    }
  }

  async function startGenSelings() {
    for (let date of sliceDates) {
      await genSellings(date);
    }
  }
}
