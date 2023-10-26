/* eslint-disable react/prop-types */
import "./HowToUseAddItemSectionComponent.css";
import h3Icon from "../../assets/Icons/h3Icon.svg";
import pIcon from "../../assets/Icons/pIcon.svg";
import imgIcon from "../../assets/Icons/imgIcon.svg";

const HowToUseAddItemSectionComponent = ({ elements, setElements }) => {
  const handleAddNewItemOnExistingArray = (type) => {
    // get the last element from the last group without changing the array
    const isExistInLast = [...elements[elements.length - 1]]
      .reverse()
      .find((el) => el.type === type);
    const lastId = isExistInLast?.id
      ? Math.max(isExistInLast?.id?.split("-")[2])
      : 0;
    // removing last element
    const lastGroup = elements.pop();
    // adding updated last element
    lastGroup.push({
      type: type,
      id: `${type}-${elements.length}-${lastId + 1}`,
    });
    setElements([...elements, lastGroup]);
  };
  return (
    <div className="how-to-use-content-editor">
      <button
        onClick={() =>
          setElements([
            ...elements,
            [{ type: "h3", id: `h3-${elements.length + 1}` }],
          ])
        }
      >
        <img src={h3Icon} alt="" />
      </button>
      <button onClick={() => handleAddNewItemOnExistingArray("p")}>
        <img src={pIcon} alt="" />
      </button>
      <button onClick={() => handleAddNewItemOnExistingArray("img")}>
        <img src={imgIcon} alt="" />
      </button>
    </div>
  );
};

export default HowToUseAddItemSectionComponent;
