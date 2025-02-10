import { ethers } from "hardhat";

async function main() {
  // создание класса для контракта "Token"
  const Token = await ethers.getContractFactory("Token");

  // деплоим и создаем экземпляр класса Token, передаем аргументы которые будут инициализированы в функции конструкторе
  const token = await Token.deploy(
    "MyToken",
    "MTK",
    18,
    1000000
  );

  // дожидаемся деплоя
  await token.waitForDeployment();

  // получаем адрес контракта
  const contractAddress = await token.getAddress();

  // выводим адрес контракта
  console.log(`Token deployed to: ${contractAddress}`);
}

// вызываем асинхронную фунцкцию деплоя
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });