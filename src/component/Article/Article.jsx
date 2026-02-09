import { useEffect, useState } from "react";
import Search from "../Search/Search";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Footer from "../Footer/Footer";
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Container, Row } from "reactstrap";
const Article = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPost, setFilteredPost] = useState(posts);
  const [postTotal, setPostTotal] = useState(posts.length);
  const [authors, setAuthors] = useState([]);
  // useEffect(() => {
  // // sideEffect: contoh untuk pengambilan data
  // console.log("Komponen dipasang atau data berubah");

  // return () => {
  //   //  cleanup: membersihkan efek
  //   console.log("Membersihkan sebelum komponen dilepas");
  // };
  //   setFilteredPost(posts);
  //   setPostTotal(posts.length)
  // }, [filteredPost]);
  // efek berjalan jika data pada array berubah, jika array kosong
  // maka hanya berjalan sekali saat komponen pertama kali dimuat(mount)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await axios.get("https://jsonplaceholder.typicode.com/posts");
        const userResponse = await axios.get("https://jsonplaceholder.typicode.com/users");

        // console.log(postResponse);
        // console.log(userResponse);

        setFilteredPost(postResponse.data);
        setPostTotal(postResponse.data.length);
        setPosts(postResponse.data);
        setAuthors(userResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const onChangeSearch = (searchTerm) => {
    const filteredData = posts.filter((post) => {
      return post.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredPost(filteredData);
    setPostTotal(filteredData.length);
  };

  return (
    <div>
      <Container className="mt-4">
        <Row className="mb-3">
          <Col>
            <Search totalPost={postTotal} onSearchChange={onChangeSearch} />
          </Col>
        </Row>

        <Row>
          {filteredPost.map((post) => {
            const author = authors.find((user) => user.id === post.userId);

            return (
              <Col md="6" lg="4" className="mb-4" key={post.id}>
                <Card
                  body
                  color="light"
                  outline
                  className="h-100 w-100 shadow-lg"
                  style={{
                    width: "18rem",
                  }}
                >
                  <CardBody>
                    <CardTitle tag="h5">
                      <NavLink to={`/posts/${post.id}`}>{post.title}</NavLink>
                    </CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Card subtitle
                    </CardSubtitle>
                    <CardText>
                      Author: <b>{author ? author.name : "Unknown"}</b>
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Article;
