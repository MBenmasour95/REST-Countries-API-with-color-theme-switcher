import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { slice } from "lodash";
import { AppContext } from "../context";
import { Spinner, Card, Error } from "./index";

const CardList = () => {
  const {
    loading,
    error,
    countries,
    setFilterOpen,
    itemsPerPage,
    setItemsPerPage,
  } = useContext(AppContext);
  const [hasMore, setHasMore] = useState(false);
  const initialCountries = slice(countries, 0, itemsPerPage);
  const containerRef = useRef();

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 20
    ) {
      setTimeout(() => setItemsPerPage(itemsPerPage + 24), 800);
      if (itemsPerPage >= countries.length) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  }, [itemsPerPage, setItemsPerPage, countries.length]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (loading) {
    return <Spinner spinnerSize="big" />;
  }

  if (error) {
    return <Error errorText={error} />;
  }

  return (
    <>
      <div
        className="container"
        ref={containerRef}
        onClick={() => setFilterOpen(false)}
      >
        {countries &&
          initialCountries.map((country, index) => {
            return <Card key={index} {...country} />;
          })}
      </div>

      {hasMore && <Spinner spinnerSize="small" />}
    </>
  );
};

export default CardList;
