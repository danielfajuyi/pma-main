import React, { useCallback, useEffect } from "react";
import { featuredmodel } from "./featuredmodelAPI";
import Categories from "./categories";
import Models from "./model";
import { useState } from "react";
import { Link } from "react-router-dom";
import SectionHead from "../../../../Components/SectionHead/sectionhead";
import { useDispatch } from "react-redux";
import { makeGet } from "../../../../redux/apiCalls";

const items = featuredmodel;
const allCategories = ["All", ...new Set(items.map((item) => item.category))];

const FeaturedModel = () => {
  const dispatch = useDispatch();

  const [models, setModels] = useState([]);
  const [modelItems, setModelsItems] = useState(models);
  const [
    categories,

    /*setCategories */
  ] = useState(allCategories);

  const filterItems = (category) => {
    if (category === "All") {
      setModelsItems(models);
      return;
    }

    const newItem = models.filter((item) => item.category.includes(category));
    setModelsItems(newItem);
  };

  const fetchModels = useCallback(() => {
    makeGet(dispatch, "model/find/models", setModels);
  }, [dispatch]);

  useEffect(() => {
    let unsubscribe = fetchModels();
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    setModelsItems(models);
  }, [models]);

  return (
    <>
      <div className="container featured-container mtop">
        <SectionHead title="Models" description="Featured" />
        <Categories categories={categories} filterItems={filterItems} />
        <div className="featured-model-wrapper">
          <Models modelItems={modelItems} />
          <Link to="/find-model" className="featured-model-btn btn_shadow">
            Find models
          </Link>
        </div>
      </div>
    </>
  );
};

export default FeaturedModel;
