import React from "react";

// displays a page header

export default function BityoHeader(props) {
  return (
    <header className="">
      <div className="container-md py-4 py-2 d-flex align-items-center justify-content-between">
        <a href="./" rel="noopener noreferrer">        
          <h1 className="mb-0 catch_34 text-black fw-900 font-Rubik">BIT<span className="">YO</span></h1>
        </a>
        {props.children}
        
      
      </div>
    </header>
  );
}