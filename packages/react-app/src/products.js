export const list = {
  BitYO: {
    title: 'BITYO 經典成長型保險',
    // address: '0xEaca642E7b3e4356e4B80721AB2FAD76C892F911',
    // defiAddress: '0xA278e952F4cA3E24F0544E7c17CC710638FA9379',
    description: 
    `BITYO 最經典的產品。隨著時間，你的保單價值會穩健的增長，且不受波動影響。
    
    產品特色：
    1. 複利機制
      每年的利息會自動計入收益的基準。
    2. 穩定增長
      每一年增加 1% 的收益！
    
    範例：以 0.3 ETH 購買
      第一年｜0.3 ETH + 30% 收益 = 0.39 ETH 
      第二年｜0.39 ETH + 31% 收益 = 0.5109 ETH
    `,
    profile: 'https://i.imgur.com/pcutwDe.jpg',
    datas: [
      {name: '最低鎖倉時間', value: '1', unit: 'years'}, 
      {name: '第一年收益', value: '30', unit: '%'},
      {name: '每年增長收益', value: '1', unit: '%'},
    ],
    tokenUnit: 'ETH',
  },
  // BitYOPro: {
  //   title: 'BITYO 積極型保險',
  //   // address: '0xEaca642E7b3e4356e4B80721AB2FAD76C892F911',
  //   // defiAddress: '0xA278e952F4cA3E24F0544E7c17CC710638FA9379',
  //   description: 
  //   `* 複利機制
  //     1 ETH -> 第一年 30% = 1.3 ETH - 1 = .3 
  //     1.3 ETH -> 第二年 31% = 1.703 ETH - 1.3 = .403
  //     1.703 ETH -> 第三年 32%
  //   `,
  //   profile: './images/2.jpg',
  //   datas: [
  //     {name: 'Locked', value: '3000', unit: 'hours'}, 
  //     {name: 'Reward', value: '30', unit: '%'},
  //     {name: 'Reward', value: '30', unit: '%'},
  //   ],
  //   tokenUnit: 'ETH',
  // },
};