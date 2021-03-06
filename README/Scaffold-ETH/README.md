# ð Scaffold-ETH

## Get Start

### ä½¿ç¨æ­¥é©

> é¦åï¼å®è£ scaffold-ETHï¼å·è¡
```bash
cd scaffold-eth
yarn install
yarn chain // éè¡ç§æéï¼éå¿è¦ï¼
yarn start // éååç«¯ http://localhost:3000
```

## Development

### éç¼æéçè·¯å¾

ð ç·¨è¼¯åç´ `YourContract.sol` in `packages/hardhat/contracts`

ð æ°å¯«åç«¯ `App.jsx` in `packages/react-app/src`

ð¼ deployment scripts in `packages/hardhat/deploy`

### å­¸ç¿ Solidity
- [Primitive Data Types](https://solidity-by-example.org/primitives/)
- [Mappings](https://solidity-by-example.org/mapping/)
- [Structs](https://solidity-by-example.org/structs/)
- [Modifiers](https://solidity-by-example.org/function-modifier/)
- [Events](https://solidity-by-example.org/events/)
- [Inheritance](https://solidity-by-example.org/inheritance/)
- [Payable](https://solidity-by-example.org/payable/)
- [Fallback](https://solidity-by-example.org/fallback/)

ð§ Learn the [Solidity globals and units](https://solidity.readthedocs.io/en/v0.6.6/units-and-global-variables.html)

## Deployment

### é¨ç½²ä¹å

ä»¥ rinkeby çºä¾ï¼å°èªå·±ç Metamask å¸³æ¶åæè³ rinkeby

ï¼è«æ³¨æï¼ä¸è¦ä½¿ç¨ ganache å¯å¥çå¸³æ¶ä¾åéåæ­¥é©

### éä¿®æ¹çæªæ¡

packages/hardhat/example.env

> æªåæ´æ¹æ .envï¼æ ¹ææéç Network å å¥ç°å¢è®æ¸ãä»¥ rinkeby çºä¾ï¼
  
1. Infura ç¯é»ç Key "RINKEBY_INFURA_KEY" 
   - Metamask é»æå³ä¸è§é ­å -> è¨­å® -> ç¶²è·¯ -> åå¾è©²ç¶²è·¯ç Infura Key - https://rinkeby.infura.io/v3/{Your Key}
   - ææ¯ä»»ä½ä¸åç¯é»ï¼å¥çé¢åçç¯é»ï¼é½è¡ãï¼å·²æ¸¬è©¦éï¼

2. ç§é° "RINKEBY_DEPLOYER_PRIV_KEY" åå¾æ¹å¼ï¼
   Metamask é»æå³ä¸è§ä¸åé» -> å¸³æ¶ -> è¼¸åºç§é°

```bash
// å­ä¸²å·²ä¿®æ¹éï¼åçºç¯ä¾ä½¿ç¨
# Rinkeby 
RINKEBY_INFURA_KEY=9a3d95b3bc440fa88ea12eaa44561611
RINKEBY_DEPLOYER_PRIV_KEY=eac0a2ff4d99d3fbeac67d020306dbcc515343186f4de0aa973fe2ca78cecd9f
```

packages/hardhat/hardhat-config.js

> æ¥çºä¸é¢çéç¨ï¼ä»¥ rinkeby çºä¾ï¼

1. æ´æ¹ `defaultNetwork` çå¼
```javascript
const defaultNetwork = "rinkeby";
```

2. éé .env å å¥è³ networksï¼rinkeby çè¨­å®ä¸­
```javascript
module.exports = {
  defaultNetwork,
  // çç¥ ...
  networks: {
    // çç¥ ...
    rinkeby: {
      // ä»»ä½ä¸åç¯é»é½è¡
      url: `https://rinkeby.infura.io/v3/${process.env.RINKEBY_INFURA_KEY}`, 
      // èªå·±æ³é£çµçé¢åç§é°
      accounts: [`${process.env.RINKEBY_DEPLOYER_PRIV_KEY}`],
    },
    // çç¥ ...
  },
  // çç¥ ...
}
```

### é¨ç½²åç´

> ç·¨è­¯ä¸¦é¨ç½²åç´

```bash
yarn deploy
```

* å¦ææ¯é¨ç½²é è¨­åç´ï¼Etherscan æå çºéä¸å·²å­å¨ä¸æ¨¡ä¸æ¨£çåç´èé ä¾¿å¹«ä½ é©è­å®ç¢

è¥éå°ä»¥ä¸åé¡ï¼è«è³ Metamask æé [é¡¯ç¤ºé²é Gas æ§å¶é¸é ]
- https://hardhat.org/errors/
- https://blockcast.it/2021/08/23/what-happened-after-the-launch-of-eip-1559/
```
HH114: Incompatible fee price parameters
```

å¯ä»¥è³ Etherscan æ¥è©¢

![](./deployed.png)


## éååç«¯ React-App

### é£çµå°æ­£ç¢ºçé

åå¾è©²é é¢ç .jsxï¼æ ¹æä½ æ³è¦é£çµçéæ´æ¹ initialNetwork è¨­å®ï¼

éè£¡ä»¥ App.jsx çºä¾ï¼è·¯å¾çº packages/react-app/src/App.jsx

```javascript
/// ð¡ What chain are your contracts deployed to?
const initialNetwork = NETWORKS.rinkeby; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)
```

### sample.env æ´åçº .env
- è¨­å® React APP éä½çç¶²è·¯ç¯é»ãéç¼éç¨å¯åç¥ééåï¼å¾åç«¯éä¸æ¸¬è©¦ææ­£å¼ç«æï¼åè¡è¨­å®ã
- è¥ App.jsx æªæ¾å°éåæªæ¡ï¼æèªåé£çµ initialNetwork
```
REACT_APP_PROVIDER={ç¯é»ç¶²å}
```

---

## éç¼ç´°ç¯

packages/react-app/
```
public/ // react dom æ¨¡æ¿ï¼åå« <meta>ã#root ç­ç­
src/components/ // æææ¨¡çµ
src/views/ // ååé 
src/App.jsx // åºæ¬ä»é¢
```



