pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol"; 

/**
 * ██  ██  ██  █████  ██     ██     ██████ ██████ 
 * ██  ██  ██ ██   ██ ██     ██     ██       ██
 * ██  ██  ██ ███████ ██     ██     █████    ██   
 * ██ ████ ██ ██   ██ ██     ██     ██       ██   Multi-Sign    
 *  ███  ███  ██   ██ ██████ ██████ ██████   ██   多重簽署錢包｜基金會動用資金
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

contract multiSignTreasury is Ownable {

  // 加上事件：當津貼帳本發生變化
  // https://ethereum-blockchain-developer.com/040-shared-wallet-project/07-add-events/
  // event allowanceChanged(address indexed _who, uint indexed _amount, uint _balance);

  // 基金會清單
  mapping(address => bool) public fundation;
  uint funderCount = 0;
  
  // 提現申請單：編號 -> 申請者、金額、是否已付款、審核者
  uint applyId = 0;
  
  struct ApplyDocu {
    address applyer;
    uint amount;
    bool paid;
    mapping(address => bool) approvee;
    uint approveCount;
  }
  mapping(uint => ApplyDocu) public applies;
  
  // 批准單
  // mapping(uint => address[]) public approvee;

  constructor(address[] memory _members) {
    // 合約創立者，預設為基金會成員
    fundation[msg.sender] = true;
    funderCount++;
    for (uint16 index = 0; index < _members.length; index++) {
      fundation[_members[index]] = true;
    }
  }



  // FUNDATION █████████████████████████████████████████████████████████████████████



  // 基金會變更
  event updateFundation(address indexed _addr, bool indexed _status);

  // 是/否 基金會成員
  modifier isFunder() {
      require(fundation[msg.sender] == true, "This address isn't a member of this fundation, get out, please."); 
      _;
  }
  modifier notFunder() {
      require(fundation[msg.sender] == false, "This address is in this fundation."); 
      _;
  }

  // 增加基金會成員
  function addFunder(address _addr) public isFunder {
      require(fundation[_addr] == false, "This address was been a member of fundation.");
      fundation[_addr] = true;
      funderCount++;
      emit updateFundation(_addr, true);
  }

  // 取得成員是否在基金會
  function isInFundation(address _addr) public view returns (bool) {
    return fundation[_addr];
  }

  // 取得基金會清單
  // function getFunder() public view returns (mapping(uint => bool)) {
  //   return fundation;
  // }

  // 變更基金會成員權限
  // function updateFunderAuth(address _addr) public isFunder {}



  // TREASURY █████████████████████████████████████████████████████████████████████



  // 提現狀態變更
  // event updateApply(uint indexed _applyId, ApplyDocu indexed _applyDocu);
  
  // 基金會挹注資金
  function depositByFundation() public payable isFunder {}

  // 善心人抖內資金
  function depositByDonor() public payable notFunder {}

  // 提現：申請
  function withDrawApply(uint _amount) public isFunder {
    // 判斷基金會的餘額夠不夠
    require(address(this).balance >= _amount, "");
    // https://docs.soliditylang.org/en/latest/types.html#structs
    ApplyDocu storage docu = applies[applyId];
    docu.applyer = msg.sender;
    docu.amount = _amount * 10 ** 18;
    docu.paid = false;
    docu.approveCount = 0;
    applyId++;
    // emit updateApply(applyId, applies[applyId]);
  }

  // 提現：取得申請單
  // function getWithDrawApply(uint _applyId) public view returns (ApplyDocu memory) {
  //   return applies[_applyId];
  // }

  // 取得基金會預算
  function getTreasury() public view returns (uint) {
    return address(this).balance;
  }

  // 提現：審核
  function withDrawApprove(uint _applyId) public isFunder {
    // 該審核單已經執行
    require(applies[_applyId].paid == false, "The apply docu was actived.");
    // 本審核者已審核過這張審核單
    require(applies[_applyId].approvee[msg.sender] == false, "The address was approved this apply docu.");
    // 基金會錢不夠
    require(applies[_applyId].amount <= address(this).balance, "This treasury dont't have enough tokens.");
    // 自己不能審核
    require(applies[_applyId].applyer != msg.sender, "You don't approve your apply docu.");

    // 執行審核：加入地址，審核總數+1
    applies[_applyId].approvee[msg.sender] = true;
    applies[_applyId].approveCount++;
    
    // 審核總數已經等同或超過基金會成員的半數
    if (applies[_applyId].approveCount >= funderCount/2) {
      applies[_applyId].paid = true;
      // transfer 是 payable 專用
      payable(applies[_applyId].applyer).transfer(applies[_applyId].amount);
    }
  }

  receive() external payable {}
  fallback() external payable {}
}
