import React from "react";

// displays a page header

export default function Assets(props) {
  return (
    <section className="section d-flex flex-column flex-fill">
      <div className="container-lg px-4 d-flex flex-column flex-fill">
        <div className="contnet d-flex flex-column align-items-stretch justify-content-between">
        {/* AccountDashboard */}

          <div className="productList px-4 py-4 d-flex flex-column flex-fill">
            <div className="content-title d-flex flex-column flex-lg-row align-items-center align-items-lg-baseline justify-content-lg-center">
              <h3 className="mb-4 mx-2 catch_42 text-center text-paper fw-700 font-Rubik">ASSETS</h3>
              <p className="mx-2 body_18 text-center text-paper fw-700 font-Rubik">你的資產</p>
            </div>
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