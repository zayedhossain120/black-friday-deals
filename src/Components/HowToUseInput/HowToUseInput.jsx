/* eslint-disable react/prop-types */
import "./HowToUseInput.css";
import uploadImages from "../../assets/Icons/uploadImages.svg";

const HowToUseInput = ({
  setElements,
  elements,
  element,
  viewImage,
  setViewImage,
}) => {
  const isPhotoUploaded = viewImage?.find((item) => item.id === element.id);
  const handleInputValue = (e) => {
    const updatedArray = elements.map((group) =>
      group.map((item) =>
        item.id === e.target.name ? { ...item, content: e.target.value } : item
      )
    );
    setElements(updatedArray);
  };

  const handleRemoveItem = () => {
    const updatedArray = elements.map((group) =>
      group.filter((item) => item.id !== element.id)
    );
    setElements(updatedArray);
    if (element.type === "img") {
      const updatedImgArray = viewImage.filter(
        (item) => item.id !== element.id
      );
      setViewImage(updatedImgArray);
    }
  };

  const handleImageShow = (e) => {
    if (e.target.files && e.target.files[0]) {
      const isExist = viewImage.findIndex((item) => item.id === e.target.name);
      if (isExist !== -1) {
        viewImage.splice(isExist, 1);
      }
      setViewImage([
        ...viewImage,
        {
          ...element,
          url: URL.createObjectURL(e.target.files[0]),
          files: e.target.files[0],
        },
      ]);
    }
  };

  if (element.type !== "img") {
    return (
      <div className="add-how-to-use-input">
        <button
          className="howtouse-input-close-button"
          onClick={handleRemoveItem}
        >
          X
        </button>
        {element.type === "h3" ? (
          <input
            onKeyUp={handleInputValue}
            className="title"
            name={element.id}
            type="text"
            autoFocus
            placeholder="Type Here..."
            required
          />
        ) : (
          <textarea
            onKeyUp={handleInputValue}
            className="paragraph"
            name={element.id}
            type="text"
            autoFocus
            placeholder="Type Here..."
            required
          />
        )}
      </div>
    );
  } else {
    return (
      <div className="howtouse-image-input">
        <button
          className="howtouse-input-close-button"
          onClick={handleRemoveItem}
        >
          X
        </button>

        <input
          accept="image/*"
          type="file"
          id={element.id}
          name={element.id}
          onChange={handleImageShow}
        />
        <label htmlFor={element.id} className="uploaded">
          {isPhotoUploaded ? (
            <img src={isPhotoUploaded.url} alt="" />
          ) : (
            <img
              className="placeholder-for-howtouse"
              src={uploadImages}
              alt=""
            />
          )}
        </label>
      </div>
    );
  }
};

export default HowToUseInput;
