const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

const ether = tokens;

describe("Token", () => {
  let accounts;
  let deployer;
  let liquidityProvider;

  let token1, token2, amm;

  beforeEach(async () => {
    // Setup Accounts
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    liquidityProvider = accounts[1];

    const Token = await ethers.getContractFactory("Token");
    token1 = await Token.deploy("Dapp University", "DAPP", "1000000"); // One Million Tokens
    token2 = await Token.deploy("USD Token", "USD", "1000000"); //One Million Tokens

    // Send tokens to liquidity provider
    let transaction = await token1
      .connect(deployer)
      .transfer(liquidityProvider.address, tokens(100000));
    await transaction.wait();

    transaction = await token2
      .connect(deployer)
      .transfer(liquidityProvider.address, tokens(100000));
    await transaction.wait();

    const AMM = await ethers.getContractFactory("AMM");
    amm = await AMM.deploy(token1.address, token2.address);
  });

  describe("AMM", () => {
    it("has an address", async () => {
      expect(amm.address).to.not.equal(0x0);
    });

    it("tracks token1 address", async () => {
      expect(await amm.token1()).to.equal(token1.address);
    });

    it("tracks token2 address", async () => {
      expect(await amm.token2()).to.equal(token2.address);
    });

    describe("Swapping Tokens", () => {
      let amount, transaction;

      amount = tokens(10000);

      it("facilitates Swaps", async () => {
        // Deployer approves and adds 100k first
        amount = tokens(100000);
        transaction = await token1
          .connect(deployer)
          .approve(amm.address, amount);
        await transaction.wait();
        transaction = await token2
          .connect(deployer)
          .approve(amm.address, amount);
        await transaction.wait();
        transaction = await amm.connect(deployer).addLiquidity(amount, amount);
        await transaction.wait();

        // Check deployer has 100 shares
        expect(await amm.shares(deployer.address)).to.equal(tokens(100)); // use tokens to calculate shares

        // Check pool has 100 shares
        expect(await amm.totalShares()).to.equal(tokens(100));

        //Check AMM receives tokens
        expect(await token1.balanceOf(amm.address)).to.equal(amount);
        expect(await token2.balanceOf(amm.address)).to.equal(amount);

        expect(await amm.token1Balance()).to.equal(amount);
        expect(await amm.token2Balance()).to.equal(amount);

        // Then LP approves and adds 50k
        amount = tokens(50000);
        transaction = await token1
          .connect(liquidityProvider)
          .approve(amm.address, amount);
        await transaction.wait();
        transaction = await token2
          .connect(liquidityProvider)
          .approve(amm.address, amount);
        await transaction.wait();

        // Calculate token2 depot smount
        let token2Deposit = await amm.calculateToken2Deposit(amount);

        transaction = await amm
          .connect(liquidityProvider)
          .addLiquidity(amount, token2Deposit);
        await transaction.wait();

        // Check deployer has 100 shares
        expect(await amm.shares(deployer.address)).to.equal(tokens(100)); // use tokens to calculate shares

        // Check pool has 150 shares
        expect(await amm.totalShares()).to.equal(tokens(150));

        /////////////////////////////////////////////
        //LP adds more liquidity
        //

        //LP should have 50 shares
        expect(await amm.shares(liquidityProvider.address)).to.equal(
          tokens(50),
        );
      });
    });
  });
});
