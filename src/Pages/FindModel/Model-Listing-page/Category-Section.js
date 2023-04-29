import Sectionhead from "../../../Components/SectionHead/sectionhead";

const CategoryItems = [
  {
    id: 1,
    img: "./images/model-category/runway.jpg",
    category: "Runway",
  },

  {
    id: 2,
    img: "./images/model-category/child1.jpeg",
    category: "Child",
  },

  {
    id: 3,
    img: "./images/model-category/fashion3.jpeg",
    category: "Fashion",
  },

  {
    id: 4,
    img: "./images/model-category/commercial2.jpeg",
    category: "Commercial",
  },

  {
    id: 5,
    img: "./images/model-category/commercial.jpg",
    category: "Plus Size",
  },
];

const CategoryItemsSlider = () => {
  return (
    <article className="categories-wrapper">
      {CategoryItems &&
        CategoryItems.map(({ id, img, category }) => {
          return (
            <div key={id} className="categories-slide">
              <div className="categories-item">
                <img src={img} alt={category} />
                <span>{category}</span>
              </div>
            </div>
          );
        })}
    </article>
  );
};

function Categories() {
  return (
    <section className="category-section container">
      <Sectionhead
        title=" Categories"
        description="Modelling"
        id="category-heading"
      />
      <CategoryItemsSlider />
    </section>
  );
}

export default Categories;
