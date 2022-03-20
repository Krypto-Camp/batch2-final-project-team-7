pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol"; 

/**
 * ██  ██  ██  █████  ██     ██     ██████ ██████ 
 * ██  ██  ██ ██   ██ ██     ██     ██       ██
 * ██  ██  ██ ███████ ██     ██     █████    ██   
 * ██ ████ ██ ██   ██ ██     ██     ██       ██   Multi-Share    
 *  ███  ███  ██   ██ ██████ ██████ ██████   ██   多人共有錢包
 *
 * https://ethereum-blockchain-developer.com/040-shared-wallet-project/07-add-events/
 *
 * 測試方式｜Remix IDE
 *
 * 錢包持有者（合約持有者）：
 * 1. 透過執行 saveMoneyToWallet()，將 ETH 轉進本錢包
 * 2. 執行 setAllowance()，加入領薪者，以及可領的金額（也可以設為 0）
 * 
 * 領薪者：
 * 1. 以 withdrawMoney() 提現，可提到不同的錢包：）
 *
 */

contract multiShareTreasury is Ownable {

  // 加上事件：當津貼帳本發生變化
  // https://ethereum-blockchain-developer.com/040-shared-wallet-project/07-add-events/
  event allowanceChanged(address indexed _who, uint indexed _amount, uint _balance);

  // 津貼帳本
  mapping(address => uint) public allowance;

  constructor() {
    // what should we do on deploy?
  }

  modifier ownerOrAllowed(uint _amount) {
      require(
        isOwner() || allowance[msg.sender] >= _amount,
        ""
      );
      _;
  }

  // 是否錢包持有者
  function isOwner() internal view returns (bool) {
      return owner() == msg.sender;
  } 

  // 錢包持有者匯錢進來
  function saveMoneyToWallet() public payable onlyOwner {}

  // 取得領薪者的津貼餘額
  function getAllowance(address _who) view public returns (uint) {
    return allowance[_who];
  }

  // 錢包持有者發送津貼給領薪者
  function setAllowance(address _who, uint _amount) public onlyOwner {
      allowance[_who] = _amount;
      emit allowanceChanged(msg.sender, _amount, address(this).balance);
  }

  // 津貼帳本更動：增加領薪者提現的金額
  function addAllowance(address _who, uint _amount) public onlyOwner {
      allowance[_who] += _amount;
      emit allowanceChanged(msg.sender, _amount, address(this).balance);
  }

  // 津貼帳本更動：扣除領薪者提現的金額
  function reduceAllowance (address _who, uint _amount) internal ownerOrAllowed (_amount) {
      allowance[_who] -= _amount;
      emit allowanceChanged(msg.sender, _amount, address(this).balance);
  }

  // 提現：錢包持有者 isOwner() or 領薪者 msg.sender，且本錢包的金額足夠
  // _to 不等於領薪者，僅是領薪者希望收到錢的錢包地址
  function withdrawMoney(address payable _to, uint _amount) public ownerOrAllowed (_amount) {
      require(
        address(this).balance >= _amount, 
        ""
      );
      if(!isOwner()){
        reduceAllowance(msg.sender, _amount);
      }
      // ERC-20 將金額傳送至 _to
      // _to 不一定要 msg.sender，msg.sender 可以選擇要傳送到拿：）
      _to.transfer(_amount);
  }

  receive() external payable {}
  fallback() external payable {}
}
