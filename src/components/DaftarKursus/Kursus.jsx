import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, Spinner, Badge, Button } from "reactstrap";
import "./Kursus.css"

const Kursus = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const hasFetched = useRef(false);

  const fetchData = async () => {
    try {
      const res = await fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.log("Error fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchData();
    }
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="text-center fw-bold mb-4">Cabang Kursus Online</h2>

      <Row>
        {data.map((item) => (
          <Col md="4" sm="6" xs="12" className="mb-4" key={item.id}>
            <Card className="h-100 shadow-sm border-0">
              <CardBody className="d-flex flex-column">
                <CardTitle tag="h5" className="kursus-title" >
                  {item.name}
                </CardTitle>

                <Badge color="success" pill className="kursus-badge">
                  ID Provinsi: {item.id}
                </Badge>

                <Button color="primary" className="kursus-btn mt-auto w-100">
                  Lihat Cabang
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Kursus;
