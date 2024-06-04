import React, { useState } from "react";
import { Col, Container } from "react-bootstrap";
import { useEffect } from "react";
import { getLocalStorge } from "../../../helper/localStorge";
import FormLogic from "../../../component/FormLogic";
import { articlesFeilds } from "../../../data/feilds";
import PageLayout from "../../../component/PageLayout";

function AddArticle() {
  const [article, setArticle] = useState({});

  useEffect(() => {
    getLocalStorge("article") && setArticle(getLocalStorge("article"));
  }, []);

  return (
    <PageLayout title={"اضافة مقالة"} role={"BLOG_ADMIN"}>
      <FormLogic
        formName={"Articles"}
        route={"Articles/*"}
        redirect={true}
        data={article}
        setData={setArticle}
        feilds={articlesFeilds}
        method={"POST"}
        singleImage={false}
      />
    </PageLayout>
  );
}

export default AddArticle;
