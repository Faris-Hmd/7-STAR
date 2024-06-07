/** @format */
import Head from "next/head";
import { ThemeProvider, ToastContainer } from "react-bootstrap";
// import ButtomNav from "./ButtomNav";
import Navbar from "./Navbar";
import Footer from "./Footer";

/** @format */
const Layout = ({ children }) => {
  return (
    <>
      <ThemeProvider>
        <div className={`App`}>
          <Head>
            <link rel="manifest" href="/manifest.json" />
            <link
              href="https://fonts.googleapis.com/css2?family=Cairo&family=Nunito&display=swap"
              rel="stylesheet"
            />
            <link
              rel="shortcut icon"
              type="image/x-icon"
              href="/icons/DrAzzaIcon.ico"
            />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Cairo&family=Nunito&display=swap"
              rel="stylesheet"
            />
          </Head>
          <div className="rightSide"></div>
          <div className="leftSide"></div>
          <Navbar />
          {/* <ButtomNav /> */}
          <main className="main">{children}</main>
          <footer>
            <Footer />
          </footer>
        </div>
      </ThemeProvider>
    </>
  );
};
export default Layout;
