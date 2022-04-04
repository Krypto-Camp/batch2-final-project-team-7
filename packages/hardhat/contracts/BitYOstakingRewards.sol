// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

//  質押代幣領息
//  1.質押領息,持有NFT需要存款 or 一開始購買NFT就自動存入一筆錢
//  2.目前存款認存入者的地址,之後要改成認NFT持有人,也就是NFT持有人就能提領獎勵
//
//  合約運作方式
//  創建時，帶入 constructor(address _stakingToken, address _rewardsToken)  
//  創建NFT的時候 會自動轉入錢eth

contract BitYOstakingRewards {
    IERC20 public rewardsToken;
    IERC20 public stakingToken;
    IERC721 public NftToken ;
    
    // IERC20(0xdAC17F958D2ee523a2206206994597C13D831ec7); // USDT

    // NFT的ID => 不同項目
    mapping(uint => uint) public userRewardPerTokenPaidByNFT;
    mapping(uint => uint) public rewardsByNFT; 
    mapping(uint => uint) private _balancesByNFT;
    mapping(uint => uint) private _createTime;
    mapping(uint => uint) private _lastStakeTime;

    address private nftaddress;
    constructor(address _stakingToken, address _rewardsToken,address _NftToken) {
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardsToken);
        NftToken = IERC721(_NftToken);
        nftaddress = _NftToken;
    }

    modifier onlyNftOwner(uint NftID) {
        require ( msg.sender == NftToken.ownerOf(NftID) , "not this NFT owner");
        _;
    }

    // 首次購買NFT時用
    // 只能被NFT的合約調用
    function stakeFirst(uint256 _amount , uint256 NftID) external {
        require( _createTime[NftID] == 0 );
        require( msg.sender == nftaddress); 
        _balancesByNFT[NftID] += _amount;
        _createTime[NftID] = block.timestamp;
        _lastStakeTime[NftID] = _createTime[NftID];
    }

    // 存款
    function stakeByNft(uint _amount , uint NftID) public onlyNftOwner(NftID) {
        _balancesByNFT[NftID] += _amount;
        _lastStakeTime[NftID] = block.timestamp;
    }

    // 年化:未換算成百分率
    function interestRatePerYear(uint NftID) public view returns(uint256){
        uint year = (block.timestamp - _createTime[NftID]) / 60 / 60 / 24 / 365 ; // 理想寫法是先算好(3153600)。
        return (year + 30) ;  // 基礎利息 30  
     }

    // 實際利息:已經用百分率換算
    function interset(uint NftID) public view returns(uint256){
        return  _balancesByNFT[NftID]  * interestRatePerYear(NftID) / 100 - userRewardPerTokenPaidByNFT[NftID]; // per 100%
    }

    // 提款 冷靜閉鎖期1年
    function withdrawByNft(uint _amount , uint NftID) external onlyNftOwner(NftID)  {

        require(coolTime(NftID) >= 60*60*24*365);
        _balancesByNFT[NftID] -= _amount;

        uint reward = interset(NftID);
        uint total = reward + _amount ; 
        stakingToken.transfer(msg.sender, total);
    }

    // 已經經過多久
    function coolTime(uint NftID) public view returns(uint256) {
        return ( block.timestamp - _lastStakeTime[NftID]);
    }

    // 資產
    function cost(uint NftID) public view returns(uint256) {
        return _balancesByNFT[NftID] +  interset(NftID);
    }


    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    // function deposit() public payable{
    // }
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    // mapping(address => uint) public userRewardPerTokenPaid;
    // mapping(address => uint) public rewards;

    // uint public _totalSupply;
    // mapping(address => uint) private _balances;

    //     function earned(address account) public view returns (uint) {
    //     return
    //         ((_balances[account] *
    //             (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18) +
    //         rewards[account];
    // }

    // modifier updateReward(address account) {
    //     rewardPerTokenStored = rewardPerToken();
    //     lastUpdateTime = block.timestamp;

    //     rewards[account] = earned(account);
    //     userRewardPerTokenPaid[account] = rewardPerTokenStored;
    //     _;
    // }

    // function stake(uint _amount) external updateReward(msg.sender) {
    //     _totalSupply += _amount;
    //     _balances[msg.sender] += _amount;
    //     stakingToken.transferFrom(msg.sender, address(this), _amount);
    // }

    // function withdraw(uint _amount) external updateReward(msg.sender) {
    //     _totalSupply -= _amount;
    //     _balances[msg.sender] -= _amount;
    //     stakingToken.transfer(msg.sender, _amount);
    // }

    // function getReward() external updateReward(msg.sender) {
    //     uint reward = rewards[msg.sender];
    //     rewards[msg.sender] = 0;
    //     rewardsToken.transfer(msg.sender, reward);
    // }


}
