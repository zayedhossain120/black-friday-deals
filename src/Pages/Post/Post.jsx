import { Outlet } from "react-router-dom";
import TopBar from "../../Components/TopBar/TopBar";
import PostInnerNav from "../../Components/PostInnerNav/PostInnerNav";

const Post = () => {
  return (
    <main>
      <TopBar navigateTo="/post/create" pageTitle="Posts" />
      <section>
        <PostInnerNav />
        <Outlet />
      </section>
    </main>
  );
};

export default Post;
