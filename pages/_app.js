/** @format */
<<<<<<< HEAD
import "../styles/globals.css";
import "../styles/util.css";
=======

import "../styles/globals.css";
import "../styles/util.css";
import Layout from "../component/Layout";
// import "bootstrap/dist/css/bootstrap.css";
>>>>>>> a8093c2eb6189634df32ed8f6eddafccab3b473a
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../component/Layout";
// import "bootstrap/dist/css/bootstrap.css";
import { AuthProvider } from "../context/authContext";
import { SSRProvider } from "react-bootstrap";
import { SessionProvider } from "next-auth/react";
const internetUrl = "https://7-star.vercel.app";
const localurl = " http://localhost:3005";
export let baseUrl =
  process.env.NODE_ENV === "development" ? localurl : internetUrl;

// import { Inter, Arya } from "@next/font/google";
// const font = Arya({ subsets: ["latin"], weight: ["700"] });
// if (process && process.env.NODE_ENV === "development") {
//   baseUrl = localurl;
// }

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // console.log(Component);
  return (
    <>
      <SSRProvider>
        <AuthProvider>
          <SessionProvider session={session}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </AuthProvider>
      </SSRProvider>
    </>
  );
}

export default MyApp;
// export async function getStaticProps() {
//   // const data = await fetch(`${baseUrl}/api/articles?keyword=all`);
//   // const articles = await data.json();

//   return {
//     props: {
//       // articles: articles,
//       test: "tsesssss",
//     },
//   };
// }
