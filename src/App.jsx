import "./App.css";
import Article from "./component/Article/Article";
import posts from "./posts.json";
import Counter from "./component/Counter/Counter";
import Lifecycle from "./component/Lifecycle/Lifecycle";

function App() {
  return (
    <>
      <Article posts={posts} />
      <h3>Top Author</h3>
      <ol>
        {posts.map((post, index) => {
          return <li key={index}>{post.author}</li>;
        })}
      </ol>
      <button onClick={() => alert("Hello World")}>Click Me!</button>
        <Counter/>
        <Lifecycle/>
    </>
  );
}

export default App;
