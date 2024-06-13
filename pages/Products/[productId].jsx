import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

import { Button, Card, Carousel, Col, Container } from "react-bootstrap";
import { baseUrl, currentUser } from "../_app";
import PageLayout from "../../component/PageLayout";
import Link from "next/link";
import { BsPencil } from "react-icons/bs";
import { BiCategory, BiPaperPlane } from "react-icons/bi";
import RatingBox from "../../component/RatingBox";
import CartButton from "../../component/CartButton";
import { getRating } from "../../lib/getRating";
import { getProduct, getProductSameCat } from "../../lib/getProduct";
import { getDocsIds } from "../../lib/getDocsIds";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";
import { getUser } from "../../lib/getUser";
import { admins } from "../../data/admins";
import { getAdmins } from "../../lib/getAdmins";
function Product(props) {
  const router = useRouter();
  const [product, setProduct] = useState(props.product || {});
  const [isLoading, setIsLoading] = useState(false);

  async function getProduct(id) {
    setIsLoading(true);
    fetch(`${baseUrl}/api/Products/${router.query.productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
        // console.log(data);
      });
  }
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
  async function deletePro(id) {
    await deleteDoc(doc(db, "products", id), {}).then(() => {
      toast.success("تم الحذف بنجاح");
      // router.reload();
    });
  }

  useEffect(() => {
    if (!router.query.productId) return;
    // getProduct();
  }, [router.query.productId]);

  // useEffect(() => window.scrollTo(0, 0), []);

  return (
    <PageLayout
      role={"ALL"}
      loading={isLoading}
      title={"تفاصيل المنتج"}
      pageName={"تفاصيل الخدمة"}
    >
      <Container
        className="flex-r p-0"
        style={{ justifyContent: "space-between", alignItems: "start" }}
      >
        <Col xs={12} md={7}>
          <Card className="shadow-sm mb-2">
            <Card.Body>
              <Container className="flex-r  p-0">
                <Col xs={12}>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Subtitle className="mb-1 text-muted">
                    <BiCategory /> {product.category} |
                    <span className="text-success text-bold fs-6 ms-2">
                      {product.cost} QAR
                    </span>
                  </Card.Subtitle>
                  {props.admins?.find(
                    (admin) => currentUser?.email === admin?.email
                  ) && (
                    <Container className="p-2 ps-0">
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
                      <Button
                        variant="warning"
                        className="ms-1"
                        href={"Edit/" + product.id}
                      >
                        تعديل
                        <BsPencil className="ms-2" />
                      </Button>
                      <Button
                        className="ms-1"
                        variant="danger"
                        onClick={() => {
                          deletePro(product.id);
                        }}
                      >
                        حذف
                      </Button>
                    </Container>
                  )}
                </Col>
                <Col xs={12}>
                  {product?.images?.length > 0 && (
                    <Carousel className="shadow">
                      {product.images.map((img, index) => {
                        return (
                          <Carousel.Item key={index}>
                            <img
                              height={"300px"}
                              className="d-block w-100 "
                              style={{ objectFit: "cover" }}
                              src={img.url}
                              alt={`${index + 1} slide`}
                            />
                          </Carousel.Item>
                        );
                      })}
                    </Carousel>
                  )}
                  <Container className="p-0 pt-2/"></Container>
                </Col>
                <Col xs={12} className="p-1">
                  <div className="p-2">
                    <Card.Title>نبذة</Card.Title>
                    <Card.Text>{product.breif}</Card.Text>
                    <Card.Title>الوصف</Card.Title>
                    <Card.Text>{product.descreption}</Card.Text>
                    <Card.Title>التفاصيل</Card.Title>
                    <Card.Text>{product.details}</Card.Text>
                  </div>
                </Col>{" "}
                <Col xs={12} className="p-1"></Col>
              </Container>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={5}>
          {" "}
          <CartButton
            product={product}
            productId={router.query.productId && router.query.productId}
          ></CartButton>
          <RatingBox
            productId={router.query.productId && router.query.productId}
            productRating={
              props.rating ? props.rating : { likes: 0, dislikes: 0 }
            }
          />{" "}
          <Container
            className="bg-sec mt-2 shadow-sm p-0 flex-r rounded border"
            style={{ width: "99%" }}
          >
            <Col xs={12} className="mt-2">
              <Container className="flex-r">
                <Col xs={4}>
                  <img
                    src={props.user?.photoUrl}
                    width={"120"}
                    height={"120"}
                    style={{ borderRadius: "50%" }}
                    className="m-2 shadow"
                  />{" "}
                </Col>
                <Col xs={8}>
                  <div>
                    <p>{props.user?.displayName}</p>
                    <p>مطور تطبيقات ويب</p>
                    <p>{product?.userId}</p>
                  </div>
                </Col>
              </Container>
            </Col>
            <Col xs={12} className="p-1">
              <Button className="w-100 wave-2" variant="succss">
                تواصل
              </Button>
            </Col>
          </Container>
        </Col>
        <Col xs={12}>
          <h2 className="text-start p-2">خدمات ذات صلة</h2>
          <Container className="flex-r p-0 p-relative">
            {props.productsBySameCat?.map((product, index) => {
              if (product.id === router.query.productId) return;
              else
                return (
                  <Col key={index} xs={6} lg={3}>
                    <Link href={"/Products/" + product.id} className="Link">
                      <Card className="overflow-hidden product shadow-sm bg-sec">
                        <Card.Img
                          className="rounded-0"
                          style={{ objectFit: "cover" }}
                          loading="lazy"
                          src={product.images[0].url}
                          height={"150px"}
                        />
                        <Card.Body className="p-2">
                          {" "}
                          <Card.Title>
                            <small>{product.name}</small>
                          </Card.Title>
                          <Card.Subtitle className="mb-1 fs-6  text-muted">
                            <small>
                              {" "}
                              {product.category} |
                              <span className="text-success text-bold fs-6  rounded ms-2">
                                {product.cost} QAR
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
        </Col>
      </Container>
    </PageLayout>
  );
}

export default Product;

export async function getStaticProps(context) {
  const rating = await getRating(context.params.productId);
  const product = await getProduct(context.params.productId);
  const productsBySameCat_ = await getProductSameCat(product.category);
  const getUserInfo = await getUser(product.userId);
  const admins = await getAdmins();
  // console.log(productsBySameCat_);
  return {
    props: {
      rating: rating,
      product: product,
      productsBySameCat: productsBySameCat_,
      user: getUserInfo,
      admins,
    },
  };
}

export async function getStaticPaths() {
  const productsIds = await getDocsIds("products");
  const paths = productsIds.map((id) => ({
    params: { productId: id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}
