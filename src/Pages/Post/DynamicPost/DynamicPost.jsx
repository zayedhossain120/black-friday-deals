import { useParams } from "react-router";

const DynamicPost = () => {
  const { id } = useParams();
  return <div>Dynamic Post {id}</div>;
};

export default DynamicPost;
