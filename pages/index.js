import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { BiCategory, BiSearch } from "react-icons/bi";
import { getFireDocsQuery } from "../lib/getFireData";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
// import { CardsCarousel } from "../component/cardCarousels/carosel";

const posts = [
  {
    img: "sport.jpg",
    logo: "logo-1.svg",
    cat: "cat-2.webp",
    levelLogo: "level-1.png",
    title: "العرض الاول",
    cost: 299,
    post: "Jumpstart your healthy habits today with an experienced and responsible Clinical Nutritionist. Whatever your current diet is, Dt. Azza Khalid carefully evaluates each client and formulates a personalized plan based on your specific needs. So if Sports Nutrition Education is what you’re looking for, schedule a session today",
  },
  {
    img: "gain.webp",
    levelLogo: "level-2.png",

    cost: 599,
    cat: "cat-1.webp",

    logo: "logo-2.svg",

    title: "العرض الثاني",
    post: "For years, Dt. Azza Khalid has been providing Weight gain Counseling with comprehensive plans that are catered to each individual’s needs. This specialized service puts individuals on the right track to healthy eating and living. Get in touch today and start taking control of your life with these great tools and technique.",
  },
  {
    img: "diet.jpg",
    cat: "cat-3.webp",

    title: "العرض الثالث",
    cost: 299,
    logo: "logo-3.svg",
    levelLogo: "level-3.png",

    post: "Whatever your current healthy status and the diseases youhave, Dt. Azza Khalid carefully evaluates each client and formulates a personalized plan based on your specific needs. Send us your medical results and you will get a good diet plan according to your health status Whatever your current healthy status.",
  },
  {
    img: "loss.jpg",
    cat: "cat-4.webp",

    logo: "logo-4.svg",

    cost: 899,
    title: "العرض الرابع",
    post: "For years, Dt. Azza Khalid has been providing Weight Loss Counseling with comprehensive plans that are catered to each individual’s needs. This specialized service puts individuals on the right track to healthy eating and living. Get in touch today and start taking control of your life with these great tools and techniques.",
  },
];

function Homepage(props) {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  return (
    <Container className="m-0 p-0 w-100">
      <div
        id="/"
        className="hero-section d-flex flex-column align-items-center justify-content-center text-center greeting"
      >
        <h1 className="hero-text mb-4">
          احصل على أفضل خدمة تحتاجها في أقل وقت
        </h1>
        <Form
          className=" m-3 mt-1"
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/Products?k=" + keyword);
          }}
        >
          <InputGroup className="shadow-sm border-0  mb-1 ">
            <Button
              href={`/Products?k=${keyword}`}
              variant="success"
              className="bg-sec text-muted border-0 "
            >
              <BiSearch className="" /> <span className="ms-1">|</span>
            </Button>
            <Form.Control
              type="text"
              name="keyword"
              placeholder="البحث عن خدمة"
              className="p-2 border-0"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
            />
          </InputGroup>
        </Form>

        {/* <!-- Offcanvas Login Form --> */}
      </div>
      {/* <CardsCarousel /> */}
      <section id="categories" className="categories py-3">
        <div className="container">
          <h2 className="text-center mb-5">تصفح حسب الفئة</h2>
          <div className="row justify-content-center gy-4">
            <div className="col-lg-4 col-md-6">
              <div className="card category-card">
                <div className="card-body card-icons text-center">
                  <i className="bi-heart-pulse-fill fs-1"></i>
                  <h5 className="card-title">خدمات صحية</h5>
                  <p className="card-text">اكتشف أفضل مقدمي الخدمات الصحية.</p>
                  <Link href="/Products?q=خدمات صحية" className="btn btn-dark">
                    عرض المزيد
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card category-card">
                <div className="card-body card-icons text-center">
                  <i className="bi-bank2 fs-1"></i>
                  <h5 className="card-title">خدمات قانونية</h5>
                  <p className="card-text">
                    ابحث عن المشورة والخدمات القانونية المتخصصة.
                  </p>
                  <Link
                    href="/Products?q=خدمات قانونية"
                    className="btn btn-dark"
                  >
                    عرض المزيد
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card category-card">
                <div className="card-body card-icons text-center">
                  <i className="bi-house-fill fs-1"></i>
                  <h5 className="card-title">العقارات</h5>
                  <p className="card-text">
                    استكشف العقارات والخدمات العقارية.
                  </p>
                  <Link href="/Products?q=العقارات" className="btn btn-dark">
                    عرض المزيد
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card category-card">
                <div className="card-body card-icons text-center">
                  <i className="bi-gear-fill fs-1"></i>
                  <h5 className="card-title">الخدمات المنزلية</h5>
                  <p className="card-text">اكتشف خدمات منزلية موثوقة</p>
                  <Link
                    href="/Products?q=الخدمات المنزلية"
                    className="btn btn-dark"
                  >
                    عرض المزيد
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card category-card">
                <div className="card-body card-icons text-center">
                  <i className="bi-car-front-fill fs-1"></i>
                  <h5 className="card-title">السيارات</h5>
                  <p className="card-text">ابحث عن خدمات وإصلاحات السيارات.</p>
                  <Link href="/Products?q=السيارات" className="btn btn-dark">
                    عرض المزيد
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card category-card">
                <div className="card-body card-icons text-center">
                  <i className="bi-people-fill fs-1"></i>
                  <h5 className="card-title">خدمات استشارية</h5>
                  <p className="card-text">
                    استشارة الخبراء في مختلف المجالات.
                  </p>
                  <Link
                    href="/Products?q=خدمات استشارية"
                    className="btn btn-dark"
                  >
                    عرض المزيد
                  </Link>
                </div>
              </div>
            </div>
            {/* <!-- Add more categories here --> */}
          </div>
        </div>
      </section>
      <section id="why-choose-us" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">لماذا تختار خدماتنا؟</h2>
          <div className="row gx-4 justify-content-center">
            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">خدمات ذات جودة عالية</h5>
                  <p className="card-text">
                    تواصل مع مقدمي الخدمات المعتمدين الذين يقدمون خدمات عالية
                    الجودة.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">راحة</h5>
                  <p className="card-text">
                    يمكنك بسهولة العثور على الخدمات ومقارنتها في مكان واحد، مما
                    يوفر الوقت والجهد.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">تسعير واضح</h5>
                  <p className="card-text">
                    تعرف على التكاليف الأولية وتفاصيل التسعير قبل اختيار الخدمة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="our-vision" className="bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4">
              <h2 className="mb-4">رؤيتنا لقطر 2030</h2>
              <p className="lead">
                في شركة 7 نجوم، نحن ملتزمون بدعم رؤية قطر 2030 من خلال...
              </p>
              <p className="mb-4">
                العميل مهم جدًا، العميل سيتبعه العميل. لا يوجد شيء اسمه وادي
                الحياة الحر، أو جرة العقارات.
              </p>
              <p className="mb-4">
                ولكن مع وجود مفاتيح الأسهم كبطاقة مرور مجانية، لا تقم بواجبك
                المنزلي الآن. مؤلف كتلة حياة الواديين.
              </p>
              <a href="#" className="btn btn-outline-dark">
                Learn More
              </a>
            </div>
            <div className="col-lg-6 mb-4">
              <img
                src="https://via.placeholder.com/600x400"
                className="img-fluid rounded shadow-lg"
                alt="Qatar 2030 Vision"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="video-section py-5 dark-qatar">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 ">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  className="embed-responsive-item"
                  src="https://www.youtube.com/embed/your-video-id"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div className="col-md-6 text-white">
              <h2>رؤيتنا</h2>
              <p>
                في 7 ستارز، نهدف إلى ربط المستخدمين بأفضل مقدمي الخدمات في مختلف
                المجالات، وضمان الجودة والرضا. شاهد الفيديو لمعرفة المزيد عن
                رؤيتنا وكيف نسعى جاهدين لتقديم خدمات من الدرجة الأولى لعملائنا.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="provider-info" className="provider-info py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src="https://via.placeholder.com/600x400"
                className="img-fluid rounded shadow-lg"
                alt="Service Provider"
              />
            </div>
            <div className="col-md-6">
              <h2 className="mb-4">لمقدمي الخدمات والشركات</h2>
              <p className="lead mb-4">
                انضم إلى 7 نجوم لعرض خدماتك والوصول إلى المزيد من العملاء في
                قطر.
              </p>
              <ul className="list-unstyled mb-4">
                <li>
                  <i className="fas fa-check-circle text-primary me-2"></i>
                  إدراج وإدارة الخدمات بسهولة.
                </li>
                <li>
                  <i className="fas fa-check-circle text-primary me-2"></i>
                  خطط اشتراك مرنة مصممة خصيصًا لتلبية احتياجاتك.
                </li>
                <li>
                  <i className="fas fa-check-circle text-primary me-2"></i>
                  ميزات ترويجية لتعزيز ظهورك.
                </li>
                <li>
                  <i className="fas fa-check-circle text-primary me-2"></i>
                  فريق دعم متخصص لمساعدتك.
                </li>
              </ul>
              <h3 className="mb-3">كيف تعمل</h3>
              <ul className="list-unstyled">
                <li>
                  <i className="fas fa-angle-right text-primary me-2"></i>
                  قم بإنشاء ملفك الشخصي وإدراج خدماتك.
                </li>
                <li>
                  <i className="fas fa-angle-right text-primary me-2"></i>
                  اختر خطة الاشتراك التي تناسب أهداف عملك.
                </li>
                <li>
                  <i className="fas fa-angle-right text-primary me-2"></i>
                  استخدم الأدوات الترويجية لجذب المزيد من العملاء.
                </li>
                <li>
                  <i className="fas fa-angle-right text-primary me-2"></i>
                  قم بتنمية أعمالك مع منصتنا.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="testimonials py-5" id="what-clients-say">
        <div className="container">
          <h2 className="text-center mb-4">ماذا يقول عملاؤنا</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p>
                      "ساعدني 7 نجوم في العثور على مقدم الخدمة الصحية المثالي
                      بسرعة وسهولة. أوصي به بشدة!"
                    </p>
                    <footer className="blockquote-footer">
                      سارة جونسون، عميلة خدمات صحية,{" "}
                      <cite title="Source Title">عميلة خدمات صحية</cite>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p>
                      "كانت الخدمات القانونية التي وجدتها من خلال 7 Stars من
                      الدرجة الأولى. لا يمكنني أن أكون أكثر سعادة بالنتائج."
                    </p>
                    <footer className="blockquote-footer">
                      محمد آل ثاني,{" "}
                      <cite title="Source Title">عميل الخدمات القانونية</cite>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p>
                      "باعتباري صاحب عمل، كانت الخدمات التجارية المقدمة هنا ذات
                      قيمة لا تقدر بثمن لنمو شركتي."
                    </p>
                    <footer className="blockquote-footer">
                      فاطمة أحمد،,{" "}
                      <cite title="Source Title"> عميلة خدمات الأعمال</cite>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 text-center">
        <div className="container">
          <h2 className="text-dark-qatar">خطط الاشتراك</h2>
          <p className="lead">اختر الخطة التي تناسب احتياجات عملك</p>
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-header">
                  <h4 className="my-0 fw-normal">أساسي</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    $50
                    <small className="text-muted">/ شهر</small>
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>10 قوائم الخدمات</li>
                    <li>دعم البريد الإلكتروني</li>
                    <li>الوصول إلى مركز المساعدة</li>
                  </ul>
                  <button
                    type="button"
                    className="w-100 btn btn-lg btn-outline-primary"
                  >
                    سجل مجانا
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-header">
                  <h4 className="my-0 fw-normal">طليعة</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    $100
                    <small className="text-muted">/ شهر</small>
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>50 قائمة خدمات</li>
                    <li>دعم البريد الإلكتروني ذو الأولوية</li>
                    <li>الوصول إلى مركز المساعدة</li>
                  </ul>
                  <button
                    type="button"
                    className="w-100 btn btn-lg btn-primary"
                  >
                    البدء
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-header">
                  <h4 className="my-0 fw-normal">الشركات</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    $200
                    <small className="text-muted">/ شهر</small>
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>قوائم خدمات غير محدودة</li>
                    <li>الدعم عبر الهاتف والبريد الإلكتروني</li>
                    <li>الوصول إلى مركز المساعدة</li>
                  </ul>
                  <button
                    type="button"
                    className="w-100 btn btn-lg btn-primary"
                  >
                    اتصل بنا
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="faq" className="faq-section">
        <div className="container">
          <h2 className="text-center mb-5">أسئلة مكررة</h2>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  كيف يمكنني ادراج خدماتي على 7 نجوم؟
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  يمكنك إدراج خدماتك من خلال التسجيل للحصول على حساب واختيار خطة
                  الاشتراك التي تناسب احتياجاتك. تفضل بزيارة قسم اتصل بنا للحصول
                  على مزيد من التفاصيل. <a href="#contact">تواصل معنا</a>{" "}
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  كيف يمكنني الترويج لحدماتي على 7 نجوم؟
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  We offer promotional features as part of our subscription
                  plans. Contact our support team to learn more about promoting
                  your services.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  كيف يمكنيي التواصل مع العملاء؟
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  You can reach our customer support team through our
                  <a href="#contact">Contact Us</a> section or by emailing
                  support@7stars.com.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="contact-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">اتصل بنا</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <form className="contact-form">
                <div className="mb-3">
                  <label for="name" className="form-label">
                    اسمك
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label for="email" className="form-label">
                    بريدك الالكتروني
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label for="message" className="form-label">
                    رسالتك
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-dark">
                  ارسال رسالة
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* <Row className="m-1">
        <Col xs={12} md={6}>
          <h2 className="pt-3 pb-3 text-center">العروض المميزة</h2>
          <Container className="flex-r p-0 shadow">
            <Carousel
              className="w-100 overflow-hidden rounded"
              style={{ height: "300px" }}
              slide={false}
            >
              {props.products?.map((product, index) => {
                return (
                  <Carousel.Item
                    key={index}
                    style={{ maxHeight: "300px" }}
                    className="rounded overflow-hidden p-0 m-0 w-100"
                  >
                    <Link href={"/Products/" + product.id} className="link">
                      <Carousel.Caption
                        className="wave-2  p-0 ps-3 fs-5"
                        style={{
                          bottom: "0",
                          right: "0",
                          minWidth: "100%",
                          textAlign: "right",
                        }}
                      >
                        <span>
                          {product.name}
                          <pre className="text-success">{product.cost} QAR</pre>
                        </span>
                      </Carousel.Caption>
                      <img
                        loading="lazy"
                        // height={"100%"}
                        width={"100%"}
                        height={"300px"}
                        // className="d-block w-100 "
                        style={{ objectFit: "cover", height: "300px" }}
                        src={`${product.images[0].url}`}
                        alt={`${index + 1} slide`}
                      />
                    </Link>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </Container>
        </Col>
        <Col xs={12} md={6}>
          <h2 className="pt-3 pb-3 text-center">الاكثر مبيعا</h2>

          <Carousel className="w-100 overflow-hidden rounded ">
            {posts.map((post, index) => {
              return (
                <Carousel.Item
                  key={index}
                  className="rounded overflow-hidden "
                  style={{ height: "300px" }}
                >
                  <Carousel.Caption
                    className="p-1 ps-3 blur fs-5"
                    style={{
                      bottom: "0",
                      right: "0",
                      minWidth: "100%",
                      textAlign: "right",
                      background: "",
                      color: "white",
                    }}
                  >
                    <p>{post.title}</p>
                  </Carousel.Caption>
                  <img
                    loading="lazy"
                    height={"100%"}
                    width={"100%"}
                    style={{ objectFit: "cover" }}
                    src={`/images/${post.cat}`}
                    alt={`${index + 1} slide`}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
      </Row>
      <Row className="mt-2 overflow-hidden m-2">
        <h2 className="pt-3 pb-3 text-center">نبذة عن خدمات</h2>

        <Card className="p-0 shadow overflow-hidden">
          <Container
            style={{ flexWrap: "wrap", display: "flex" }}
            className="p-0 w-100"
          >
            <Col xs={12} lg={6} className="p-4">
              <Container>
                <Row className="flex-r">
                  {posts.map((post) => {
                    return (
                      <Col className="p-6" xs={6}>
                        <Card classname="border-0 " style={{ border: "none" }}>
                          <Card.Title>{post.title}</Card.Title>
                          <img
                            width={"120"}
                            src={`/images/${post.logo}`}
                            className="m-auto"
                          ></img>
                          <Card.Text>
                            <small>
                              سلام عليكم ورحمة الله نكشس مشعساي مخهايس خهعيس سما
                              يخكهسا
                            </small>
                          </Card.Text>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Container>
            </Col>
            <Col xs={12} lg={6} className="margin-auto flex">
              <img
                loading="lazy"
                src="/images/qman2.jpg"
                width={"100%"}
                height={"100%"}
                className="margin-auto"
              />
            </Col>
          </Container>
        </Card>
      </Row>
      <Row className="p-1 ">
        <h2 className="pt-3 pb-3 text-center">العروض والاشتراكات</h2>

        <Container className="flex-r ">
          {posts.slice(0, 3).map((post) => {
            return (
              <Col xs={12} lg={4} style={{ scale: "95%" }}>
                <Card>
                  <Card.Title className="ms-3 pt-3 ">{post.title}</Card.Title>
                  <Card.Body className="flex">
                    <Card.Img
                      style={{ width: "200px" }}
                      width={"500px"}
                      src={`/icons/${post.levelLogo}`}
                    ></Card.Img>
                    <Card.Text>
                      سلام عليكم كشس حثخق حلف قفغا للافس فايقب تغقسقل تسقثفا
                      سقابتغ سليقات يقايتبي
                    </Card.Text>
                    <Button variant="success" className="me-auto">
                      تفاصيل اكثر
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Container>
      </Row> */}
    </Container>
  );
}

export default Homepage;
export async function getStaticProps() {
  const products = await getFireDocsQuery("products", "offer", "==", true);
  console.log("ssg for home");

  return {
    props: { products },
    revalidate: 10,
  };
}
