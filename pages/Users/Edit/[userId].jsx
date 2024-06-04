import React, { useEffect } from "react";
import { useState } from "react";
import PageLayout from "../../../component/PageLayout";
import FormLogic from "../../../component/FormLogic";
import { useRouter } from "next/router";
import { baseUrl } from "../../_app";
import { userInfoFeilds } from "../../../data/feilds";

function EditUser() {
  const userFeilds = [
    {
      name: "displayName",
      placeholder: "اسم المستخدم",
      type: "text",
    },
    {
      name: "email",
      placeholder: "البريد الالكتروني",
      type: "email",
    },
    {
      name: "password",
      placeholder: "كلمة المرور",
      type: "password",
    },
    {
      name: "passwordConfirm",
      placeholder: "تأكيد كلمة المرور ",
      type: "password",
    },
    {
      name: "role",
      placeholder: "نوع الصلاحية",
      type: "select",
      options: [
        { value: "ADMIN" },
        { value: "SHOP_ADMIN" },
        { value: "BLOG_ADMIN" },
      ],
    },
  ];
  const router = useRouter();
  const [userData, setUserData] = useState({});

  const [loading, setLoading] = useState(true);

  const userId = router.query.userId;
  async function getUserInfo() {
    try {
      const res = await fetch(baseUrl + "/api/Users/" + userId);
      const data = await res.json();
      if (res.ok) {
        setLoading(false);
        setUserData(data);

        // console.log(data);
      } else {
        setLoading(false);
        toast.error(data.msg);
      }
    } catch (error) {
      setLoading(false);
      toast.error("حصل خطأ في العملية");
      console.log(error);
    }
  }

  useEffect(() => {
    router.query.userId && getUserInfo();
  }, [router.query]);
  return (
    <PageLayout title={"تعديل بيانات الحساب "} loading={loading} role={"ADMIN"}>
      <FormLogic
        data={userData}
        setData={setUserData}
        feilds={[...userInfoFeilds]}
        formName={"Users"}
        method={"PUT"}
        redirect={true}
        singleImage={true}
        route={"/Users/" + userId}
      />
    </PageLayout>
  );
}

export default EditUser;
