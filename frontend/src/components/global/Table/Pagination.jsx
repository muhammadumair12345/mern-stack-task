import { useQueryClient } from "@tanstack/react-query";
import { useQueryString } from "../../../hooks/useQueryString";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

const Pagination = ({ tname }) => {
  const queryClient = useQueryClient();
  const searchParams = useQueryString();
  const params = searchParams.getAll();
  const queryCache = queryClient.getQueryData([tname, params]);
  const { currentPage, limit, totalItems } = queryCache?.data?.data;
  const page = currentPage;

  const handleChangePage = (newPage) => {
    searchParams.set({ name: "page", value: newPage.toString() });
  };

  const handleChangeRowsPerPage = (event) => {
    const limit = event.target.value.toString();

    searchParams.set([
      {
        name: "limit",
        value: limit,
      },
      {
        name: "page",
        value: page,
      },
    ]);
  };

  return (
    <div className="flex gap-4 items-center justify-center w-full">
      <div className="flex gap-2">
        <label htmlFor="limit">Rows per page:</label>
        <select
          id="limit"
          value={limit}
          onChange={handleChangeRowsPerPage}
          className="border rounded p-1 w-20"
        >
          <option value={"all"}>All</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="flex gap-2 items-center">
        <span>
          {(page - 1) * limit + 1}-{Math.min(page * limit, totalItems)} of{" "}
          {totalItems}
        </span>
        <div className="flex gap-2 items-center">
          <button disabled={page === 1} onClick={() => handleChangePage(1)}>
            <FaAngleDoubleLeft className="h-5 w-5 text-gray-500" />
          </button>

          <button
            disabled={page === 1}
            onClick={() => handleChangePage(page - 1)}
          >
            <FaAngleLeft className="h-5 w-5 text-gray-500" />
          </button>

          <button
            disabled={page === Math.ceil(totalItems / limit)}
            onClick={() => handleChangePage(page + 1)}
          >
            <FaAngleRight className="h-5 w-5 text-gray-500" />
          </button>

          <button
            disabled={page === Math.ceil(totalItems / limit)}
            onClick={() => handleChangePage(totalItems / limit)}
          >
            <FaAngleDoubleRight className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
