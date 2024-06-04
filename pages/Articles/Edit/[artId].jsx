import React, { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import { baseUrl } from "../../_app";
import SpinnerLoading from "../../../component/SpinnerLoading";
import FormLogic from "../../../component/FormLogic";
import { articlesFeilds } from "../../../data/feilds";
import PageLayout from "../../../component/PageLayout";
function EditArticle() {
  const router = useRouter();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  function getArticle() {
    fetch(baseUrl + "/api/Articles/" + router.query.artId)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setArticle(data);
      });
  }

  useEffect(() => {
    if (!router.query.artId) return;
    getArticle();
  }, [router.query]);

  if (loading) return <SpinnerLoading />;
  if (!loading)
    return (
      <PageLayout title={"تعديل المقالة"} loading={loading} role={"BLOG_ADMIN"}>
        <FormLogic
          data={article}
          setData={setArticle}
          feilds={articlesFeilds}
          redirect={true}
          route={"Articles/*"}
          singleImage={false}
          method={"PUT"}
          formName={"Articles"}
        />
      </PageLayout>
    );
}

export default EditArticle;
