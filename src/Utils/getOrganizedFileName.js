const getOrganizedFileName = (file) => {
  const fileName = file?.name?.split(".");
  const ext = fileName.pop();
  const fileNewName = fileName
    ?.join("-")
    ?.concat("-")
    ?.concat(new Date().getTime())
    ?.concat("." + ext);

  return fileNewName;
};

export default getOrganizedFileName;
