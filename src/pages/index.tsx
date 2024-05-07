import React from "react";
import { Nav } from "../components/nav/Nav";

const IndexPage = (): JSX.Element => {
  return (
    <div className={"flex w-full justify-start min-h-screen overflow-y-auto"}>
      <Nav />
    </div>
  );
};

export default IndexPage;
