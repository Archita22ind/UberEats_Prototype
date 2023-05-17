import { Container } from "react-bootstrap";
import React, { useEffect } from "react";
import RestaurantList from "../customer/restaurantList.js";
import { getFavoriteRestaurants } from "./favoritesRequests";
import { useDispatch } from "react-redux";
import { reduxConstants } from "../constants/reduxConstants.js";

const Favorites = (props) => {
  const dispatch = useDispatch();

  const populateFavoriteRestaurants = async () => {
    const favoritesData = await getFavoriteRestaurants();

    let restList = favoritesData.map((d) => {
      return {
        ...d,
        isLiked: true,
        imagePreview: d.image,
      };
    });

    dispatch({ type: reduxConstants.RESTAURANT_LIST, restList });
  };

  useEffect(() => {
    populateFavoriteRestaurants();
  }, []);

  return (
    <Container>
      <h1>Favorite Restaurants</h1>
      <RestaurantList getFavoriteRestaurants={getFavoriteRestaurants} />
    </Container>
  );
};

export default Favorites;
