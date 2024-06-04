import React from "react";
import { baseUrl } from "../_app";
import { useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import { useState } from "react";

function MyOrders() {
  const [orsers, setOrders] = useState([]);
  const getOrders = async () => {
    const res = await fetch(baseUrl + "/api/Orders/myOrders");
    if (res.ok) {
      const data = await res.json();
      setOrders(data);
      console.log(data);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      {orsers.length && (
        <Container>
          {orsers.map((order, index) => {
            return <Col id={index}>{order.totalCost}</Col>;
          })}
        </Container>
      )}
    </div>
  );
}

export default MyOrders;
