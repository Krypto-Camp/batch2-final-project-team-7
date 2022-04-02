import React from "react";

// displays a page header

export default function Homepage(props) {
  const members = [
    { name: 'Vincent', profile: './images/profile-Vincent.png', 
      text: '介紹 Vincent 介紹 Vincent 介紹 Vincent 介紹 Vincent 介紹 Vincent 介紹 Vincent 介紹 Vincent', 
      job: ['PM', 'UI/UX', 'Front-end']},
    { name: 'Afra', profile: './images/profile-Vincent.png', 
      text: '介紹 Afra 介紹 Afra 介紹 Afra 介紹 Afra 介紹 Afra 介紹 Afra 介紹 Afra', 
      job: ['Whitepaper', 'Smart Contract']},
    { name: 'Raymond', profile: './images/profile-Vincent.png', 
      text: '介紹 RRaymondaym 介紹 RRaymondaym 介紹 RRaymondaym 介紹 RRaymondaym 介紹 RRaymondaym 介紹 RRaymondaym 介紹 RRaymondaym', 
      job: ['Front-end', 'Smart Contract']},
    { name: 'Ben', profile: './images/profile-Vincent.png', 
      text: '介紹 Ben 介紹 Ben 介紹 Ben 介紹 Ben 介紹 Ben 介紹 Ben 介紹 Ben', 
      job: ['Tokenomic', 'Smart Contract']},
    { name: 'Tim', profile: './images/profile-Vincent.png', 
      text: '介紹 Tim 介紹 Tim 介紹 Tim 介紹 Tim 介紹 Tim 介紹 Tim 介紹 Tim', 
      job: ['Smart Contract']},
    { name: 'Charles', profile: './images/profile-Vincent.png', 
      text: '介紹 Charles 介紹 Charles 介紹 Charles 介紹 Charles 介紹 Charles 介紹 Charles 介紹 Charles', 
      job: ['Smart Contract']},
  ];
  return (
    <section className="section overflow-hidden">
      <div className="visual position-relative vw-100 start-50 translate-middle-x">
        <img className="w-100" src="./images/visual.jpg" alt="" />
        <div className="visual-main position-absolute start-50 top-50 translate-middle">
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
          <p className="visual-text mb-4 body_18 text-paper fw-400 intro">
            我們推出多種令人垂涎的智慧資產合約，結合專業操盤。<br />
            使累積財富的方式不但理性，更多了人情味。
          </p>
        </div>
      </div>
      <div className="container-lg px-4 position-relative">
        {/* <div className="position-absolute start-50 top-0 translate-middle-x vw-100 h-100 bg-paper"></div> */}
        <div className="contnet d-flex flex-column align-items-start justify-content-between">
          <div className="content-title d-flex flex-column flex-lg-row align-items-center align-items-lg-baseline">
            <h3 className="my-4 catch_42 text-black text-left fw-700 font-Rubik">ABOUT</h3>
            <p className="mx-2 body_18 text-center text-black fw-700 font-Rubik">關於</p>
          </div>
          <div className="row">
            <div className="col">
              {/* 為何你該使用 BITYO？*/}
            </div>
          </div>
          <div className="row">
            <div className="col">
              {/* BITYO 即將幫助作為財富，就像蝙蝠俠的管家阿福 */}
            </div>
          </div>
        </div>
        {/*  */}
        {/* Homepage */}
      </div>
      <div className="container-lg px-4 position-relative">
        <div className="position-absolute start-50 top-0 translate-middle-x vw-100 h-100 bg-paper"></div>
        <div className="contnet d-flex flex-column align-items-center justify-content-between">
          <div className="content-title d-flex flex-column flex-lg-row align-items-center align-items-lg-baseline">
            <h3 className="my-4 catch_42 text-black text-center fw-700 font-Rubik">WHITEPAPER</h3>
            <p className="mx-2 body_18 text-center text-black fw-700 font-Rubik">白皮書</p>
          </div>
        </div>
        {/* WHITEPAPER */}
      </div>
      <div className="container-lg px-4 position-relative">
        <div className="contnet d-flex flex-column align-items-center justify-content-between">
          <div className="content-title d-flex flex-column flex-lg-row align-items-center align-items-lg-baseline">
            <h3 className="my-4 catch_42 text-black text-center fw-700 font-Rubik">ROADMAP</h3>
            <p className="mx-2 body_18 text-center text-black fw-700 font-Rubik">路線圖</p>
          </div>
        </div>
        {/* ROADMAP */}
      </div>
      <div className="container-lg px-4">
        <div className="contnet d-flex flex-column align-items-center justify-content-between">
          <div className="content-title d-flex flex-column flex-lg-row align-items-center align-items-lg-baseline">
            <h3 className="my-4 catch_42 text-center fw-700 font-Rubik">MEMBERS</h3>
            <p className="mx-2 body_18 text-center text-black fw-700 font-Rubik">團隊成員</p>
          </div>
          <div className="row w-100 gx-5">
            {(() => {
              let cards = [];
              for (let index in members) {
                let member = members[index];
                let jobs = [];
                for (let index in member.job) {
                  jobs.push(<div className=""><span className="mx-1 px-2 py-1 bg-black text_14 text-paper fw-50 font-Rubik border-round-5px">{member.job[index]}</span></div>)
                }
                cards.push(
                  <div className="col-12 col-sm-6 col-md-4 d-flex flex-column align-items-center py-4">
                    <div className="member-profile mb-3 w-50 border-round-10px overflow-hidden"><img className="w-100" src={member.profile} alt="" /></div>
                    <h5 className="mb-2 title_24 text-black fw-700 font-Rubik">{member.name}</h5>
                    <div className="mb-3 d-flex flex-wrap justify-content-center">{jobs}</div>
                    <p className="mb-2 body_18 text-black fw-500 font-Rubik">{member.text}</p>
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