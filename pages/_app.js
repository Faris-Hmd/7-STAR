/** @format */
// core styles are required for all packages
// import "@mantine/core/styles.css";

// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...
import "../styles/globals.css";
import "../styles/util.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../component/Layout";
import { AuthProvider } from "../context/authContext";
import { SSRProvider } from "react-bootstrap";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
// import { createTheme, MantineProvider } from "@mantine/core";
const internetUrl = "https://7-star.vercel.app";
const localurl = " http://localhost:3005";
export const currentUser = {
  displayName: "فارس حمد",
  email: "farishmd93@gmail.com",
  photoUrl: "/images/cat-1.webp",
  id: "1",
};

export let baseUrl =
  process.env.NODE_ENV === "development" ? localurl : internetUrl;

// const font = Arya({ subsets: ["latin"], weight: ["700"] });
// if (process && process.env.NODE_ENV === "development") {
//   baseUrl = localurl;
// }

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // console.log(Component);
  return (
    <>
      <SessionProvider>
        <SSRProvider>
          <AuthProvider>
            <SessionProvider session={session}>
              {/* <MantineProvider> */}
              <Layout>
                <ToastContainer
                  style={{ zIndex: 9999999 }}
                  limit={1}
                  autoClose={1500}
                  position={"top-center"}
                  rtl
                  closeOnClick
                  hideProgressBar
                />
                <Component {...pageProps} />
              </Layout>
              {/* </MantineProvider> */}
            </SessionProvider>
          </AuthProvider>
        </SSRProvider>
      </SessionProvider>
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
