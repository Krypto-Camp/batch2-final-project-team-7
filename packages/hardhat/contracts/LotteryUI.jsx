import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";
import { SyncOutlined } from "@ant-design/icons";
import {
  useBalance,
  useContractLoader,
  useContractReader,
  useGasPrice,
  useOnBlock,
  useUserProviderAndSigner,
} from "eth-hooks";

import { Address, Balance, Events } from "../components";

export default function LotteryUI({
  purpose,
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
  userAddress
}) {
  const [LotteryBalance, updateLotteryBalance] = useState("loading...");

  const getbalance = async()=>{
    try {
      const result = await (writeContracts.Lottery.getBalance())
      updateLotteryBalance( "Ξ" + utils.formatUnits(result,"ether"));
      return Promise.resolve();
    } catch(error){
      return Promise.reject();
    }
  }
  // 每 15 秒 自動刷新  
  getbalance();
  var clock = setInterval(getbalance , 30000);

  const manager = useContractReader(readContracts, "Lottery", "manager");
  const lastWinner = useContractReader(readContracts, "Lottery", "lastWinner");

  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>Lottery Balance</h2>
        <h3>Prize pool {LotteryBalance}</h3>
        <Divider />
        <div style={{ margin: 8 }}>
        {/* <h2>Lottery Balance: {balance} </h2> */}

        <div style={{ margin: 8 }}>
          <Button
            onClick={() => {
              /* you can also just craft a transaction and send it to the tx() transactor */
              tx({
                to: writeContracts.Lottery.address,
                value: utils.parseEther("0.1"),
                data: writeContracts.Lottery.interface.encodeFunctionData("enter()"),
              }).then(getbalance());
              /* this should throw an error about "no fallback nor receive function" until you add it */
            }}
          >
            Join Lottery
          </Button>
        </div>
        </div>
        Lottery Contract Address:

        <Address
          address={readContracts && readContracts.YourContract ? readContracts.YourContract.address : null}
          ensProvider={mainnetProvider}
          fontSize={16}
        />
        <Divider />
        <div style={{ margin: 8 }}>
          { manager == userAddress &&
          <Button
            onClick={() => {
              tx(writeContracts.Lottery.pickWinner());
            }}
          >
            開獎
          </Button>
          }
        </div>

        <div>
          Last Winner : 
          { lastWinner != "0x0000000000000000000000000000000000000000" ?
          (<Address
          address={ lastWinner }
          ensProvider={mainnetProvider}
          fontSize={16} />) : ( "無上一位得獎人")
          }
        </div>
      </div>

      {/*
        📑 Maybe display a list of events?
          (uncomment the event and emit line in YourContract.sol! )
      */}
      <Events
        contracts={readContracts}
        contractName="Lottery"
        eventName="SetEnter"
        localProvider={localProvider}
        mainnetProvider={mainnetProvider}
        startBlock={1}
      />

      <Events
        contracts={readContracts}
        contractName="Lottery"
        eventName="setPickWinner"
        localProvider={localProvider}
        mainnetProvider={mainnetProvider}
        startBlock={1}
      />

    
    </div>
  );
}
