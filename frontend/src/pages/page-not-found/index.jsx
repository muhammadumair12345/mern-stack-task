import React from "react";
import Box from "../../components/global/Box";

const PageNotFound = () => {
  return (
    <div className="p-4 min-h-screen w-full flex justify-center items-center">
      <div className="flex flex-col gap-8 items-center w-[35rem]">
        <Box className="flex-col justify-center p-4  border-t-8 border-b-8 border-primary">
          <p className="text-center text-xl font-bold md:leading-tight text-primary  md:text-2xl">
            Page not found
          </p>
        </Box>
      </div>
    </div>
  );
};

export default PageNotFound;
