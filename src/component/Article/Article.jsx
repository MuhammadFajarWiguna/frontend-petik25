import {useEffect, useState } from "react";
import Search from "../Search/Search";
import axios from "axios"
import { NavLink } from "react-router-dom";
import Footer from "../Footer/Footer";
const Article = () => {
  const [posts,setPosts] = useState([]);
  const [filteredPost, setFilteredPost] = useState(posts);
  const [postTotal, setPostTotal] = useState(posts.length);
  const [authors, setAuthors] = useState([])
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
        const postResponse = await axios.get(
         "https://jsonplaceholder.typicode.com/posts"
        );
        const userResponse = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        )

        // console.log(postResponse);
        // console.log(userResponse);
        
        
        setFilteredPost(postResponse.data);
        setPostTotal(postResponse.data.length);
        setPosts(postResponse.data)
        setAuthors(userResponse.data)


    
      } catch (error) {
        console.log(error);
        
      }
    }

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
      <Search totalPost={postTotal} onSearchChange={onChangeSearch} />
      {filteredPost.map((post, index) => {
        const author = authors.find(
      (user) => user.id === post.userId);
       
          return (
          <div key={index}>
            <NavLink to={`/posts/${post.id}`}>
          <h3>{post.title}</h3>
            </NavLink>
          <small>
           Author: <b>{author ? author.name : "unknow"}</b> , {post.body} - Date: {post.username}, tags: {post.email}
          </small>
        </div>
        );
      })}
    
      </div>
  );
};


export default Article;