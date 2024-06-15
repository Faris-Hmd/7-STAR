/** @format */
import Head from "next/head";
import { ThemeProvider } from "react-bootstrap";
// import ButtomNav from "./ButtomNav";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";

/** @format */
const Layout = ({ children }) => {
  return (
    <>
      <ThemeProvider>
        <div className={`App`}>
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossorigin
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@100..900&display=swap"
              rel="stylesheet"
            />
            <link rel="manifest" href="/manifest.json" />
          </Head>
          <div className="rightSide"></div>
          <div className="leftSide"></div>
          <Navbar />
          <main className="main">
            <ToastContainer
              limit={1}
              autoClose={1500}
              position={"top-center"}
              rtl
              closeOnClick
              hideProgressBar
            />
            {children}
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </ThemeProvider>
    </>
  );
};
export default Layout;
