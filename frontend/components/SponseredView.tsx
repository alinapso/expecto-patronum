import { Row, Col, Container } from "react-bootstrap";
import SponseredCard from "./SponseredCard";

const SponseredView = ({ sponsered }: any) => {
  console.log(sponsered);
  if (sponsered && sponsered.length > 0)
    return (
      <Row>
        {sponsered?.map((row: any) => {
          return (
            <Col md={4} key={row.id}>
              <SponseredCard
                name={row.name ? row.name : ""}
                age={row.age ? row.age : ""}
                img={row.img ? row.img : ""}
                description={row.description ? row.description : ""}
              />
            </Col>
          );
        })}
      </Row>
    );
  return <h1>no data</h1>;
};
export default SponseredView;
