import React, { useContext } from "react";

import { AiFillPayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { Loader } from "./";
import { TransactionContext } from "../context/TransactionContext";

import { shortenAddress } from "../Utils/shortenAddress";

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

// react form distructuring
const Input = ({ placeholder, name, value, type, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransaction,
    handleChange,
    isLoading
  } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  return (
    <div className="flex w-ful justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-white text-3xl sm:text-4xl text-gradient py-1">
            Send Crypto <br /> Across the World
          </h1>
          <p className="md:w-9/12 w-11/12 font-light text-white mt-5 text-base">
            Explor the crypto world. By and sell cryptocurrencies easily with
            Krypt
          </p>

          {/* logic for button connection to meta mask */}
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row text-white text-base font-semibold justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              Connect Wallet
            </button>
          )}

          {/* card bellow the button */}
          <div className="grid  sm:grid-cols-3 grid-cols-2 mt-10 w-full">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
            <div
              className={`rounded-tr-2xl sm:rounded-tr-[0px] ${commonStyles}`}
            >
              Security
            </div>
            <div className={`sm:rounded-tr-2xl ${commonStyles}`}>Ethereum</div>
            <div className={`sm:rounded-bl-2xl ${commonStyles}`}>Web 3.0</div>
            <div
              className={`rounded-bl-2xl sm:rounded-bl-[0px] ${commonStyles}`}
            >
              Low-Fees
            </div>
            <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
          </div>
        </div>

        {/* Left Side Desktop View */}

        {/* Ethereum Card */}
        <div className="flex flex-col  flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full ">
              <div className="flex justify-between items-start ">
                <div className="w-10 h-10 rounded-full border-white border-2 flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <p className="text-white font-ligt text-sm">{shortenAddress(currentAccount)}</p>
              <p className="text-white font-bold text-lg">Ethereum</p>
            </div>
          </div>

          {/* Form */}

          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handleChange={handleChange}
            />
            <Input
              placeholder="Keyword (GIF)"
              name="keyword"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              handleChange={handleChange}
            />
            <div className="h-[1px] w-full bg-gray-400 " />

            {isLoading ? (
              <Loader />
            ) : (
              <div className="w-full">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c]
                 cursor-pointer rounded-full hover:bg-[#3d4f7c] transition-all ease-in-out duration-500"
                >
                  Send Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
