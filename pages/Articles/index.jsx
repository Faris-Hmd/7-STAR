import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Modal,
  Row,
} from "react-bootstrap";
import Link from "next/link";
import { baseUrl } from "../_app";
import { FillterForm } from "../../component/FillterForm";
import { BsThreeDotsVertical } from "react-icons/bs";
import { deleteRequest } from "../../helper/requests";
import PageLayout from "../../component/PageLayout";

function Articles(props) {
  const [articles, setArticles] = useState([]);
  const [fillteredArticles, setFillteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [artId, setArtId] = useState("");

  async function getArticles() {
    fetch(`${baseUrl}/api/Articles?keyword=all`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setArticles(data);
        setFillteredArticles(data);
        setLoading(false);
      });
  }

  async function handleDelete() {
    setShowDeleteModal(false);
    deleteRequest({
      route: `Articles/${artId}`,
      onSuccessCallback: () => {
        getArticles();
      },
      onFeildCallback: () => {},
    });
  }

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <>
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        className="rtl"
      >
        <Modal.Header closeButton>
          <Modal.Title>هل انت متأكد ؟</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowDeleteModal(false)}>
            الغاء
          </Button>
          <Button onClick={handleDelete} variant="danger">
            حذف
          </Button>
        </Modal.Footer>
      </Modal>

      <PageLayout loading={loading} title={"المدونة"} role={"ALL"}>
        <FillterForm
          data={articles}
          setFillterdData={setFillteredArticles}
          fillterBy={"title"}
        />
        {fillteredArticles.length > 0 ? (
          <ArticlesContainer />
        ) : (
          <h2 className="full h-100">لا توجد مقالات</h2>
        )}
      </PageLayout>
    </>
  );

  function ArticlesContainer() {
    return (
      <Container className="p-0">
        <Row className="flex-r gap-2">
          {fillteredArticles.map((article, index) => {
            return (
              <Col className="rounded mb-2 fc-b" xs={12} lg={5} key={index}>
                <Card>
                  <Card.Body>
                    <Container className="p-0 flex-r">
                      <Col xs={11}>
                        <Card.Title>{article.title}</Card.Title>
                      </Col>
                      <Col xs={1}>
                        <Dropdown>
                          <Dropdown.Toggle variant="g" className="m-1">
                            <BsThreeDotsVertical className="" size={"18"} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              href={"/Articles/Edit/" + article.id}
                            >
                              تعديل
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                setShowDeleteModal(true);
                                setArtId(article.id);
                              }}
                            >
                              حذف
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>
                    </Container>
                    <Card.Img src={article.img} height={"270px"} />
                    <Card.Text>{article?.breif}</Card.Text>
                    <Card.Text className="text-muted">
                      {article.category}
                    </Card.Text>
                    <Link href={`Articles/${article.id}`}>
                      <Button variant="success">قراءة المزيد</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}

export default Articles;

// export async function getStaticProps() {
//   const data = await fetch(`${baseUrl}/api/Articles?keyword=all`);
//   const articles = await data.json();

//   return {
//     props: {
//       articles: articles,
//     },
//   };
// }
