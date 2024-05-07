import React from "react";
import { Nav } from "../components/nav/Nav";
import { NextPageWithLayout } from "./_app";

const IndexPage = (): NextPageWithLayout => {
  return (
    <div className={"flex w-full justify-start min-h-screen overflow-y-auto"}>
      <Nav />
    </div>
  );
};

export default IndexPage;
