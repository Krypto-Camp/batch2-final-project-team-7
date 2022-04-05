import React, { useState } from "react";
import { 
  Link, NavLink, 
  Redirect, Route, Switch, 
  useLocation, useParams, useRouteMatch 
} from "react-router-dom";
import { 
  useAccount,
  useConnect,
  useProvider,
  // useSigner,
  useBalance,
  useNetwork,
  useContract,
  useContractRead,
  useContractWrite,
  useSignMessage,
  // useFeeData,
  useTransaction,
} from 'wagmi'

import { ethers } from "ethers";

import { floor, bignumber, numeric, number, format } from "mathjs";

export default function ProductCard(props) {
  
  const {productTitle, productProfile, productDatas, productDescription, productTokenUnit, productAddress, productABI} = props;
  
  const provider = useProvider();
  
  // const contract = useContract({
  //   addressOrName: productAddress,
  //   contractInterface: productABI,
  //   provider: provider,
  // });

  // const [{ 
  //   data: signer, 
  //   error: signerError, 
  //   loading: signerLoading 
  // }, getSigner] = useSigner();

  const [{ 
    data: mintPrice, 
    error: mintPriceError, 
    loading: mintPriceLoading, 
  }, readMintPrice] = useContractRead(
    {
      addressOrName: productAddress,
      contractInterface: productABI,
      provider: provider,
      // signerOrProvider: signer,
    },
    'getMintPrice',
  );

  const [{
    data: mintData, 
    error: mintError, 
    loading: mintLoading 
  }, mint] = useContractWrite(
    {
      addressOrName: productAddress,
      contractInterface: productABI,
      provider: provider,
      // signerOrProvider: signer,
    },
    'mintNicMeta', {
      overrides: {
        value: mintPrice, 
        // gasPrice: feeData.gasPrice,
        // gasLimit: 60000000000,
      }
    }
  );
  
  const [{
    data: txData, 
    error: txError, 
    loading: txLoading 
  }, sendTransaction] = useTransaction({
    request: {
      to: '0xB4235B332418ae0F0a32c93035c1e3e7E1e5F280',
      value: ethers.utils.parseEther('0.9'), // 1 ETH
    },
  })

  // console.log(txData);
  // console.log(mintPrice);
  // console.log(mintPrice ? ethers.utils.formatEther(mintPrice) : 'mintPrice');
  
  // numeric(mintPrice._hex, 'number') : 'mintPrice');
  // console.log(ethers.utils.parseEther('0.3') );
  // console.log('----------------------------------------');
  // console.log(ethers.utils.parseEther('0.3'));
  // console.log(contract);

  return (
    <div className="ProductCard product px-2 py-4 py-lg-2">
      <div className="productCard-body row px-2 py-4 border-round-10px overflow-hidden bg-paper">
        <div className="col-12 col-sm-5">
          <div className="product-profile border-round-10px overflow-hidden"><img className="w-100" src={productProfile} alt="" /></div>
          <div className="product-data row py-2">
            {(() => {
              let datas = [];
              for (let index in productDatas) {
                datas.push(
                  <div key={index} className="product-data-item my-2 text-start col-6 col-sm-4 col-xl-6 d-flex flex-column align-items-center">
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
        <div className="product-intro col-12 col-sm-7 text-start">
          <h5 className="product-title pb-1 mb-2 body_18 text-black fw-700 font-Rubik">{productTitle}</h5>
          {/* dangerouslySetInnerHTML={{__html: productDescription}} */}
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
            {/* <div className="d-flex align-items-baseline w-100">
              <input className="product-form-itemInput catch_34 text-orange fw-700 bg-paper w-100" placeholder="0.00" type="text" />
              <div className="product-form-itemCurrency body_18 text-black fw-700 ps-2">{productTokenUnit}</div>
            </div> */}
            <div className="d-flex align-items-baseline w-100">
              <span className="product-form-itemInput py-2 catch_34 text-start text-orange fw-700 bg-paper w-100">{mintPrice ? ethers.utils.formatEther(mintPrice) : 'NaN'}</span>
              <div className="product-form-itemCurrency body_18 text-black fw-700 ps-2">ETH</div>
            </div>
          </div>
          <div className="">
            <div className="button button-style-primary">
              <div className="button-link px-4 py-2 border-round-10px bg-orange overflow-hidden">
                <span className="button-text body_18 text-paper fw-700 font-Rubik" onClick={async () => {
                  console.log('signMessage');
                  console.log('mint');
                  // await sendTransaction();
                  await mint();
                }}>BUY</span>
              </div>  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}