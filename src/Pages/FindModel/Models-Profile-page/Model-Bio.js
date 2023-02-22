function ModelBio({ item }) {
  return (
    <section className="section bio-section">
      <p className="bio__text">{item?.bio || item?.model?.bio}</p>
    </section>
  );
}

export default ModelBio;
