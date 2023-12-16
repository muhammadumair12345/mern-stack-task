export const paginateAndFilter = async ({
  model,
  query,
  filter = {},
  populate,
  select,
}) => {
  let page = parseInt(query.page) || 1;
  let totalItems = await model.countDocuments(filter);
  const limit =
    query.limit === "all" ? totalItems : parseInt(query.limit) || totalItems;
  let skip = (page - 1) * limit;
  const sortBy = query.sortBy || "-_id";
  const searchParam = query.searchParam;
  const filterBy = query.filterBy || "name";

  if (searchParam) {
    filter[filterBy] = new RegExp(searchParam, "i");
    if (!page === false) {
      page = 1;
      skip = (page - 1) * limit;
    }
  }

  totalItems = await model.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / limit);

  const data = await model
    .find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sortBy)
    .select(select)
    .populate(populate);
  return {
    totalItems,
    totalPages,
    currentPage: page,
    limit,
    items: data,
  };
};
