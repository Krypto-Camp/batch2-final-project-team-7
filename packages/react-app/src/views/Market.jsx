import React, { useCallback, useEffect, useState } from "react";
import { 
  Link,
  NavLink,
  Redirect,
  Route,
  Switch,
  useLocation 
} from "react-router-dom";

import {
  ProductCard,
  AccountDashboard,
  AssetCard,
  BityoFooter,
  BityoHeader,
  CoonectButton,
} from "../components";

import { 
  Provider, 
  chain, 
  defaultChains,
  useAccount,
  useConnect,
  useProvider,
  useBalance,
  useNetwork,
  useContract,
  useContractRead,
  useContractWrite,
} from "wagmi";

import { config } from "../contracts";
import { list as productsList } from "../products";
import { NFTE } from '@nfte/react';

export default function Market() {

  const [{ data: networkData }, switchNetwork] = useNetwork();
  const provider = useProvider();

  // const [productsOnline, setProductsOnline] = useState([]);

  // if (networkData && networkData.chain) {
  //   const contracts = config[networkData.chain.id][networkData.chain.name.toLocaleLowerCase()].contracts;
  //   const productArray = [];
  //   for (let productName in contracts) {
  //     if (productName.match('NFT')) {
  //       productArray.push({
  //         address: contracts[productName].address,
  //         abi: contracts[productName].abi,
  //       })
  //     }
  //   }
  //   setProductsOnline(productArray);
  //   // contracts.forEach((contract, index) => {
  //   //   console.log(contract);
  //   // })
  //   // console.log(productsOnline);
  // }

  // if (networkData && networkData.chain && productsOnline == []) {
  //   console.log(config[networkData.chain.id][networkData.chain.name.toLocaleLowerCase()]);
  // }

  // const [products, setProducts] = useState();

  const products = [];

  if (networkData && networkData.chain) {

    const contracts = config[networkData.chain.id][networkData.chain.name.toLocaleLowerCase()].contracts;
    
    // console.log(contracts);

    for (let contractName in productsList) {
      const productInfo = productsList[contractName];
      products.push({
        productAddress: contracts[`${contractName}NFT`].address,
        productDeFiAddress: contracts[`${contractName}StakingRewards`].address,
        productABI: contracts[`${contractName}NFT`].abi,
        productDeFiABI: contracts[`${contractName}StakingRewards`].abi,
        productTitle: productInfo.title,
        productDescription: productInfo.description,
        productProfile: productInfo.profile,
        productDatas: productInfo.datas,
        productTokenUnit: productInfo.tokenUnit,
      })
    }

  }
  
  // setProducts(getProducts);

  return (
    <section className="section d-flex flex-column flex-fill">
      <div className="container-lg px-4 d-flex flex-column flex-fill">
        <div className="content d-flex flex-column flex-fill align-items-stretch justify-content-between">

          <AccountDashboard/>

          <div className="productList px-4 py-4 d-flex flex-column flex-fill">
            <div className="content-title mb-2 d-flex flex-column flex-lg-row align-items-center align-items-lg-baseline justify-content-lg-center">
              <h2 className="mb-0 mx-2 catch_42 text-center text-paper fw-700 font-Rubik">MARKETPLACE</h2>
              <p className="mb-0 mx-2 body_18 text-center text-paper fw-700 font-Rubik">產品市集</p>
            </div>
            <div className="flex-fill row productList-body">

                {products? products.map((data, index) => (
                  <div key={index} className="col-12 col-xl-6 offset-xl-0"><ProductCard                      
                    productTitle={data.productTitle}
                    productProfile={data.productProfile}
                    productAddress={data.productAddress}
                    productABI={data.productABI}
                    productDeFiAddress={data.productDeFiAddress}
                    productDeFiABI={data.productDeFiABI}
                    productDatas={data.productDatas}
                    productDescription={data.productDescription}
                    productTokenUnit={data.productTokenUnit}
                    ></ProductCard></div>
                )):''}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}