import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase/firebase";
import { FillterForm } from "../../component/FillterForm";
import PageLayout from "../../component/PageLayout";
import {
  Card,
  Col,
  Container,
  Row,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { BiPaperPlane } from "react-icons/bi";

function SpecialOffers(props) {
  const router = useRouter();
  const [products, setProduct] = useState(props.products || []);
  const [fillteredProducts, setFillteredProducts] = useState(
    props.products || []
  );

  async function makeOffer(id, offerDegree) {
    await updateDoc(doc(db, "products", id), {
      offer: offerDegree,
    }).then(() => {
      toast.success("تم الاضافة بنجاح");
      router.reload();
    });
  }
  async function publish(id, isPublish) {
    await updateDoc(doc(db, "products", id), {
      isPublish: isPublish,
    }).then(() => {
      toast.success("تم الاضافة بنجاح");
      router.reload();
    });
  }

  return (
    <>
      <PageLayout
        loading={false}
        title={"الخدمات"}
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
        pageName="الخدمات"
      >
        {fillteredProducts.length > 0 ? (
          <ProductsContainer />
        ) : (
          <h2 className="text-center h-100 full">لا توجد منتجات</h2>
        )}
      </PageLayout>
    </>
  );
  function ProductsContainer() {
    return (
      <Container className="flex-r p-0 p-relative ">
        {fillteredProducts.map((product, index) => {
          return (
            <Col key={index} xs={12} lg={4} md={6}>
              <Card className="overflow-hidden shadow-sm bg-sec m-1">
                {" "}
                <Container className="flex-r p-0">
                  <Col xs={4}>
                    <Link href={"/Products/" + product.id} className="Link">
                      <Card.Img
                        className="rounded-0"
                        style={{ objectFit: "cover" }}
                        loading="lazy"
                        src={product.img}
                        height={"150px"}
                      />
                    </Link>
                  </Col>
                  <Col xs={8}>
                    <Container>
                      <Row>
                        {" "}
                        <Col xs={12}>
                          {" "}
                          <Card.Body className="p-2">
                            {" "}
                            <Card.Title>
                              <small>{product.name}</small>
                            </Card.Title>
                            <Card.Subtitle className="mb-1 fs-6  text-muted">
                              <small>
                                {" "}
                                {product?.category} |
                                <span className="text-success text-bold fs-6  rounded ms-2">
                                  {product.cost} ج.س
                                </span>
                              </small>
                            </Card.Subtitle>
                            {/* <Card.Text>{product.breif}</Card.Text> */}
                          </Card.Body>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} lg={10}>
                          {product.offer ? (
                            <Button
                              variant="danger"
                              onClick={() => {
                                makeOffer(product.id, false);
                              }}
                              className="me-1"
                            >
                              <small>ازالة التمييز</small>
                            </Button>
                          ) : (
                            <Button
                              variant="success"
                              onClick={() => {
                                makeOffer(product.id, true);
                              }}
                              className="me-1"
                            >
                              <small>تمييز</small>
                            </Button>
                          )}
                          {!product.isPublish ? (
                            <Button
                              variant="success"
                              onClick={() => {
                                publish(product.id, true);
                              }}
                            >
                              نشر
                              <BiPaperPlane className="ms-1" />{" "}
                            </Button>
                          ) : (
                            <Button
                              variant="danger"
                              onClick={() => {
                                publish(product.id, false);
                              }}
                            >
                              <small>عدم النشر</small>
                            </Button>
                          )}
                          <ButtonGroup className="mt-1 w-100"></ButtonGroup>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Container>
              </Card>
            </Col>
          );
        })}
      </Container>
    );
  }
}

export default SpecialOffers;

export async function getStaticProps() {
  console.log("ssg for specialOffers");
  const querySnapShot = await getDocs(collection(db, "products"));
  const products = querySnapShot.docs.map((product) => {
    return {
      name: product.data().name,
      cost: product.data().cost,
      category: product?.data()?.category || "",
      img: product?.data().images[0]?.url || "",
      id: product.id,
      offer: product?.data()?.offer || false,
      isPublish: product?.data()?.isPublish || false,
    };
  });
  return {
    props: { products },
    revalidate: 10,
  };
}
