import { useLoaderData } from "react-router-dom";
import "./ViewStoreOutletHowToUse.css";

const ViewStoreOutletHowToUse = () => {
  const store = useLoaderData();

  {
    if (!store?.data?.howToUse?.length) {
      return <p className="text-center">Nothing to show!</p>;
    } else {
      return (
        <div className="view-store-outlet-howtouse-container">
          {store?.data?.howToUse?.map((section) =>
            section?.map((element) => {
              if (element?.type === "h3") {
                return <h1 key={element?.id}>{element?.content}</h1>;
              } else if (element?.type === "p") {
                return <p key={element?.id}>{element?.content}</p>;
              } else if (element?.type === "img") {
                return (
                  <img
                    key={element?.id}
                    src={element?.storePhotoURL}
                    alt={element?.content}
                    height={200}
                    width={400}
                  />
                );
              }
            })
          )}
        </div>
      );
    }
  }
};

export default ViewStoreOutletHowToUse;
