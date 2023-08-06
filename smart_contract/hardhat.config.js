// https://eth-sepolia.g.alchemy.com/v2/Qcc_KJrvmut7l5dUtzPtMuaD043ceVF1

require('@nomiclabs/hardhat-waffle')

module.exports ={
  solidity: '0.8.0',
  networks:{
    sepolia:{
      url: 'https://eth-sepolia.g.alchemy.com/v2/Qcc_KJrvmut7l5dUtzPtMuaD043ceVF1',
      accounts: [ '78d8569f7d22fc037f66d2ececc140273c945ab0673a9ab2055cd86bbdab24c7' ]
    }
  }
}