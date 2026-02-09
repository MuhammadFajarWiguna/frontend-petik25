import React from "react";
import { Col, Container, Row, Button, Card ,CardBody,CardTitle} from "react-bootstrap";
import hero_img from "../../assets/new.svg";

const Home = () => {
  const categories = ["Teknologi", "Otomotif", "Fashion", "Sport"];
  return (
    <div className="d-flex flex-column min-vh-100">

      <div className="bg-primary text-light py-5 flex-fill d-flex align-items-center">
        <Container className="flex-fill d-flex align-items-center">
          <Row className="w-100 align-items-center">
            {/* Kiri Hero: Teks dan CTA */}
            <Col md="6" className="mb-4 mb-md-0">
              <h1>Selamat Datang di PeTIK Blog</h1>
              <p>Pesantren Teknologi Informasi dan Komunikasi (PeTIK) adalah lembaga pendidikan yang fokus pada pengembangan keterampilan IT, khususnya Web Development, Mobile Development dan jaringan.</p>
              <p>Bergabunglah dengan kami dan tingkatkan keahlianmu di dunia digital bersama mentor dan praktisi industri!</p>
              <Button variant="light" size="lg" href="/posts" className="border">
                Pelajari lebih lanjut
              </Button>
            </Col>

            {/* Kanan Hero: Gambar */}
            <Col md="6">
              <img src={hero_img} alt="hero image" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Popular Categories Section*/}

      <Container className="my-5">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="fw-bold">Kategori Terpopuler</h2>
            <p className="text-muted">Eksplor Kategori yang menarik</p>
          </Col>
        </Row>
        <Row className="g-4 justify-content-center">
          {categories.map((category, index) => (
            <Col md={4} key={index}>
              <Card className="text-center shadow-sm category-card">
                <CardBody>
                  <CardTitle className="fw-bold">{category}</CardTitle>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default Home;
