import styles from "../styles/Navbar.module.css";
import { Accordion, Button, Col, Container, Offcanvas } from "react-bootstrap";
import { useContext, useState } from "react";
import { FaBars, FaUsersCog } from "react-icons/fa";
import {
  BsBag,
  BsCart3,
  BsGear,
  BsList,
  BsListOl,
  BsPerson,
  BsPlus,
} from "react-icons/bs";
import { BiHome, BiLogIn, BiLogOut, BiNews, BiStats } from "react-icons/bi";
import Link from "next/link";
import { AuthContext } from "../context/authContext";

const links = [
  {
    name: "الرئيسية",
    href: "/",
    icon: <BiHome size={"20px"} className="me-3" />,
  },
  {
    name: "لوحة التحكم",
    href: "/Dashboard/2024",
    icon: <BiStats size={"20px"} className="me-3" />,
  },
  {
    name: "الخدمات",
    href: "/Products",
    icon: <BsBag size={"20px"} className="me-3" />,
  },
  {
    name: "خدماتي",
    href: "/Products/MyProducts",
    icon: <BsBag size={"20px"} className="me-3" />,
  },
  {
    name: "اضافة خدمة",
    href: "/Products/Add",
    icon: <BsPlus size={"20px"} className="me-3" />,
  },
];

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { user, handleSignOut } = useContext(AuthContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <nav className={styles.nav}>
        <Button variant="" onClick={handleShow} className="over ms-2">
          <FaBars style={{ color: "white" }} />
        </Button>
        <div className={styles.logo}>
          <img width={"30px"} src="/icons/DrAzzaIcon.webp" alt="drc" />
          <span className="p-2 fos-m text-nowrap">خدماتي</span>
        </div>
        {user && (
          <Link href={"/Users/" + user?.id} className="ms-auto me-2 Link">
            <img
              width={"35px"}
              height={"35px"}
              style={{ objectFit: "cover" }}
              src={user?.images[0].url}
              alt="drc"
              className="rounded-circle shadow"
            />
          </Link>
        )}
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
            {/* <Accordion>
              <Accordion.Header>
                <BsGear size={"20px"} className="me-2" /> الاعدادت
              </Accordion.Header>
              <Accordion.Body className="p-1">
                <Accordion.Item className="overflow-hidden">
                  <Link href="/Users" className="hover Link flex-r p-3 ">
                    <FaUsersCog size={"20px"} className="me-2" />
                    المستخدمين
                  </Link>
                </Accordion.Item>
                <Accordion.Item className="overflow-hidden">
                  <Link href="/Users" className="hover Link flex-r p-3">
                    <BiNews size={"20px"} className="me-2" />
                    وسائل التواصل
                  </Link>
                </Accordion.Item>
              </Accordion.Body>
            </Accordion> */}

            {!user && (
              <Link
                href="/Login"
                className="w-100 Link hover flex-r p-3 "
                onClick={() => {}}
              >
                <BiLogIn size={"20px"} className="me-2" />
                تسجيل الدخول
              </Link>
            )}
            {user && (
              <>
                {" "}
                <Link
                  href={"/Users/" + user?.id}
                  className="hover Link flex-r p-3 border-top"
                  onClick={handleClose}
                >
                  <BsPerson size={"20px"} className="me-2" />
                  حسابي
                </Link>
                <Link
                  href="/#"
                  className="w-100 Link hover flex-r p-3 border-top"
                  onClick={() => {
                    handleSignOut();
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
