import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { FillterForm } from "../../component/FillterForm";
import { getRequest } from "../../helper/requests";
import PageLayout from "../../component/PageLayout";
import { getLocalStorge, setLocalStorge } from "../../helper/localStorge";
import { getFireDocs, getFireDocsQuery } from "../../lib/getFireData";
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
    // getCartProducts();
  }, []);
  // console.log(dates);

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
        {" "}
        <div className="album py-3 bg-body-tertiary">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {fillteredProducts.map((product, index) => {
                // const currentProduct = cartProducts.find(
                //   (p) => p.productId === product.id
                // );
                return (
                  <div className="col">
                    <div className="card shadow-sm">
                      <Link href={"/Products/" + product.id} className="Link">
                        <img
                          className="bd-placeholder-img card-img-top object-cover"
                          width="100%"
                          height="225"
                          src={product.images[0]?.url}
                          role="img"
                          aria-label="Placeholder: صورة مصغرة"
                          preserveAspectRatio="xMidYMid slice"
                          focusable="false"
                          style={{ objectFit: "cover" }}
                        />

                        <div className="card-body">
                          <p>{product?.name}</p>
                          <p className="card-text">
                            هذه بطاقة أوسع مع نص داعم أدناه كمقدمة طبيعية لمحتوى
                            إضافي. هذا المحتوى أطول قليلاً.
                          </p>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="text-success">
                              QAR {product.cost}
                            </div>
                            <small className="text-body-secondary">
                              {product?.category}
                            </small>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default Products;

export async function getStaticProps() {
  console.log("ssg for Products");
  const products = await getFireDocsQuery("products", "publish", "==", true);

  return {
    props: { products },
    revalidate: 10,
  };
}
