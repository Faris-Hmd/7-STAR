import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getRequest } from "../../../helper/requests";
import PageLayout from "../../../component/PageLayout";

const today = new Date("2023/12/1");
const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  async function getOrders(params) {
    const { data, error } = await getRequest({
      route: `Orders/myOrders?timeStamp=${today.getTime()}&&userId=2`,
      onSuccessCallback: () => {
        setLoading(false);
      },
      onFeildCallback: () => {
        setLoading(false);
      },
    });
    if (data) {
      console.log(data);
      setOrders(data);
    }
  }
  useEffect(() => {
    getOrders();
  }, []);
  useEffect(() => {
    console.log(orders);
  }, [orders]);
  return <PageLayout pageName={"طلباتي"} loading={loading}></PageLayout>;
};

export default MyOrders;
