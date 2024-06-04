import { toast } from "react-toastify";
import { baseUrl } from "../pages/_app";

export const handleUpload = async ({
  route,
  method,
  payload,
  setIsUploading,
}) => {
  try {
    setIsUploading(true);
    console.log("upload");
    const res = await fetch(baseUrl + "/api/" + route, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'applicat ion/x-www-form-urlencoded',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Document written with ID: ", data.docId);
      toast.success(data.msg);
      setIsUploading(false);
    } else {
      setIsUploading(false);
      toast.error("حصل خطأ في العملية ");
    }
  } catch (e) {
    setIsUploading(false);
    toast.error("حصل خطأ في العملية ");
    console.error("Error adding document: ", e);
  }
};
