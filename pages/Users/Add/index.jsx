import React from "react";
import { useState } from "react";
import { postRequest } from "../../../helper/requests";
import PageLayout from "../../../component/PageLayout";
import FormLogic from "../../../component/FormLogic";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";

function AddUser() {
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

  const [user, setUser] = useState({});

  async function createNewUser(e) {
    e.preventDefault();
    const res = await createUserWithEmailAndPassword(
      auth,
      "black@gmail.com",
      "123456"
    );

    // setLoading(true);

    postRequest({
      route: "Users/*",
      payload: user,
      onSuccess: () => {
        setShow(false);
        setLoading(false);
        setUser({});
      },
      onFeild: () => {
        setLoading(false);
      },
    });
  }
  return (
    <PageLayout title={"اضافة مستخدم جديد"} role={"ADMIN"}>
      <FormLogic
        data={user}
        setData={setUser}
        feilds={userFeilds}
        formName={"Users"}
        method={"POST"}
        redirect={true}
        singleImage={true}
        route={"/Users/*"}
      />
    </PageLayout>
  );
}

export default AddUser;
