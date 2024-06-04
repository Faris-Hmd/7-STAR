import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Dropdown, Modal } from "react-bootstrap";
import { baseUrl } from "../_app";
import { FillterForm } from "../../component/FillterForm";
import { deleteRequest, getRequest, postRequest } from "../../helper/requests";
import PageLayout from "../../component/PageLayout";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getLocalStorge, setLocalStorge } from "../../helper/localStorge";
import {
  CART_PROD_LS_KEY,
  IS_CART_IDS_VALID_LS_KEY,
  IS_CART_PROD_VALID_LS_KEY,
} from ".";
function Products() {
  const [products, setProduct] = useState([]);
  const [toCost, setToCost] = useState(0);
  const [fillteredProducts, setFillteredProducts] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productId, setProductId] = useState("");

  async function addToOrders() {
    const orderList = products.map((p) => {
      return {
        name: p.name,
        category: p.category,
        cost: p.cost,
        id: p.id,
        qu: p.qu,
      };
    });
    await postRequest({
      route: "Orders/myOrders",
      payload: orderList,
    });
  }

  async function getProducts() {
    setIsLoading(true);

    fetch(`${baseUrl}/api/Cart`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setProduct(data);
        setFillteredProducts(data);
        setIsLoading(false);
        setLocalStorge(CART_PROD_LS_KEY, data);
        setLocalStorge(IS_CART_PROD_VALID_LS_KEY, true);
      });
  }

  async function handleDelete() {
    setShowDeleteModal(false);
    deleteRequest({
      route: `Cart/${productId}`,
      onSuccessCallback: () => {
        getProducts();
        setLocalStorge(IS_CART_IDS_VALID_LS_KEY, false);
        setLocalStorge(IS_CART_PROD_VALID_LS_KEY, false);
      },
      onFeildCallback: () => {},
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (getLocalStorge(IS_CART_PROD_VALID_LS_KEY)) {
      const data = getLocalStorge(CART_PROD_LS_KEY)
        ? getLocalStorge(CART_PROD_LS_KEY)
        : [];
      setProduct(data);
      setFillteredProducts(data);
      setIsLoading(false);
      return;
    } else {
      getProducts();
    }
    getProducts();
  }, []);
  useEffect(() => {
    let tc = 0;
    for (let product of products) {
      tc = product.cost * product.qu + tc;
    }
    setToCost(tc);
  }, [products]);

  return (
    <>
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        className="rtl"
      >
        <Modal.Header closeButton>
          <Modal.Title>هل انت متأكد ؟</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowDeleteModal(false)}>
            الغاء
          </Button>
          <Button onClick={handleDelete} variant="danger">
            حذف
          </Button>
        </Modal.Footer>
      </Modal>

      <PageLayout
        loading={loading}
        title={"سلة المشتريات"}
        role={"ALL"}
        pageName={"سلة المشتريات"}
        navComp={<Button variant="خ">اجمالي المبلغ = {toCost} ج.س </Button>}
      >
        {!loading && fillteredProducts.length > 0 ? (
          <ProductsContainer />
        ) : (
          <h2 className="text-center h-100 full"> لا توجد منتجات </h2>
        )}
      </PageLayout>
    </>
  );

  function ProductsContainer() {
    return (
      <Container className="flex-r p-0">
        {fillteredProducts.map((product, index) => {
          return (
            <Col key={index} xs={6} lg={3}>
              <Card className="overflow-hidden product">
                <Card.Img
                  className="rounded-0"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                  src={product.img}
                  height={"150px"}
                />
                <Card.Body>
                  <Container className="p-0 flex-r">
                    <Col xs={10}>
                      <Card.Title>{product.name}</Card.Title>
                    </Col>
                    <Col xs={2}>
                      <Dropdown>
                        <Dropdown.Toggle variant="g" className="ms-1">
                          <BsThreeDotsVertical size={"18"} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => {
                              setShowDeleteModal(true);
                              setProductId(product.id);
                            }}
                          >
                            حذف من السلة
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Container>

                  <Card.Subtitle className="mb-1 text-muted">
                    {product.category}
                  </Card.Subtitle>
                  <Container className="flex-r p-0">
                    <Col xs={5} className="flex-r justify-content-start">
                      <Link
                        href={`/Products/${product.id}`}
                        className="Link bg-clr p-1 rounded shadow w-100 text-center"
                      >
                        تفاصيل
                      </Link>
                    </Col>
                    <Col xs={7}>
                      <div className="p-1  rounded text-end">
                        <span className="text-success text-bold fs-5 ">
                          {" "}
                          ${product.cost}
                        </span>
                        <span>* {product.qu}</span>
                      </div>
                    </Col>
                  </Container>
                  {/* <Card.Text>{product.breif}</Card.Text> */}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
        <Col xs={11}>
          <Button onClick={addToOrders} variant="success" className="w-100">
            {" "}
            اتمام الطلب
          </Button>
        </Col>
      </Container>
    );
  }
}

export default Products;

// export async function getStaticProps() {
//   const data = await fetch(`${baseUrl}/api/Products?keyword=all`);
//   const products = await data.json();

//   return {
//     props: {
//       products: products,
//     },
//   };
// }
