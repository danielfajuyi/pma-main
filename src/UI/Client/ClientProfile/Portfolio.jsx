import "../ClientProfile/portfolio.css";

const Portfolio = ({ user }) => {
  console.log(user);

  return (
    <div className="imgs">
      {user?.client?.jobPhotos?.map((imgs) => (
        <img src={imgs} alt="" />
      ))}
    </div>
  );
};

export default Portfolio;
