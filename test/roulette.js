const { expect } = require("chai");
const assert = require('assert');
const { hrtime } = require("process");

describe("calculateReturnMultiple", function () {
  let rouletteContract;

  before(async function () {
    const rouletteContractFactory = await ethers.getContractFactory("Roulette");
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
      assert.strictEqual(result1, 9);
      const result2 = await rouletteContract.calculateReturnMultiple(2, betType, betParam);
      assert.strictEqual(result2, 9);
      const result3 = await rouletteContract.calculateReturnMultiple(4, betType, betParam);
      assert.strictEqual(result3, 9);
      const result4 = await rouletteContract.calculateReturnMultiple(5, betType, betParam);
      assert.strictEqual(result4, 9);
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

  describe("inside bets: basket", function () {
    const betType = 106;

    it("wins for any of 0, 1, 2, 3", async function () {
      const betParam = 0; // Bet is not parameterised
      const result1 = await rouletteContract.calculateReturnMultiple(0, betType, betParam);
      assert.strictEqual(result1, 7);
      const result2 = await rouletteContract.calculateReturnMultiple(1, betType, betParam);
      assert.strictEqual(result2, 7);
      const result3 = await rouletteContract.calculateReturnMultiple(2, betType, betParam);
      assert.strictEqual(result3, 7);
      const result4 = await rouletteContract.calculateReturnMultiple(3, betType, betParam);
      assert.strictEqual(result4, 7);
    });

    it("loses for anything else", async function () {
      const betParam = 0; // Bet is not parameterised
      const result1 = await rouletteContract.calculateReturnMultiple(4, betType, betParam);
      assert.strictEqual(result1, 0);
      const result2 = await rouletteContract.calculateReturnMultiple(36, betType, betParam);
      assert.strictEqual(result2, 0);
    });
  });
});

describe("donations", function () {
  let rouletteContract;
  let owner;

  before(async function () {
    const signers = await ethers.getSigners();
    owner = signers[0];
  });

  beforeEach(async function () {
    // Reset the contract after each test because this function is impure
    const rouletteContractFactory = await ethers.getContractFactory("Roulette");
    rouletteContract = await rouletteContractFactory.deploy();
    await rouletteContract.deployed();
  });

  it("should emit an event reflecting the new balance", async function () {
    const amount = ethers.utils.parseEther("0.5");
    await expect(rouletteContract.donate({value: amount}))
      .to.emit(rouletteContract, 'BalanceChanged')
      .withArgs(amount);
  });

  it("should reject a value of 0", async function () {
    const amount = ethers.utils.parseEther("0");
    await expect(rouletteContract.donate({value: amount}))
      .to.be.revertedWith("Sorry but you can't donate nothing!");

    const donationAddresses = await rouletteContract.getDonationAddresses();
    assert.deepStrictEqual(donationAddresses, []);
  });

  it("should credit donations", async function () {
    const amount = ethers.utils.parseEther("0.5");

    // Make a donation of 0.5
    const donateTxn1 = await rouletteContract.donate({value: amount});
    await donateTxn1.wait();

    // Should have our address recorded in donation addresses
    const donationAddresses1 = await rouletteContract.getDonationAddresses();
    assert.deepStrictEqual(donationAddresses1, [owner.address]);

    // Should have 0.5 mapped to that address
    const recordedAmount1 = await rouletteContract.donations(owner.address);
    assert.deepStrictEqual(recordedAmount1, amount);

    // Make another donation of 0.5
    const donateTxn2 = await rouletteContract.donate({value: amount});
    await donateTxn2.wait();

    // Should still have only one instance of our address recorded in donation addresses
    const donationAddresses2 = await rouletteContract.getDonationAddresses();
    assert.deepStrictEqual(donationAddresses2, [owner.address]);

    // Should now have 1.0 mapped to that address
    const recordedAmount2 = await rouletteContract.donations(owner.address);
    assert.deepStrictEqual(recordedAmount2, ethers.utils.parseEther("1.0"));
  });
});

describe("validateBets", function () {
  let rouletteContract;

  before(async function () {
    const rouletteContractFactory = await ethers.getContractFactory("Roulette");
    rouletteContract = await rouletteContractFactory.deploy();
    await rouletteContract.deployed();
  });

  it("should reject if sum of bets is below expected", async function () {
    const bets = [
      {kind: 0, param: 0, amount: ethers.utils.parseEther("1.0")},
      {kind: 0, param: 0, amount: ethers.utils.parseEther("1.0")},
    ]
    await expect(rouletteContract.validateBets(bets, ethers.utils.parseEther("5.0")))
    .to.be.revertedWith("Input bet amounts do not add up to msg value");
  });

  it("should reject if sum of bets is above expected", async function () {
    const bets = [
      {kind: 0, param: 0, amount: ethers.utils.parseEther("1.0")},
      {kind: 0, param: 0, amount: ethers.utils.parseEther("1.0")},
    ]
    await expect(rouletteContract.validateBets(bets, ethers.utils.parseEther("1.0")))
    .to.be.revertedWith("Input bet amounts do not add up to msg value");
  });

  it("should be ok if sum of bets is equal to expected", async function () {
    const bets = [
      {kind: 0, param: 0, amount: ethers.utils.parseEther("1.0")},
      {kind: 0, param: 0, amount: ethers.utils.parseEther("1.0")},
    ]
    
    await rouletteContract.validateBets(bets, ethers.utils.parseEther("2.0"));
  });
});

describe("calculatePayout", function () {
  let rouletteContract;

  before(async function () {
    const rouletteContractFactory = await ethers.getContractFactory("Roulette");
    rouletteContract = await rouletteContractFactory.deploy();
    await rouletteContract.deployed();
  });

  it("should calculate the payout of multiple winning bets", async function () {
    const bets = [
      {kind: 1, param: 0, amount: ethers.utils.parseEther("1.0")}, // wins even money for evens
      {kind: 103, param: 1, amount: ethers.utils.parseEther("1.0")}, // street wins 11:1 for 1, 2, 3
    ];

    const spin = 2;
    const payout = await rouletteContract.calculatePayout(bets, spin);
    const expectedPayout = ethers.utils.parseEther("14.0"); // 2 for the even, 12 for the street
    assert.deepStrictEqual(payout, expectedPayout);
  });

  it("should calculate payout correctly when only some bets win", async function () {
    const bets = [
      {kind: 1, param: 0, amount: ethers.utils.parseEther("1.0")}, // wins even money for evens
      {kind: 103, param: 1, amount: ethers.utils.parseEther("1.0")}, // street wins 11:1 for 1, 2, 3
    ];

    const spin = 6;
    const payout = await rouletteContract.calculatePayout(bets, spin);
    const expectedPayout = ethers.utils.parseEther("2.0"); // 2 for the even, 0 for the street
    assert.deepStrictEqual(payout, expectedPayout);
  });

  it("should calculate payout correctly when no bets win", async function () {
    const bets = [
      {kind: 1, param: 0, amount: ethers.utils.parseEther("1.0")}, // wins even money for evens
      {kind: 103, param: 1, amount: ethers.utils.parseEther("1.0")}, // street wins 11:1 for 1, 2, 3
    ];

    const spin = 5;
    const payout = await rouletteContract.calculatePayout(bets, spin);
    const expectedPayout = ethers.utils.parseEther("0.0"); // 2 for the even, 0 for the street
    assert.deepStrictEqual(payout, expectedPayout);
  });
});