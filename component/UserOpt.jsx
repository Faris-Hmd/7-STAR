import React from "react";
import { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  InputGroup,
  Modal,
  Spinner,
} from "react-bootstrap";
import { BiPin } from "react-icons/bi";
import { deleteRequest, putRequest } from "../helper/requests";

function UserOpt({ show, setShow, setCurrentUser, currentUser, getUsers }) {
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, " ", value);
    setCurrentUser((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  async function editUserInfo(e) {
    e.preventDefault();
    setLoading(true);
    putRequest({
      payload: { role: currentUser.role },
      route: "Users/" + currentUser.id,
      onSuccess: () => {
        setCurrentUser({});
        // getUsers();
        setShow(false);
        setLoading(false);
      },
      onFeild: () => {
        setLoading(false);
      },
    });

    // createUserWithEmailAndPassword(auth, "black@gmail.com", "123456");
  }

  async function handleDelete() {
    setLoading(true);
    deleteRequest({
      route: "Users/" + currentUser.id,
      onSuccessCallback: () => {
        setCurrentUser({});
        setShow(false);
        setLoading(false);
      },
      onFeildCallback: () => {
        setLoading(false);
      },
    });
  }
  return (
    <Modal show={show} centered className="rtl">
      <Modal.Header>
        <Modal.Title>
          تعديل بيانات المستخدم {currentUser.displayName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => editUserInfo(e)} id="optUserForm">
          <Form.Group className="mb-3">
            <Form.Label>نوع المستخدم</Form.Label>
            <Form.Select
              value={currentUser.role}
              required
              name="role"
              onChange={handleChange}
            >
              <option value="ADMIN">مشرف</option>
              <option value="SHOP_ADMIN">مدير المتجر</option>
              <option value="BLOG_ADMIN">مدير المدونة</option>
            </Form.Select>
          </Form.Group>
          <FormGroup>
            <Form.Label>حذف المستخدم</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder={currentUser.displayName}
                name="displayNameToDelete"
                onChange={handleChange}
              />
            </InputGroup>
            <Form.Text className="text-denger">
              قم بكتابة اسم المستخدم ({currentUser.displayName}) لاتمام عملية
              الحذف.
              <br /> لا يمكن الرجوع في هذه العملية
            </Form.Text>
          </FormGroup>
        </Form>
      </Modal.Body>
      {loading ? (
        <Modal.Footer>
          <Spinner className="m-auto" />
        </Modal.Footer>
      ) : (
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
              setCurrentUser({});
            }}
          >
            الغاء
          </Button>
          <Button
            variant="danger"
            disabled={
              currentUser.displayName !== currentUser.displayNameToDelete
            }
            onClick={handleDelete}
          >
            حذف <BiPin />
          </Button>
          <Button
            variant="primary"
            className="bg-clr-green border-0"
            type="submit"
            form="optUserForm"
          >
            حفظ
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default UserOpt;
