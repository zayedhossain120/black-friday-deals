const brandRoutes = (id) => {
    return [
      {
        label: "Deal",
        link: `/brands/${id}/deals`,
      },
      {
        label: "Coupon",
        link: `/brands/${id}/coupons`,
      },
      {
        label: "Voucher",
        link: `/brands/${id}/voucher`,
      },
      {
        label: "Expired",
        link: `/brands/${id}/expired`,
      }
    ];
  };
  
  export default brandRoutes;
  