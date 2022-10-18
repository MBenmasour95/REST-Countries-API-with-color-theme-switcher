import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner, Error } from "./index";
import axios from "axios";

const Details = () => {
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState(null);
  const [error, setError] = useState("");
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getCountry = async () => {
      setLoading(true);
      try {
        const response = await axios(
          `https://restcountries.com/v3.1/alpha/${code}`
        );
        const data = response.data[0];

        setCountry(data);

        setError("");
        setLoading(false);
      } catch (err) {
        if (err.response.status === 404) {
          setError("Country Name Not Found!");
        }
        setLoading(false);
        console.clear();
      }
    };

    getCountry();
  }, [code]);

  if (loading) {
    return <Spinner spinnerSize="big" />;
  }

  if (error) {
    return <Error errorText={error} />;
  }

  return (
    <>
      {country && (
        <div className="details-container">
          <div className="img-box">
            <img src={country.flags.svg} alt={country.name.common} />
          </div>
          <div className="details-content">
            <h2>{country.name.common}</h2>

            <div className="row">
              <div>
                <p>
                  native name:
                  <span>
                    {country.name.nativeName
                      ? Object.values(country.name.nativeName)[0].common
                      : "..."}
                  </span>
                </p>
                <p>
                  population:
                  <span>{country.population.toLocaleString()}</span>
                </p>
                <p>
                  region:
                  <span>{country.region}</span>
                </p>
                <p>
                  sub region:
                  <span>{country.subregion}</span>
                </p>
                <p>
                  capital:
                  <span>{country.capital ? country.capital[0] : "..."}</span>
                </p>
              </div>
              <div>
                <p>
                  top level domain:
                  <span>{country.tld[0]}</span>
                </p>
                <p>
                  currencies:
                  <span>
                    {country.currencies
                      ? Object.values(country.currencies)[0].name
                      : "..."}
                  </span>
                </p>
                <p>
                  languages:
                  {country.languages ? (
                    Object.values(country.languages)
                      .map((language, index) => {
                        return <span key={index}>{language} </span>;
                      })
                      .reduce((acc, curr) => (
                        <>
                          {acc}
                          <span>,</span>
                          {curr}
                        </>
                      ))
                  ) : (
                    <span>...</span>
                  )}
                </p>
              </div>
            </div>

            {country.borders ? (
              <div className="borders">
                <p>border contries:</p>
                <div>
                  {country.borders.map((border, index) => {
                    return (
                      <span
                        key={index}
                        onClick={() => navigate(`/details/${border}`)}
                      >
                        {border}
                      </span>
                    );
                  })}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
