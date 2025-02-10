import { ethers } from "hardhat"

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // Замените на адрес вашего контракта
const contractABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)",
    "function allowance(address,address) view returns (uint256)",
    "function transfer(address,uint256) returns (bool)",
    "function approve(address,uint256) returns (bool)",
    "function mint(address,uint256)",
    "function burn(uint256)"
];

let provider, signer, contract;

async function connectWallet() {
    try {
        // Локальная сеть Hardhat
        provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

        // Используйте один из приватных ключей из вывода `npx hardhat node`
        const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
        signer = new ethers.Wallet(privateKey, provider);

        contract = new ethers.Contract(contractAddress, contractABI, signer);
        document.getElementById("account").value = await signer.getAddress();
    } catch (error) {
        console.error(error);
        alert("Error connecting wallet.");
    }
}

async function getTokenName() {
    try {
        const name = await contract.name();
        document.getElementById("tokenNameResult").innerText = `Token Name: ${name}`;
    } catch (error) {
        console.error(error);
        alert("Error fetching token name.");
    }
}

async function getTokenSymbol() {
    try {
        const symbol = await contract.symbol();
        document.getElementById("tokenSymbolResult").innerText = `Token Symbol: ${symbol}`;
    } catch (error) {
        console.error(error);
        alert("Error fetching token symbol.");
    }
}

async function getTokenDecimals() {
    try {
        const decimals = await contract.decimals();
        document.getElementById("tokenDecimalsResult").innerText = `Token Decimals: ${decimals}`;
    } catch (error) {
        console.error(error);
        alert("Error fetching token decimals.");
    }
}

async function getTotalSupply() {
    try {
        const totalSupply = await contract.totalSupply();
        document.getElementById("totalSupplyResult").innerText = `Total Supply: ${ethers.utils.formatEther(totalSupply)} tokens`;
    } catch (error) {
        console.error(error);
        alert("Error fetching total supply.");
    }
}

async function checkBalance() {
    const account = document.getElementById("account").value;
    if (!account) {
        alert("Please enter your Ethereum address.");
        return;
    }
    try {
        const balance = await contract.balanceOf(account);
        document.getElementById("balanceResult").innerText = `Balance: ${ethers.utils.formatEther(balance)} tokens`;
    } catch (error) {
        console.error(error);
        alert("Error checking balance.");
    }
}

async function transferTokens() {
    const toAddress = document.getElementById("toAddress").value;
    const amount = document.getElementById("amount").value;
    if (!toAddress || !amount) {
        alert("Please fill in both recipient address and amount.");
        return;
    }
    try {
        const tx = await contract.transfer(toAddress, ethers.utils.parseEther(amount));
        await tx.wait();
        document.getElementById("transferResult").innerText = "Transfer successful!";
    } catch (error) {
        console.error(error);
        alert("Error transferring tokens.");
    }
}

async function approveTokens() {
    const spenderAddress = document.getElementById("spenderAddress").value;
    const approveAmount = document.getElementById("approveAmount").value;
    if (!spenderAddress || !approveAmount) {
        alert("Please fill in both spender address and amount.");
        return;
    }
    try {
        const tx = await contract.approve(spenderAddress, ethers.utils.parseEther(approveAmount));
        await tx.wait();
        document.getElementById("approveResult").innerText = "Approval successful!";
    } catch (error) {
        console.error(error);
        alert("Error approving tokens.");
    }
}

async function checkAllowance() {
    const ownerAddress = document.getElementById("ownerAddress").value;
    const spenderAddress = document.getElementById("spenderAddressAllowance").value;
    if (!ownerAddress || !spenderAddress) {
        alert("Please fill in both owner and spender addresses.");
        return;
    }
    try {
        const allowance = await contract.allowance(ownerAddress, spenderAddress);
        document.getElementById("allowanceResult").innerText = `Allowance: ${ethers.utils.formatEther(allowance)} tokens`;
    } catch (error) {
        console.error(error);
        alert("Error checking allowance.");
    }
}

async function mintTokens() {
    const mintToAddress = document.getElementById("mintToAddress").value;
    const mintAmount = document.getElementById("mintAmount").value;
    if (!mintToAddress || !mintAmount) {
        alert("Please fill in both recipient address and amount.");
        return;
    }
    try {
        const tx = await contract.mint(mintToAddress, ethers.utils.parseEther(mintAmount));
        await tx.wait();
        document.getElementById("mintResult").innerText = "Mint successful!";
    } catch (error) {
        console.error(error);
        alert("Error minting tokens.");
    }
}

async function burnTokens() {
    const burnAmount = document.getElementById("burnAmount").value;
    if (!burnAmount) {
        alert("Please enter the amount to burn.");
        return;
    }
    try {
        const tx = await contract.burn(ethers.utils.parseEther(burnAmount));
        await tx.wait();
        document.getElementById("burnResult").innerText = "Burn successful!";
    } catch (error) {
        console.error(error);
        alert("Error burning tokens.");
    }
}