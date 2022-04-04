import { 
  Provider, chain, defaultChains,
  useConnect, useAccount,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";

// import { useExchangeEthPrice } from "eth-hooks/dapps/dex";
/* end */

/* React 相關 - start */
import React, { useCallback, useEffect, useState } from "react";
import { Link, NavLink, Redirect, Route, Switch, useLocation } from "react-router-dom";
import {
  ProductCard,
  AccountDashboard,
  AssetCard,
  BityoFooter,
  BityoHeader,
  CoonectButton,
} from "./components";

import 'dotenv';

import { NETWORKS, ALCHEMY_KEY, INFURA_ID } from "./constants"; // 常數們
import externalContracts from "./contracts/external_contracts";
import { 
  Homepage, Market, Assets
} from "./views"; // 頁面須先至進入點 index.js 引入。引入後可直接作為標籤使用，例如：<ExampleUI ... >
/* end */

/* contracts 相關 - start */
import deployedContracts from "./contracts/hardhat_contracts.json";

import { Transactor, Web3ModalSetup } from "./helpers"; 
import { useStaticJsonRPC } from "./hooks";
/* end */

/* 引入 CSS - start */
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
/* end */

import { providers } from "ethers";

const initialNetwork = NETWORKS.localhost;
// localhost rinkeby

// web3modal 是一個能夠連結所有錢包（ETH 節點）的解決方案｜https://www.npmjs.com/package/web3modal
// const web3Modal = Web3ModalSetup();

function App(props) {
  
  // 會影響到 USE_NETWORK_SELECTOR = true 時，<Accounct> 出現的下拉選單
  const networkOptions = [initialNetwork.name, "mainnet", "rinkeby"];

  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState();
  const [selectedNetwork, setSelectedNetwork] = useState(networkOptions[0]);
  const location = useLocation();
 
  // 目前的鏈
  const targetNetwork = NETWORKS[selectedNetwork];

  // 🔭 block explorer URL 
  // 🔭 目前的鏈的區塊瀏覽器
  const blockExplorer = targetNetwork.blockExplorer;

  // ████████████████████████████████████████████████████████████████████████████████████
  
  // Chains for connectors to support
  const chains = defaultChains;
  
  // Wagmi + ./constants.ks
  const connectors = ({ chainId }) => {
    const rpcUrl =
      chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
      chain.mainnet.rpcUrls[0];
    return [
      new InjectedConnector({
        chains, // rinkeby
        options: { shimDisconnect: true },
      }),
      // new WalletConnectConnector({
      //   options: {
      //     INFURA_ID,
      //     qrcode: true,
      //   },
      // }),
      // new WalletLinkConnector({
      //   options: {
      //     appName: 'BITYO',
      //     jsonRpcUrl: `${rpcUrl}`,
      //   },
      // }),
    ]
  }

  const provider = ({ chainId, connector }) => {
    return targetNetwork.name == 'localhost'
    ? new providers.JsonRpcProvider(
        connector?.chains.find((x) => x.id == chainId)?.rpcUrls[0]
      )
    : providers.getDefaultProvider(
      chainId
    );
  }
    
  // ████████████████████████████████████████████████████████████████████████████████████

  return (
    <Provider autoConnect 
      connectors={connectors}
      provider={provider}
    >
      <div className="App min-vh-100 d-flex flex-column justify-content-between">
        <BityoHeader>
          <nav className="navigation">
            <div className="d-flex align-items-center justify-content-center">
              {/* Route｜https://v5.reactrouter.com/web/api/Route */}
              {/* selectable={true} */}
              <NavLink 
                className={"navigation-button"}
                activeClassName="is-active"
                to="/index">
                  <div className="button-link px-4">
                    <span className="button-text body_18 text-black fw-700 font-Rubik">Home</span>
                  </div>
              </NavLink>
              <NavLink 
                className={"navigation-button"}
                activeClassName="is-active"
                to="Market">
                  <div className="button-link px-4">
                    <span className="button-text body_18 text-black fw-700 font-Rubik">Market</span>
                  </div>
              </NavLink>
              <NavLink 
                className={"navigation-button"}
                activeClassName="is-active"
                to="Assets">
                  <div className="button-link px-4">
                    <span className="button-text body_18 text-black fw-700 font-Rubik">Assets</span>
                  </div>
              </NavLink>
            </div>
          </nav>
          <div>
            <CoonectButton/>
          </div>
        </BityoHeader>

        <main className="d-flex flex-column flex-fill" >
          <Switch>
            <Route path="/index">
              <Homepage/>
            </Route>
            <Route path="/Market">
              <Market/>
            </Route>
            <Route path="/Assets">
              <Assets/>
            </Route>
            <Redirect from="/" to="/index" />
          </Switch>
        </main>

        <BityoFooter/>
              
    </div>
    </Provider>
  );
}

export default App;
