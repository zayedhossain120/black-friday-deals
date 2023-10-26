const viewStoreRoutes = (id) => {
  return [
    {
      label: "All",
      link: `/store/${id}/`,
    },
    {
      label: "Coupons",
      link: `/store/${id}/coupons`,
    },
    {
      label: "Deals",
      link: `/store/${id}/deals`,
    },
    {
      label: "Expired",
      link: `/store/${id}/expired`,
    },
    {
      label: "How to use",
      link: `/store/${id}/howtouse`,
    },
  ];
};

export default viewStoreRoutes;
