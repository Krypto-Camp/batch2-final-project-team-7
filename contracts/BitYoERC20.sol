// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract BitYoERC20 is ERC20 {
  constructor(uint256 initialSupply) ERC20('BitYo', 'BitY') {
    _mint(0x6c4fEF2F966C05633E33513Fd85D32FE74245cAC, initialSupply * 10**18);
  }
}
