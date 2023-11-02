import "./EditBrandHowToUse.css";
import { useLayoutEffect, useState } from "react";
import okIcon from "../../../assets/Icons/okIcon.svg";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import HowToUseAddItemSectionComponent from "../../../Components/HowToUseAddItemsSectionComponent/HowToUseAddItemSectionComponent";

import useSubmitPhotoAtFirebase from "../../../Utils/useSubmitPhotoAtFirebase";
import { updateData } from "../../../Utils/updateData";
import EditHowToUseInput from "./EditHowToUseInput/EditHowToUseInput";
import TopBar from "../../../Components/TopBar/TopBar";
import { Spin } from "antd";

const EditBrandHowToUse = () => {
  const { postPhotoAtFirebase, progress } = useSubmitPhotoAtFirebase();
  const navigate = useNavigate();
  const { id } = useParams();
  const storeData = useLoaderData();
  const [elements, setElements] = useState([[{ type: "h3", id: "h3-1" }]]);
  const [viewImage, setViewImage] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useLayoutEffect(() => {
    setElements(storeData?.data?.howToUse);
  }, [storeData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      return;
    }
    setSubmitting(true);

    const imgHostedUrls = await Promise.all(
      viewImage?.map(async (image) => {
        const { files, ...rest } = image;
        return {
          ...rest,
          photoURL: await postPhotoAtFirebase(files).then((data) => data),
        };
      })
    );
    // remove and add item to the same index
    imgHostedUrls.forEach((hostedUrl) => {
      elements?.map((group) => {
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

    updateData(`brand/${id}`, { howToUse: elements });
    navigate(`/brand/${id}`);
    setSubmitting(false);
  };

  return (
    <div>
      <TopBar />
      <main className="edit-store-main">
        <section>
          <div className="edit-store-header">
            <h3>
              Edit How to Use for store:{" "}
              <strong>{storeData?.data?.storeName}</strong>
            </h3>
            <div className="edit-store-img">
              <div className="edit-store-img-green3">
                <img src={okIcon} alt="Edit store processing" />
                <p>New store details</p>
              </div>

              <div className="edit-store-img-gray4">
                <img src={okIcon} alt="Edit store processing" />
                <p>How to use</p>
              </div>
            </div>
          </div>

          {/* How to use  form */}

          <Spin spinning={submitting}>
            <form onSubmit={handleSubmit} className="add-edit-how-to-use-form">
              {elements?.map((group) => {
                return group?.map((element, i) => {
                  if (element.type === "h3") {
                    return (
                      <EditHowToUseInput
                        key={i}
                        elements={elements}
                        element={element}
                        setElements={setElements}
                      />
                    );
                  } else if (element.type === "p") {
                    return (
                      <EditHowToUseInput
                        key={i}
                        elements={elements}
                        element={element}
                        setElements={setElements}
                      />
                    );
                  } else if (element.type === "img") {
                    return (
                      <EditHowToUseInput
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

export default EditBrandHowToUse;
