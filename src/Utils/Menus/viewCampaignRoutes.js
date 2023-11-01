const viewCampaignRoutes = (id) => {
    return [
        {
            label: "Deal",
            link: `/campaign/${id}/deals`
        },
        {
            label: "Coupon",
            link: `/campaign/${id}/coupon`
        },
        {
            label: "Voucher",
            link: `/campaign/${id}/voucher`
        },
        {
            label: "Expired",
            link: `/campaign/${id}/expired`
        },
    ];
};

export default viewCampaignRoutes;