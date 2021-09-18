//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Roulette {
    uint8 private seed;

    mapping(uint8 => uint8) reds;

    event BalanceChanged(uint newBalance);
    event PlayerWon(uint8 requestId, uint8 spin, uint winAmount);
    event PlayerLost(uint8 requestId, uint8 spin);

    constructor() payable {
        console.log("Contract starting", msg.value);
        emit BalanceChanged(msg.value);

        // From Wikipedia: https://en.wikipedia.org/wiki/Roulette
        uint8[18] memory redsArray = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        for (uint i=0; i<redsArray.length; i++) {
            uint r = redsArray[i];
            reds[uint8(r)] = 1;
        }
    }

    function spin(uint8 requestId, uint8 betType, int8 betParam) public payable {
        // pseudo-random with a seed
        uint8 rouletteSpin = uint8((block.difficulty + block.timestamp + seed) % 37);
        seed = rouletteSpin;

        console.log("Spun the wheel! %d", rouletteSpin);
        uint8 multiple = calculateReturnMultiple(rouletteSpin, betType, betParam);

        if(multiple > 0) {
            uint payout = msg.value * multiple;
            require(payout < address(this).balance, "Sorry, casino's bust!");
            (bool success,) = (msg.sender).call{value: payout}("");
            require(success, "Failed to pay out, sorry!");
            emit PlayerWon(requestId, rouletteSpin, payout);
        } else {
            emit PlayerLost(requestId, rouletteSpin);
        }
        emit BalanceChanged(address(this).balance);
    }

    function calculateReturnMultiple(uint8 rouletteSpin, uint8 betType, int8 betParam) view public returns (uint8) {
        // Outside bets
        if(betType == 0) {
            // Black/Red
            bool win = rouletteSpin > 0 && reds[rouletteSpin] == uint8(betParam); // 0 wins if Black, 1 wins if Red
            return win? 2 : 0;
        } else if(betType == 1) {
            // Even/Odd
            bool win = rouletteSpin > 0 && rouletteSpin % 2 == uint8(betParam); // 0 wins if Even, 1 wins if Odd
            return win? 2 : 0;
        } else if(betType == 2) {
            // Low/High
            if(rouletteSpin == 0) { return 0; }
            if(rouletteSpin <= 18 && betParam == 0) { return 2; } // 0 wins if Low
            if(rouletteSpin > 18 && betParam == 1) { return 2; } // 1 wins if High
            return 0;
        } else if(betType == 3) {
            // One of 3 columns
            bool win = rouletteSpin > 0 && rouletteSpin % 3 == uint8(betParam); // 1 wins if col 1, 2 wins if col 2, 0 wins if col3
            return win? 3 : 0;
        } else if(betType == 4) {
            // Low/Medium/High third
            if(rouletteSpin == 0) { return 0; }
            if(rouletteSpin <= 12 && betParam == 0) { return 3; } // 0 wins if 1-12
            if(rouletteSpin > 12 && rouletteSpin <= 24 && betParam == 1) { return 3; } // 1 wins if 13-24
            if(rouletteSpin > 24 && rouletteSpin <= 36 && betParam == 2) { return 3; } // 2 wins if 25-36
            return 0;
        }
        // Inside bets
        else if(betType == 100) {
            // Straight up bet
            bool win = rouletteSpin == uint8(betParam);
            return win? 36 : 0; 
        } else if(betType == 101) {
            // Horizontal split
            uint8 splitLeft = uint8(betParam);
            bool win = rouletteSpin == splitLeft || rouletteSpin == splitLeft + 1;
            return win? 18 : 0;
        } else if(betType == 102) {
            // Vertical split
            uint8 splitTop = uint8(betParam);
            bool win = rouletteSpin == splitTop || rouletteSpin == splitTop + 3;
            return win? 18 : 0;
        }
        else {
            revert("Bet type not implemented, sorry!");
        }
    }
}
