import React from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import Address from "../Address";
import Wallet from "../Wallet";

export default function CoonectButton({
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
}) {

  const { currentTheme } = useThemeSwitcher();
  // connect 按鈕，透過 web3Modal 連結錢包
  const modalButtons = [];
  if (web3Modal) {
    if (web3Modal.cachedProvider) {
      modalButtons.push(
        <div className="button button-style-logout" 
          key="logoutbutton"
          onClick={logoutOfWeb3Modal}
        >
          <div className="button-link px-4 py-2 border-round-10px overflow-hidden">
            <span className="button-link body_18 text-black fw-700 font-Rubik">Connect</span>
          </div>
        </div>,
      );
    } else {
      modalButtons.push(
        <div className="button button-style-connect" 
          key="loginbutton"
          onClick={loadWeb3Modal}
        >
          <div className="button-link px-4 py-2 border-round-10px overflow-hidden">
            <span className="button-link body_18 text-black fw-700 font-Rubik">Connect</span>
          </div>
        </div>,
      );
    }
  }
  else {
    
  }
  return (
    <div className="">
      {modalButtons}
    </div>
  );
}