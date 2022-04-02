import React from "react";

// displays a page header

export default function Assets(props) {
  return (
    <section className="section d-flex flex-column flex-fill">
      <div className="container-lg px-4 d-flex flex-column flex-fill">
        <div className="contnet d-flex flex-column flex-fill align-items-stretch justify-content-between">
        
          {/* AccountDashboard */}

          <div className="productList px-4 py-4 d-flex flex-column flex-fill">
            <div className="content-title mb-2 d-flex flex-column flex-lg-row align-items-center align-items-lg-baseline justify-content-lg-center">
              <h2 className="mb-0 mx-2 catch_42 text-center text-paper fw-700 font-Rubik">ASSETS</h2>
              <p className="mb-0 mx-2 body_18 text-center text-paper fw-700 font-Rubik">你的資產</p>
            </div>
            <div className="flex-fill row productList-body">
              
              {/* Cards */}
              {props.children}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}