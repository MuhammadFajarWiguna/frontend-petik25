import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

import { Card, CardBody, CardText, CardTitle, Col, Container, ListGroup, Row } from "reactstrap";
import { ListGroupItem } from "react-bootstrap";

const DetailBlog = () => {
  const [post, setPost] = useState("");
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);

        const commentResponse = await axios.get(`https://jsonplaceholder.typicode.com/comments`);

        // console.log(postResponse.data);
        setPost(postResponse.data);
        setComments(commentResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <Container className="mt-4 mb-5">
        <Row className="justify-content-center">
          <Col md="8">
            <Card className="mb-4 shadow-sm">
              <CardBody>
                <CardTitle tag="h3">{post.title}</CardTitle>
                <CardText className="text-muted"> {post.body} </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      
      <h4>Komentar</h4>
      <ListGroup>
      {comments
        .filter((comment) => comment.postId === Number(id))
        .map((comment) => (
          <ListGroupItem key={comment.id} className="mb-2">
              <b>{comment.name}</b>
              <p className="text-muted-small">{comment.email}</p>
              <p>{comment.body}</p>
          </ListGroupItem>
        ))}
      </ListGroup>
        </Container>
    </div>
  );
};

export default DetailBlog;
