import { Link } from "react-router-dom";

const Card = ({ cca3, flags, name, population, region, capital }) => {
  return (
    <Link to={`details/${cca3}`} className="card-link">
      <div className="flag-box">
        <img src={flags.svg} alt={name.common} />
      </div>
      <div className="card-details">
        <h4>{name.common}</h4>
        <p>
          population:
          <span>{population.toLocaleString()}</span>
        </p>
        <p>
          region:
          <span>{region}</span>
        </p>
        <p>
          capital:
          <span>{capital ? capital[0] : "..."}</span>
        </p>
      </div>
    </Link>
  );
};

export default Card;
