import React from "react";
import { Wrapper, SearchInput, Filter, CardList } from "../components";

const HomePage = () => {
  return (
    <>
      <Wrapper>
        <SearchInput />
        <Filter />
      </Wrapper>

      <CardList />
    </>
  );
};

export default HomePage;
