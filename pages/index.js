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
import { BiSearch } from "react-icons/bi";

//
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

function Homepage() {
  // useEffect(() => window.scrollTo(0, 0), []);

  return (
    <Container className="m-0 p-0 w-100">
      <Row className="greeting m-0">
        <Col className="h-100 m-0 p-0">
          <Container className="h-100 m-0 p-0">
            <Col xs={12} lg={5} className="flex blur ps-4 h-100">
              <div className="me-auto">
                <h1>سلام عليكم</h1>
                <p>خدمات بيل قبل اتل تنلل نعا نعلان عناعلا تا </p>
                <Form className="">
                  <InputGroup className="shadow-sm border rounded mb-2">
                    <Button
                      variant="success"
                      className="bg-sec text-muted border-0"
                    >
                      <BiSearch /> <span className="ms-1">|</span>
                    </Button>
                    <Form.Control
                      type="text"
                      name="keyword"
                      placeholder="البحث عن خدمة"
                      className="p-2 rounded-0 border-0"
                    />
                  </InputGroup>
                </Form>
                <Button href="/Products" variant="success">
                  تصفح
                </Button>
              </div>
            </Col>
          </Container>
        </Col>{" "}
      </Row>
      <Row className="m-1">
        <Col lg={6}>
          <h2 className="pt-3 pb-3 text-center">العروض المميزة</h2>
          <Container className="flex-r p-0 shadow-lg ">
            <Carousel
              className="w-100 overflow-hidden rounded"
              indicators={false}
            >
              {posts.map((post, index) => {
                return (
                  <Carousel.Item
                    key={index}
                    className="rounded overflow-hidden"
                  >
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
                        {post.title}
                        <pre className="text-success">{post.cost} RQ</pre>
                      </span>
                    </Carousel.Caption>
                    <img
                      loading="lazy"
                      height={"300px"}
                      width={"100%"}
                      // className="d-block w-100 "
                      style={{ objectFit: "cover" }}
                      src={`/images/${post.img}`}
                      alt={`${index + 1} slide`}
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </Container>
        </Col>
        <Col lg={6}>
          {" "}
          <h2 className="pt-3 pb-3 text-center">التصنيفات و الاقسام</h2>
          <Container className="flex-r p-0 shadow-lg m-0">
            <Carousel
              className="w-100 overflow-hidden rounded"
              indicators={false}
            >
              {posts.map((post, index) => {
                return (
                  <Carousel.Item
                    key={index}
                    className="rounded overflow-hidden"
                  >
                    <Carousel.Caption
                      className="p-1 ps-3 blur fs-3"
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
                      height={"300px"}
                      width={"100%"}
                      // className="d-block w-100 "
                      style={{ objectFit: "cover" }}
                      src={`/images/${post.cat}`}
                      alt={`${index + 1} slide`}
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </Container>
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
                      <Col className="p-1" xs={6}>
                        <Card classname="border-0 " style={{ border: "none" }}>
                          <Card.Title>{post.title}</Card.Title>
                          <Card.Img
                            height={"120px"}
                            width={"100%"}
                            src={`/images/${post.logo}`}
                          ></Card.Img>
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
      </Row>
    </Container>
  );
}

export default Homepage;
