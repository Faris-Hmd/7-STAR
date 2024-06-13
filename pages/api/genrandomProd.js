/** @format */
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { postRequest } from "../../helper/requests";
import { categories } from "../../data/categories";
import { dates } from "../../data/dates";
import { genSellings } from "../../helper/staticties/genSellings";
export default async function handler(req, res) {
  let querySnapShot;
  const ratingNum = 0;
  const prouctsNum = 10;
  const userNum = 3;
  const orderNum = 3;
  const sliceDates = dates.slice(695, 740);
  const imgs = [
    {
      url: "/images/cat-1.webp",
    },
    { url: "/images/cat-2.webp" },
    { url: "/images/cat-3.webp" },
    { url: "/images/cat-4.webp" },
  ];
  const admins = [
    {
      email: "farishmd93@gmail.com",
      role: "admin",
    },
  ];

  const users = [
    {
      userId: "1",
      photoUrl: "/images/cat-1.webp",
      displayName: "Faris-Hamad",
      email: "farishmd93@gmail.com",
    },
    {
      userId: "2",
      photoUrl: "/images/cat-2.webp",
      displayName: "Mhmd-Hamad",
      email: "mhmd@gmail.com",
    },
    {
      userId: "3",
      photoUrl: "/images/cat-3.webp",
      displayName: "AliHamad",
      email: "bluocat4@gmail.com",
    },
  ];
  const p = {
    images: [
      {
        url: "/images/cat-1.webp",
      },
      { url: "/images/cat-2.webp" },
      { url: "/images/cat-3.webp" },
      { url: "/images/cat-4.webp" },
    ],
    descreption:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste reprehenderit repellat corrupti ducimus id mollitia, magnam deserunt odio qui, iure pariatur tempore soluta. Explicabo aliquid fuga velit odio doloribus excepturi!",
    cost: "8999",
    name: "سامسونج A11s",
    breif:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste reprehenderit repellat corrupti ducimus id mollitia, magnam deserunt odio qui, iure pariatur tempore soluta. Explicabo aliquid fuga velit odio doloribus excepturi!",
    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste reprehenderit repellat corrupti ducimus id mollitia, magnam deserunt odio qui, iure pariatur tempore soluta. Explicabo aliquid fuga velit odio doloribus excepturi!",
    category: "زيادة الوزن",
  };

  await genUsers();
  await genProducts();
  await genAdmins();

  // const products = await getProducts();

  //generating ratings for products/////////
  // await genRating();
  // generating orders////////////////////////
  // await genOrders();

  //////genretating sellings///////////////////////////
  // await startGenSelings();

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
          images: [{ url: `${imgs[index % 4].url}` }],
          category: categories[index % 3].value,
          userId: users[index % 3].userId,
        },
      });
    }
  }
  async function genAdmins() {
    for (let index = 0; index < admins.length; index++) {
      await addDoc(collection(db, "admins"), {
        email: admins[index].email,
      });
    }
  }
  async function genUsers() {
    for (let index = 0; index < userNum; index++) {
      console.log(index);
      let userId = users[index % 3].userId;
      await setDoc(doc(db, "users", userId), {
        userId,
        displayName: users[index % 3].displayName,
        photoUrl: users[index % 3].photoUrl,
        email: users[index % 3].email,
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
