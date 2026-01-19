import  { useState } from "react";
// import posts from "../../posts.json";

const Article = ({ posts = [] }) => {
    const [search, setSearch] = useState("")
    
    const cariReact = posts.filter((post) => {
        return post.title.toLowerCase().includes(search.toLowerCase())
    })

    const handleChangeSearch = (e) => {
        // console.log(e.target.value);
        setSearch(e.target.value);
        console.log(search);
    

    };
  
    return (
    <div>
        Cari artikel: <input type="text" onChange={handleChangeSearch}/>
        <br />
        <small>Ditemukan <b>{cariReact.length}</b> data dengan pencarian kata <b>{search}</b>
        </small>
      {cariReact.map((post, index) => {
        return (
          <div key={index}>
            <h3>{post.title}</h3>
            <small>{post.author} - Date : {post.date}, tags:{post.tags}
            </small>
          </div>
        );
      })}
    </div>
  );
};




export default Article;
