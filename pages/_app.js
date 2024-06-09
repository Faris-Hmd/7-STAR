/** @format */
import Layout from "../component/Layout";
import "../styles/globals.css";
import "../styles/util.css";
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import { AuthProvider } from "../context/authContext";
import "react-toastify/dist/ReactToastify.css";
import { SSRProvider } from "react-bootstrap";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
const internetUrl = "https://7-star.vercel.app";
const localurl = " http://localhost:3005";
export let baseUrl = internetUrl;
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
              <ToastContainer
                limit={1}
                autoClose={1500}
                position={"top-center"}
                rtl
                closeOnClick
                hideProgressBar
              />
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
