const apiConfig = {
  pokemon: {
    baseURL: "/",
    endpoints: {
      getById: (id: string) => `${id}`,
      getWithPagination: (limit: number, offset: number) =>
        `?limit=${limit}&offset=${offset}`,
    },
  },
};

export default apiConfig;
