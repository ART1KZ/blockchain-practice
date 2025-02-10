import { ethers } from "hardhat";

async function main() {
  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const [signer] = await ethers.getSigners(); // Получаем аккаунт для подписи

  // Подключаемся к контракту
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.attach(contractAddress);

  // Проверяем базовые параметры контракта
  console.log("Name:", await token.name());
  console.log("Symbol:", await token.symbol());
  console.log("Decimals:", await token.decimals());
  console.log("Total Supply:", ethers.formatUnits(await token.totalSupply(), 18));

  // Проверяем баланс отправителя
  const balance = await token.balanceOf(signer.address);
  console.log(`Signer balance: ${ethers.formatUnits(balance, 18)}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });