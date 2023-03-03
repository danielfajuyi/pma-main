import ImageCard from "../ImageCard/image_card";
import "./previous_jobs.scss";

const PreviousJobs = ({ user }) => {
  return (
    <section id="prev_jobs">
      <div>
        {user?.agency?.jobPhotos.map((photo, index) => (
          <ImageCard photo={photo} />
        ))}
      </div>
    </section>
  );
};

export default PreviousJobs;
