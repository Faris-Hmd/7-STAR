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
    title: "العرض الاول",
    cost: 299,
    post: "Jumpstart your healthy habits today with an experienced and responsible Clinical Nutritionist. Whatever your current diet is, Dt. Azza Khalid carefully evaluates each client and formulates a personalized plan based on your specific needs. So if Sports Nutrition Education is what you’re looking for, schedule a session today",
  },
  {
    img: "gain.webp",
    cost: 599,

    title: "العرض الثاني",
    post: "For years, Dt. Azza Khalid has been providing Weight gain Counseling with comprehensive plans that are catered to each individual’s needs. This specialized service puts individuals on the right track to healthy eating and living. Get in touch today and start taking control of your life with these great tools and technique.",
  },
  {
    img: "diet.jpg",
    title: "العرض الثالث",
    cost: 299,

    post: "Whatever your current healthy status and the diseases youhave, Dt. Azza Khalid carefully evaluates each client and formulates a personalized plan based on your specific needs. Send us your medical results and you will get a good diet plan according to your health status Whatever your current healthy status.",
  },
  {
    img: "loss.jpg",
    cost: 899,
    title: "العرض الرابع",
    post: "For years, Dt. Azza Khalid has been providing Weight Loss Counseling with comprehensive plans that are catered to each individual’s needs. This specialized service puts individuals on the right track to healthy eating and living. Get in touch today and start taking control of your life with these great tools and techniques.",
  },
];

function Homepage() {
  // useEffect(() => window.scrollTo(0, 0), []);

  return (
    <Container className="m-0 m-auto w-100">
      <Row className="wave ">
        {/* <Col xs={5} className="p-0">
          <Image src={"/images/qman.jpg"} width={"100%"} height={"100%"} />
        </Col>{" "} */}
        <Col className="m-auto greeting h-100 ">
          <Container className="">
            <Col xs={12} lg={5} className="wav  m-100">
              {" "}
              <div className="w-100 m-auto">
                <h1>سلام عليكم ورحمة الله</h1>
                <p> خدمات بيل قبل سبسيب ئؤري ئئيبق افاتغ تغفتغ تغيه</p>
                <Form className="mt-1">
                  <InputGroup className="shadow-sm border rounded mb-2 ">
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
                      className="p-2 rounded border-0"
                    />
                  </InputGroup>
                </Form>
                <Button href="/Products" className="bg-liner" variant="danger">
                  تصفح الخدمات
                </Button>
              </div>
            </Col>
          </Container>
        </Col>{" "}
      </Row>
      <Row className="p-0 m-0">
        <h2 className="pt-3 pb-3 text-center">التصنيفات و الاقسام</h2>

        <Container className="flex-r p-0 shadow-lg ">
          <Carousel className="w-100 overflow-hidden rounded">
            {posts.map((post, index) => {
              return (
                <Carousel.Item key={index} className="rounded overflow-hidden">
                  <Carousel.Caption
                    className="p-1 ps-3"
                    style={{
                      bottom: "0",
                      right: "0",
                      minWidth: "100%",
                      textAlign: "right",
                      background: "gray",
                      color: "white",
                    }}
                  >
                    <p>{post.title}</p>
                  </Carousel.Caption>
                  <img
                    height={"500px"}
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
      </Row>
      <Row className="p-0 m-0">
        <h2 className="pt-3 pb-3 text-center">العروض المميزة</h2>

        <Container className="flex-r p-0 shadow-lg ">
          <Carousel
            className="w-100 overflow-hidden rounded"
            indicators={false}
          >
            {posts.map((post, index) => {
              return (
                <Carousel.Item key={index} className="rounded overflow-hidden">
                  <Carousel.Caption
                    className="wave-b p-1 ps-3"
                    style={{
                      bottom: "0",
                      right: "0",
                      minWidth: "100%",
                      textAlign: "right",
                    }}
                  >
                    <p>
                      {post.title}
                      <pre className="text-success">{post.cost} RQ</pre>
                    </p>
                  </Carousel.Caption>
                  <img
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
      </Row>
      <Row className="m-1 mt-2">
        <h2 className="pt-3 pb-3 text-center">نبذة عن خدمات</h2>

        <Card className="p-0 shadow">
          <Container
            style={{ flexWrap: "wrap", display: "flex" }}
            className="p-0"
          >
            <Col xs={12} lg={6} style={{ background: "" }}>
              <Container>
                <Row className="flex-r">
                  {posts.map((post) => {
                    return (
                      <Col className="p-1" xs={6}>
                        <Card classname="border-0 " style={{ border: "none" }}>
                          <Card.Title>{post.title}</Card.Title>
                          <Card.Img
                            height={"150px"}
                            src={`/images/${post.img}`}
                          ></Card.Img>
                          <Card.Text>
                            <small>
                              {" "}
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
            <Col
              xs={12}
              lg={6}
              style={{ background: "red", objectFit: "cover" }}
              className="margin-auto flex"
            >
              <img
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
          {/* {post.} */}
          <Col xs={12} lg={4} style={{ scale: "95%" }}>
            <Card>
              <Card.Title className="ms-3 pt-3 ">العرض الاول</Card.Title>
              <Card.Body>
                <Card.Img height={"200px"} src="/images/diet.jpg"></Card.Img>
                <Card.Text>
                  سلام عليكم كشس حثخق حلف قفغا للافس فايقب تغقسقل تسقثفا سقابتغ
                  سليقات يقايتبي
                </Card.Text>
                <Button variant="success">تفاصيل اكثر</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} lg={4} style={{ scale: "95%" }}>
            <Card>
              <Card.Title className="ms-3 pt-3 ">العرض الثاني</Card.Title>
              <Card.Body>
                <Card.Img height={"200px"} src="/images/sport.jpg"></Card.Img>
                <Card.Text>
                  سلام عليكم كشس حثخق حلف قفغا للافس فايقب تغقسقل تسقثفا سقابتغ
                  سليقات يقايتبي
                </Card.Text>
                <Button variant="success">تفاصيل اكثر</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} lg={4} style={{ scale: "95%" }}>
            <Card>
              <Card.Title className="ms-3 pt-3 ">العرض الثالث</Card.Title>
              <Card.Body>
                <Card.Img height={"200px"} src="/images/gain.webp"></Card.Img>
                <Card.Text>
                  سلام عليكم كشس حثخق حلف قفغا للافس فايقب تغقسقل تسقثفا سقابتغ
                  سليقات يقايتبي
                </Card.Text>
                <Button variant="success">تفاصيل اكثر</Button>
              </Card.Body>
            </Card>
          </Col>
        </Container>

        {/* <Col xs={12} lg={6} className="pt-1 bg-sec">
          <p>
            There is often times a disconnect when it comes to living a healthy
            lifestyle; we know what’s good for our bodies, but we don’t always
            act accordingly. Dt. Azza Khalid aims to mend the gap between
            knowing and doing, by catering to each individual's unique
            circumstances. Whether it is weight loss or weight management,
            managing a dietary condition, or developing a healthy relationship
            with food, Dt. Azza Khalid offers a variety of services and packages
            designed to meet your needs. <br />
            Get a healthy diet plan according to your health status to get a
            healthy weight and lifestyle.
          </p>
        </Col> */}
      </Row>
    </Container>
  );
}

export default Homepage;
