import React, { useEffect, useState } from "react";
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

import { AssetCard } from "./";

export default function AssetsOfAccount(props) {
  const {
    productTitle,
    productProfile,
    productDatas,
    productDescription,
    productTokenUnit,
    productAddress,
    productABI,
    productDeFiAddress,
    productDeFiABI,
  } = props;

  const provider = useProvider();

  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

  const contract = useContract({
    addressOrName: productAddress,
    contractInterface: productABI,
    provider: provider,
  });
  
  // 取得 Ueer 持有的 NFT 數量
  const [{ data: balanceOf }, getBalanceOf] = useContractRead(
    {
      addressOrName: productAddress,
      contractInterface: productABI,
      provider: provider,
      // signerOrProvider: signer,
    },
    'balanceOf', {
      args: [accountData.address],
    }
  );

  // 取得 Token ID 的 User
  const [{ data: holderAddress }, getOwnerOf] = useContractRead(
    {
      addressOrName: productAddress,
      contractInterface: productABI,
      provider: provider,
      // signerOrProvider: signer,
    },
    'ownerOf', {args: []}
  );

  // 取得 NFT 總量
  const [{ data: totalSupply }, getTotalSupply] = useContractRead(
    {
      addressOrName: productAddress,
      contractInterface: productABI,
      provider: provider,
      // signerOrProvider: signer,
    },
    'totalSupply'
  );

  // // NFT Transfer
  // const [{ data: TransferData }, Transfer] = useContractWrite(
  //   {
  //     addressOrName: productAddress,
  //     contractInterface: productABI,
  //     provider: provider,
  //     // signerOrProvider: signer,
  //   },
  //   'Transfer', {
  //     args: [accountData.address],
  //   }
  // );

  // loop 一個一個 取得 Token
  // Defi 找 NFT Token 取得質押的錢量
  //

  const [tokensOfAccount, setTokensOfAccount] = useState([]);

  useEffect(async function () {

    let tokenID = 0;
    const tokensArray = [];

    while (tokenID < totalSupply){

      const tokenIDHolder = await getOwnerOf({
        args: [tokenID]
      });
      const tokenIDHolderAddress = tokenIDHolder.data;

      if ( tokenIDHolderAddress == accountData.address ) {
        tokensArray.push(tokenID);
      }
      
      tokenID++;
    }

    setTokensOfAccount(tokensArray);

    // console.log(tokensOfAccount);

  }, [totalSupply]);

  // console.log(accountData.address);
  // console.log(balanceOf? balanceOf.toHexString():'');
  // console.log(balanceOf? balanceOf.toString():'');

  return (
    <>
    {(() => {
      let cards = [];
      for (let index in tokensOfAccount) {
        const tokenID = tokensOfAccount[index];
        cards.push(
          <div key={index} className="col-12 col-xl-6 offset-xl-0"><AssetCard
            tokenID={tokenID}
            productTitle={productTitle}
            productProfile={productProfile}
            productAddress={productAddress}
            productABI={productABI}
            productDeFiAddress={productDeFiAddress}
            productDeFiABI={productDeFiABI}
            productDatas={productDatas}
            productDescription={productDescription}
            productTokenUnit={productTokenUnit}
            ></AssetCard></div>
        )
      }
      return cards;
    })()}
    </>
  );
}