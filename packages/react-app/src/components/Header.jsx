import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header(props) {
  return (
    <header className="">
      <div className="container-md py-4 py-2 d-flex align-items-center justify-content-between">
        <a href="./" rel="noopener noreferrer">
          <h1 className="h1 text-black fw-bold">Bit<span className="hanamin">Yo</span></h1>
        </a>
        <div>
          {props.children}
        </div>
        {/* <PageHeader
          title="🏗 scaffold-eth"
          subTitle="forkable Ethereum dev stack focused on fast product iteration"
          style={{ cursor: "pointer" }}
        /> */}
      </div>
    </header>
  );
}