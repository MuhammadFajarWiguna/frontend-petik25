import { useEffect, useState } from "react";
import Navbar from "../../component/MyNavbar/MyNavbar";
import { useParams } from "react-router-dom";
import axios from "axios";

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
      <Navbar />
      <h1>Detail Blog</h1>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <hr />
      <h4>Komentar</h4>
      {comments
        .filter((comment) => comment.postId === Number(id))
        .map((comment) => (
          <div key={comment.id} style={{ border: "1px solid black", margin: "6px", padding: "6px" }}>
            <b>{comment.name}</b>
            <p>{comment.email}</p>
            <p>{comment.body}</p>
         
          </div>
        ))}

        </div>
  );
};

export default DetailBlog;
