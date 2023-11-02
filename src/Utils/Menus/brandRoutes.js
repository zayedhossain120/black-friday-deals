const brandRoutes = (id) => {
    return [
      {
        label: "Deal",
        link: `/brand/${id}/deals`,
      },
      {
        label: "Coupon",
        link: `/brand/${id}/coupons`,
      },
      {
        label: "Voucher",
        link: `/brand/${id}/voucher`,
      },
      {
        label: "Expired",
        link: `/brand/${id}/expired`,
      }
    ];
  };
  
  export default brandRoutes;
  