import React, { useState } from "react";

import FormLogic from "../../../component/FormLogic";
import { productsFeilds } from "../../../data/feilds";
import PageLayout from "../../../component/PageLayout";
import { getFireDoc } from "../../../lib/getFireData";

function EditProduct(props) {
  const [product, setProduct] = useState(props.product);

  return (
    <>
      <PageLayout
        loading={false}
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
export async function getServerSideProps(context) {
  const product = await getFireDoc("products", context.params.productId);
  console.log(product);
  console.log("ssr for edit products");

  return {
    props: {
      product,
    },
  };
}
