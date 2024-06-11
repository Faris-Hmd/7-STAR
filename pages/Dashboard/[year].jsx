import getStaticties from "../../lib/getStaticteis";
// import { st } from "../../types/types";
import { useState } from "react";
import { months } from "../../data/dates";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useRouter } from "next/router";
function Dashboard(props) {
  const router = useRouter();
  const [selectedM, setSelectedM] = useState("Dec");
  const staticties = props.staticties ? props.staticties : [];
  return (
    <div>
      <Card className="bg-sec p-2 shadow-sm boarder m-2 rounded">
        <Card.Header className="p-0">
          <Container className="flex-r space-btw bg-sec">
            <Col xs={7}>
              <h6>الاحصائيات الشهرية لعام {router.query.year}</h6>
            </Col>{" "}
            <Col xs={5}>
              <Form className="p-1">
                <InputGroup className="overflow-hidden shadow-sm p-0 rounded border">
                  <Button
                    variant="success"
                    className="bg-sec text-muted border-0"
                  >
                    الشهر
                    <span className="ms-2 me-2">|</span>
                  </Button>
                  <Form.Select
                    className="bg-sec border-0 "
                    onChange={(e) => {
                      setSelectedM(e.target.value);
                    }}
                    value={selectedM}
                  >
                    {/* <option value="ALL">الكل</option> */}
                    {months.map((month, index) => {
                      return (
                        <option value={month} key={index}>
                          يناير
                        </option>
                      );
                    })}
                  </Form.Select>
                </InputGroup>
              </Form>
            </Col>
          </Container>
        </Card.Header>

        <Card.Body className="p-0">
          {" "}
          <Line
            // labels={months}
            data={{
              labels: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
              ],
              datasets: staticties.map((en, index) => {
                return {
                  label: months[index],
                  data: en.totalCost,
                };
              }),
            }}
          />
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>

      {/* {staticties?.map((entry) => {
        return (
          <div id={`${entry.month}`}>
            <strong>{entry.month}</strong> /<strong>{entry.ordersNum}</strong>
            <ol>
              {entry.totalCost?.map((en, index) => {
                return <li id={`${index}`}>{en} </li>;
              })}
            </ol>
          </div>
        );
      })} */}
    </div>
  );
}

export default Dashboard;
// export async function getStaticProps(context) {
//   const staticties = await getStaticties(context.params.year);
//   console.log(staticties);
//   return {
//     props: {
//       staticties: staticties,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const paths = ["2023", "2024"].map((year) => ({
//     params: { year: year },
//   }));
//   return {
//     paths,
//     fallback: true,
//   };
// }
