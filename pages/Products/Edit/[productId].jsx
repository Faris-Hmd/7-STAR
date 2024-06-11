import React, { useEffect, useState } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import { baseUrl } from "../../_app";
import SpinnerLoading from "../../../component/SpinnerLoading";
import FormLogic from "../../../component/FormLogic";
import { productsFeilds } from "../../../data/feilds";
import PageLayout from "../../../component/PageLayout";

function EditProduct() {
  const router = useRouter();
  const [product, setProduct] = useState();
  const [loading, setIsLoading] = useState(true);

  function getProduct() {
    fetch(baseUrl + "/api/Products/" + router.query.productId)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setProduct(data);
      });
  }

  useEffect(() => {
    if (!router.query.productId) return;
    getProduct();
  }, [router.query]);

  return (
    <>
      <PageLayout
        loading={loading}
        role={"SHOP_ADMIN"}
        title={"تعديل المنتج"}
        pageName={"تعديل الخدمة"}
      >
        <FormLogic
          data={product}
          setData={setProduct}
          feilds={productsFeilds}
          method={"PUT"}
          redirect={true}
          route={"Products/*"}
          singleImage={false}
          formName={"Products"}
        />
      </PageLayout>
    </>
  );
}

export default EditProduct;
