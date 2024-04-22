import {
  createRestaurantDb,
  deleteRestaurantDb,
  editRestaurant,
  getAllRestaurantsDb,
} from "../data/restaurant-data";
import { createReviewRestaurantDb, getAllReviewsDb } from "../data/review-data";
import { RestaurantParams } from "../models/restaurant";
import { Review } from "../models/review";

//GET
export async function getAllRestaurants() {
  const result = await getAllRestaurantsDb();
  return result;
}

//POST
export async function createRestaurant(restaurant: RestaurantParams) {
  const createRestaurant: RestaurantParams = await createRestaurantDb(
    restaurant
  );
  return createRestaurant;
}

//PATCH
export async function updateRestaurant(
  id: number,
  restaurant: RestaurantParams
) {
  const dataRestaurant = {
    id,
    fieldsToUpdate: restaurant,
  };
  const createRestaurant: RestaurantParams = await editRestaurant(
    dataRestaurant
  );
  return createRestaurant;
}

//DELETE
export async function deleteRestaurant(id: number) {
  const restaurant = await deleteRestaurantDb(id);
  console.log(restaurant);
  return restaurant;
}

//GET/restaurants/{id}/reviews:
export async function getAllReviews() {
  const result = await getAllReviewsDb();
  return result;
}

//POST/restaurants/{id}reviews:
export async function createReviewRestaurant(dataReview: Review) {
  const result = await createReviewRestaurantDb(dataReview);
  console.log(result);
  return result;
}
