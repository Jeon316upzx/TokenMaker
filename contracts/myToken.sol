
// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MaziToken is ERC20 {
    
    address public owner;

    constructor() ERC20("MaziToken", "MIN"){
        _mint(msg.sender, 1000000 * 10 ** 18);
        owner = msg.sender;
    }


    function mint (address to, uint amount) external onlyOwner {
        _mint(to, amount);
    }

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }

    function burn (uint amount) external {
        _burn(msg.sender, amount);
    }
    
}