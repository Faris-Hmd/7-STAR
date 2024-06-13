import React from "react";
import { useState } from "react";
import { Button, ButtonGroup, Form, Table } from "react-bootstrap";
import { BiRefresh } from "react-icons/bi";
import UserOpt from "../../component/UserOpt";
import { baseUrl } from "./../_app";
import { useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import PageLayout from "../../component/PageLayout";
import { getUsers } from "../../lib/getUsers";

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [showOptModal, setShowOptModal] = useState(false);
  async function handleGetUsers() {
    const g = await getUsers();
  }

  function handleShowOptModal(user) {
    setSelectedUser(user);
    setShowOptModal(true);
  }
  useEffect(() => {
    handleGetUsers();
  }, []);
  return (
    <>
      <UserOpt
        show={showOptModal}
        setShow={setShowOptModal}
        currentUser={selectedUser}
        getUsers={getUsers}
        setCurrentUser={setSelectedUser}
      />

      <PageLayout
        title={"المستخدمين"}
        linkRoute={"/Users/Add"}
        linkText={"اضافة مشرف"}
        role={"ADMIN"}
      >
        <Table
          striped
          hover
          className="rounded  overflow-hidden shadow p-2 fos-s"
        >
          <thead className="bg-w fos-s">
            <tr>
              <th colSpan={4} className="p-3">
                <ButtonGroup className="shadow-sm">
                  <Button
                    onClick={getUsers}
                    className="bgclr p-1"
                    variant="secondary"
                  >
                    تحديث
                    <BiRefresh size={"25px"} className="ms-1" />
                  </Button>
                </ButtonGroup>
              </th>
            </tr>
            <tr>
              <th>اسم المستخدم</th>
              <th>البريدالاكتروني</th>
              <th>نوع المستخدم</th>
              <th>الخيارات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.displayName}</td>
                  <td>{user.email}</td>
                  <td>
                    <Form.Select value={user.role} disabled>
                      <option value="ADMIN">مشرف</option>
                      <option value="SHOP_ADMIN">مدير المتجر</option>
                      <option value="BLOG_ADMIN">مدير المدونة</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Button
                      className=""
                      variant=""
                      onClick={() => handleShowOptModal(user)}
                    >
                      <BsThreeDotsVertical />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </PageLayout>
    </>
  );
}

export default Users;
