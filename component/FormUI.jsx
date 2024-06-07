/** @format */

import React from "react";
import { Form } from "react-bootstrap";
function FormUI({ feilds, handleChange, data, setData }) {
  return (
    <>
      {feilds.map((feild, index) => {
        if (feild.type === "select")
          return (
            <Form.Group key={index} className="mb-2">
              <Form.Label>{feild.placeholder}</Form.Label>
              <Form.Select
                disabled={feild.disabled}
                required
                placeholder={feild.placeholder}
                value={data?.[feild.name] === null ? "" : data?.[feild.name]}
                onChange={handleChange}
                name={feild.name}
              >
                {feild.options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          );
        else if (feild.type === "textarea") {
          return (
            <Form.Group key={index} className="mb-2">
              <Form.Label>{feild.placeholder}</Form.Label>
              <Form.Control
                disabled={feild.disabled}
                required
                as={"textarea"}
                name={feild.name}
                placeholder={feild.placeholder}
                rows={"3"}
                type={feild.type}
                value={data?.[feild.name] === null ? "" : data?.[feild.name]}
                onChange={handleChange}
              />
            </Form.Group>
          );
        } else if (feild.name === "passwordConfirm") {
          return (
            <Form.Group key={index} className="mb-2">
              <Form.Label>{feild.placeholder}</Form.Label>
              <Form.Control
                disabled={feild.disabled}
                required
                name={feild.name}
                placeholder={feild.placeholder}
                type={feild.type}
                value={data?.[feild.name] === null ? "" : data?.[feild.name]}
                onChange={handleChange}
              />
              {data?.password !== data?.passwordConfirm && (
                <Form.Text className="text-danger">
                  كلمة المرور غير متطابقة!
                </Form.Text>
              )}
            </Form.Group>
          );
        } else {
          return (
            <Form.Group key={index} className="mb-2">
              <Form.Label>{feild.placeholder}</Form.Label>
              <Form.Control
                disabled={feild.disabled}
                required
                name={feild.name}
                placeholder={feild.placeholder}
                type={feild.type}
                value={data?.[feild.name] === null ? "" : data?.[feild.name]}
                onChange={handleChange}
              />
            </Form.Group>
          );
        }
      })}
    </>
  );
}

export default FormUI;
