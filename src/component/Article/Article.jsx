import { useState } from "react";
import Search from "../Search/Search";

const Article = ({ posts = [] }) => {
  const [filteredPost, setFilteredPost] = useState(posts);
  const [postTotal, setPostTotal] = useState(posts.length);

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
      {filteredPost.map((post, index) => (
        <div key={index}>
          <h3>{post.title}</h3>
          <small>
            {post.author} - Date: {post.date}, tags: {post.tags}
          </small>
        </div>
      ))}
    </div>
  );
};

export default Article;