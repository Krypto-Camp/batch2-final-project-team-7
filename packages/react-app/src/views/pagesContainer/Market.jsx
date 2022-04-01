import React from "react";

// displays a page header

export default function Market(props) {
  return (
    <section className="section d-flex flex-column flex-fill">
      Market
      <div className="container-md px-4 pt-4 d-flex flex-column flex-fill">

        {/* AccountDashboard */}

        <div className="productList px-4 py-4 d-flex flex-column flex-fill">
          <h3 className="title_24 text-center text-white fw-900"></h3>
          <div className="flex-fill row productList-body">
            
            {/* Cards */}
            {props.children}

            d<br />d<br />d<br />d<br />d<br />d<br />d<br />d<br />d<br />d<br />
            d<br />d<br />d<br />d<br />d<br />d<br />d<br />d<br />d<br />d<br />
            d<br />d<br />d<br />d<br />d<br />d<br />d<br />d<br />d<br />d<br />
            d<br />d<br />d<br />d<br />d<br />d<br />d<br />d<br />d<br />d<br />
            d<br />d<br />d<br />d<br />d<br />d<br />d<br />d<br />d<br />d<br />
            d<br />d<br />d<br />d<br />d<br />d<br />d<br />d<br />d<br />d<br />
          </div>
        </div>
      </div>
    </section>
  );
}