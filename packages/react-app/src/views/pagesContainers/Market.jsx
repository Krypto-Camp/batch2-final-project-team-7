import React from "react";

// displays a page header

export default function Market(props) {
  return (
    <section className="section d-flex flex-column flex-fill">
      <div className="container-md px-4 pt-4 d-flex flex-column flex-fill">
        <div className="contnet d-flex flex-column align-items-stretch justify-content-between">

          {/* AccountDashboard */}

          <div className="productList px-4 py-4 d-flex flex-column flex-fill">
            <h3 className="mb-4 title_24 text-center text-paper fw-700 font-Rubik">MARKETPLACE｜產品市集</h3>
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
      </div>
    </section>
  );
}