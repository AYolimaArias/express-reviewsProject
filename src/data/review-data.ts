import { query } from "../db/index";
import { Review, ReviewParams } from "../models/review";
import { UpdateReviewParams } from "../models/user";

//GET
export async function getAllReviewsDb() {
  const result = await query("SELECT * FROM reviews");
  return result.rows;
}

//POST
export async function createReviewRestaurantDb(review: Review) {
  const { userId, restaurantId, score, title, description } = review;
  const result = await query(
    "INSERT INTO reviews (userid, restaurantid, score, title, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [userId, restaurantId, score, title, description]
  );
  return result.rows[0];
}

//DELETE
export async function deleteReviewDb(id: number) {
  const result = await query("DELETE FROM reviews WHERE id = $1", [id]);
  if (result.rowCount === 0) {
    return { ok: false, message: "El review no existe" };
  }

  return { ok: true, message: "Reseña eliminada exitosamente"};
}


//GET ID REVIEW
export async function getReviewIdDb(id: number) {
  const result = await query("SELECT * FROM reviews WHERE id = $1", [id]);
  return result.rows[0];
}

//PATCH
export async function editReview({
  id,
  fieldsToUpdate,
}: UpdateReviewParams): Promise<ReviewParams> {
  if (!id || Object.keys(fieldsToUpdate).length === 0) {
    throw new Error("No se proporcionaron datos para actualizar");
  }
  const entries = Object.entries(fieldsToUpdate);
  const setClauses = entries.map(([key, _], index) => `${key} = $${index + 1}`);
  const updateQuery = `UPDATE reviews SET ${setClauses.join(
    ", "
  )} WHERE id = $${entries.length + 1} RETURNING *`;

  const params = [...entries.map(([_, value]) => value), id];
  const result = await query(updateQuery, params);

  return result.rows[0];
}