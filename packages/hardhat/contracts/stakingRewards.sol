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
//  approve token
//  將獎勵代幣存入合約
//  存入staking token
//  getReward() -> 提領  ** 若是沒有存入獎勵代幣則會拒絕 

contract StakingRewards {
    IERC20 public rewardsToken;
    IERC20 public stakingToken;
    IERC721 public NftToken ;
    
    // IERC20(0xdAC17F958D2ee523a2206206994597C13D831ec7); // USDT

    uint public rewardRate = 100;  
    uint public lastUpdateTime;
    uint public rewardPerTokenStored;



    constructor(address _stakingToken, address _rewardsToken,address _NftToken) {
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardsToken);
        NftToken = IERC721(_NftToken);
    }

    function rewardPerToken() public view returns (uint) {
        if (_totalSupply == 0) {
            return rewardPerTokenStored;
        }
        return
            rewardPerTokenStored +
            (((block.timestamp - lastUpdateTime) * rewardRate * 1e18) / _totalSupply);
    }

    function timediff()public view returns(uint) {
        return block.timestamp - lastUpdateTime;
    }

    uint256 _totalSupply;

    // NFT的ID
    mapping(uint => uint) public userRewardPerTokenPaidByNFT;
    mapping(uint => uint) public rewardsByNFT; 
    mapping(uint => uint) private _balancesByNFT;

    function earnedByNft(uint NftID) public view returns (uint) {
        return
            ((_balancesByNFT[NftID] *
                (rewardPerToken() - userRewardPerTokenPaidByNFT[NftID])) / 1e18) +
            rewardsByNFT[NftID];
    }

    modifier onlyNftOwner(uint NftID) {
        require ( msg.sender == NftToken.ownerOf(NftID) , "not this NFT owner");
        _;
    }

    // 存款
    function stakeByNft(uint _amount , uint NftID) external onlyNftOwner(NftID) updateRewardByNft(NftID) {
        _totalSupply += _amount;
        _balancesByNFT[NftID] += _amount;
        stakingToken.transferFrom(msg.sender, address(this), _amount);
    }


    // 提款
    function withdrawByNft(uint _amount , uint NftID) external onlyNftOwner(NftID) updateRewardByNft(NftID) {
        _totalSupply -= _amount;
        _balancesByNFT[NftID] -= _amount;
        stakingToken.transfer(msg.sender, _amount);
    }

    // 領獎
    function getRewardByNft(uint NftID) external onlyNftOwner(NftID) updateRewardByNft(NftID) {
        uint reward = rewardsByNFT[NftID];
        rewardsByNFT[NftID] = 0;
        rewardsToken.transfer(msg.sender, reward);
    }

    modifier updateRewardByNft(uint NftID) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;

        rewardsByNFT[NftID] = earnedByNft(NftID);
        userRewardPerTokenPaidByNFT[NftID] = rewardPerTokenStored;
        _;
    }


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
