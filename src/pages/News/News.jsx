import axios from "axios";
import { useEffect, useState } from "react";

import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Container, Row, Spinner } from "reactstrap";



const News = () => {
  const [portals, setPortals] = useState([]);
  const [news, setNews] = useState([]);
  const [activePortal, setActivePortal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchPortals = async () => {
      try {
        const portalResponse = await axios.get("https://berita-indo-api-next.vercel.app/api");

        const portalArray = Object.entries(portalResponse.data.data).map(([name, value]) => ({
          name,
          ...value,
        }));

        console.log(portalResponse);
        setPortals(portalArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPortals();
  }, []);

  const fetchNews = async (portal) => {
    try {
      setLoading(true);
      setErrorMsg("");
      setNews([]);

      let endpoint = "";

      if (portal.type && portal.listType && portal.listType.length > 0) {
        endpoint = portal.type.replace(":type", portal.listType[0]);
      } else if (portal.all) {
        endpoint = portal.all;
      } else {
        console.log("endpoint tidak valid :", portal);
        return;
      }

      const newsResponse = await axios.get(endpoint);

      setNews(newsResponse.data?.data || []);
      setActivePortal(portal);
    } catch (error) {
      console.log(error);
    }finally {
        setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h3>Portal Berita</h3>
      {/* Daftar Portal */}
      <div className="mb-4 d-flex flex-wrap gap-2">
        {portals.map((portal, index) => (
          <Button key={index} color={activePortal?.name == portal.name ? "primary" : "secondary"} onClick={() => fetchNews(portal)}>
            {portal.name}
          </Button>
        ))}
      </div>

        {loading && (
            <div className="d-flex flex-column justify-content-center align-items-center my-5">
                <Spinner color="primary"/>
                <p className="text-muted">Memuat berita...</p>
            </div>
        )}
        {errorMsg && !loading && (
            <p className="text-danger fw-bold">{errorMsg}</p>
        )}

      {/* Daftar Berita */}
      <Row>
        {news.map((item, index) => {
          return (
            <Col key={index}>
              <a href={item.link} className="text decoration-none" target="_blank">
                <Card
                  body
                  color="light"
                  outline
                  style={{
                    width: "18rem",
                  }}
                >
                  <img alt="Berita" src={item.image?.small} />
                  <CardBody>
                    <CardTitle tag="h5">{item.title}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      {item.isoDate ? new Date(item.isoDate).toLocaleDateString("id-ID", {
                        weekday:"long",
                        year:"numeric",
                        month:"long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                      : ""} 
                    </CardSubtitle>
                    <CardText>{item.contentSnippet}</CardText>
                  </CardBody>
                </Card>
              </a>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default News;
