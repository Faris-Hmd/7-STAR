import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Col, Row } from "react-bootstrap";

const links = [
  {
    name: "الرئيسة",
    href: "/",
  },
  {
    name: "المتجر",
    href: "/Products",
  },
  {
    name: "المدونة",
    href: "/Articles",
  },

  {
    name: "سلة المشتريات",
    href: "/Products/Cart",
  },
];
export function TopNav() {
  const router = useRouter();

  return (
    <Row className="bg-sec flex-r border-b">
      {links.map((link, index) => {
        return (
          <Col key={index}>
            <div
              className={`rounded ${
                router.route === link.href ? "active-link rounded-0" : ""
              } p-1 ms-1 flex link-hover `}
            >
              <Link className="Link " href={link.href}>
                {link.name}
              </Link>{" "}
            </div>
          </Col>
        );
      })}
    </Row>
  );
}
