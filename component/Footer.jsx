import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Footer() {
  return (
    <>
      {/* <Container>
                    <div className="row">
                        <div className="col-6 col-md-2 mb-3">
                            <h5>Section</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">Home</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">Features</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">Pricing</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">FAQs</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">About</a></li>
                            </ul>
                        </div>

                        <div className="col-6 col-md-2 mb-3">
                            <h5>Section</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">Home</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">Features</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">Pricing</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">FAQs</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">About</a></li>
                            </ul>
                        </div>

                        <div className="col-6 col-md-2 mb-3">
                            <h5>Section</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">Home</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">Features</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">Pricing</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">FAQs</a></li>
                                <li className="nav-item mb-2"><a href="#"
                                        className="nav-link p-0">About</a></li>
                            </ul>
                        </div>

                        <div className="col-md-5 offset-md-1 mb-3">
                            <form>
                                <h5>Subscribe to our newsletter</h5>
                                <p>Monthly digest of what's new and exciting
                                    from us.</p>
                                <div
                                    className="d-flex flex-column flex-sm-row w-100 gap-2">
                                    <label for="newsletter1"
                                        className="visually-hidden">Email
                                        address</label>
                                    <input id="newsletter1" type="text"
                                        className="form-control"
                                        placeholder="Email address"/>
                                    <button className="btn btn-primary"
                                        type="button">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div
                        className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                        <p>&copy; 2024 Company, Inc. All rights reserved.</p>
                        <ul className="list-unstyled d-flex">
                            <li className="ms-3"><a className="link-body-emphasis"
                                    href="#"><svg className="bi" width="24"
                                        height="24"><use
                                            xlink:href="#twitter" /></svg></a></li>

                            <li className="ms-3"><a className="link-body-emphasis"
                                    href="#"><svg className="bi" width="24"
                                        height="24"><use
                                            xlink:href="#instagram" /></svg></a></li>
                            <li className="ms-3"><a className="link-body-emphasis"
                                    href="#"><svg className="bi" width="24"
                                        height="24"><use
                                            xlink:href="#facebook" /></svg></a></li>
                        </ul>
                    </div>
                </Container> */}
      <Container>
        <Row>
          <Col className="col-6 col-md-2 mb-3">
            <h5>الاقسام</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  الررئيسة
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  الاحدث
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  التسعير
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  الاسئلة الشائعة
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  عنا
                </a>
              </li>
            </ul>
          </Col>
          <Col className="col-6 col-md-2 mb-3">
            <h5>الاقسام</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  الررئيسة
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  الاحدث
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  التسعير
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  الاسئلة الشائعة
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  عنا
                </a>
              </li>
            </ul>
          </Col>
          <Col className="col-md-5 offset-md-1 mb-3">
            <form>
              <h5>اشترك في نشرتنا الإخبارية</h5>
              <p>ملخص شهري لكل ما هو جديد ومثير منا.</p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <label for="newsletter1" className="visually-hidden">
                  عنوان بريدك الالكتروني
                </label>
                <input
                  id="newsletter1"
                  type="text"
                  className="form-control"
                  placeholder="                  عنوان بريدك الالكتروني
"
                />
                <button className="btn btn-primary" type="button">
                  أشتراك
                </button>
              </div>
            </form>
          </Col>
          <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <center> © 2024 7 Stars, Inc. جميع الحقوق محفوظة.</center>
          </div>
        </Row>
        {/* <Col xs={12}>
          <small>
            <center>©2023 by Faris Hamad. created with Next.js</center>
          </small>
        </Col> */}
      </Container>
    </>
  );
}

export default Footer;
