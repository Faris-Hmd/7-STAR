import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Container } from "react-bootstrap";
import { baseUrl } from "../_app";
import PageLayout from "../../component/PageLayout";
import Link from "next/link";
import { BsPencil } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import RatingBox from "../../component/RatingBox";
import CartButton from "../../component/CartButton";
import { getRating } from "../../lib/getRating";
import { getProduct, getProductSameCat } from "../../lib/getProduct";
import { getDocsIds } from "../../lib/getDocsIds";
import { FaWhatsapp } from "react-icons/fa";

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
      <Container>
        <Col xs={12} lg={12}>
          <Card className="shadow-sm ">
            <Card.Body className="p-0 w-100">
              <Container className="flex-r flex-rev p-0">
                <Col xs={12} lg={6}>
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
                  <Container className="p-3 flex-r gap-2">
                    <Col xs={5}>
                      <Button variant="success" className="w-100">
                        تواصل
                        <FaWhatsapp className="ms-2" />
                      </Button>
                    </Col>
                    <Col xs={5}>
                      <Button
                        variant="warning"
                        className="w-100"
                        href={"Edit/" + product.id}
                      >
                        تعديل
                        <BsPencil className="ms-2" />
                      </Button>
                    </Col>{" "}
                    <Col>
                      <RatingBox
                        productId={
                          router.query.productId && router.query.productId
                        }
                        productRating={
                          props.rating
                            ? props.rating
                            : { likes: 0, dislikes: 0 }
                        }
                      />
                    </Col>
                  </Container>
                </Col>
                <Col xs={12} lg={6} className="p-1">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Subtitle className="mb-1 text-muted">
                    <BiCategory /> {product.category} |
                    <span className="text-success text-bold fs-6 ms-2">
                      {product.cost} ج.س
                    </span>
                  </Card.Subtitle>
                  <div className="p-2">
                    <Card.Title>نبذة</Card.Title>
                    <Card.Text>{product.breif}</Card.Text>
                    <Card.Title>الوصف</Card.Title>
                    <Card.Text>{product.descreption}</Card.Text>
                    <Card.Title>التفاصيل</Card.Title>
                    <Card.Text>{product.details}</Card.Text>
                  </div>
                  <hr className="me-2 mt"></hr>
                </Col>{" "}
                <Col xs={12} className="p-1">
                  {/* <CartButton
                    product={product}
                    productId={router.query.productId && router.query.productId}
                  /> */}
                </Col>
              </Container>
            </Card.Body>
          </Card>
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
                          src={product.img}
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
  // console.log(productsBySameCat_);
  return {
    props: {
      rating: rating,
      product: product,
      productsBySameCat: productsBySameCat_,
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
