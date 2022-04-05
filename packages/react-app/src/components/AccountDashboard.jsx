import React from "react";
import { 
  useAccount,
  useConnect,
  useProvider,
  useBalance,
  useNetwork,
  useContract,
  useContractRead,
  useContractWrite,
} from 'wagmi';

import { config } from "../contracts";

export default function AccountDashboard({
}) {

  const [{ data: connectData, error: connectError }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });
  
  const [{ data: networkData }, switchNetwork] = useNetwork();

  const provider = useProvider();

  // https://gateway.ipfs.io/ipns/tokens.uniswap.org
  // https://www.rinkeby.io/#faucet
  const [{ data: balanceData, error: balanceError, loading: balanceLoading }, getBalance] = useBalance({
    // 代幣合約 ETH
    addressOrName: accountData ? accountData.address : '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    // token: '0x73ccd44c48008a28d6566be7c792002ecd0fd9e6',
    watch: true,
  })

  // console.log(networkData.chain.id, );
  if (networkData && networkData.chain) {
    // console.log(networkData.chain.id, networkData.chain.name.toLocaleLowerCase());
    // console.log(config[networkData.chain.id][networkData.chain.name.toLocaleLowerCase()]);
  }

  // const testTokenInstance = useContract({
  //   addressOrName: testToken.address,
  //   contractInterface: testToken.abi,
  //   signerOrProvider: provider,
  // });

  // const [{ data: symbol }, read] = useContractRead(
  //   {
  //     addressOrName: testToken.address,
  //     contractInterface: testToken.abi,
  //     signerOrProvider: provider,
  //   }, 'symbol', {
  //     watch: true,
  //   }
  //   // 'balanceOf', {
  //   //   args: [
  //   //     accountData ? accountData.address : '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  //   //   ],
  //   // }
  // );

  // console.log(symbol)
  // console.log(testToken);

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
            <span className="account-data-balance catch_42 me-2 fw-700 font-Rubik">
              {balanceData?.formatted}
            </span>
            <span className="account-data-unit title_24 fw-700 font-Rubik">
              {balanceData?.symbol}
            </span>
          </div>
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