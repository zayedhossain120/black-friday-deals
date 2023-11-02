/* eslint-disable react/prop-types */
import "./EditHowToUseInput.css";
import placeholder from "../../../../assets/placeholder.svg";

const EditHowToUseInput = ({
  setElements,
  elements,
  element,
  viewImage,
  setViewImage,
}) => {
  const isPhotoUploaded = viewImage?.find((item) => item.id === element.id);

  const handleInputValue = (e) => {
    const updatedArray = elements.map((group) =>
      group.map((item) => {
        if (item.id === e.target.name) {
          console.log(e.target.value);
          return { ...item, content: e.target.value };
        } else {
          return item;
        }
      })
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
      <div>
        <button
          className="howtouse-input-close-button"
          onClick={handleRemoveItem}
        >
          X
        </button>
        {element.type === "h3" ? (
          <input
            onChange={handleInputValue}
            className="title"
            name={element.id}
            value={element.content}
            type="text"
            autoFocus
            placeholder="Type Here..."
            required
          />
        ) : (
          <textarea
            onChange={handleInputValue}
            className="paragraph"
            value={element.content}
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
        <label htmlFor={element.id} className="uploadeds">
          {isPhotoUploaded ? (
            <img src={isPhotoUploaded.url} alt="" />
          ) : element?.photoURL ? (
            <img src={element.photoURL} alt="" />
          ) : (
            <div className="eidt-how-to-use-placeholders">
              <img
                src={placeholder}
                alt=""
                className="eidt-how-to-use-placeholders"
              />
            </div>
          )}
        </label>
      </div>
    );
  }
};

export default EditHowToUseInput;
