import React, { useEffect, useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import { baseUrl } from "../_app";
import { useRouter } from "next/router";
import SpinnerLoading from "../../component/SpinnerLoading";

function Article() {
  const router = useRouter();
  const [article, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function getArt() {
    console.log(router.query.artId);
    fetch(`${baseUrl}/api/Articles/${router.query.artId}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setIsLoading(false);
        // console.log(data);
      });
  }

  useEffect(() => {
    if (!router.query.artId) return;
    getArt();
  }, [router.query.artId]);

  useEffect(() => window.scrollTo(0, 0), []);
  if (isLoading) return <SpinnerLoading />;
  if (!isLoading)
    return (
      <Container className="full p-0">
        <Col className="rounde mb-2 bg-sec p-0" xs={12} lg={10}>
          <Card>
            {/* <Card.Header>{article.title}</Card.Header> */}
            <Card.Body className="p-0">
              <Card.Title className="p-2 pt-3">{article.title}</Card.Title>
              {article.images && (
                <Card.Img src={article.images[0].url} height={"300px"} />
              )}
              <Card.Subtitle className="p-2">{article.breif}</Card.Subtitle>

              <Card.Text className="p-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                alias earum libero ex adipisci tenetur illum saepe reprehenderit
                voluptatem explicabo non nemo hic molestiae, numquam ullam enim
                provident magni dicta.
                <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eos alias earum libero ex adipisci tenetur illum saepe
                reprehenderit voluptatem explicabo non nemo hic molestiae,
                numquam ullam enim provident magni dicta.
                <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eos alias earum libero ex adipisci tenetur illum saepe
                reprehenderit voluptatem explicabo non nemo hic molestiae,
                numquam ullam enim provident magni dicta.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    );
}

export default Article;
