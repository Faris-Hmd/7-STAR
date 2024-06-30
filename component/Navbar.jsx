import styles from "../styles/Navbar.module.css";
import { Button, Col, Container, Offcanvas } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { BsBag, BsGear, BsPerson, BsPlus } from "react-icons/bs";
import { BiHome, BiLogIn, BiLogOut, BiNews, BiStats } from "react-icons/bi";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const links = [
  {
    name: "الرئيسية",
    href: "/",
    icon: <BiHome size={"20px"} className="me-3" />,
  },
  {
    name: "الخدمات",
    href: "/Products",
    icon: <BsBag size={"20px"} className="me-3" />,
  },
];

const Navbar = () => {
  const { data: session, status } = useSession();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
                <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
                <div className="container">
                    <button className="btn btn-outline-light" type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasLogin"
                        aria-controls="offcanvasLogin">
                        <i className="bi bi-person"></i> Login
                    </button>
                    <a className="navbar-brand ms-auto" href="#">
                        <img
                            src="https://www.the7stars.co.uk/site/templates/assets/images/logo.svg"
                            width="30" height="40"
                            alt="Logo"
                            className="d-inline-block align-text-center"/>
                        سبعة نجوم
                    </a>

                    <button className="navbar-toggler" type="button"
                        data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page"
                                    href="#section1">Section 1</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#section2">Section
                                    2</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#section3">Section
                                    3</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#section4">Section
                                    4</a>

                            </li>
                            <li className="nav-item"><a className="nav-link"
                                    href="#why-7-stars">Why 7 Stars</a></li>
                            <li className="nav-item"><a className="nav-link"
                                    href="#categories">Categories</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
      {/* <nav className={styles.nav}>
        <Button variant="" onClick={handleShow} className="over ms-2">
          <FaBars style={{ color: "white" }} />
        </Button>
        <div className={styles.logo}>
          <img
            width={"100px"}
            src="/icons/7star.png"
            alt="drc"
            className="mb-2"
          /> */}
          {/* <span className="p-2 fos-m text-nowrap">خدماتي</span> */}
        {/* </div>

      </nav> */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="start"
        className="rtl"
      >
                {/* {session?.user ? (
          <Link href={"/"} className="ms-auto me-2 Link">
            <span style={{ color: "white" }} className="me-2">
              {session.user.displayName}
            </span>
            <img
              width={50}
              height={50}
              style={{ objectFit: "cover" }}
              src={session.user.photoUrl}
              alt="drc"
              className="rounded-circle shadow"
            />
          </Link>
        ) : (
          <Link href={"/"} className="ms-auto me-2 Link" onClick={signIn}>
            <img
              width={50}
              height={50}
              style={{ objectFit: "cover" }}
              src={"/images/cat-1.webp"}
              alt="drc"
              className="rounded-circle shadow"
            />
          </Link>
        )} */}
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>القائمة</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="flex gap-3 justify-content-start">
          <Container className="p-0 rounded border">
            {links.map((link, index) => {
              return (
                <Col xs={12} onClick={handleClose} key={index}>
                  <Link
                    href={link.href}
                    className={`w-100 Link hover flex-r borde p-3 ${
                      index + 1 !== links.length && "border-b"
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </Col>
              );
            })}
          </Container>
          <Container className="p-0 overflow-hidden border rounded">
            {!session?.user && (
              <Link
                href="#"
                className="w-100 Link hover flex-r p-3 "
                onClick={() => {
                  signIn();
                }}
              >
                <BiLogIn size={"20px"} className="me-2" />
                تسجيل الدخول
              </Link>
            )}
            {session && (
              <>
                <Link
                  href={"/Users/1"}
                  className="w-100 Link hover flex-r p-3 border-"
                >
                  <BsPerson size={"20px"} className="me-2" />
                  حسابي
                </Link>
                {session.user.role === "admin" && (
                  <Link
                    href={"/Products/productsEdit"}
                    className="w-100 Link hover flex-r p-3 border-top"
                  >
                    <BsGear size={"20px"} className="me-2" />
                    تعديل الخدمات
                  </Link>
                )}

                <Link
                  href="/Products/Add"
                  className="w-100 Link hover flex-r p-3 border-top"
                >
                  <BsPlus size={"20px"} className="me-2" />
                  إضافة خدمة
                </Link>
                {!session?.user?.role && <></>}

                <Link
                  href={"#"}
                  className="w-100 Link hover flex-r p-3 border-top"
                  onClick={() => {
                    signOut();
                  }}
                >
                  <BiLogOut size={"20px"} className="me-2" />
                  تسجيل الخروج
                </Link>
              </>
            )}
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navbar;
