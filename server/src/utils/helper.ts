const preparePagination = (limit: number, offset: number) => {
  const nextOffset = offset + limit;
  const pagination = {
    next: `${process.env.BASE_URL}/get-pokemon?limit=${limit}&offset=${nextOffset}`,
    previous:
      offset > 0
        ? `${process.env.BASE_URL}/get-pokemon?limit=${limit}&offset=${
            offset - limit
          }`
        : null,
  };
  return pagination;
};
export { preparePagination };
