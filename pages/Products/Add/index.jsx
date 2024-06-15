import React, { useState } from "react";
import { productsFeilds } from "../../../data/feilds";
import FormLogic from "../../../component/FormLogic";
import PageLayout from "../../../component/PageLayout";
import { useSession } from "next-auth/react";

function AddProduct() {
  const { data: session, status } = useSession();

  const [product, setProduct] = useState({ userId: session.user.id });

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
