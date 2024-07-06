import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import FormUI from "./FormUI";
import { getLocalStorge } from "../helper/localStorge";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Form,
  Modal,
} from "react-bootstrap";
import { deleteRequest } from "../helper/requests";
import { BsCameraFill, BsCheckLg, BsTrashFill } from "react-icons/bs";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { put } from "@vercel/blob";
import { useSession } from "next-auth/react";

function FormLogic({
  feilds,
  data,
  setData,
  formName,
  method,
  redirect,
  route,
  singleImage,
}) {
  const { data: sesssion, status } = useSession();
  console.log(sesssion);
  const router = useRouter();
  const [images, setImgs] = useState([]);
  const [imagesURL, setImagesURL] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  async function handleDelete() {
    setShowDeleteModal(false);
    deleteRequest({
      route: `Products/${router.query.productId}`,
      onSuccessCallback() {
        router.push("/");
      },
    });
  }

  useEffect(() => {
    // method === "PUT" && data?.images[0]?.url && setImgs(data.images);
  }, [data]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, value);
    localStorage.setItem(formName, JSON.stringify({ ...data, [name]: value }));

    setData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };
  const handleImgChange = (e) => {
    const { files } = e.target;
    // console.log(files.length);
    for (let index = 0; index < files.length; index++) {
      singleImage
        ? setImgs([
            {
              url: URL.createObjectURL(files[index]),
              name: files[index].name,
              file: files[index],
            },
          ])
        : setImgs((prevImg) => [
            ...prevImg,
            {
              url: URL.createObjectURL(files[index]),
              file: files[index],
              name: files[index].name,
            },
          ]);
    }
  };
  const removeImage = (url) => {
    setImgs(images.filter((img) => img.url !== url));
  };

  ////////////////////////////////////////////////////

  const handleUploadImages = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    if (images.length === 0) {
      uploadData();
      return;
    }
    const { getDownloadURL, ref, uploadBytesResumable } = await import(
      "firebase/storage"
    );
    const { storage } = await import("../firebase/firebase");
    setImagesURL([]);
    images.forEach((img) => {
      console.log(img);
      if (img.name) {
        async function uploadimg() {
          console.log(img);
          const newBlob = await put("test", img.file, {
            access: "public",
            token: process.env.BLOB_READ_WRITE_TOKEN,
            handleUploadUrl: "/api/imgupload",
            // handleUploadUrl: "/api/avatar/upload",
          });
          console.log(newBlob);
        }
        uploadimg();
      } else {
        setImagesURL((prevImgs) => [...prevImgs, { url: img.url }]);
      }
      // if (img.imageFile) {

      //   const imgRef = ref(storage, img.name);
      //   const uploadTask = uploadBytesResumable(imgRef, img.file);
      //   uploadTask.on(
      //     "state_changed",
      //     (snapshot) => {
      //       const progress =
      //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //       // console.log("Upload is " + progress + "% done");
      //     },
      //     (error) => {
      //       toast.error("حصل خطأ في العملية");
      //       setIsUploading(false);
      //       // Handle unsuccessful uploads
      //     },
      //     () => {
      //       // Handle successful uploads on complete
      //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //         console.log("File available at", downloadURL);
      //         setImagesURL((prevImgs) => [...prevImgs, { url: downloadURL }]);
      //       });
      //     }
      //   );
      // } else {
      //   setImagesURL((prevImgs) => [...prevImgs, { url: img.url }]);
      // }
    });
  };
  //////////////////////////////////////////////////////////////////////////////////////////////
  const uploadData = async () => {
    try {
      console.log(data, "upload");

      const res = await fetch("/api/" + route, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'applicat ion/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          ...data,
          images: imagesURL,
          userId: sesssion.user.id,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setIsUploading(false);
        // console.log("Document written with ID: ", data.docId);
        setImagesURL([]);
        toast.success(data.msg);
        // localStorage.removeItem("artAddForm");
        // redirect &&
        //   setTimeout(() => {
        //     router.push("/" + formName + "/" + data.docId);
        //   }, 1500);
      } else {
        const { msg } = await res.json();
        setIsUploading(false);
        setImagesURL([]);
        toast.error(msg);
      }
    } catch (e) {
      setIsUploading(false);
      setImagesURL([]);
      toast.error("حصل خطأ في العملية");
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    if (imagesURL.length === 0) return;
    if (imagesURL.length === images.length) {
      uploadData();
    }
  }, [imagesURL]); // eslint-disable-line

  useEffect(() => {
    if (method === "PUT") return;
    const savedData = getLocalStorge(formName);
    savedData && setData(savedData);
  }, []);

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
      <Card className=" shadow-sm p-2 mt-2">
        <Container className="flex-r">
          {" "}
          <Col xs={12} lg={6}>
            <FormUI data={data} handleChange={handleChange} feilds={feilds} />
          </Col>
          <Col xs={12} lg={5} className="m-auto">
            {" "}
            <Form id={formName} onSubmit={handleUploadImages} className="mt-2">
              {" "}
              {images?.length > 0 && !singleImage && (
                <Carousel>
                  {images.map((img, index) => {
                    return (
                      <Carousel.Item
                        onDoubleClick={() => removeImage(img.url)}
                        key={index}
                      >
                        <img
                          style={{ objectFit: "cover", height: "300px" }}
                          className="d-block w-100"
                          src={img.url}
                          alt="First slide"
                        />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              )}
              {images?.length === 0 && (
                <Card.Img
                  width={"100%"}
                  variant="buttom"
                  src={`/images/imageHolder.jpg`}
                  height={"300px"}
                  style={{ objectFit: "cover" }}
                />
              )}
              {images?.length > 0 && singleImage && (
                <Card.Img
                  width={"100%"}
                  variant="buttom"
                  src={images[0].url}
                  height={"100px"}
                  onDoubleClick={() => removeImage(images[0].url)}
                  style={{ objectFit: "cover" }}
                />
              )}
              <Card.Subtitle className="m-2 text-muted">
                اضغط مرتين لازالة الصورة
              </Card.Subtitle>
              <Button variant="success" className="shadow mb-2">
                <label htmlFor="productImg">
                  اضافة صورة
                  <BsCameraFill className="ms-3 mb-1" />
                </label>
              </Button>
              <input
                className="hidden"
                accept="image/*"
                multiple={!singleImage}
                id="productImg"
                type="file"
                onChange={handleImgChange}
              />
            </Form>{" "}
            <>
              <Container className="flex-r space-btw">
                {method === "PUT" && (
                  <Col xs={12}>
                    <Button
                      className="m shadow   px-3 "
                      variant="danger"
                      onClick={() => {
                        setShowDeleteModal(true);
                      }}
                    >
                      حذف
                      <span className="">
                        <BsTrashFill />
                      </span>
                    </Button>
                  </Col>
                )}
              </Container>
              <Button
                className="mt-2 shadow w-100"
                variant="success"
                disabled={
                  isUploading || data?.password !== data?.passwordConfirm
                }
                type="submit"
                form={formName}
              >
                انهاء
                <span className="ms-2">
                  <BsCheckLg />
                </span>
              </Button>
            </>
          </Col>
        </Container>
      </Card>{" "}
    </>
  );
}
export default FormLogic;
