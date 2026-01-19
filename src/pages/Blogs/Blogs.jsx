import React from "react";
import posts from "../../posts.json"
import Article from "../../component/Article/Article";
import Navbar from "../../component/Navbar/Navbar";

const Blogs = () => {
    return (
        <div>
            <Navbar/>
            <h1>Daftar Artikel</h1>
            <Article posts={posts}></Article>            
        </div>
    )
}
export default Blogs;