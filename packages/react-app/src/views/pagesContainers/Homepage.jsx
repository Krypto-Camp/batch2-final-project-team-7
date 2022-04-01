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
          <h1 className="visual-title catch_84 text-paper fw-700 font-Rubik intro ">
            <span>B</span>
            <span>I</span>
            <span>T</span>
            <span>Y</span>
            <span>O</span>
          </h1>  
          <p className="visual-text body_18 text-paper fw-900 intro">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
          </p>
        </div>
      </div>
      <div className="container-md px-4 py-4 position-relative">
        {/* <div className="position-absolute start-50 top-0 translate-middle-x vw-100 h-100 bg-paper"></div> */}
        <div className="contnet d-flex flex-column align-items-start justify-content-between">
          <h3 className="my-4 text-black text-left fw-700 font-Rubik">INTRO</h3>
        </div>
        {/* Homepage */}
      </div>
      <div className="container-md px-4 py-4 position-relative">
        <div className="position-absolute start-50 top-0 translate-middle-x vw-100 h-100 bg-paper"></div>
        <div className="contnet d-flex flex-column align-items-center justify-content-between">
          <h3 className="my-4 text-black text-center fw-700 font-Rubik">WHITEPAPER</h3>
        </div>
        {/* Homepage */}
      </div>
      <div className="container-md px-4 py-4">
        <div className="contnet d-flex flex-column align-items-center justify-content-between">
          <h3 className="my-4 text-center fw-700 font-Rubik">MEMBERS</h3>
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
                    <h5 className="mb-2 body_18 text-black fw-700 font-Rubik">{member.name}</h5>
                    <div className="mb-3 d-flex flex-wrap justify-content-center">{jobs}</div>
                    <p className="mb-2 text_14 text-black fw-500 font-Rubik">{member.text}</p>
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