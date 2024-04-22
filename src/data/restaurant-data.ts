
// import { query }  from "express";
import { query } from "../db/index";
import { RestaurantParams, UpdateRestaurantParams } from "../models/restaurant";

//GET
export async function getAllRestaurantsDb() {
  const result = await query("SELECT * FROM restaurants");
  return result.rows;
}

//POST
export async function createRestaurantDb(restaurant: RestaurantParams) {
  const { name, address, category } = restaurant;
  const result = await query(
    "INSERT INTO restaurants (name, address, category) VALUES ($1, $2, $3) RETURNING *",
    [name, address, category]
  );
  return result.rows[0];
}

//PATCH
export async function editRestaurant({
  id,
  fieldsToUpdate,
}: UpdateRestaurantParams): Promise<RestaurantParams> {
  if (!id || Object.keys(fieldsToUpdate).length === 0) {
    throw new Error("No se proporcionaron datos para actualizar");
  }
  const entries = Object.entries(fieldsToUpdate);
  const setClauses = entries.map(([key, _], index) => `${key} = $${index + 1}`);
  const updateQuery = `UPDATE restaurants SET ${setClauses.join(
    ", "
  )} WHERE id = $${entries.length + 1} RETURNING *`;

  const params = [...entries.map(([_, value]) => value), id];
  const result = await query(updateQuery, params);

  return result.rows[0];
}

//DELETE
export async function deleteRestaurantDb(id: number) {
  const result = await query("DELETE FROM restaurants WHERE id = $1", [id]);

  if (result.rowCount === 0) {
    return { ok: false, message: "La nota no existe" };
  }

  return { ok: true, message: "Restaurante eliminado exitosamente" };
}

