// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

//獎利用代幣
//原本會用該貸幣作為獎勵，但先暫時轉換成ETH本位，所以本合約只有部署沒有實際使用
contract BitYOToken is ERC20, Ownable {
    constructor() ERC20("BitYo", "byo") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

}