import styles from "../styles/Navbar.module.css";
import { Button, Col, Collapse, Container, Offcanvas } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp, FaBars } from "react-icons/fa";
import { BsBag, BsGear, BsPerson, BsPlus } from "react-icons/bs";
import {
  BiDownArrow,
  BiDownArrowAlt,
  BiHome,
  BiLogIn,
  BiLogOut,
  BiNews,
  BiStats,
} from "react-icons/bi";
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
  const [collapesState, setCollapesState] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
      setCollapesState(false);
    } else {
      setIsMobile(false);
      setCollapesState(true);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    console.log(session?.user);
  });
  // console.log(session);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg w-100"
        data-bs-theme="dark"
        style={{ position: "fixed", zIndex: "10" }}
      >
        <div className="container">
          <Button variant="l" style={{ color: "white" }} onClick={handleShow}>
            <FaBars size="23px" />
          </Button>
          {session?.user && (
            <Link
              href={"/Users/" + session?.user?.id}
              className="Link nav-link"
            >
              <div style={{ color: "white" }}>
                <img
                  width={40}
                  height={40}
                  style={{ objectFit: "cover" }}
                  alt="drc"
                  className="rounded-circle shadow me-3"
                  src={session?.user.image}
                />
                {/* {session?.user?.name} */}
              </div>
            </Link>
          )}
          <Link
            className="navbar-brand ms-auto Link nav-link"
            href="/"
            style={{ color: "white", cursor: "pointer" }}
          >
            <img
              src="https://www.the7stars.co.uk/site/templates/assets/images/logo.svg"
              width="30"
              height="40"
              alt="Logo"
              className="d-inline-block align-text-center me-auto"
            />
            سبعة نجوم
          </Link>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ color: "white", outline: "none" }}
            onClick={() => {
              setCollapesState((prev) => !prev);
            }}
          >
            <span className="navbar-toggler-ico">
              {collapesState ? (
                <FaAngleUp size={25} />
              ) : (
                <FaAngleDown size={25} />
              )}
            </span>
          </button>

          <Collapse in={collapesState} id="navbarNav" className="w-100">
            <div class="collapse navbar-collapse p-2 w-100" id="navbarNav">
              <ul class="navbar-nav ms-aut -0 p-3">
                <li
                  class="nav-item"
                  onClick={() => {
                    isMobile && setCollapesState(false);
                  }}
                >
                  <a class="nav-link" aria-current="page" href="/#">
                    الرئيسية
                  </a>
                </li>
                <li
                  class="nav-item"
                  onClick={() => {
                    isMobile && setCollapesState(false);
                  }}
                >
                  <Link class="nav-link" href="/#categories">
                    التصنيفات
                  </Link>
                </li>
                <li
                  class="nav-item"
                  onClick={() => {
                    isMobile && setCollapesState(false);
                  }}
                >
                  <Link class="nav-link" href="/#our-vision">
                    رؤيتنا
                  </Link>
                </li>

                <li
                  class="nav-item"
                  onClick={() => {
                    isMobile && setCollapesState(false);
                  }}
                >
                  <Link class="nav-link" href="/#what-clients-say">
                    رأى عملائنا
                  </Link>
                </li>

                <li
                  class="nav-item"
                  onClick={() => {
                    isMobile && setCollapesState(false);
                  }}
                >
                  <Link class="nav-link" href="/#contact">
                    تواصل معنا
                  </Link>
                </li>
                <li
                  class="nav-item"
                  onClick={() => {
                    isMobile && setCollapesState(false);
                  }}
                >
                  <Link class="nav-link" href="/#why-choose-us">
                    لماذا تختارنا
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </div>
      </nav>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="start"
        className="rtl"
      >
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
                {session?.user?.role === "admin" && (
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
