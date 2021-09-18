const { expect } = require("chai");
const { ethers } = require("hardhat");
const assert = require('assert');

describe("calculateReturnMultiple", function () {
  let rouletteContract;

  before(async function () {
    const rouletteContractFactory = await hre.ethers.getContractFactory("Roulette");
    rouletteContract = await rouletteContractFactory.deploy();
    await rouletteContract.deployed();
  });

  describe("outside bets: black/red", function () {
    const betType = 0; // red/black

    describe("bets on red", function () {
      const betParam = 1; // bet on red

      const tests = [
        {spin: 0, expected: 0},
        {spin: 1, expected: 2},
        {spin: 2, expected: 0},
        {spin: 3, expected: 2},
        {spin: 4, expected: 0},
        {spin: 5, expected: 2},
        {spin: 6, expected: 0},
        {spin: 7, expected: 2},
        {spin: 30, expected: 2},
        {spin: 31, expected: 0},
        {spin: 32, expected: 2},
        {spin: 33, expected: 0},
        {spin: 34, expected: 2},
        {spin: 35, expected: 0},
        {spin: 36, expected: 2},
      ];
    
      tests.forEach(({spin, expected}) => {
        it(`correct for spin ${spin}`, async function() {
          const result = await rouletteContract.calculateReturnMultiple(spin, betType, betParam);
          assert.strictEqual(result, expected)
        });
      });
    });

    describe("bets on black", function () {
      const betParam = 0; // bet on black
      const tests = [
        {spin: 0, expected: 0},
        {spin: 1, expected: 0},
        {spin: 2, expected: 2},
        {spin: 3, expected: 0},
        {spin: 4, expected: 2},
        {spin: 5, expected: 0},
        {spin: 6, expected: 2},
        {spin: 7, expected: 0},
        {spin: 30, expected: 0},
        {spin: 31, expected: 2},
        {spin: 32, expected: 0},
        {spin: 33, expected: 2},
        {spin: 34, expected: 0},
        {spin: 35, expected: 2},
        {spin: 36, expected: 0},
      ];
    
      tests.forEach(({spin, expected}) => {
        it(`correct for spin ${spin}`, async function() {
          const result = await rouletteContract.calculateReturnMultiple(spin, betType, betParam);
          assert.strictEqual(result, expected)
        });
      });
    })
  });

  describe("outside bets: odd/even", function () {
    const betType = 1; // even/odd

    describe("bet on even", function () {
      const betParam = 0;

      const tests = [
        {spin: 0, expected: 0},
        {spin: 1, expected: 0},
        {spin: 2, expected: 2},
        {spin: 3, expected: 0},
        {spin: 4, expected: 2},
        {spin: 33, expected: 0},
        {spin: 34, expected: 2},
        {spin: 35, expected: 0},
        {spin: 36, expected: 2},
      ];
    
      tests.forEach(({spin, expected}) => {
        it(`correct for spin ${spin}`, async function() {
          const result = await rouletteContract.calculateReturnMultiple(spin, betType, betParam);
          assert.strictEqual(result, expected)
        });
      });
    });

    describe("bet on odd", function () {
      const betParam = 1;

      const tests = [
        {spin: 0, expected: 0},
        {spin: 1, expected: 2},
        {spin: 2, expected: 0},
        {spin: 3, expected: 2},
        {spin: 4, expected: 0},
        {spin: 33, expected: 2},
        {spin: 34, expected: 0},
        {spin: 35, expected: 2},
        {spin: 36, expected: 0},
      ];
    
      tests.forEach(({spin, expected}) => {
        it(`correct for spin ${spin}`, async function() {
          const result = await rouletteContract.calculateReturnMultiple(spin, betType, betParam);
          assert.strictEqual(result, expected)
        });
      });
    });
  });

  describe("outside bets: low/high", function () {
    const betType = 2; // low/high

    describe("bet on low", function () {
      const betParam = 0;

      const tests = [
        {spin: 0, expected: 0},
        {spin: 1, expected: 2},
        {spin: 2, expected: 2},
        {spin: 18, expected: 2},
        {spin: 19, expected: 0},
        {spin: 20, expected: 0},
        {spin: 35, expected: 0},
        {spin: 36, expected: 0},
      ];
    
      tests.forEach(({spin, expected}) => {
        it(`correct for spin ${spin}`, async function() {
          const result = await rouletteContract.calculateReturnMultiple(spin, betType, betParam);
          assert.strictEqual(result, expected)
        });
      });
    });

    describe("bet on high", function () {
      const betParam = 1;

      const tests = [
        {spin: 0, expected: 0},
        {spin: 1, expected: 0},
        {spin: 2, expected: 0},
        {spin: 18, expected: 0},
        {spin: 19, expected: 2},
        {spin: 20, expected: 2},
        {spin: 35, expected: 2},
        {spin: 36, expected: 2},
      ];
    
      tests.forEach(({spin, expected}) => {
        it(`correct for spin ${spin}`, async function() {
          const result = await rouletteContract.calculateReturnMultiple(spin, betType, betParam);
          assert.strictEqual(result, expected)
        });
      });
    });
  });

  describe("outside bets: columns", function () {
    const betType = 3; // columns

    describe("bet on column1", function () {
      const betParam = 1;

      const tests = [
        {spin: 0, expected: 0},
        {spin: 1, expected: 3},
        {spin: 4, expected: 3},
        {spin: 31, expected: 3},
        {spin: 34, expected: 3},
        {spin: 2, expected: 0},
        {spin: 5, expected: 0},
        {spin: 30, expected: 0},
        {spin: 36, expected: 0}
      ];
    
      tests.forEach(({spin, expected}) => {
        it(`correct for spin ${spin}`, async function() {
          const result = await rouletteContract.calculateReturnMultiple(spin, betType, betParam);
          assert.strictEqual(result, expected)
        });
      });
    });

    describe("bet on column2", function () {
      const betParam = 2;

      const tests = [
        {spin: 0, expected: 0},
        {spin: 2, expected: 3},
        {spin: 5, expected: 3},
        {spin: 8, expected: 3},
        {spin: 32, expected: 3},
        {spin: 35, expected: 3},
        {spin: 1, expected: 0},
        {spin: 3, expected: 0},
        {spin: 36, expected: 0}
      ];
    
      tests.forEach(({spin, expected}) => {
        it(`correct for spin ${spin}`, async function() {
          const result = await rouletteContract.calculateReturnMultiple(spin, betType, betParam);
          assert.strictEqual(result, expected)
        });
      });
    });

    describe("bet on column3", function () {
      const betParam = 0;

      const tests = [
        {spin: 0, expected: 0},
        {spin: 3, expected: 3},
        {spin: 6, expected: 3},
        {spin: 9, expected: 3},
        {spin: 33, expected: 3},
        {spin: 36, expected: 3},
        {spin: 1, expected: 0},
        {spin: 2, expected: 0},
        {spin: 35, expected: 0}
      ];
    
      tests.forEach(({spin, expected}) => {
        it(`correct for spin ${spin}`, async function() {
          const result = await rouletteContract.calculateReturnMultiple(spin, betType, betParam);
          assert.strictEqual(result, expected)
        });
      });
    });
  });

  describe("outside bets: dozens", function () {
    const betType = 4; // columns

    describe("bet on 1-12", function () {
      const betParam = 0;

      const tests = [
        {spin: 0, expected: 0},
        {spin: 1, expected: 3},
        {spin: 2, expected: 3},
        {spin: 12, expected: 3},
        {spin: 13, expected: 0},
        {spin: 20, expected: 0},
        {spin: 36, expected: 0}
      ];
    
      tests.forEach(({spin, expected}) => {
        it(`correct for spin ${spin}`, async function() {
          const result = await rouletteContract.calculateReturnMultiple(spin, betType, betParam);
          assert.strictEqual(result, expected)
        });
      });
    });

    describe("bet on 13-24", function () {
      const betParam = 1;

      const tests = [
        {spin: 0, expected: 0},
        {spin: 1, expected: 0},
        {spin: 12, expected: 0},
        {spin: 13, expected: 3},
        {spin: 14, expected: 3},
        {spin: 24, expected: 3},
        {spin: 25, expected: 0},
        {spin: 36, expected: 0},
      ];
    
      tests.forEach(({spin, expected}) => {
        it(`correct for spin ${spin}`, async function() {
          const result = await rouletteContract.calculateReturnMultiple(spin, betType, betParam);
          assert.strictEqual(result, expected)
        });
      });
    });

    describe("bet on 25-36", function () {
      const betParam = 2;

      const tests = [
        {spin: 0, expected: 0},
        {spin: 1, expected: 0},
        {spin: 13, expected: 0},
        {spin: 24, expected: 0},
        {spin: 25, expected: 3},
        {spin: 26, expected: 3},
        {spin: 36, expected: 3},
      ];
    
      tests.forEach(({spin, expected}) => {
        it(`correct for spin ${spin}`, async function() {
          const result = await rouletteContract.calculateReturnMultiple(spin, betType, betParam);
          assert.strictEqual(result, expected)
        });
      });
    });
  });

  describe("inside bets: straight up", function () {
    const betType = 100;

    it("wins when the spin matches", async function () {
      const spin = 0;
      const betParam = 0;
      const result = await rouletteContract.calculateReturnMultiple(spin, betType, betParam);
      assert.strictEqual(result, 36)
    });

    it("loses when the spin doesn't match", async function () {
      const spin = 0;
      const betParam = 1;
      const result = await rouletteContract.calculateReturnMultiple(spin, betType, betParam);
      assert.strictEqual(result, 0);
    });
  });

  describe("inside bets: horizontal split", function () {
    const betType = 101;

    it("wins for either of two horizontally adjacent squares", async function () {
      const betParam = 1; // Should match 1 or 2
      const result1 = await rouletteContract.calculateReturnMultiple(1, betType, betParam);
      assert.strictEqual(result1, 18);
      const result2 = await rouletteContract.calculateReturnMultiple(2, betType, betParam);
      assert.strictEqual(result2, 18);
    });

    it("loses for anything else", async function () {
      const betParam = 1; // Should match 1 or 2
      const result = await rouletteContract.calculateReturnMultiple(3, betType, betParam);
      assert.strictEqual(result, 0);
    });
  });

  describe("inside bets: vertical split", function () {
    const betType = 102;

    it("wins for either of two vertically adjacent squares", async function () {
      const betParam = 1; // Should match 1 or 4
      const result1 = await rouletteContract.calculateReturnMultiple(1, betType, betParam);
      assert.strictEqual(result1, 18);
      const result2 = await rouletteContract.calculateReturnMultiple(4, betType, betParam);
      assert.strictEqual(result2, 18);
    });

    it("loses for anything else", async function () {
      const betParam = 1; // Should match 1 or 4
      const result = await rouletteContract.calculateReturnMultiple(2, betType, betParam);
      assert.strictEqual(result, 0);
    });
  });

  describe("inside bets: street", function () {
    const betType = 103;

    it("wins for any of 3 numbers in a row", async function () {
      const betParam = 1; // Should match 1, 2, 3
      const result1 = await rouletteContract.calculateReturnMultiple(1, betType, betParam);
      assert.strictEqual(result1, 12);
      const result2 = await rouletteContract.calculateReturnMultiple(2, betType, betParam);
      assert.strictEqual(result2, 12);
      const result3 = await rouletteContract.calculateReturnMultiple(3, betType, betParam);
      assert.strictEqual(result3, 12);
    })

    it("loses for anything else", async function () {
      const betParam = 1; // Should match 1, 2, 3
      const result1 = await rouletteContract.calculateReturnMultiple(0, betType, betParam);
      assert.strictEqual(result1, 0);
      const result2 = await rouletteContract.calculateReturnMultiple(4, betType, betParam);
      assert.strictEqual(result2, 0);
    });
  });

  describe("inside bets: corner", function () {
    const betType = 104;

    it("wins for any of 4 touching numbers", async function () {
      const betParam = 1; // Should match 1, 2, 4, 5
      const result1 = await rouletteContract.calculateReturnMultiple(1, betType, betParam);
      assert.strictEqual(result1, 8);
      const result2 = await rouletteContract.calculateReturnMultiple(2, betType, betParam);
      assert.strictEqual(result2, 8);
      const result3 = await rouletteContract.calculateReturnMultiple(4, betType, betParam);
      assert.strictEqual(result3, 8);
      const result4 = await rouletteContract.calculateReturnMultiple(5, betType, betParam);
      assert.strictEqual(result4, 8);
    });

    it("loses for anything else", async function () {
      const betParam = 1; // Should match 1, 2, 4, 5
      const result1 = await rouletteContract.calculateReturnMultiple(0, betType, betParam);
      assert.strictEqual(result1, 0);
      const result2 = await rouletteContract.calculateReturnMultiple(3, betType, betParam);
      assert.strictEqual(result2, 0);
    });
  });

  describe("inside bets: line", function () {
    const betType = 105;

    it("wins for any of 6 numbers (2 rows)", async function () {
      const betParam = 1; // Should match 1, 2, 3, 4, 5, 6
      const result1 = await rouletteContract.calculateReturnMultiple(1, betType, betParam);
      assert.strictEqual(result1, 6);
      const result2 = await rouletteContract.calculateReturnMultiple(2, betType, betParam);
      assert.strictEqual(result2, 6);
      const result3 = await rouletteContract.calculateReturnMultiple(3, betType, betParam);
      assert.strictEqual(result3, 6);
      const result4 = await rouletteContract.calculateReturnMultiple(4, betType, betParam);
      assert.strictEqual(result4, 6);
      const result5 = await rouletteContract.calculateReturnMultiple(5, betType, betParam);
      assert.strictEqual(result5, 6);
      const result6 = await rouletteContract.calculateReturnMultiple(6, betType, betParam);
      assert.strictEqual(result6, 6);
    });

    it("loses for anything else", async function () {
      const betParam = 1; // Should match 1, 2, 3, 4, 5, 6
      const result1 = await rouletteContract.calculateReturnMultiple(0, betType, betParam);
      assert.strictEqual(result1, 0);
      const result2 = await rouletteContract.calculateReturnMultiple(7, betType, betParam);
      assert.strictEqual(result2, 0);
    });
  });
});
