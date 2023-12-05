import React, { useEffect, useState } from "react";

const About = () => {
  return (
    <div className="max-w-container mx-20 px-4">
      <div className="w-full py-10 xl:py-10 flex flex-col gap-3">
        <h1 className="text-5xl text-primeColor font-titleFont font-bold">
          About
        </h1>
      </div>
      <div className="pb-10">
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">Shopping Cart</span>{" "}
          which is used for testing.
        </h1>
      </div>
    </div>
  );
};

export default About;
