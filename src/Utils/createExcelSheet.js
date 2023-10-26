const formatDateCsv = (dateString) => {
  const options = { year: "numeric", day: "2-digit", month: "2-digit" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const createExcelSheet = (allMembers) => {
  const csvContent =
    "Name,Joining Date,Email,Phone Number,Country\n" +
    allMembers?.data
      ?.map((item) => {
        const name = item?.name || "";
        const createdAt = formatDateCsv(item?.createdAt) || "";
        const email = item?.email || "";
        const phoneNumber = item?.phoneNumber || "";
        const country = item?.country || "";
        return `${name},${createdAt},${email},${phoneNumber},${country}`;
      })
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "all_members_data.csv");

  link.click();

  URL.revokeObjectURL(url);
};
export default createExcelSheet;
