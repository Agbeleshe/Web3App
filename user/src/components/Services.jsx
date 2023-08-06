import React from "react";
import {
  Bs0CircleFill,
  BsCCircleFill,
  BsShieldFillCheck,
} from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServiceCard = ({ color, title, icon, subtitle }) => {
  return (
    <div className="w-auto flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
      <div
        className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
      >
        {icon}
      </div>
      <div className="ml-5 flex flex-col flex-1 text-white">
        <h1 className="mt-1 text-lg">{title}</h1>
        <p className="mt-1 text-sm md:w-9/12">{subtitle}</p>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <div className="flex flex-col md:flex-row w-full gradient-bg-services justify-center items-center">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-4 px-4 ">
        <div className="flex-1 flex flex-col justify-start items-start ">
          <h1 className="text-white text-3xl sm:text-5xl text-gradient">
            Services that we
            <br />
            continue to imporve
          </h1>
        </div>
      </div>

      {/* Card side */}
      <div className="flex-1 flex flex-col justify-start items-center">
        <ServiceCard
          color="bg-[#2952E3]"
          title="Security gurantee"
          icon={<BsShieldFillCheck fontSize="21px" className="text-white" />}
          subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title="Best Exchange Rate"
          icon={<BiSearchAlt fontSize="21px" className="text-white" />}
          subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="Fastest Transaction"
          icon={<RiHeart2Fill fontSize="21px" className="text-white" />}
          subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
        />
      </div>
    </div>
  );
};
export default Services;
