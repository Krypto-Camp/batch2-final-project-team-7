import React from "react";

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

import { config } from "../contracts";
import { list as productsList } from "../products";
import { floor, bignumber, numeric, number, format } from "mathjs";

export default function Homepage(props) {

  // 取得鎖倉量與鎖倉資金
  const [{ data: networkData }, switchNetwork] = useNetwork();
  const provider = useProvider();
  
  let funds = 0;
  let useds = 0;

  if (networkData && networkData.chain) {

    const contracts = config[networkData.chain.id][networkData.chain.name.toLocaleLowerCase()].contracts;
    
    // for (let contractName in productsList) {

    //   const [{ 
    //     data: supply, 
    //   }, readMintPrice] = useContractRead(
    //     {
    //       addressOrName: contracts[`${contractName}NFT`].address,
    //       contractInterface: contracts[`${contractName}NFT`].abi,
    //       provider: provider,
    //     },
    //     'totalSupply',
    //   );

    //   useds += number(supply);

    // }

  }

  // console.log(useds);

  const members = [
    { name: 'Vincent', profile: './images/profile-Vincent.png', 
      text: '前端工程師。去年 10 月加入幣圈，擁有呢喃貓、Demi Human。', 
      job: ['PM', 'UI/UX', 'Front-end']},
    { name: 'Afra', profile: './images/profile-Vincent.png', 
      text: 'Hi', 
      job: ['Whitepaper', 'Smart Contract']},
    { name: 'Raymond', profile: './images/profile-Vincent.png', 
      text: 'Hi', 
      job: ['Front-end', 'Smart Contract']},
    { name: 'Tim', profile: './images/profile-Vincent.png', 
      text: 'Hi', 
      job: ['Smart Contract']},
    { name: 'Ben', profile: './images/profile-Vincent.png', 
      text: 'Hi', 
      job: ['Tokenomic', 'Smart Contract']},
    { name: 'Charles', profile: './images/profile-Vincent.png', 
      text: 'Hi', 
      job: ['Smart Contract']},
  ];

  return (
    <section className="section overflow-hidden">
      <div className="cover visual position-relative vw-100">
        <img className="position-relative translate-middle-x start-50" width={192} height={128} src="./images/visual-xl.jpg" alt="" />
        <div className="visual-main position-absolute start-50 translate-middle">
          <h1 className="visual-title mb-4 catch_84 text-paper fw-700 font-Rubik intro ">
            <span>B</span>
            <span>I</span>
            <span>T</span>
            <span>Y</span>
            <span>O</span>
          </h1>  
          <h4 className="visual-subtitle mb-2 title_24 text-paper fw-700 intro">
            <span className="fw-700">幣佑</span>，庇佑你的財富
          </h4>
        </div>
      </div>
      <div className="container-fluid px-4 position-relative bg-paper">
        {/* <div className="position-absolute start-50 top-0 translate-middle-x vw-100 h-100 bg-paper"></div> */}
        <div className="content d-flex flex-column align-items-center justify-content-between">
          <div className="content-title mb-4 d-flex flex-column flex-lg-row align-items-center align-items-lg-baseline">
            <h2 className="my-0 catch_42 text-black text-left text-black fw-700 font-Rubik">ABOUT</h2>
            <p className="mb-0 mx-2 body_18 text-center text-black fw-700 font-Rubik">關於我們</p>
          </div>
          <div className="">
            <p className="visual-text mb-0 title_24_2 text-black fw-400 intro font-Rubik">
            <span className="fw-700">BITYO</span> 是 <span className="px-2 py-2" style={{backgroundColor: '#1f2641'}}><img src="https://kryptocamp.tw/wp-content/uploads/2021/12/kryptocamp-logo-white.png" height={30} alt="" /></span> 的其中一個團隊<br />
              我們專注於打造真實世界保險在區塊鏈的解決方案<br />
              甚至還推出多種令人垂涎的智慧合約保險產品
            </p>
          </div>
        </div>
      </div>
      <div className="ourdata-container container-lg px-4 position-relative bg-paper">
        <div className="position-absolute vw-100 h-100 start-50 top-0 translate-middle-x bg-paper"></div>
        {/* <div className="position-absolute start-50 top-0 translate-middle-x vw-100 h-100 bg-paper"></div> */}
        <div className="content d-flex">
          <div className="row flex-fill text-center">
            <div className="col-12 col-md-4">
              {/* ？項產品 */}
              <p className="mb-3 body_18 text-black fw-500 font-Rubik">目前的產品數量</p>
              <div className="ourdata-value d-flex align-items-baseline justify-content-center">
                <span className="text-black catch_84 fw-700 pe-1">1</span>
                <span className="text-black body_18 fw-700">項</span>
              </div>
            </div>
            <div className="col-12 col-md-4">
              {/* ？？人使用 BITYO 的服務 */}
              <div className="ourdata-value d-flex align-items-baseline justify-content-center">
                <span className="text-black catch_84 fw-700 pe-1">1</span>
                <span className="text-black body_18 fw-700">人次</span>
              </div>
              <p className="mt-3 body_18 text-black fw-500 font-Rubik">使用 <span className="fw-700">BITYO</span> 的服務</p>
            </div>
            <div className="col-12 col-md-4 text-center">
              {/* 總鎖倉資金 */}
              <p className="mb-3 body_18 text-black fw-500 font-Rubik">總鎖倉資金</p>
              <div className="ourdata-value d-flex align-items-baseline justify-content-center">
                <span className="text-orange catch_84 fw-700 pe-1">1</span>
                <span className="text-orange body_18 fw-700">ETH</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid px-4 py-0 position-relative">
        <div className="content d-flex flex-column align-items-center justify-content-between">
          <div className="about-block-1 row text-center align-self-stretch align-items-center">
            <div className="col-12 col-md-6 px-0">
              <div className="cover about-pic overflow-hidden">
                <img className="translate-middle start-50 top-50" src="./images/pexels-bernyce-hollingworth-2095716.jpg" alt="" />
              </div>
            </div>
            <div className="col-12 col-md-6 px-4">
              <h5 className="mb-4 title_24 text-black border-round-5px px-2 d-inline-block fw-700 font-Rubik">為何你該使用 BITYO？</h5>
              <p className="mb-2 body_18 text-black fw-400 font-Rubik">
              <span className="fw-700">BITYO</span> 就像蝙蝠俠的管家阿福<br />
                專業且值得信任！
              </p>
              <p className="mb-0 body_18 text-black fw-400 font-Rubik">
                我們會竭盡所能，庇佑你的財富
              </p>
            </div>
          </div>
          <div className="about-block-2 row text-center align-self-stretch flex-row-reverse align-items-center">
            <div className="col-12 col-md-6 px-0">
              <div className="cover about-pic overflow-hidden">
                <img className="translate-middle start-50 top-50" src="./images/pexels-fauxels-3183197.jpg" alt="" />
              </div>
            </div>
            <div className="col-12 col-md-6 px-4">
              <h5 className="mb-4 title_24 text-black border-round-5px px-2 d-inline-block fw-700 font-Rubik">我們如何庇佑你的財富？</h5>
              <p className="mb-2 body_18 text-black fw-400 font-Rubik">
              <span className="fw-700">BITYO</span> 擁有頂尖的技術團隊、以及豐富的財經知識<br />
                這使得我們設計出精采的自動化智慧合約保險<br />
                不僅理性，且充滿了人情味
              </p>
              <p className="mb-0 body_18 text-black fw-400 font-Rubik">
                當你在現實世界遭遇困難時<br />
                你會很慶幸自己有 <span className="fw-700">BITYO</span> 的資金可度過難關
              </p>
            </div>
          </div>
          <div className="about-block-3 row text-center align-self-stretch align-items-center">
            <div className="col-12 col-md-6 px-0">
              <div className="cover about-pic overflow-hidden">
                <img className="translate-middle start-50 top-50" src="./images/pexels-pixabay-461049.jpg" alt="" />
              </div>
            </div>
            <div className="col-12 col-md-6 px-4">
              <h5 className="mb-4 title_24 text-black border-round-5px px-2 d-inline-block fw-700 font-Rubik">在真實世界搞不定的，我們來搞定</h5>
              <p className="mb-2 body_18 text-black fw-400 font-Rubik">
                繁雜保單條款、繁瑣的理賠流程、不透明的定價，以及保單對象的設定⋯⋯<br />
                諸多真實世界保險的痛點，使得人們彼此充滿猜忌
              </p>
              <p className="mb-0 body_18 text-black fw-400 font-Rubik">
                我們 <span className="fw-700">BITYO</span> 相信，在區塊鏈的世界中<br />
                <span className="title_24 fw-700">以上痛點將會被搞定！</span> 
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        {/* Homepage */}
      </div>
      <div className="container-lg px-4 position-relative">
        <div className="position-absolute start-50 top-0 translate-middle-x vw-100 h-100 bg-paper"></div>
        <div className="content d-flex flex-column align-items-center justify-content-between">
          <div className="content-title mb-4 d-flex flex-column flex-lg-row align-items-center align-items-lg-baseline">
            <h2 className="my-0 catch_42 text-black text-center text-black fw-700 font-Rubik">WHITEPAPER</h2>
            <p className="mb-0 mx-2 body_18 text-center text-black fw-700 font-Rubik">白皮書</p>
          </div>
          <div className="whitepaper px-2 py-2 border-round-10px">
            <iframe className="whitepaper-body d-block border-round-5px" src="https://hackmd.io/@DrA7YU7xT9SYeKXFK0nXGg/SysW_JIzc" frameborder="0"></iframe>
          </div>
        </div>        
        {/* WHITEPAPER */}
      </div>
      {/* <div className="container-lg px-4 position-relative">
        <div className="content d-flex flex-column align-items-center justify-content-between">
          <div className="content-title mb-4 d-flex flex-column flex-lg-row align-items-center align-items-lg-baseline">
            <h2 className="my-0 catch_42 text-black text-center text-black fw-700 font-Rubik">ROADMAP</h2>
            <p className="mb-0 mx-2 body_18 text-center text-black fw-700 font-Rubik">路線圖</p>
          </div>
        </div>
      </div> */}
      <div className="container-lg px-4 mb-4">
        <div className="content d-flex flex-column align-items-center justify-content-between">
          <div className="content-title mb-4 d-flex flex-column flex-lg-row align-items-center align-items-lg-baseline">
            <h2 className="my-0 catch_42 text-center text-black fw-700 font-Rubik">MEMBERS</h2>
            <p className="mb-0 mx-2 body_18 text-center text-black fw-700 font-Rubik">團隊成員</p>
          </div>
          <div className="row w-100 gx-5">
            {(() => {
              let cards = [];
              for (let index in members) {
                let member = members[index];
                let jobs = [];
                for (let index in member.job) {
                  jobs.push(<div className=""><span className="mx-1 px-2 py-1 bg-grey text_14 text-paper fw-400 font-Rubik border-round-5px">{member.job[index]}</span></div>)
                }
                cards.push(
                  <div key={index} className="col-12 col-sm-6 col-xl-4 d-flex flex-column align-items-center py-4">
                    <div className="member-profile mb-3 w-50 border-round-10px overflow-hidden"><img className="w-100" src={member.profile} alt="" /></div>
                    <h5 className="mb-2 title_24 text-black fw-700 font-Rubik">{member.name}</h5>
                    <div className="mb-3 d-flex flex-wrap justify-content-center">{jobs}</div>
                    <p className="mb-2 body_18 text-black fw-400 font-Rubik">{member.text}</p>
                  </div>
                );
              }
              return cards;
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}