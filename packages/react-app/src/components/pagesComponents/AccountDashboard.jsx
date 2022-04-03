import React from "react";
import { useAccount, useConnect, useBalance } from 'wagmi'
// import { useThemeSwitcher } from "react-css-theme-switcher";
// import Address from "../Address";
// import Wallet from "../Wallet";

export default function AccountDashboard({
  // web3Modal,
  // loadWeb3Modal,
  // logoutOfWeb3Modal,
}) {

  const [{ data: connectData, error: connectError }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

  const [{ data: balanceData, error: balanceError, loading: balanceLoading }, getBalance] = useBalance({
    // 代幣合約 ETH
    // addressOrName: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    addressOrName: accountData ? accountData.address : '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    // token: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    watch: true,
  })

  if(connectData) {
    if( connectData.connector) {
      // console.log(connectData.connector.onChainChanged())
    }
  }

  // console.log(balanceData)


  // const { currentTheme } = useThemeSwitcher();
  // // connect 按鈕，透過 web3Modal 連結錢包
  // const modalButtons = [];
  // if (web3Modal) {
  //   if (web3Modal.cachedProvider) {
  //     modalButtons.push(
  //       <div className="button button-style-logout" 
  //         key="logoutbutton"
  //         onClick={logoutOfWeb3Modal}
  //       >
  //         <div className="button-link px-4 py-2 border-round-10px overflow-hidden">
  //           <span className="button-link body_18 text-black fw-700 font-Rubik">Connect</span>
  //         </div>
  //       </div>,
  //     );
  //   } else {
  //     modalButtons.push(
  //       <div className="button button-style-connect" 
  //         key="loginbutton"
  //         onClick={loadWeb3Modal}
  //       >
  //         <div className="button-link px-4 py-2 border-round-10px overflow-hidden">
  //           <span className="button-link body_18 text-black fw-700 font-Rubik">Connect</span>
  //         </div>
  //       </div>,
  //     );
  //   }
  // }
  // else {
    
  // }
  if (accountData) {
    return (
      <>
      <div className="AccountDashboard py-4 d-flex align-items-center">
        <div className="account-profile me-4">
          <img src={accountData.ens?.avatar} alt="q" />
        </div>
        <div className="account-data">
          <h6 className="text-start pb-0 mb-0 text_14 text-black fw-500 font-Rubik">Your {accountData.connector.name} Wallet:</h6>
          <p className="account-data-address pb-0 mb-0 text-start text_14 text-black fw-400">{accountData.address}</p>
          <div className="account-data-wallet mt-2 d-flex align-items-baseline">
            <span className="account-data-balance catch_42 me-2 fw-700 font-Rubik">{balanceData?.formatted}</span>
            <span className="account-data-unit title_24 fw-700 font-Rubik">{balanceData?.symbol}</span>
          </div>
          {/*  {} {balanceData?.symbol} */}
        </div>
      </div>
      </>
    );
  }
  else {
    return (
      <>
      <div className="AccountDashboard py-4 d-flex align-items-center">
        <div className="account-profile me-4">
          <img src="e"  alt="q" />
        </div>
        <div className="account-data">
          <span className="catch_34 me-2 fw-700 font-Rubik">
            Connect Wallet, Please.    
          </span>
        </div>
      </div>
      </>
    )
  }
}