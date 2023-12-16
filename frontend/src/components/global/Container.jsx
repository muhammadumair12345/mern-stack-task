import Box from "./Box";

const Container = ({ title, children, className }) => {
  return (
    <div className={`${className} flex flex-col gap-8`}>
      <h1 className={`text-2xl font-bold text-primary`}>{title}</h1>
      <Box className="p-4 shadow-md">{children}</Box>
    </div>
  );
};

export default Container;
