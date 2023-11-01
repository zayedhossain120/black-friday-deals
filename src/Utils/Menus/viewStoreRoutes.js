const viewStoreRoutes = (id) => {
  return [
    {
      label: "Deal",
      link: `/store/${id}/deals`,
    },
    {
      label: "Coupon",
      link: `/store/${id}/coupons`,
    },
    {
      label: "Voucher",
      link: `/post/${id}/voucher`,
    },
    {
      label: "Expired",
      link: `/store/${id}/expired`,
    },
    {
      label: "How To Use",
      link: `/store/${id}/howtouse`,
    },
  ];
};

export default viewStoreRoutes;
