import React, { useContext, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { baseUrl } from "./_app";
import { toast } from "react-toastify";
import { AuthContext } from "../context/authContext";

function Login() {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(baseUrl + "/api/auth/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setLoading(false);
        setUser(data);
        toast.success("تم تسجيل الدخول بنجاح");
      } else {
        const { msg } = await res.json();
        toast.error(msg);
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      toast.error("حصل خطأ في العملية");
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <Container className="full">
      <Col xs={10} lg={5}>
        <Form
          className="rtl bg-sec shadow p-2 mt-3 rounded"
          onSubmit={handleSubmit}
        >
          <div className="full">
            <img src="/icons/DrAzzaIcon.webp" alt="icon" />
          </div>
          <Form.Group className="mb-2">
            <Form.Label>البريد الالكتروني</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="example@email.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>كلمة المرور</Form.Label>
            <Form.Control
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>
          {error && (
            <Form.Text className="text-danger p-1 mb-2">
              كلمة المرور او البريد غير صحيح!
            </Form.Text>
          )}
          <Button type="submit" className="w-100 bg-clr" disabled={loading}>
            تسجيل
          </Button>
        </Form>
      </Col>
    </Container>
  );
}

export default Login;
