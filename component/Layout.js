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
          <footer className="footer bg-dark text-white py-5">
          <div className="container">
                    <div className="row">
                        <div className="col-6 col-md-2 mb-3">
                            <h5>Section</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">Home</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">Features</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">Pricing</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">FAQs</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">About</a></li>
                            </ul>
                        </div>

                        <div className="col-6 col-md-2 mb-3">
                            <h5>Section</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">Home</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">Features</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">Pricing</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">FAQs</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">About</a></li>
                            </ul>
                        </div>

                        <div className="col-6 col-md-2 mb-3">
                            <h5>Section</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">Home</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">Features</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">Pricing</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">FAQs</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">About</a></li>
                            </ul>
                        </div>

                        <div className="col-md-5 offset-md-1 mb-3">
                            <form>
                                <h5>Subscribe to our newsletter</h5>
                                <p>Monthly digest of what's new and exciting
                                    from us.</p>
                                <div
                                    className="d-flex flex-column flex-sm-row w-100 gap-2">
                                    <label for="newsletter1"
                                        className="visually-hidden">Email
                                        address</label>
                                    <input id="newsletter1" type="text"
                                        className="form-control"
                                        placeholder="Email address"/>
                                    <button className="btn btn-primary"
                                        type="button">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div
                        className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                        <p>&copy; 2024 Company, Inc. All rights reserved.</p>
                        <ul className="list-unstyled d-flex">
                            <li className="ms-3"><a className="link-body-emphasis"
                                    href="#"><svg className="bi" width="24"
                                        height="24"><use
                                            xlink:href="#twitter" /></svg></a></li>

                            <li className="ms-3"><a className="link-body-emphasis"
                                    href="#"><svg className="bi" width="24"
                                        height="24"><use
                                            xlink:href="#instagram" /></svg></a></li>
                            <li className="ms-3"><a className="link-body-emphasis"
                                    href="#"><svg className="bi" width="24"
                                        height="24"><use
                                            xlink:href="#facebook" /></svg></a></li>
                        </ul>
                    </div>
                </div>

            {/* <Footer /> */}
          </footer>
        </div>
      </ThemeProvider>
    </>
  );
};
export default Layout;
