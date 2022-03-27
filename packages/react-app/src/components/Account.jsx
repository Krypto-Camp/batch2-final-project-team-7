import { Button } from "antd";
import React from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";

import Address from "./Address";
import Balance from "./Balance";
import Wallet from "./Wallet";

/** 
  ~ What it does? ~

  Displays an Address, Balance, and Wallet as one Account component,
  also allows users to log in to existing accounts and log out

  顯示錢包地址、餘額、以及操作模組
  也允許 User 連結錢包與登出錢包

  ~ How can I use? ~

  <Account
    useBurner={boolean}
    address={address}
    localProvider={localProvider}
    userProvider={userProvider}
    mainnetProvider={mainnetProvider}
    price={price}
    web3Modal={web3Modal}
    loadWeb3Modal={loadWeb3Modal}
    logoutOfWeb3Modal={logoutOfWeb3Modal}
    blockExplorer={blockExplorer}
    isContract={boolean}
  />

  ~ Features ~

  - Provide address={address} and get balance corresponding to the given address
  - Provide localProvider={localProvider} to access balance on local network
    接受來自本地鏈的餘額

  - Provide userProvider={userProvider} to display a wallet
    顯示錢包

  - Provide mainnetProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth")
  - Provide price={price} of ether and get your balance converted to dollars
  - Provide web3Modal={web3Modal}, loadWeb3Modal={loadWeb3Modal}, logoutOfWeb3Modal={logoutOfWeb3Modal}
              to be able to log in/log out to/from existing accounts
  - Provide blockExplorer={blockExplorer}, click on address and get the link
              (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
**/

export default function Account({
  useBurner,
  address,
  userSigner,
  localProvider,
  mainnetProvider,
  price,
  minimized,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
  isContract,
}) {
  const { currentTheme } = useThemeSwitcher();
  
  // connect 按鈕，透過 web3Modal 連結錢包
  const modalButtons = [];
  if (web3Modal) {
    if (web3Modal.cachedProvider) {
      modalButtons.push(
        <Button
          key="logoutbutton"
          style={{ verticalAlign: "top", marginLeft: 8, marginTop: 4 }}
          shape="round"
          size="large"
          onClick={logoutOfWeb3Modal}
        >
          logout
        </Button>,
      );
    } else {
      modalButtons.push(
        <Button
          key="loginbutton"
          style={{ verticalAlign: "top", marginLeft: 8, marginTop: 4 }}
          shape="round"
          size="large"
          /* type={minimized ? "default" : "primary"}     too many people just defaulting to MM and having a bad time */
          onClick={loadWeb3Modal}
        >
          connect
        </Button>,
      );
    }
  }

  // 錢包資訊：address、net、balance
  const display = minimized ? (
    ""
  ) : (
    <span>
      {web3Modal && web3Modal.cachedProvider ? (
      // 當 Connect 的是合約地址
        <>
          {/* 帳戶地址 */}
          {address && <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} />}

          {/* 錢包價值 */}
          <Balance address={address} provider={localProvider} price={price} />
          
          {/* 錢包操作：入金、出金等 */}
          <Wallet
            address={address}
            provider={localProvider}
            signer={userSigner}
            ensProvider={mainnetProvider}
            price={price}
            color={currentTheme === "light" ? "#1890ff" : "#2caad9"}
          />
        </>
      ) : useBurner ? (
        ""
      ) : isContract ? (
      // 當 Connect 的是合約地址
        <>
          {address && <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} />}
          <Balance address={address} provider={localProvider} price={price} />
        </>
      ) : (
        ""
      )}
      {useBurner && web3Modal && !web3Modal.cachedProvider ? (
      // 當 Connect 的是合約地址
        <>
          {/* 帳戶地址 */}
          <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} />

          {/* 錢包價值 */}
          <Balance address={address} provider={localProvider} price={price} />
          
          {/* 錢包操作：入金、出金等 */}
          <Wallet
            address={address}
            provider={localProvider}
            signer={userSigner}
            ensProvider={mainnetProvider}
            price={price}
            color={currentTheme === "light" ? "#1890ff" : "#2caad9"}
          />
        </>
      ) : (
        <></>
      )}
    </span>
  );

  return (
    <div>
      {display}
      {modalButtons}
    </div>
  );
}
