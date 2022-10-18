import { ImSpinner2 } from "react-icons/im";

const Loading = ({ spinnerSize }) => {
  return <ImSpinner2 className={`spinner ${spinnerSize}`} />;
};

export default Loading;
