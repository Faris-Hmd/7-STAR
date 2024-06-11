import React, { useEffect, useState } from "react";
import { getLocalStorge, setLocalStorge } from "../helper/localStorge";
import { deleteRequest, postRequest } from "../helper/requests";
import {
  Button,
  Col,
  Container,
  FormSelect,
  InputGroup,
} from "react-bootstrap";
import { BsCartPlusFill, BsCartX } from "react-icons/bs";
import {
  CART_PROD_IDS_LS_KEY,
  IS_CART_IDS_VALID_LS_KEY,
  IS_CART_PROD_VALID_LS_KEY,
} from "../pages/Products";
import { baseUrl } from "../pages/_app";

function CartButton({ product, productId }) {
  const [isInCart, setIsInCart] = useState(false);
  const [cartLoading, setCartLoading] = useState(true);
  const [qu, setQu] = useState(1);

  async function addToOrders(product) {
    await postRequest({
      route: "Orders/myOrders",
      payload: [
        {
          name: product.name,
          category: product.category,
          cost: product.cost,
          id: product.id,
          qu: qu,
        },
      ],
    });
  }

  async function checkIsInCart() {
    setCartLoading(true);
    if (getLocalStorge(IS_CART_IDS_VALID_LS_KEY)) {
      const product = getLocalStorge(CART_PROD_IDS_LS_KEY).find(
        (p) => p.productId === productId
      );
      // console.log(product);
      if (product) {
        setQu(product.qu);
        setIsInCart(true);
        setCartLoading(false);
        return;
      } else {
        setIsInCart(false);
        setCartLoading(false);
        return;
      }
    } else {
      try {
        const res = await fetch(`${baseUrl}/api/Cart/${productId}`);
        if (res.ok) {
          const data = await res.json();
          // console.log(data);
          setQu(data.qu);
          setIsInCart(data.status);
          setCartLoading(false);
        } else {
          setCartLoading(false);
        }
      } catch (error) {
        console.log(error);
        setCartLoading(false);
      }
    }
  }

  async function handleAddToCart() {
    postRequest({
      route: "Cart/" + productId,
      payload: {
        qu: parseInt(qu),
      },
      onSuccess: () => {
        setLocalStorge(IS_CART_IDS_VALID_LS_KEY, false);
        setLocalStorge(IS_CART_PROD_VALID_LS_KEY, false);
        checkIsInCart();
      },
    });
  }
  async function handleRemoveFromCart() {
    deleteRequest({
      route: "Cart/" + productId,
      onSuccessCallback: () => {
        setLocalStorge(IS_CART_IDS_VALID_LS_KEY, false);
        setLocalStorge(IS_CART_PROD_VALID_LS_KEY, false);
        checkIsInCart();
      },
    });
  }
  useEffect(() => {
    if (!productId) return;
    checkIsInCart();
  }, [productId]);

  useEffect(() => {
    isInCart === true && handleAddToCart();
  }, [qu]);

  return (
    <Container
      className="flex-r space-btw bg-sec border shadow-sm border rounded overflow-hidden p-2 "
      style={{ width: "99%" }}
    >
      <Col xs={12}>
        <Button
          className="mb-1 shadow w-100"
          variant="success"
          onClick={() => addToOrders(product)}
        >
          اطلب الان
          <span className="ms-2">{/* <BsFillCartCheckFill /> */}</span>
        </Button>
        <hr className="me-2 ms-2"></hr>
      </Col>{" "}
      <Col xs={6}>
        {isInCart ? (
          <Button
            disabled={cartLoading}
            variant="danger"
            className="w-100 shadow"
            onClick={handleRemoveFromCart}
          >
            ازالة من السلة
            <span className="ms-2 pb-3">
              <BsCartX />
            </span>
          </Button>
        ) : (
          <Button
            disabled={cartLoading}
            className="shadow bg-clr w-100 "
            variant="success"
            onClick={handleAddToCart}
          >
            اضافة الى السلة
            <span className="ms-2 mb-2">
              <BsCartPlusFill />
            </span>
          </Button>
        )}{" "}
      </Col>
      <Col xs={5}>
        {" "}
        <InputGroup className="overflow-hidden shadow-sm p-0 rounded border">
          <Button variant="success" className="bg-sec text-muted border-0">
            الكمّية
            <span className="ms-2 me-2">|</span>
          </Button>
          <FormSelect
            className="border-0"
            value={parseInt(qu)}
            onChange={(e) => {
              setQu(e.currentTarget.value);
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </FormSelect>
        </InputGroup>
      </Col>
    </Container>
  );
}

export default CartButton;
