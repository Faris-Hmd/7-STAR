import { setLocalStorge } from "./localStorge";

export function handleChange(event, setData, storgeName) {
  const { name, value } = event.target;
  // console.log(name, " ", value);

  setData((prevData) => {
    setLocalStorge({ ...prevData, [name]: value }, storgeName);

    return { ...prevData, [name]: value };
  });
}
