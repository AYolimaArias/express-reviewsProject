
import { query } from "../db";
import { User, UpdateUserParams, UserParams } from "../models/user";
import bcrypt from "bcrypt";

// GET/user:
export async function getUsers(): Promise<User[]> {
  return (await query("SELECT * FROM users")).rows;
}
//PATCH/user/{id}
export async function editUser({
  id,
  fieldsToUpdate,
}: UpdateUserParams): Promise<UserParams> {
  if (!id || Object.keys(fieldsToUpdate).length === 0) {
    throw new Error("No se proporcionaron datos para actualizar");
  }

  // Verificar si se está actualizando la contraseña
  if (fieldsToUpdate["password"]) {
    // Encriptar la nueva contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(fieldsToUpdate["password"], 10);
    fieldsToUpdate["password"] = hashedPassword; // Reemplazar la contraseña sin encriptar por la encriptada
  }

  const entries = Object.entries(fieldsToUpdate);
  const setClauses = entries.map(([key, _], index) => `${key} = $${index + 1}`);
  const updateQuery = `UPDATE users SET ${setClauses.join(", ")} WHERE id = $${
    entries.length + 1
  } RETURNING *`;

  const params = [...entries.map(([, value]) => value), id];
  const result = await query(updateQuery, params);

  return result.rows[0]; // Devuelve el usuario actualizado
}

// DELETE/users/{id}:
export async function deleteUserDb(id: number) {
    const result = await query("DELETE FROM users WHERE id = $1", [id]);
  
    if (result.rowCount === 0) {
      return { ok: false, message: "El user no existe" };
    }
  
    return { ok: true, message: "Usuario eliminado exitosamente" };
  }


