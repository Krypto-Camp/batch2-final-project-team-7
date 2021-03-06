// Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./BitYOStakingRewards.sol";

//  鑄造價格 0.3 eth
//  需要設定鑄造合約指向的存款合約(stackContract)
//  鑄造時，自動向指定合約轉入 0.2 存入合約

contract BitYONFT  is ERC721Enumerable, Ownable {
    using Strings for uint256;

    // bool public _isSaleActive = true;
    // bool public _revealed = true;

    // Constants
    uint256 public constant MAX_SUPPLY = 50;
    //可以被挖到的NFT總量，總發行量50
    uint256 public mintPrice = 0.3 ether;
    //鑄造MINT價格0.3
    uint256 public maxBalance = 1;
    //每隔帳戶可以擁有一顆 每次可以MINT一顆
    uint256 public maxMint = 1;
    //每次可以挖一顆

    string baseURI;
    string public notRevealedUri;
    string public baseExtension = ".json";

    address private stackContract;
    BitYOStakingRewards private _call;

    mapping(uint256 => string) private _tokenURIs;

    constructor(string memory initBaseURI, string memory initNotRevealedUri)

        ERC721("BIO_YO", "BY") 
    {
        baseURI = initBaseURI;
        notRevealedUri = initNotRevealedUri;
    }

    //鑄造NFT
    function mintNicMeta() public payable {
        require(
            totalSupply() + 1 < MAX_SUPPLY,
            "Sale would exceed max supply"
        );
        require(
            mintPrice <= msg.value,
            "Not enough ether sent"
        );

        uint256 mintIndex = totalSupply() + 1;
        _safeMint(msg.sender, mintIndex);
        payable(stackContract).transfer(0.2 ether);
        _call.stakeFirst(200000000000000000,mintIndex);
    }

    // 設定收錢合約
    function setStakeContract(address stake) public onlyOwner {
        stackContract = stake;
        _call = BitYOStakingRewards(payable(stake));
    }

    //讓mint nft的數量往上堆疊
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        // if (_revealed == false) {
        //     return notRevealedUri;
        // }

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return
            string(abi.encodePacked(base, tokenId.toString(), baseExtension));
    }

    // internal
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setMintPrice(uint256 _mintPrice) public onlyOwner {
        mintPrice = _mintPrice;
    }

    function getMintPrice() public view returns(uint) {
        return mintPrice;
    }

    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }

    function setMaxBalance(uint256 _maxBalance) public onlyOwner {
        maxBalance = _maxBalance;
    }

    // 提領
    function withdraw(address to) public onlyOwner {
        uint256 balance = address(this).balance;
        payable(to).transfer(balance);
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
}