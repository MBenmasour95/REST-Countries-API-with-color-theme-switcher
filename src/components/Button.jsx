import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

const Button = () => {
  return (
    <Link to="/">
      <button className="back-btn">
        <HiOutlineArrowNarrowLeft />
        back
      </button>
    </Link>
  );
};

export default Button;
