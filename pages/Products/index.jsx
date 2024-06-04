import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import { FillterForm } from "../../component/FillterForm";
import { getRequest } from "../../helper/requests";
import PageLayout from "../../component/PageLayout";
import { BsPlusLg } from "react-icons/bs";
import { getLocalStorge, setLocalStorge } from "../../helper/localStorge";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
// console.log(baseUrl);
export const IS_CART_IDS_VALID_LS_KEY = "isCartIdsValid";
export const CART_PROD_IDS_LS_KEY = "cartProdIds";
export const CART_PROD_LS_KEY = "cartProd";
export const IS_CART_PROD_VALID_LS_KEY = "isCartProdValid";
function Products(props) {
  const [products, setProduct] = useState(props.products || []);
  const [fillteredProducts, setFillteredProducts] = useState(
    props.products || []
  );
  const [cartProducts, setCartProductsIds] = useState([]);
  const [loading, setIsLoading] = useState(false);

  async function getProducts() {
    setIsLoading(true);
    const { data, error } = await getRequest({
      route: "Products?keyword=all",
    });
    if (data) {
      setProduct(data);
      setFillteredProducts(data);
      setIsLoading(false);
    } else if (error) {
      console.log(error);
    }
  }
  async function getCartProducts() {
    if (getLocalStorge(IS_CART_IDS_VALID_LS_KEY)) {
      setCartProductsIds(getLocalStorge(CART_PROD_IDS_LS_KEY));
      return;
    }

    const { data, error } = await getRequest({
      route: "Cart/ids",
    });
    if (data) {
      setLocalStorge(CART_PROD_IDS_LS_KEY, data);
      setLocalStorge(IS_CART_IDS_VALID_LS_KEY, true);
      setCartProductsIds(data);
    } else if (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    // getProducts();
    getCartProducts();
  }, []);
  // console.log(dates);

  return (
    <>
      <PageLayout
        loading={loading}
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
        {!loading && fillteredProducts.length > 0 ? (
          <ProductsContainer />
        ) : (
          <h2 className="text-center h-100 full">لا توجد منتجات</h2>
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
              <Link href={"Products/" + product.id} className="Link">
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
                    {currentProduct && <div className="fav-star">0</div>}
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
    );
  }
}

export default Products;

export async function getStaticProps() {
  console.log("ssg for Products");
  // const { collection, getDocs } = await import {"firebase/firestore"};
  const querySnapShot = await getDocs(collection(db, "products"));
  const products = querySnapShot.docs.map((product) => {
    return {
      name: product.data().name,
      cost: product.data().cost,
      category: product?.data()?.category,
      img: product.data().images[0]?.url,
      id: product.id,
    };
  });
  return {
    props: { products },
  };
}

/*
   <Dropdown>
                        <Dropdown.Toggle variant="g" className="ms-1">
                          <BsThreeDotsVertical size={"18"} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="ms-3">
                          <Dropdown.Item href={"/Products/Edit/" + product.id}>
                            تعديل
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setShowDeleteModal(true);
                              setProductId(product.id);
                            }}
                          >
                            حذف
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      */
