import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import abi from "../Utils/Transactions.json";
export const contractAbi = abi.abi;
export const contractAddress = "0x5f7474eBeD1a92e72d53B5131a66A44EAcD38520";

// Create a React context for transaction-related functions
export const TransactionContext = React.createContext({
  connectWallet: () => {},
});

// The main provider component that wraps the app and provides transaction functions
export const TransactionProvider = ({ children }) => {
  // State variables
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);

  // Function to handle input changes in the form
  const handleChange = (e, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  // Function to fetch all transactions from the blockchain
  const getAllTransactions = async () => {
    try {
      if (!window.ethereum || !ethereum)
        return alert("Please install MetaMask");

      // Get the contract instance
      const transactionContract = getEthereumContract();

      // Call the contract function to get all transactions
      const availableTransactions =
        await transactionContract.getAllTransactions();

      // Structure the available transactions for better presentation
      const structuredTransactions = availableTransactions.map(
        (transaction) => {
          // Check if 'timeStamp' is defined before accessing its 'toNumber' method
          const timestamp = transaction.timestamp
            ? new Date(transaction.timestamp.toNumber() * 1000).toLocaleString()
            : null;

          return {
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: timestamp,
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex) / 10 ** 18, // Convert the amount to ETH
          };
        }
      );

      console.log(structuredTransactions);

      // Update the transactions state with the fetched data
      setTransactions(structuredTransactions);
    } catch (error) {
      console.log(error + " no available transactions");
    }
  };

  // Function to check the wallet connection and set the current account
  const checkWalletConnection = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("Ethereum provider not available");
      }

      // Get the connected accounts using MetaMask
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        // Fetch all transactions for the current account
        getAllTransactions();
      } else {
        console.log("No account found!");
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  // Function to check if transactions exist on the blockchain
  const checkIfTransactionsExist = async () => {
    try {
      // Get the contract instance
      const transactionContract = getEthereumContract();

      // Call the contract function to get the transaction count
      const transactionCount = await transactionContract.getTransactionCount();

      // Store the transaction count in local storage and state
      window.localStorage.setItem("transactionCount", transactionCount);
      setTransactionCount(transactionCount.toNumber());
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Function to connect the wallet using MetaMask
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("Ethereum provider not available");
      }

      // Request user to connect their wallet
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Set the current account to the connected account
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Function to create the Ethereum contract instance
  const getEthereumContract = () => {
    try {
      if (
        typeof window.ethereum === "undefined" &&
        typeof window.web3 === "undefined"
      ) {
        throw new Error("Ethereum provider not available");
      }

      // Create a Web3 provider using MetaMask or other available providers
      const provider = new ethers.providers.Web3Provider(
        window.ethereum || window.web3.currentProvider || ethereum
      );

      // Get the signer to sign transactions
      const signer = provider.getSigner();

      // Create the contract instance with ABI and contract address
      const transactionContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      return transactionContract;
    } catch (error) {
      console.error("Error initializing Ethereum contract:", error);
      throw new Error("Failed to initialize Ethereum contract");
    }
  };

  // Function to send an Ethereum transaction
  const sendTransaction = async () => {
    try {
      if (!window.ethereum || !ethereum)
        return alert("Please install MetaMask");

      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      // Send the Ethereum transaction using MetaMask
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", // 21000 gwei (0.00021 ETH)
            value: parsedAmount._hex,
          },
        ],
      });

      // Call the contract function to add the transaction to the blockchain
      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      // Show loading state while waiting for the transaction to be mined
      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      // Update the transaction count after the transaction is successful
      const newTransactionCount =
        await transactionContract.getTransactionCount();
      setTransactionCount(newTransactionCount.toNumber());

      window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  // Run these effects only once on component mount
  useEffect(() => {
    checkWalletConnection();
    checkIfTransactionsExist();
  }, []);

  // Provide the transaction-related functions and state using the context
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        transactions,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
