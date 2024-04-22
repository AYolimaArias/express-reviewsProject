import express from "express";
import { deleteReview, getReviewId, updateReview } from "../services/review-service";
import { authenticateHandler } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import { ReviewParams } from "../models/review";

const reviewRouter = express.Router();

//PATCH/reviews/{id}:
reviewRouter.patch(
  "/:id",
  authenticateHandler,
  authorize("admin", "user"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const reviewId = Number(id);
      const role = req.userRole;
      const userid = req.userId;
      if (role === "admin") {
        const reviewData: ReviewParams = req.body;
        const restaurantUpdated = await updateReview(
          Number(id),
          reviewData
        );
        res.status(200).json({
          ok: true,
          message: "Restaurante actualizado exitosamente",
          data: restaurantUpdated,
        });
      } else if (role === "user") {
        const review = await getReviewId(reviewId);
        if (review && review.userId === userid) {
          const reviewData: ReviewParams = req.body;
          const restaurantUpdated = await updateReview(
            Number(id),
            reviewData
          );
          res.status(200).json(restaurantUpdated);
          return;
        } else {
          res.status(401).json({
            ok: false,
            error: { message: "No autorizado" },
          });
        }
      } else {
        res.status(401).json({
          ok: false,
          error: { message: "No autorizado" },
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        error: { message: "Error interno del servidor" },
      });
    }
  }
);

//DELETE/reviews/{id}:
reviewRouter.delete(
  "/:id",
  authenticateHandler,
  authorize("admin", "user"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const reviewId = Number(id);
      const userid = req.userId;
      const role = req.userRole;

      if (role === "admin") {
        const reviewDeleted = await deleteReview(reviewId);
        res.status(200).json(reviewDeleted);
        return;
      } else if (role === "user") {
        const review = await getReviewId(reviewId);
        if (review && review.userId === userid) {
          const reviewDeleted = await deleteReview(reviewId);
          res.status(200).json(reviewDeleted);
          return;
        } else {
          res.status(401).json({
            ok: false,
            error: { message: "No autorizado" },
          });
        }
      } else {
        res.status(401).json({
          ok: false,
          error: { message: "No autorizado" },
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        error: { message: "Error interno del servidor" },
      });
    }
  }
);

export default reviewRouter;
