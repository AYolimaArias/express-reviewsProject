import { deleteReviewDb, editReview, getReviewIdDb } from "../data/review-data";
import { ReviewParams } from "../models/review";

//DELETE/reviews/{id}
export async function deleteReview(id: number) {
    const review = await deleteReviewDb(id);
    console.log(review);
    return review;
}

//GET ID REVIEW
export async function getReviewId(id: number) {
    const reviewId = await getReviewIdDb(id);
    return reviewId;
}

//PATCH/reviews/{id}
export async function updateReview(
    id: number,
    review: ReviewParams
  ) {
    const dataRestaurant = {
      id,
      fieldsToUpdate: review,
    };
    const createRestaurant: ReviewParams = await editReview(
      dataRestaurant
    );
    return createRestaurant;
  }