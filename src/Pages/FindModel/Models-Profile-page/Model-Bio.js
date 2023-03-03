function ModelBio({ item }) {
  return (
    <section
      className="section section-profile bio-section"
      style={{ position: "relative" }}
    >
      <p className="bio__text">{item?.bio || item?.model?.bio}</p>
    </section>
  );
}

export default ModelBio;
