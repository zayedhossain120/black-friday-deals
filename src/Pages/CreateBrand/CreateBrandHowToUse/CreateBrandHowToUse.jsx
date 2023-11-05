import { useState } from "react";
import okIcon from "../../../assets/Icons/okIcon.svg";
import "./CreateBrandHowToUse.css";
import { useNavigate, useParams } from "react-router-dom";
import HowToUseAddItemSectionComponent from "../../../Components/HowToUseAddItemsSectionComponent/HowToUseAddItemSectionComponent";
import HowToUseInput from "../../../Components/HowToUseInput/HowToUseInput";
import useSubmitPhotoAtFirebase from "../../../Utils/useSubmitPhotoAtFirebase";
import { updateData } from "../../../Utils/updateData";
import TopBar from "../../../Components/TopBar/TopBar";
import { Spin } from "antd";

const CreateBrandHowToUse = () => {
  const { postPhotoAtFirebase } = useSubmitPhotoAtFirebase();
  const { id } = useParams();
  const navigate = useNavigate();
  const [elements, setElements] = useState([[{ type: "h3", id: "h3-1" }]]);
  const [viewImage, setViewImage] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      return;
    }
    setSubmitting(true);
    const imgHostedUrls = await Promise.all(
      viewImage.map(async (image) => {
        const { files, ...rest } = image;
        return {
          ...rest,
          photoURL: await postPhotoAtFirebase(files).then((data) => data),
        };
      })
    );
    // remove and add item to the same index
    imgHostedUrls.forEach((hostedUrl) => {
      elements.map((group) => {
        const isExist = group.findIndex(
          (element) => element.id === hostedUrl.id
        );
        if (isExist !== -1) {
          group.splice(isExist, 1, hostedUrl);
        }
      });
    });
    // filtering to remove empty arrays
    setElements(elements.filter((group) => group.length));

    updateData(`brands/${id}`, { howToUse: elements });
    navigate("/brands");
    setSubmitting(false);
  };

  return (
    <div>
      <TopBar />
      <main className="edit-store-main">
        <section>
          <div className="edit-store-header">
            <h3>Add How to Use</h3>
            <div className="edit-store-img">
              <div className="edit-store-img-green1">
                <img src={okIcon} alt="Edit store processing" />
                <p>New Brand details</p>
              </div>

              <div className="edit-store-img-gray2">
                <img src={okIcon} alt="Edit store processing" />
                <p>How to use</p>
              </div>
            </div>
          </div>

          {/* How to use  form */}
          <Spin spinning={submitting}>
            <form onSubmit={handleSubmit} className="add-how-to-use-form">
              {elements.map((group) => {
                return group.map((element, i) => {
                  if (element.type === "h3") {
                    return (
                      <HowToUseInput
                        key={i}
                        elements={elements}
                        element={element}
                        setElements={setElements}
                      />
                    );
                  } else if (element.type === "p") {
                    return (
                      <HowToUseInput
                        key={i}
                        elements={elements}
                        element={element}
                        setElements={setElements}
                      />
                    );
                  } else if (element.type === "img") {
                    return (
                      <HowToUseInput
                        key={i}
                        elements={elements}
                        element={element}
                        setElements={setElements}
                        viewImage={viewImage}
                        setViewImage={setViewImage}
                      />
                    );
                  }
                });
              })}
              <button type="submit" className="howtouse-next-button">
                Submit
              </button>
            </form>
          </Spin>
          {/* add eachItem buttons */}
          <div className="how-to-use-item-section-components">
            {" "}
            <HowToUseAddItemSectionComponent
              elements={elements}
              setElements={setElements}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default CreateBrandHowToUse;
