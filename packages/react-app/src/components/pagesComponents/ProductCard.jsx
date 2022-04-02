import React, { useState } from "react";

// displays a page header

export default function ProductCard(props) {
  const {productTitle, productProfile, productDatas, productDescription} = props;
  
  // useState
  
  return (
    <div className="ProductCard product px-2 py-4 py-lg-2">
      <div className="productCard-body row px-2 py-4 border-round-10px overflow-hidden bg-paper">
        <div className="col-12 col-md-5">
          <div className="product-profile border-round-10px overflow-hidden"><img className="w-100" src={productProfile} alt="" /></div>
          <div className="product-data row py-2">
            {(() => {
              let datas = [];
              for (let index in productDatas) {
                datas.push(
                  <div className="product-data-item my-2 text-start col-6 col-sm-4 col-xl-6 d-flex flex-column align-items-center">
                    <span className="product-data-namea mb-1 text_14 text-black fw-700">{productDatas[index].name}</span>
                    <span className="product-data-value mb-1 body_18 text-black fw-700">{productDatas[index].value}</span>
                    <span className="product-data-unit mb-0 text_14 text-black fw-400">{productDatas[index].unit}</span>
                  </div>
                )
              }
              return datas
            })()}
          </div>          
        </div>
        <div className="product-intro col-12 col-md-7 text-start">
          <h5 className="product-title pb-1 mb-2 body_18 text-black fw-700 font-Rubik">{productTitle}</h5>
          <p className="product-text mb-2 text_14 text-black fw-400 font-Rubik">{productDescription}</p>
        </div>
        <div className="product-form col-12 d-flex flex-column flex-sm-row align-items-baseline">
          <div className="flex-fill">
            <div className="product-form-itemMame"></div>
            <div className="product-form-itemInput"></div>
            <div className="product-form-itemCurrency"></div>
          </div>
          <div className="">
            <div className="button button-style-primary">
              <div className="button-link">
                <span className="button-text">購買產品</span>
              </div>  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}