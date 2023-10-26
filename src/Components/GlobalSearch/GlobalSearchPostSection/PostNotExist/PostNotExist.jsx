import "./PostNotExist.css";
import Opps from "../../../../assets/Icons/opps.svg";

const PostNotExist = () => {
  return (
    <div className="opps-main-container">
      <section className="opps-container">
        <div className="opps-header-container">
          <img src={Opps} alt="" />
          <h1>Opps</h1>
        </div>
        <p>
          Sorry we couldn’t find any results for ‘’
          <span>Get up to 45% off</span>’’
        </p>
      </section>
    </div>
  );
};

export default PostNotExist;
