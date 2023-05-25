import VideItem from "./VideoItem";
import { ViewBtn } from "./Buttons";

function ModelVideo({
  videos,
  activeDisplay,
  displayLimit,
  handleDisplay,
  viewAll,
  fetchModel,
  item,
}) {
  return (
    <section className="section section-profile video-section">
      <ul className="videoList" style={{alignItems:'center', justifyContent:'center'}}>
        {videos.map((video, index) =>
          activeDisplay !== "videos" ? (
            index <= displayLimit - 1 && (
              <VideItem
                key={index}
                video={video}
                fetchModel={fetchModel}
                item={item}
              />
            )
          ) : activeDisplay === "videos" && !viewAll ? (
            index <= displayLimit - 1 && (
              <VideItem
                key={index}
                video={video}
                fetchModel={fetchModel}
                item={item}
              />
            )
          ) : (
            <VideItem
              key={index}
              video={video}
              fetchModel={fetchModel}
              item={item}
            />
          )
        )}
      </ul>

      {/* No video posted yet */}
      <p
        style={{ display: videos.length > 0 && "none" }}
        className="empty-content-text"
      >
        Sorry, Model is yet to post a Video.
      </p>

      {/* video display btn section */}
      {videos.length > displayLimit && (
        <ViewBtn
          id="videos"
          handleDisplay={handleDisplay}
          btnText={
            activeDisplay === "videos" && viewAll ? "view Less" : "view All"
          }
        />
      )}
    </section>
  );
}

export default ModelVideo;
