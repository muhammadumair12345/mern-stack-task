import { useForm } from "react-hook-form";
import Input from "../Input";
import { useQueryString } from "../../../hooks/useQueryString";

const Search = () => {
  const { register } = useForm();
  const searchParams = useQueryString();

  const handleSearch = (event) => {
    searchParams.set({ name: "searchParam", value: event.target.value });
  };

  return (
    <Input
      name={"searchParam"}
      attributes={{ onChange: handleSearch }}
      register={register}
      placeholder={"Search..."}
    />
  );
};

export default Search;
