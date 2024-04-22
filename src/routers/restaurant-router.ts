import express from "express";
import {
  createRestaurant,
  createReviewRestaurant,
  deleteRestaurant,
  getAllRestaurants,
  getAllReviews,
  updateRestaurant,
} from "../services/restaurant-service";
import { RestaurantParams } from "../models/restaurant";
import { authenticateHandler } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
// import { validateCredentials } from "../services/auth-service";

const restaurantRouter = express.Router();

//GET/restaurants:
restaurantRouter.get("/", async (_req, res) => {
  try {
    const restaurantData = await getAllRestaurants();
    res.status(200).json({
      ok: true,
      message: "Listado de restaurantes",
      data: restaurantData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error: { message: "Error al obtener los restaurantes" },
    });
  }
});

//POST
restaurantRouter.post(
  "/",
  authenticateHandler,
  authorize("admin", "user"),
  async (req, res) => {
    try {
      const restaurantData: RestaurantParams = req.body;
      const newRestaurant = await createRestaurant(restaurantData);
      res.status(201).json({
        ok: true,
        message: "Restaurante creado exitosamente",
        data: newRestaurant,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        error: { message: "Restaurante al crear el restaurante" },
      });
    }
  }
);

//PATCH/restaurants/{id}:
restaurantRouter.patch(
  "/:id",
  authenticateHandler,
  authorize("admin", "user"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const restaurantData: RestaurantParams = req.body;
      const restaurantUpdated = await updateRestaurant(
        Number(id),
        restaurantData
      );
      res.status(200).json({
        ok: true,
        message: "Restaurante actualizado exitosamente",
        data: restaurantUpdated,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        error: { message: "Error interno del servidor" },
      });
    }
  }
);

//DELETE/restaurants/{id}:

restaurantRouter.delete(
  "/:id",
  authenticateHandler,
  authorize("admin", "user"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const restaurantDeleted = await deleteRestaurant(Number(id));
      res.status(200).json(restaurantDeleted);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        error: { message: "Error interno del servidor" },
      });
    }
  }
);

//GET/restaurants/{id}/reviews:

restaurantRouter.get("/:id/reviews", async (_req, res) => {
  try {
    const reviewsData = await getAllReviews();
    res.status(200).json({
      ok: true,
      message: "Listado de reseñas para restaurante",
      data: reviewsData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error: { message: "Error al obtener las reseñas" },
    });
  }
});

//POST/restaurants/{id}/reviews:
restaurantRouter.post(
  "/:id/reviews",
  authenticateHandler,
  authorize("admin", "user"),
  async (req, res) => {
    try {
      const userId = req.userId;
      const { id } = req.params;
      const reviewData = req.body;
      const review = {
        ...reviewData,
        restaurantId: Number(id),
        userId: Number(userId),
      };
      const reviewRestaurant = await createReviewRestaurant(review);
      res.status(201).json({
        ok: true,
        message: "Reseña añadida exitosamente",
        data: reviewRestaurant,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        error: { message: "Reseña no se agrego" },
      });
    }
  }
);

export default restaurantRouter;
