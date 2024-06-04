/** @format */
import Layout from "../component/Layout";
import "../styles/globals.css";
import "../styles/util.css";
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import { AuthProvider } from "../context/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SSRProvider } from "react-bootstrap";
const internetUrl = "https://dr-azza-clinc.netlify.app";
const localurl = " http://192.168.137.102:3005";
export let baseUrl = localurl;
// import { Inter, Arya } from "@next/font/google";
// const font = Arya({ subsets: ["latin"], weight: ["700"] });
// if (process && process.env.NODE_ENV === "development") {
//   baseUrl = localurl;
// }

function MyApp({ Component, pageProps }) {
  // console.log(Component);
  return (
    <>
      <SSRProvider>
        <AuthProvider>
          <Layout>
            <ToastContainer
              autoClose={1500}
              position={"top-center"}
              rtl
              closeOnClick
              hideProgressBar
            />
            <Component {...pageProps} />
          </Layout>
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
