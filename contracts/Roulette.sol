//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Roulette {
    uint8 private seed;

    mapping(uint8 => uint8) private reds;
    mapping(address => uint256) public donations;
    address[] public donationAddresses;

    event BalanceChanged(uint256 newBalance);
    event PlayerPayout(uint8 requestId, uint8 spin, uint256 winAmount);
    event PlayerLost(uint8 requestId, uint8 spin);

    struct Bet {
        uint8 kind;
        uint8 param;
        uint256 amount;
    }

    constructor() payable {
        console.log("Contract starting", msg.value);
        emit BalanceChanged(msg.value);

        // From Wikipedia: https://en.wikipedia.org/wiki/Roulette
        uint8[18] memory redsArray = [
            1,
            3,
            5,
            7,
            9,
            12,
            14,
            16,
            18,
            19,
            21,
            23,
            25,
            27,
            30,
            32,
            34,
            36
        ];
        for (uint256 i = 0; i < redsArray.length; i++) {
            uint256 r = redsArray[i];
            reds[uint8(r)] = 1;
        }
    }

    function spin(uint8 requestId, Bet[] calldata bets) external payable {
        validateBets(bets, msg.value);

        // pseudo-random with a seed
        uint8 rouletteSpin = uint8(
            (block.difficulty + block.timestamp + seed) % 37 // solhint-disable-line
        );
        console.log("Spun the wheel! %d", rouletteSpin);
        seed = rouletteSpin;

        uint256 payout = calculatePayout(bets, rouletteSpin);

        if (payout > 0) {
            require(payout < address(this).balance, "Sorry, casino's bust!");
            (bool success, ) = (msg.sender).call{value: payout}(""); // solhint-disable-line
            require(success, "Failed to pay out, sorry!");
            emit PlayerPayout(requestId, rouletteSpin, payout);
        } else {
            emit PlayerLost(requestId, rouletteSpin);
        }
        emit BalanceChanged(address(this).balance);
    }

    function validateBets(Bet[] calldata bets, uint256 expectedTotal)
        public
        pure
    {
        uint256 sum = 0;
        for (uint256 i = 0; i < bets.length; i++) {
            sum += bets[i].amount;
        }
        require(
            sum == expectedTotal,
            "Invalid bet amounts"
        );
    }

    function calculatePayout(Bet[] calldata bets, uint8 rouletteSpin)
        public
        view
        returns (uint256)
    {
        uint256 payout = 0;
        for (uint256 i = 0; i < bets.length; i++) {
            uint8 multiple = calculateReturnMultiple(
                rouletteSpin,
                bets[i].kind,
                bets[i].param
            );
            payout += (multiple * bets[i].amount);
        }
        return payout;
    }

    function calculateReturnMultiple(
        uint8 rouletteSpin,
        uint8 betType,
        uint8 betParam
    ) public view returns (uint8) {
        // Outside bets
        if (betType == 0) {
            // Black/Red
            bool win = rouletteSpin > 0 && reds[rouletteSpin] == betParam; // 0 wins if Black, 1 wins if Red
            return win ? 2 : 0;
        } else if (betType == 1) {
            // Even/Odd
            bool win = rouletteSpin > 0 && rouletteSpin % 2 == betParam; // 0 wins if Even, 1 wins if Odd
            return win ? 2 : 0;
        } else if (betType == 2) {
            // Low/High
            if (rouletteSpin == 0) {
                return 0;
            }
            if (rouletteSpin <= 18 && betParam == 0) {
                return 2;
            } // 0 wins if Low
            if (rouletteSpin > 18 && betParam == 1) {
                return 2;
            } // 1 wins if High
            return 0;
        } else if (betType == 3) {
            // One of 3 columns
            bool win = rouletteSpin > 0 && rouletteSpin % 3 == betParam; // 1 wins if col 1, 2 wins if col 2, 0 wins if col3
            return win ? 3 : 0;
        } else if (betType == 4) {
            // Low/Medium/High third
            if (rouletteSpin == 0) {
                return 0;
            }
            if (rouletteSpin <= 12 && betParam == 0) {
                return 3;
            } // 0 wins if 1-12
            if (rouletteSpin > 12 && rouletteSpin <= 24 && betParam == 1) {
                return 3;
            } // 1 wins if 13-24
            if (rouletteSpin > 24 && rouletteSpin <= 36 && betParam == 2) {
                return 3;
            } // 2 wins if 25-36
            return 0;
        }
        // Inside bets
        else if (betType == 100) {
            // Straight up bet
            bool win = rouletteSpin == betParam;
            return win ? 36 : 0;
        } else if (betType == 101) {
            // Horizontal split
            // Param assumed to be on the left, so win for param or the number to its right (+1)
            bool win = rouletteSpin == betParam || rouletteSpin == betParam + 1;
            return win ? 18 : 0;
        } else if (betType == 102) {
            // Vertical split
            // Param assumed to be top of the split, so win for param or the number below (+3)
            bool win = rouletteSpin == betParam || rouletteSpin == betParam + 3;
            return win ? 18 : 0;
        } else if (betType == 103) {
            // Street
            // Param assumed to be left number in the row, so win for param, param+1, param+3
            bool win = rouletteSpin >= betParam && rouletteSpin <= betParam + 2;
            return win ? 12 : 0;
        } else if (betType == 104) {
            // Corner
            // Param assumed to be top left of the corner, so bet covers the param, the number to its right (+1), the number below (+3), the number below right (+4)
            bool win = rouletteSpin == betParam ||
                rouletteSpin == betParam + 1 ||
                rouletteSpin == betParam + 3 ||
                rouletteSpin == betParam + 4;
            return win ? 9 : 0;
        } else if (betType == 105) {
            // Line (2 rows)
            // Param assumed to be the top left of the two rows, so win for param to param + 5 (eg 1-6)
            bool win = rouletteSpin >= betParam && rouletteSpin <= betParam + 5;
            return win ? 6 : 0;
        } else if (betType == 106) {
            // Basket (0,1,2,3)
            bool win = rouletteSpin <= 3;
            return win ? 7 : 0;
        } else {
            revert("Bet type not implemented, sorry!");
        }
    }

    function donate() public payable {
        require(msg.value > 0, "Can't donate 0!");

        if (donations[msg.sender] == 0) {
            donationAddresses.push(msg.sender);
        }

        donations[msg.sender] += msg.value;
        emit BalanceChanged(address(this).balance);
    }

    function getDonationAddresses() public view returns (address[] memory) {
        return donationAddresses;
    }
}
