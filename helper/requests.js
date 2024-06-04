import { toast } from "react-toastify";
import { baseUrl } from "../pages/_app";

export async function getRequest({
  route,
  onSuccessCallback,
  onFeildCallback,
}) {
  try {
    const res = await fetch(`${baseUrl}/api/${route}`, {
      method: "Get",
    });
    if (res.ok) {
      const data = await res.json();
      toast.success(data.msg);
      onSuccessCallback && onSuccessCallback();
      return { data, error: null };
    } else {
      onFeildCallback && onFeildCallback();
      toast.error("حصل خطأ في العملية");
      console.log({ error: res.status, path: route });
      return { data: null, error: res.status };
    }
  } catch (error) {
    onFeildCallback && onFeildCallback();
    toast.error("حصل خطأ في العملية");
    console.log(error);
    return { data: null, error };
  }
}

export async function deleteRequest({
  route,
  onSuccessCallback,
  onFeildCallback,
}) {
  try {
    const res = await fetch(`${baseUrl}/api/${route}`, {
      method: "delete",
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.msg);
      onSuccessCallback && onSuccessCallback();
    } else {
      onFeildCallback && onFeildCallback();
      toast.error("حصل خطأ في العملية");
    }
  } catch (error) {
    onFeildCallback();
    toast.error("حصل خطأ في العملية");
    console.log(error);
  }
}

export async function postRequest({ payload, route, onSuccess, onFeild }) {
  // console.log(payload);
  // console.log(route);
  try {
    const res = await fetch(baseUrl + "/api/" + route, {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'applicat ion/x-www-form-urlencoded',
      },
    });
    const data = await res.json();

    if (res.ok) {
      toast.success(data.msg);
      onSuccess && onSuccess();
    } else {
      toast.error(data.msg);
      onFeild && onFeild();
    }
  } catch (error) {
    toast.error("حصل خطأ في العملية");
    console.log(error);
    onFeild && onFeild();
  }
}
export async function putRequest({ payload, route, onSuccess, onFeild }) {
  try {
    const res = await fetch(baseUrl + "/api/" + route, {
      method: "put",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'applicat ion/x-www-form-urlencoded',
      },
    });
    const data = await res.json();

    if (res.ok) {
      toast.success(data.msg);
      onSuccess && onSuccess();
    } else {
      toast.error(data.msg);
      onFeild && onFeild();
    }
  } catch (error) {
    toast.error("حصل خطأ في العملية");
    console.log(error);
    onFeild();
  }
}
