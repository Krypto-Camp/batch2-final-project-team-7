import React, { useState } from "react";
import { 
  Link, NavLink, 
  Redirect, Route, Switch, 
  useLocation, useParams, useRouteMatch 
} from "react-router-dom";
// displays a page header
import { 
  useAccount,
  useConnect,
  useProvider,
  useBalance,
  useNetwork,
  useContract,
  useContractRead,
  useContractWrite,
} from 'wagmi'

import { testToken } from "../../contracts";

export default function ProductCard(props) {
  const {productTitle, productProfile, productDatas, productDescription, productTokenUnit} = props;
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
          <div className="d-flex flex-column align-items-center">
            <Link to="/">
              <div className="button button-style-link">
                <div className="button-link px-4 py-2 border-round-10px">
                  <span className="button-text text_14 text-black fw-400 font-Rubik">Read More +</span>
                </div>  
              </div>
            </Link>
          </div>
        </div>
        <div className="product-form col-12 d-flex flex-column flex-sm-row align-items-end">
          <div className="flex-fill d-flex flex-column align-items-start pe-4">
            <span className="product-form-itemName text_14 text-black fw-700">Pay Tokens</span>
            <div className="d-flex align-items-baseline w-100">
              <input className="product-form-itemInput catch_34 text-orange fw-700 bg-paper w-100" placeholder="0.00" type="text" />
              <div className="product-form-itemCurrency body_18 text-black fw-700 ps-2">{productTokenUnit}</div>
            </div>
          </div>
          <div className="">
            <div className="button button-style-primary">
              <div className="button-link px-4 py-2 border-round-10px bg-orange overflow-hidden">
                <span className="button-text body_18 text-paper fw-700 font-Rubik">BUY</span>
              </div>  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}