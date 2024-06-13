/** @format */
import "../styles/globals.css";
import "../styles/util.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../component/Layout";
// import "bootstrap/dist/css/bootstrap.css";
import { AuthProvider } from "../context/authContext";
import { SSRProvider } from "react-bootstrap";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
const internetUrl = "https://7-star.vercel.app";
const localurl = " http://localhost:3005";
export const currentUser = {
  displayName: "فارس حمد",
  email: "farishmd93@gmail.com",
  photoUrl: "/images/cat-1.webp",
};
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
      <Head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo&family=Nunito&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo&family=Nunito&display=swap"
          rel="stylesheet"
        />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/icons/DrAzzaIcon.ico"
        />
      </Head>
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
