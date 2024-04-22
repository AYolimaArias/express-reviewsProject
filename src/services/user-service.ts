
import { User, UserParams } from "../models/user";
import * as userDB from "../data/user-data";

// GET/users:
export async function getUsers(): Promise<User[]> {
 return await userDB.getUsers();
 }

//PATCH/users/{id}:
export async function updateUser(
  id: number,
  user: UserParams
) {
  const dataUser = {
    id,
    fieldsToUpdate: user,
  };
  const createUser: UserParams = await userDB.editUser(
    dataUser
  );
  return createUser;
}

//DELETE/users/{id}:

export async function deleteUser(id: number) {
    const user = await userDB.deleteUserDb(id);
    console.log(user);
    return user;
  }


