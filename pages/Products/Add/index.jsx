import React, { useState } from "react";
import { Col, Container } from "react-bootstrap";

import { productsFeilds } from "../../../data/feilds";
import FormLogic from "../../../component/FormLogic";
import PageLayout from "../../../component/PageLayout";

function AddProduct() {
  const [product, setProduct] = useState({});

  return (
    <PageLayout
      title={"اضافة منتج"}
      role={"SHOP_ADMIN"}
      pageName={"اضافة خدمة"}
    >
      <FormLogic
        formName={"Products"}
        redirect={true}
        route={"Products/*"}
        data={product}
        setData={setProduct}
        feilds={productsFeilds}
        method={"POST"}
        singleImage={false}
      />
    </PageLayout>
  );
}

export default AddProduct;
