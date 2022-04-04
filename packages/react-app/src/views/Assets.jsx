import React from "react";
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
import { NFTE } from '@nfte/react';

export default function Assets() {

  const [{ data: networkData }, switchNetwork] = useNetwork();
  const provider = useProvider();
  
  if (networkData && networkData.chain) {
    console.log(networkData.chain.id, networkData.chain.name.toLocaleLowerCase());
    console.log(config[networkData.chain.id][networkData.chain.name.toLocaleLowerCase()]);
  }

  const productCards = [
    {
      productTitle: 'BITYO 經典成長型保險',
      productProfile: './images/profile-Vincent.png',
      productDatas: [
        {name: 'Locked', value: '3000', unit: 'hours'}, 
        {name: 'Reward', value: '30', unit: '%'},
        {name: 'Reward', value: '30', unit: '%'},
      ],
      productDescription: `
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.


        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
      `,
      productTokenUnit: 'ETH',
    },
  ];

  return (
    <section className="section d-flex flex-column flex-fill">
      <div className="container-lg px-4 d-flex flex-column flex-fill">
        <div className="contnet d-flex flex-column flex-fillalign-items-stretch justify-content-between">
        
          <AccountDashboard/>

          <div className="productList px-4 py-4 d-flex flex-column flex-fill">
            <div className="content-title mb-2 d-flex flex-column flex-lg-row align-items-center align-items-lg-baseline justify-content-lg-center">
              <h2 className="mb-0 mx-2 catch_42 text-center text-paper fw-700 font-Rubik">ASSETS</h2>
              <p className="mb-0 mx-2 body_18 text-center text-paper fw-700 font-Rubik">你的資產</p>
            </div>
            <div className="flex-fill row productList-body">
              
                {productCards.map((data, index) => (
                  <div key={index} className="col-12 col-xl-6 offset-xl-0"><AssetCard                      
                    productTitle={data.productTitle}
                    productProfile={data.productProfile}
                    productDatas={data.productDatas}
                    productDescription={data.productDescription}
                    productTokenUnit={data.productTokenUnit}
                    ></AssetCard></div>
                ))}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}