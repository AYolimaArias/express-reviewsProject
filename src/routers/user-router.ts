
import express, { Request, Response } from "express";
import { deleteUser } from "../services/user-service";
import { ApiError } from "../middlewares/error";
import { getUsers, updateUser } from "../services/user-service";
import { authenticateHandler } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import { UserParams } from "../models/user";


const userRouter = express.Router();

//GET/users:

userRouter.get(
  "/users",
  authenticateHandler,
  authorize("admin"),
  async (_req, res, next) => {
    try {
      const users = await getUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);
userRouter.get("/", authenticateHandler, async (req, res, next) => {
  try {
    // Verificar si el usuario es administrador
    if (req.userRole !== "admin") {
      return next(new ApiError("Acceso denegado", 403)); // Devolver un error de acceso denegado si no es administrador
    }

    // Si es administrador, obtener la lista de usuarios
    const user = await getUsers();
    res.json({
      ok: true,
      message: "Lista de usuarios",
      data: user,
    });
  } catch (error) {
    next(error); // Pasar cualquier error al middleware de manejo de errores
  }
});

//PATCH/users/{id}
userRouter.patch("/:id", authenticateHandler, async (req, res) => {
  try {
    const { id } = req.params;
    const userData: UserParams = req.body;
    const role = req.userRole;
    if (role !== "admin") {
      return res.status(403).json({
        ok: false,
        error: { message: "Acceso denegado" },
      });
    }
    const userUpdated = await updateUser(Number(id), userData);
    return res.status(200).json({
      ok: true,
      message: "Usuario actualizado exitosamente",
      data: userUpdated,
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return res.status(500).json({
      ok: false,
      error: { message: "Error interno del servidor" },
    });
  }
});

//DELETE/users/{id}:
userRouter.delete(
    "/:id",
    authenticateHandler,
    authorize("admin"),
    async (req:Request, res:Response) => {
      try {
        const { id } = req.params;
        const deleteUsers = await deleteUser(Number(id));
        res.status(200).json(deleteUsers);
      } catch (error) {
        console.log(error);
        res.status(500).json({
          ok: false,
          error: { message: "Error interno del servidor" },
        });
      }
    }
  );

export default userRouter;
