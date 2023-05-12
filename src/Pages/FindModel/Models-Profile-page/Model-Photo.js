import ImgItem from "./ImgItem";
import { ViewBtn } from "./Buttons";

function ModelPhoto({
  photos,
  activeDisplay,
  displayLimit,
  handleDisplay,
  viewAll,
  fetchModel,
  item
}) {
  return (
    <section className="section  section-profile photo-section">
      {/* photo display section */}
      <ul className="imgList">
        {photos?.map((photo, index) =>
          activeDisplay !== "photos" ? (
            index <= displayLimit - 1 && (
              <ImgItem key={index} img={photo} fetchModel={fetchModel} item={item} />
            )
          ) : activeDisplay === "photos" && !viewAll ? (
            index <= displayLimit - 1 && (
              <ImgItem key={index} img={photo} fetchModel={fetchModel} item={item} />
            )
          ) : (
            <ImgItem key={index} img={photo} fetchModel={fetchModel} item={item} />
          )
        )}
      </ul>

      {/* No photo posted yet */}
      <div
        style={{ display: photos?.length > 0 && "none" }}
        className="empty-content-text"
      >
        Sorry, Model is yet to post a Photo.
      </div>

      {/* photo display btn section */}
      {photos?.length > displayLimit && (
        <ViewBtn
          id="photos"
          handleDisplay={handleDisplay}
          btnText={
            activeDisplay === "photos" && viewAll ? "view Less" : "view All"
          }
        />
      )}
    </section>
  );
}

export default ModelPhoto;
