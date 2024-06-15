import React from "react";
import { useState } from "react";
import PageLayout from "../../../component/PageLayout";
import FormLogic from "../../../component/FormLogic";
import { userInfoFeilds } from "../../../data/feilds";
import { getFireDoc } from "../../../lib/getFireData";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";

function EditUser(props) {
  const [userData, setUserData] = useState(props.user);

  return (
    <PageLayout
      title={"تعديل بيانات الحساب "}
      loading={false}
      role={"ADMIN"}
      pageName={"بيانات الحساب"}
    >
      <FormLogic
        data={userData}
        setData={setUserData}
        feilds={[...userInfoFeilds]}
        formName={"Users"}
        method={"PUT"}
        redirect={true}
        singleImage={true}
        route={"/Users/" + props.user.id}
      />
    </PageLayout>
  );
}

export default EditUser;
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  const userInfo = await getFireDoc("users", context.params.userId);
  console.log("ssr for edit user", session?.user.email);

  return {
    props: {
      user: userInfo,
    },
  };
}
