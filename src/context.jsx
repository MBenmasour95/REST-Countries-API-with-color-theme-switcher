import { useEffect, createContext, useState } from "react";
import axios from "axios";

const BASE_URL = "https://restcountries.com/v3.1/all";
const SEARCH_URL = "https://restcountries.com/v3.1/name/";
const REGION_URL = "https://restcountries.com/v3.1/region/";

const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark-theme"
  );
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [error, setError] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(24);

  const toggleTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
    }
  };

  const toggleFilter = () => setFilterOpen(!filterOpen);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const fetchAllCountries = async () => {
      setLoading(true);
      try {
        const response = await axios(BASE_URL);
        const data = response.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );

        setCountries(data);

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    const searchCountryByName = async () => {
      setLoading(true);

      try {
        const response = await axios(`${SEARCH_URL}${search}`);
        const data = response.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        const searchCountryName = data.filter((country) =>
          country.name.common.toLowerCase().startsWith(search.toLowerCase())
        );
        const searchCountryNameByRegion = data.filter(
          (country) =>
            country.name.common
              .toLowerCase()
              .startsWith(search.toLowerCase()) && country.region === region
        );

        const notMatched = searchCountryName.find((country) =>
          country.name.common.toLowerCase().startsWith(search.toLowerCase())
        );
        const existing = searchCountryNameByRegion.find(
          (country) => country.region === region
        );

        if (region !== "All") {
          setCountries(searchCountryNameByRegion);
        } else {
          setCountries(searchCountryName);
        }

        if (response.status === 200) {
          if ((region !== "All" && !existing) || !notMatched) {
            setError("No Countries Matched Your Search!");
          } else {
            setError("");
          }
        }

        setLoading(false);
      } catch (err) {
        if (err.response.status === 404) {
          setCountries([]);
          setError("No Countries Matched Your Search!");

          console.clear();

          setLoading(false);
        }
      }
    };

    const fetchCountriesByRegion = async () => {
      setLoading(true);

      try {
        const response = await axios(`${REGION_URL}${region}`);
        const data = response.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );

        setCountries(data);
        setLoading(false);
      } catch (err) {
        console.log(err.response);
      }
    };

    if (search) {
      const debounce = setTimeout(searchCountryByName, 500);
      return () => clearTimeout(debounce);
    } else {
      setError("");

      if (region === "All") {
        fetchAllCountries();
      } else {
        fetchCountriesByRegion();
      }
    }
  }, [search, region]);

  return (
    <AppContext.Provider
      value={{
        toggleTheme,
        toggleFilter,
        filterOpen,
        setFilterOpen,
        theme,
        loading,
        error,
        countries,
        setCountries,
        search,
        setSearch,
        regions,
        region,
        setRegion,
        itemsPerPage,
        setItemsPerPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
