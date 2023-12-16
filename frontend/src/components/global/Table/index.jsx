import React from "react";
import Search from "./Search";
import Pagination from "./Pagination";
import Box from "../Box";
import Loader from "../Loader";

const Table = ({ children, tableHeadings = [], isLoading, tname = "" }) => {
  return (
    <Box className="flex-col">
      <Box>
        <Search />
      </Box>
      <div className="relative overflow-x-auto w-full">
        <table className=" text-sm text-left rtl:text-right w-full">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              {tableHeadings.map((heading) => (
                <th scope="col" key={heading} className="px-6 py-3">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={tableHeadings.length + 1} className="p-8">
                  <Loader />
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && <Pagination tname={tname} />}
    </Box>
  );
};

export default Table;
