import React, { useEffect, useState } from "react";
import FormLogic from "../../component/FormLogic";
import { baseUrl } from "../_app";
import { toast } from "react-toastify";

import PageLayout from "../../component/PageLayout";
import { userInfoFeilds } from "../../data/feilds";
import { useRouter } from "next/router";
import { Card } from "react-bootstrap";

function MyAccount() {
  const router = useRouter();
  const [userInfo, setUserinfo] = useState({});
  const [loading, setIsLoading] = useState(true);
  const userId = router.query.userId;
  async function getUserInfo() {
    try {
      const res = await fetch(baseUrl + "/api/Users/" + userId);
      const data = await res.json();
      if (res.ok) {
        setIsLoading(false);
        setUserinfo(data);
        // console.log(data);
      } else {
        setIsLoading(false);
        toast.error(data.msg);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("حصل خطأ في العملية");
      console.log(error);
    }
  }

  useEffect(() => {
    router.query.userId && getUserInfo();
  }, [router.query]);

  return (
    <PageLayout
      title={"حسابي"}
      loading={loading}
      linkRoute={"/Users/Edit/" + userId}
      linkText={"تعديل"}
      role={"ALL"}
    >
      <Card>
        {userInfo?.images && (
          <Card.Img
            height={"200px"}
            style={({ objectFit: "cover" }, { maxWidth: "200px" })}
            className="rounded-circle m-auto shadow"
            src={userInfo?.images[0]?.url}
          />
        )}
        <Card.Body>
          <Card.Title>{userInfo.displayName}</Card.Title>
          <Card.Subtitle>{userInfo.role}</Card.Subtitle>
          <Card.Subtitle>{userInfo.email}</Card.Subtitle>
          <Card.Title>{userInfo?.bio}</Card.Title>
        </Card.Body>
      </Card>
    </PageLayout>
  );
}

export default MyAccount;
