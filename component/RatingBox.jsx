import { Button, Col, Container } from "react-bootstrap";
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import { deleteRequest, getRequest, postRequest } from "../helper/requests";
import { useEffect, useState } from "react";

function RatingBox({ productRating, productId }) {
  const [myRating, setMyRating] = useState(null);
  async function getMyrating() {
    const { data, err } = await getRequest({
      route: "Rating/MyRating/" + productId,
    });
    data && setMyRating(data.rating);

    // console.log(data);
  }
  async function handleLike() {
    if (myRating === "like") {
      deleteRequest({
        route: "Rating/MyRating/" + productId,

        onSuccessCallback: () => {
          getMyrating();
        },
      });
    } else {
      postRequest({
        route: "Rating/MyRating/" + productId,

        payload: { rating: "like" },
        onSuccess: () => {
          getMyrating();
        },
      });
    }
  }
  async function handleDislike() {
    if (myRating === "dislike") {
      deleteRequest({
        route: "Rating/MyRating/" + productId,

        onSuccessCallback: () => {
          getMyrating();
        },
      });
    } else {
      postRequest({
        route: "Rating/MyRating/" + productId,

        payload: { rating: "dislike" },
        onSuccess: () => {
          getMyrating();
        },
      });
    }
  }

  useEffect(() => {
    // getMyrating();
  }, []);

  return (
    <Container
      className="bg-sec border shadow-sm rounded mt-2"
      style={{ width: "99%" }}
    >
      <Col>
        <h4 className="text-start p-1">قم بتقييم الخدمة</h4>
      </Col>

      <Col>{/* <RatingBar productRating={productRating} /> */}</Col>
      <Col>
        <Button
          variant=""
          className={`${
            (myRating === "dislike" || myRating === null) && "text-muted"
          }`}
          onClick={handleLike}
        >
          <div>
            <span className="ms-1 me-2">اعجبني</span>
            {myRating === "like" ? <FaThumbsUp /> : <FaRegThumbsUp />}
            <div>42K</div>
          </div>
        </Button>
        <span className="ms-2 me-2"> |</span>
        <Button
          variant=""
          className={`${
            (myRating === "like" || myRating === null) && "text-muted"
          }`}
          onClick={handleDislike}
        >
          <div>
            <span className="ms-1 me-2">لم يعجبني</span>
            {myRating === "dislike" ? <FaThumbsDown /> : <FaRegThumbsDown />}
            <div>2K</div>
          </div>
        </Button>{" "}
      </Col>
    </Container>
  );
}

function RatingBar({ productRating }) {
  const allRating = productRating?.likes + productRating?.dislikes;
  // console.log((productRating.likes / allRating) * 100);
  // console.log((productRating.dislikes / allRating) * 100);

  return (
    <div className="flex-r w-100 rounded overflow-hidden mt-2 shadow-sm ">
      {productRating?.likes ? (
        <Button
          variant="success"
          style={{ width: `${(productRating.likes / allRating) * 100}%` }}
        >
          <small>
            {" "}
            {productRating.likes}
            <span className="ms-2 me-2">|</span>
            <FaThumbsUp />
          </small>
        </Button>
      ) : (
        <></>
      )}

      {productRating?.dislikes ? (
        <Button
          variant="warning"
          style={{ width: `${(productRating.dislikes / allRating) * 100}%` }}
        >
          <small>
            {" "}
            {productRating.dislikes}
            <span className="ms-2 me-2">|</span>
            <FaThumbsDown />
          </small>
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default RatingBox;
