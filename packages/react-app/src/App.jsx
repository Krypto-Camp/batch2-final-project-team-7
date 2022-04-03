import { 
  Provider, chain, defaultChains,
  useConnect, useAccount,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";

/* Ethereum Hooks｜取得主網上的資訊 - start */
// 也因此 console.log 才會一直跳東西出來
import {
  useBalance,
  useContractLoader, // 載入合約
  useContractReader, // 閱讀合約
  useGasPrice,
  useOnBlock,
  useUserProviderAndSigner,
} from "eth-hooks";
import { useExchangeEthPrice } from "eth-hooks/dapps/dex";
/* end */

/* React 相關 - start */
import React, { useCallback, useEffect, useState } from "react";
import { Link, NavLink, Redirect, Route, Switch, useLocation } from "react-router-dom";
import {
  // Account,
  // Contract,
  // Faucet,
  // GasGauge,
  // Header,
  // Ramp,
  // ThemeSwitch,
  // NetworkDisplay,
  // FaucetHint,
  // NetworkSwitch,
  ProductCard,
  AccountDashboard,
  AssetCard,
  BityoFooter,
  BityoHeader,
  CoonectButton,
} from "./components";


import { NETWORKS, ALCHEMY_KEY, INFURA_ID } from "./constants"; // 常數們
import externalContracts from "./contracts/external_contracts";
import { 
  Homepage, Market, Assets
} from "./views"; // 頁面須先至進入點 index.js 引入。引入後可直接作為標籤使用，例如：<ExampleUI ... >
/* end */

/* contracts 相關 - start */
import deployedContracts from "./contracts/hardhat_contracts.json";
// web3modal 是一個能夠連結所有錢包（ETH 節點）的解決方案｜https://www.npmjs.com/package/web3modal
import { Transactor, Web3ModalSetup } from "./helpers"; 
import { useStaticJsonRPC } from "./hooks";
/* end */

/* 引入 CSS - start */
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
/* end */

const { ethers } = require("ethers");

const initialNetwork = NETWORKS.rinkeby;

// 😬 Sorry for all the console logging
// const DEBUG = true;
// const NETWORKCHECK = true;
// const USE_BURNER_WALLET = true; // toggle burner wallet feature｜https://www.xdaichain.com/for-users/wallets/burner-wallet
// const USE_NETWORK_SELECTOR = true; // <Accounct> 介面是否出現 "網路選擇" 下拉選單

// const web3Modal = Web3ModalSetup();

// 🛰 providers
// const providers = [
//   "https://eth-mainnet.gateway.pokt.network/v1/lb/611156b4a585a20035148406",
//   `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
//   `https://mainnet.infura.io/v3/${INFURA_ID}`,
//   "https://rpc.scaffoldeth.io:48544",
// ];


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
  
  // 1. 接 Localhost 合約
  // 2. 接 Rikenby 合約

  // console.log(targetNetwork);
  // console.log(chains);
  
  // Wagmi + ./constants.ks
  const connectors = ({ chainId }) => {
    const rpcUrl = targetNetwork.rpcUrl;
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




























  // ████████████████████████████████████████████████████████████████████████████████████

  // load all your providers\
  // ＊hooks/useStaticJsonRPC｜以 ethers 連接 provider
  // 如果未設定 react-app/.env 的 REACT_APP_PROVIDER，使用上方 initialNetwork 的 provider
  // const localProvider = useStaticJsonRPC([
  //   process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : targetNetwork.rpcUrl,
  // ]);
  // // 主網的 provider，後面將以此取得主網合約
  // const mainnetProvider = useStaticJsonRPC(providers);

  // if (DEBUG) console.log(`Using ${selectedNetwork} network`);

  // 🛰 providers
  // if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  // const price = useExchangeEthPrice(targetNetwork, mainnetProvider);

  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  // const gasPrice = useGasPrice(targetNetwork, "fast");
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  // 使用者節點和簽署者
  // const userProviderAndSigner = useUserProviderAndSigner(injectedProvider, localProvider, USE_BURNER_WALLET);
  // 取得簽署者
  // const userSigner = userProviderAndSigner.signer;
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // 每次 Render 後，執行 getAddress()。後面的陣列用以傳入參數給 function
  // useEffect 的用法｜https://zh-hant.reactjs.org/docs/hooks-effect.html
  // useEffect(() => {
  //   async function getAddress() {
  //     if (userSigner) {
  //       const newAddress = await userSigner.getAddress();
  //       setAddress(newAddress);
  //     }
  //   }
  //   getAddress();
  // }, [userSigner]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // You can warn the user if you would like them to be on a specific network
  // 你如果想要 User 用特定的鏈，你可以警告 User
  // const localChainId = localProvider && localProvider._network && localProvider._network.chainId;
  // const selectedChainId =
  //   userSigner && userSigner.provider && userSigner.provider._network && userSigner.provider._network.chainId;

  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // The transactor wraps transactions and provides notificiations
  // 打包交易時，提供通知
  // const tx = Transactor(userSigner, gasPrice);

  // 🏗 scaffold-eth is full of handy hooks like this one to get your balance:
  // 🏗 scaffold-eth 簡易的方式取得 Local 端的餘額
  // const yourLocalBalance = useBalance(localProvider, address);

  // Just plug in different 🛰 providers to get your balance on different chains:
  // 在主網的餘額
  // const yourMainnetBalance = useBalance(mainnetProvider, address);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // const contractConfig = useContractConfig();
  // const contractConfig = { deployedContracts: deployedContracts || {}, externalContracts: externalContracts || {} };

  // Load in your local 📝 contract and read a value from it:
  // 載入 Local 端的合約
  // const readContracts = useContractLoader(localProvider, contractConfig);

  // If you want to make 🔐 write transactions to your contracts, use the userSigner:
  // ？？？
  // const writeContracts = useContractLoader(userSigner, contractConfig, localChainId);

  // EXTERNAL CONTRACT EXAMPLE:
  // If you want to bring in the mainnet DAI contract it would look like:
  // 載入 主網 的合約
  // const mainnetContracts = useContractLoader(mainnetProvider, contractConfig);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // If you want to call a function on a new block
  // 如果 eth-hooks 偵測到主網的區塊更新了 
  // useOnBlock(mainnetProvider, () => {
  //   console.log(`⛓ A new mainnet block is here: ${mainnetProvider._lastBlockNumber}`);
  // });

  // Then read your DAI balance like:
  // eth-hooks 取得主網 DAI 合約的餘額 function，將之設為 myMainnetDAIBalance，以便在後面的 code 使用
  // const myMainnetDAIBalance = useContractReader(mainnetContracts, "DAI", "balanceOf", [
  //   "0x34aA3F359A9D614239015126635CE7732c18fDF3",
  // ]);

  // keep track of a variable from the contract in the local React state:
  // eth-hooks 追蹤 local 端的合約的狀態變數，此處追脧 YourContract.sol 的 purpose
  // // const purpose = useContractReader(readContracts, "YourContract", "purpose");

  // // 測試用：取得主網的 BAYC 合約
  // // const myMainnetDA = useContractReader(mainnetContracts, "DAI", "balanceOf", [
  // //   "0x34aA3F359A9D614239015126635CE7732c18fDF3",
  // // ])
  
  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // // 🧫 DEBUG 👨🏻‍🔬
  // useEffect(() => {
  //   if (
  //     DEBUG &&
  //     mainnetProvider &&
  //     address &&
  //     selectedChainId &&
  //     yourLocalBalance &&
  //     yourMainnetBalance &&
  //     readContracts &&
  //     writeContracts &&
  //     mainnetContracts
  //   ) {
  //     console.log("_____________________________________ 🏗 scaffold-eth _____________________________________");
  //     console.log("🌎 mainnetProvider", mainnetProvider);
  //     console.log("🏠 localChainId", localChainId);
  //     console.log("👩‍💼 selected address:", address);
  //     console.log("🕵🏻‍♂️ selectedChainId:", selectedChainId);
  //     console.log("💵 yourLocalBalance", yourLocalBalance ? ethers.utils.formatEther(yourLocalBalance) : "...");
  //     console.log("💵 yourMainnetBalance", yourMainnetBalance ? ethers.utils.formatEther(yourMainnetBalance) : "...");
  //     console.log("📝 readContracts", readContracts);
  //     console.log("🌍 DAI contract on mainnet:", mainnetContracts);
  //     console.log("💵 yourMainnetDAIBalance", myMainnetDAIBalance);
  //     console.log("🔐 writeContracts", writeContracts);
  //   }
  // }, [
  //   mainnetProvider,
  //   address,
  //   selectedChainId,
  //   yourLocalBalance,
  //   yourMainnetBalance,
  //   readContracts,
  //   writeContracts,
  //   mainnetContracts,
  //   localChainId,
  //   myMainnetDAIBalance,
  // ]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  /* useCallback */
  // 什麼時候該使用 useMemo 跟 useCallback｜https://medium.com/ichef/a3c1cd0eb520

  // const logoutOfWeb3Modal = async () => {
  //   await web3Modal.clearCachedProvider();
  //   if (injectedProvider && injectedProvider.provider && typeof injectedProvider.provider.disconnect == "function") {
  //     await injectedProvider.provider.disconnect();
  //   }
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 1);
  // };

  // const loadWeb3Modal = useCallback(async () => {
  //   // 非同步加上 Try Catch 避免 Uncaught (in promise) ...
  //   try{
  //     const provider = await web3Modal.connect();
  //     setInjectedProvider(new ethers.providers.Web3Provider(provider));
  
  //     provider.on("chainChanged", chainId => {
  //       console.log(`chain changed to ${chainId}! updating providers`);
  //       setInjectedProvider(new ethers.providers.Web3Provider(provider));
  //     });
  
  //     provider.on("accountsChanged", () => {
  //       console.log(`account changed!`);
  //       setInjectedProvider(new ethers.providers.Web3Provider(provider));
  //     });
  
  //     // Subscribe to session disconnection
  //     provider.on("disconnect", (code, reason) => {
  //       console.log(code, reason);
  //       logoutOfWeb3Modal();
  //     })
  //     return provider;
  //   } catch (error) {
      
  //   } finally{

  //   }

  // }, [setInjectedProvider])

  // const faucetAvailable = localProvider && localProvider.connection && targetNetwork.name.indexOf("local") !== -1;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  const assetsCards = [
    {
      productTitle: 'BITYO 經典成長型保險',
      productProfile: './images/profile-Vincent.png',
      contractAddress: '',
      productDatas: [
        {name: 'Countdown', value: '3000', unit: 'hours'}, 
        {name: 'Cost', value: '30', unit: 'ETH'},
        {name: 'APY', value: '120', unit: '%'},
      ],
      productDescription: `
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.


        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
      `,
      productTokenUnit: 'ETH',
    },
    {
      productTitle: 'BITYO 經典成長型保險',
      productProfile: './images/profile-Vincent.png',
      productDatas: [
        {name: 'Countdown', value: '3000', unit: 'hours'}, 
        {name: 'Cost', value: '30', unit: 'ETH'},
        {name: 'APY', value: '120', unit: '%'},
      ],
      productDescription: `
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.


        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
      `,
      productTokenUnit: 'ETH',
    }
  ];
  const productCards = [
    {
      productTitle: 'BITYO 經典成長型保險',
      productProfile: './images/profile-Vincent.png',
      productDatas: [
        {name: 'Locked', value: '3000', unit: 'hours'}, 
        {name: 'Reward', value: '30', unit: '%'},
        {name: 'Reward', value: '30', unit: '%'},
      ],
      productDescription: `
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.


        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
      `,
      productTokenUnit: 'ETH',
    },
    {
      productTitle: 'BITYO 經典成長型保險',
      productProfile: './images/profile-Vincent.png',
      productDatas: [
        {name: 'Locked', value: '3000', unit: 'hours'}, 
        {name: 'Reward', value: '30', unit: '%'},
        {name: 'Reward', value: '30', unit: '%'},
      ],
      productDescription: `
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.


        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
      `,
      productTokenUnit: 'ETH',
    },
    {
      productTitle: 'BITYO 經典成長型保險',
      productProfile: './images/profile-Vincent.png',
      productDatas: [
        {name: 'Locked', value: '3000', unit: 'hours'}, 
        {name: 'Reward', value: '30', unit: '%'},
        {name: 'Reward', value: '30', unit: '%'},
      ],
      productDescription: `
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.


        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
      `,
      productTokenUnit: 'ETH',
    },
  ];


  return (
    <Provider autoConnect connectors={connectors}>
      <div className="App min-vh-100 d-flex flex-column justify-content-between">
        {/* ✏️ Edit the header and change the title to your project name */}
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
            <CoonectButton
              // web3Modal={web3Modal}
              // loadWeb3Modal={loadWeb3Modal}
              // logoutOfWeb3Modal={logoutOfWeb3Modal}
            />
          </div>
      </BityoHeader>

        {/* 👨‍💼 Your account is in the top right with a wallet at connect options */}

        <main className="d-flex flex-column flex-fill" >
          <Switch>
            <Route path="/index">
              <Homepage
              
              >
              
              </Homepage>
            </Route>
            <Route path="/Market">
              <Market
                head={(() => {
                  return (
                    <>
                    <AccountDashboard/>
                    </>
                  )
                })()}
                body={productCards.map((data, index) => (
                  <div key={index} className="col-12 col-sm-10 offset-sm-1 col-xl-6 offset-xl-0"><ProductCard                      
                    productTitle={data.productTitle}
                    productProfile={data.productProfile}
                    productDatas={data.productDatas}
                    productDescription={data.productDescription}
                    productTokenUnit={data.productTokenUnit}
                    ></ProductCard></div>
                ))}
              >
              </Market>
            </Route>
            <Route path="/Assets">
              <Assets
                head={(() => {
                  return (
                    <>
                    <AccountDashboard/>
                    </>
                  )
                })()}
                body={productCards.map((data, index) => (
                  <div key={index} className="col-12 col-sm-10 offset-sm-1 col-xl-6 offset-xl-0"><AssetCard                      
                    productTitle={data.productTitle}
                    productProfile={data.productProfile}
                    productDatas={data.productDatas}
                    productDescription={data.productDescription}
                    productTokenUnit={data.productTokenUnit}
                    ></AssetCard></div>
                ))}
              >
              </Assets>
            </Route>
            <Redirect from="/" to="/index" />
            {/* <Route path="/bi">
              <Bi
                address={address}
                userSigner={userSigner}
                mainnetProvider={mainnetProvider}
                localProvider={localProvider}
                yourLocalBalance={yourLocalBalance}
                price={price}
                tx={tx}
                writeContracts={writeContracts}
                readContracts={readContracts}
                purpose={purpose}
              />
            </Route> */}
          </Switch>
        </main>

        <BityoFooter/>
              
    </div>
    </Provider>
  );
}

export default App;
