// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract BitYOERC20StakingRewards {
    IERC20 public rewardsToken;
    IERC20 public stakingToken;
    IERC721 public NftToken ;
    
    uint public rewardRate = 100;
    uint public lastUpdateTime;
    uint public rewardPerTokenStored;
    address private nftaddress;

    mapping(uint => uint) public userRewardPerTokenPaid;
    mapping(uint => uint) public rewards;

    uint private _totalSupply;
    mapping(uint => uint) private _balances;

    constructor(address _stakingToken, address _rewardsToken , address _NftToken ) {
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardsToken);
        NftToken = IERC721(_NftToken);
        nftaddress = _NftToken;
    }

    modifier onlyNftOwner(uint NftID) {
        require ( msg.sender == NftToken.ownerOf(NftID) , "not this NFT owner");
        _;
    }

    function rewardPerToken() public view returns (uint) {
        if (_totalSupply == 0) {
            return rewardPerTokenStored;
        }
        return
            rewardPerTokenStored +
            (((block.timestamp - lastUpdateTime) * rewardRate * 1e18) / _totalSupply);
    }

    function earned(uint nftID) public view returns (uint) {
        return
            ((_balances[nftID] *
                (rewardPerToken() - userRewardPerTokenPaid[nftID])) / 1e18) +
            rewards[nftID];
    }

    modifier updateReward(uint nftID) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;

        rewards[nftID] = earned(nftID);
        userRewardPerTokenPaid[nftID] = rewardPerTokenStored;
        _;
    }

    function stake(uint _amount , uint nftID) external onlyNftOwner(nftID) updateReward(nftID)  {
        _totalSupply += _amount;
        _balances[nftID] += _amount;
        stakingToken.transferFrom(msg.sender, address(this), _amount);
    }

    function withdraw(uint _amount , uint nftID) external onlyNftOwner(nftID) updateReward(nftID) {
        _totalSupply -= _amount;
        _balances[nftID] -= _amount;
        stakingToken.transfer(msg.sender, _amount);
    }

    function getReward(uint nftID) external onlyNftOwner(nftID) updateReward(nftID) {
        uint reward = rewards[nftID];
        rewards[nftID] = 0;
        rewardsToken.transfer(msg.sender, reward);
    }
}
