import React from "react";
import PageLayout from "../../component/PageLayout";
import { Button, Container } from "react-bootstrap";
import { getFireDocsQuery } from "../../lib/getFireData";
import Link from "next/link";
import { BsPencil } from "react-icons/bs";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { currentUser } from "../_app";

function MyAccount(props) {
  return (
    <PageLayout
      title={"حسابي"}
      pageName={"حسابي"}
      loading={false}
      linkRoute={"/Users/Edit/" + props.user.userId}
      role={"ALL"}
    >
      <>
        <div
          class="px-4 py-4 my-1 text-center bg-sec border rounded shadow-sm bg-liner"
          style={{ position: "relative" }}
        >
          <Button
            variant=""
            style={{ position: "absolute", top: "5px", left: "5px" }}
            href={"/Users/Edit/" + props.user.id}
          >
            <BsPencil size={"25px"} />
          </Button>
          <img
            class="d-block mx-auto mb-4 rounded-full shadow"
            src={props.user.photoUrl}
            alt=""
            width="80"
            height="80"
          />
          <h1 class="display-5 fw-bold text-body-emphasis">
            {props.user.displayName}
          </h1>
          <div class="col-lg-6 mx-auto">
            <p class="lead mb-4">
              {props.user.bio}
              Quickly design and customize responsive mobile-first sites with
              Bootstrap, the world’s most popular front-end open source toolkit,
            </p>
            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <button
                type="button"
                class="btn btn-primary btn-lg px-4 gap-3 btn-success"
              >
                تواصل معي
              </button>
            </div>
          </div>
        </div>
      </>
      <h2 className="p-2 text-c ms-3">خدماتي</h2>{" "}
      <Container className="flex-r p-0 p-relative">
        <div className="album py-3 bg-body-tertiary">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {props.myProducts.map((product, index) => {
                return (
                  <div className="col">
                    <div className="card shadow-sm">
                      <Link href={"/Products/" + product.id} className="Link">
                        <img
                          className="bd-placeholder-img card-img-top object-cover"
                          width="100%"
                          height="225"
                          src={product.images[0].url}
                          role="img"
                          aria-label="Placeholder: صورة مصغرة"
                          preserveAspectRatio="xMidYMid slice"
                          focusable="false"
                          style={{ objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <p className="card-text">
                            هذه بطاقة أوسع مع نص داعم أدناه كمقدمة طبيعية لمحتوى
                            إضافي. هذا المحتوى أطول قليلاً.
                          </p>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="text-success">
                              QAR {product.cost}
                            </div>
                            <small className="text-body-secondary">
                              {product?.category}
                            </small>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}

export default MyAccount;
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log("ssr", session?.user.email);
  // const userInfo = await getFireDoc("users", context.params.userId);
  const myProducts = await getFireDocsQuery(
    "products",
    "userId",
    "==",
    currentUser.id
  );

  return {
    props: {
      user: session.user,
      myProducts,
    },
  };
}
