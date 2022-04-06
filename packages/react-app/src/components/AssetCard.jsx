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
  useBlockNumber,
} from 'wagmi'

import { ethers } from "ethers";

import { floor, bignumber, numeric, number, format } from "mathjs";


export default function AssetCard(props) {
  const {
    tokenID,
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
  const [{ data: blockData }, getBlockNumber] = useBlockNumber({
    skip: true,
  })

  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

  const contract = useContract({
    addressOrName: productAddress,
    contractInterface: productABI,
    provider: provider,
  });

  const deFiContract = useContract({
    addressOrName: productDeFiAddress,
    contractInterface: productDeFiABI,
    provider: provider,
  });

  // transfer
  const [toAddress, setToAddress] = useState();

  const [{
    data: transferFromData,
    error: transferFromError
  }, handleTransferFrom] = useContractWrite(
    {
      addressOrName: productAddress,
      contractInterface: productABI,
      provider: provider,
      // signerOrProvider: signer,
    },
    'transferFrom', {
      args: [accountData.address, toAddress, tokenID]
    }
  );

  const [{
    data: approveData,
    error: approveError
  }, handleApprove] = useContractWrite(
    {
      addressOrName: productAddress,
      contractInterface: productABI,
      provider: provider,
      // signerOrProvider: signer,
    },
    'approve', {
      args: [toAddress, tokenID]
    }
  );

  // 提現
  const [{
    data: withdrawByNftData,
    error: withdrawByNftError
  }, handleWithdrawByNft] = useContractWrite(
    {
      addressOrName: productDeFiAddress,
      contractInterface: productDeFiABI,
      provider: provider,
      // signerOrProvider: signer,
    },
    'withdrawByNft', {
      args: []
    }
  );

  // 存錢
  const [toStaking, setToStaking] = useState();

  const [{
    data: stakeByNftData,
    error: stakeByNftError
  }, handleStakeByNft] = useContractWrite(
    {
      addressOrName: productDeFiAddress,
      contractInterface: productDeFiABI,
      provider: provider,
      // signerOrProvider: signer,
    },
    'stakeByNft', {
      args: []
    }
  );

  // 取得該 DeFi 的金庫金額
  const [{ data: deFiBalance }, getDeFiBalance] = useContractRead(
    {
      addressOrName: productDeFiAddress,
      contractInterface: productDeFiABI,
      provider: provider,
      // signerOrProvider: signer,
    },
    'getBalance', {args: []}
  );

  // 取得該張保單的 staking 金額
  const [{ data: cost }, getCost] = useContractRead(
    {
      addressOrName: productDeFiAddress,
      contractInterface: productDeFiABI,
      provider: provider,
      // signerOrProvider: signer,
    },
    'cost', {args: []}
  );

  // 取得該張保單的 Locked Time
  const [{ data: coolTime }, getCoolTime] = useContractRead(
    {
      addressOrName: productDeFiAddress,
      contractInterface: productDeFiABI,
      provider: provider,
      // signerOrProvider: signer,
    },
    'coolTime', {args: []}
  );
  


  useEffect(async function () {

    const getDeFiCostInfo = await getDeFiBalance();
    const getTokenCostInfo = await getCost({ 
      args: [tokenID]
    });
    // const getCoolTimeInfo = await getCoolTime({ 
    //   args: [tokenID]
    // });


  }, [blockData]);

  // console.log(deFiContract);

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

  
  return (
    <div className="AssetCard product px-2 py-4 py-lg-2">
      <div className="AssetCard-body row px-2 py-4 border-round-10px overflow-hidden bg-paper">
        <div className="col-12 col-sm-5">
          <div className="product-profile border-round-10px overflow-hidden"><img className="w-100" src={productProfile} alt="" /></div>
          <div className="product-data row py-2">
            {(() => {
              let datas = [];
              const extendsProductDatas = productDatas.concat([
                {name: 'Token ID', value: tokenID, unit: '-'}, 
                {name: '已鎖倉時間', value: coolTime, unit: '-'}, 
              ]);
              for (let index in extendsProductDatas) {
                datas.push(
                  <div key={index} className="product-data-item my-2 text-start col-6 col-sm-4 col-xl-6 d-flex flex-column align-items-center">
                    <span className="product-data-namea mb-1 text_14 text-black fw-700">{extendsProductDatas[index].name}</span>
                    <span className="product-data-value mb-1 body_18 text-black fw-700">{extendsProductDatas[index].value}</span>
                    <span className="product-data-unit mb-0 text_14 text-black fw-400">{extendsProductDatas[index].unit}</span>
                  </div>
                )
              }
              return datas
            })()}
          </div>          
        </div>
        <div className="product-intro col-12 col-sm-7 text-start">
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

        <div className="product-form col-12 d-flex flex-sm-row align-items-end">
          <div className="flex-fill d-flex flex-column align-items-start pe-4">
            <span className="product-form-itemName text_14 text-black fw-700">Staking Price</span>
            <div className="d-flex align-items-baseline w-100">
              <input className="product-form-itemInput pb-2 catch_34 text-start text-orange fw-700 bg-paper w-100" placeholder="請輸入金額" type="text" value={toStaking} onChange={e => setToStaking(e.target.value)} />
              <div className="product-form-itemCurrency body_18 text-black fw-700 ps-2">{productTokenUnit}</div>
            </div>
          </div>
          <div className="">
            <div className="button button-style-primary" onClick={async () => {
              if(!toStaking) { alert('請付錢'); return;}
              await handleApprove();
              await handleStakeByNft({ 
                args: [toStaking, tokenID],
                overrides: {
                  value: ethers.utils.parseEther(toStaking), 
                }
              });
              window.location.reload();
            }}>
              <div className="button-link px-4 py-2 border-round-10px bg-orange overflow-hidden">
                <span className="button-text body_18 text-paper fw-700 font-Rubik">存入資產</span>
              </div>  
            </div>
          </div>
        </div>
        <div className="product-form col-12 d-flex flex-sm-row align-items-end mb-2">
          <div className="flex-fill d-flex flex-column align-items-start pe-4">
            <span className="product-form-itemName text_14 text-black fw-700">You earned</span>
            <div className="d-flex align-items-baseline w-100">
              <span className="product-form-itemInput pb-2 catch_34 text-start text-grey fw-700 bg-paper w-100">
                {cost ? ethers.utils.formatEther(cost) : '0'}
              </span>
              <div className="product-form-itemCurrency body_18 text-black fw-700 ps-2">{productTokenUnit}</div>
            </div>
          </div>
          <div className="">
            <div className="button button-style-primary" onClick={async () => {
              await handleApprove();
              await handleWithdrawByNft({ 
                args: [tokenID, accountData.address] 
              });
              window.location.reload();
            }}>
              <div className="button-link px-4 py-2 border-round-10px bg-grey overflow-hidden">
                <span className="button-text body_18 text-paper fw-700 font-Rubik">取回資產</span>
              </div>  
            </div>
          </div>
        </div>
        <div className="product-form col-12 d-flex flex-sm-row align-items-end">
          <div className="flex-fill d-flex flex-column align-items-start pe-4">
            <span className="product-form-itemName text_14 text-black fw-700">transfer to</span>
            <div className="d-flex align-items-baseline w-100">
              <input className="product-form-itemInput pb-2 text_14 text-black fw-300 bg-paper w-100" placeholder="0x????" type="text" value={toAddress} onChange={e => setToAddress(e.target.value)} />
            </div>
          </div>
          <div className="">
            <div className="button button-style-primary" onClick={async () => {
              if(!toAddress) { alert('請輸入某個人的錢包地址'); return;}
              await handleApprove();
              await handleTransferFrom();
              window.location.reload();
            }}>
              <div className="button-link px-4 py-2 border-round-10px bg-orange overflow-hidden">
                <span className="button-text body_18 text-paper fw-700 font-Rubik">一鍵傳送資產</span>
              </div>  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}