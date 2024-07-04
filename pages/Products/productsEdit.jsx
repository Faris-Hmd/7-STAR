import Link from "next/link";
import React, { useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import { FillterForm } from "../../component/FillterForm";
import PageLayout from "../../component/PageLayout";
import { getFireDocs } from "../../lib/getFireData";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { BsEye, BsEyeSlash } from "react-icons/bs";

function MyProducts(props) {
  const [products, setProduct] = useState(props.products || []);
  const [fillteredProducts, setFillteredProducts] = useState(
    props.products || []
  );
  const [cartProducts, setCartProductsIds] = useState([]);

  return (
    <>
      <PageLayout
        loading={false}
        navComp={
          <Container className="flex-r p-0">
            <Col xs={12}>
              <FillterForm
                data={products}
                setFillterdData={setFillteredProducts}
                fillterBy={"name"}
              />
            </Col>
          </Container>
        }
        role={"ALL"}
        pageName="تعديل الخدمات"
      >
        {fillteredProducts.length > 0 ? (
          <ProductsContainer />
        ) : (
          <div style={{ minHeight: "65vh" }} className="flex">
            <h2 className="text-center h-100 full">لا توجد منتجات</h2>
          </div>
        )}
      </PageLayout>
    </>
  );

  function ProductsContainer() {
    return (
      <Container className="flex-r p-0 p-relative">
        {fillteredProducts.map((product, index) => {
          const currentProduct = cartProducts.find(
            (p) => p.productId === product.id
          );
          return (
            <Col key={index} xs={6} lg={3}>
              <Link
                href={"/Products/" + product.id}
                className="Link p-relative flex-r "
              >
                {product?.publish ? (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "50px",
                      left: "20px",
                      zIndex: "9",
                    }}
                  >
                    <BsEye />
                  </div>
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "44px",
                      left: "20px",
                      zIndex: "9",
                    }}
                  >
                    <BsEyeSlash />
                  </div>
                )}

                <Card className="overflow-hidden product shadow-sm bg-sec w-100">
                  <Card.Img
                    className="rounded-0 "
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                    src={product.images[0]?.url}
                    height={"150px"}
                  />
                  <Card.Body className="p-2">
                    {" "}
                    <Card.Title>
                      <small>{product.name}</small>
                    </Card.Title>
                    {currentProduct && <div className="fav-star">0</div>}
                    <Card.Subtitle className="mb-1 fs-6  text-muted">
                      <small>
                        {product.category} |
                        <span className="text-success text-bold fs-6  rounded ms-2">
                          {product.cost} ج.س
                        </span>
                      </small>
                    </Card.Subtitle>
                    {/* <Card.Text>{product.breif}</Card.Text> */}
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Container>
    );
  }
}

export default MyProducts;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  console.log("ssr for MyProducts");
  const products = await getFireDocs("products");

  return {
    props: {
      products,
    },
  };
}
