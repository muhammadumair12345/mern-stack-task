const Main = ({ children }) => {
  return (
    <main className="p-4 md:ml-64 pt-20 ">
      <section className="mx-auto py-4 w-full lg:w-[75%]">{children}</section>
    </main>
  );
};

export default Main;
