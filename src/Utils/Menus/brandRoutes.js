const brandRoutes = (id) => {
    return [
      {
        label: "Deal",
        link: `/brands/${id}/deal`,
      },
      {
        label: "Coupon",
        link: `/brands/${id}/coupon`,
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
  