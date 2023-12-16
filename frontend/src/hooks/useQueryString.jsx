import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export const useQueryString = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  searchParams.set = (queries) => {
    if (!Array.isArray(queries)) {
      queries = [queries];
    }

    queries.forEach(({ name, value }) => {
      if (value === "") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
    });
    navigate(`${pathname}?${params.toString()}`);
  };

  searchParams.getAll = () => {
    const keyValuePairs = {};
    for (const pair of params.entries()) {
      const [key, value] = pair;
      keyValuePairs[key] = value;
    }
    return keyValuePairs;
  };

  return searchParams;
};
