import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { BiCategory, BiSearch } from "react-icons/bi";
import { categories } from "../data/categories";
export function FillterForm({ data, setFillterdData, fillterBy }) {
  const [fillterModalShow, setfillterModalShow] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("ALL");

  useEffect(() => {
    if (keyword === "") {
      setFillterdData(data);
      return;
    }
    setFillterdData(
      data.filter((item) =>
        item?.[fillterBy]?.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }, [keyword]);

  useEffect(() => {
    if (!category) return;
    if (category == "ALL") {
      setFillterdData(data);
      return;
    }
    setFillterdData(
      data.filter(
        (item) => item.category?.toLowerCase() === category.toLowerCase()
      )
    );
  }, [category]);

  return (
    <>
      <Modal
        className="rtl"
        show={fillterModalShow}
        onHide={() => {
          setfillterModalShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>قائمة البحث</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>اختر التصنيف</Form.Label>
              <Form.Select
                className="bg-sec"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                value={category}
              >
                <option value="ALL">الكل</option>
                {categories.map((category, index) => {
                  return (
                    <option value={category.value} key={index}>
                      {category.value}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="bg-clr-green"
            onClick={() => setfillterModalShow(false)}
          >
            اغلاق
          </Button>
        </Modal.Footer>
      </Modal>

      <Form className="mt-1">
        <InputGroup className="shadow-sm border rounded mb-2 ">
          <Button variant="success" className="bg-sec text-muted border-0">
            <BiSearch /> <span className="ms-1">|</span>
          </Button>
          <Form.Control
            type="text"
            name="keyword"
            placeholder="البحث عن خدمة"
            className="p-2 rounded border-0"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          />
          {keyword !== "" && (
            <Button
              className="border-0 bg-sec text-muted"
              // variant="outline-secondary"
              onClick={() => {
                setKeyword("");
              }}
            >
              x
            </Button>
          )}
          <Button
            className="border-0 bg-sec text-muted"
            // variant="outline-secondary"
            onClick={() => {
              setfillterModalShow(true);
            }}
          >
            <BiCategory />
          </Button>
        </InputGroup>
      </Form>
    </>
  );
}
