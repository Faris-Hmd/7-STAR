const getImageUrl = (e, setImgsUrl) => {
  const { files } = e.target;
  // console.log(files.length);
  for (let index = 0; index < files.length; index++) {
    setImgsUrl((prevImg) => [
      ...prevImg,
      {
        url: URL.createObjectURL(files[index]),
        productImgFile: files[index],
      },
    ]);
  }
};
