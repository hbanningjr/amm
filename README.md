# 🔄 AMM — Automated Market Maker

A decentralized token swap platform built on Ethereum, implementing the constant-product market maker model used by exchanges like Uniswap. Users can swap between two tokens, provide liquidity, and withdraw their share — all directly from a React frontend connected to MetaMask.

_Note: This project runs on a local Hardhat network for development and demonstration purposes._

---

## 🏗️ Architecture

### Smart Contracts (Solidity + Hardhat)

- **Token.sol** — ERC-20 token used for swapping, including transfers, approvals, and delegated transfers
- **AMM.sol** — Core AMM logic: constant-product pricing, swap execution, liquidity deposit/withdrawal, share tracking

### Test Suite (Hardhat + Chai)

- **19 passing tests** covering token deployment, transfers, approvals, delegated transfers, and AMM swap facilitation

### Frontend (React + Redux + ethers.js)

- Wallet connection via MetaMask
- Token swap interface with live price calculation
- Liquidity deposit/withdraw flows
- Real-time price chart with swap history

---

## 🛠️ Technology Stack

| Technology   | Purpose                                       |
| ------------ | --------------------------------------------- |
| Solidity     | Smart contract development                    |
| Hardhat      | Local blockchain, testing, deployment         |
| Chai + Mocha | Smart contract testing                        |
| React        | Frontend application framework                |
| Redux        | Frontend state management                     |
| ethers.js    | Frontend-to-blockchain communication          |
| MetaMask     | Wallet authentication and transaction signing |

---

## ⚙️ Local Development Setup

### Prerequisites

- Node.js v22.13+
- MetaMask browser extension
- Git

### Installation

git clone https://github.com/hbanningjr/amm.git
cd amm
npm install

### Run Locally

**Terminal 1 — Start local blockchain:**
npx hardhat node

**Terminal 2 — Deploy contracts:**
npx hardhat run scripts/deploy.js --network localhost

**Terminal 3 — Start frontend:**
npm start

### Run Tests

npx hardhat test

---

## 👨‍💻 Author

**Harv Banning** · Dapp University Blockchain Developer Bootcamp Project
[GitHub](https://github.com/hbanningjr) · [LinkedIn](https://linkedin.com/in/harv-banning-jr-8906663a4)
