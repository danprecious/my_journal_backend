import { Request } from "express";
import prisma from "../prisma/client.js";
import { CreateUser } from "../types/globalTypes.js";
import { catchError } from "../utils/isError.js";



export const findUser = async (email: string) =>  {
    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    })
    return user
}


export const createNewUser = async ({
  email,
  hashedPassword,
  name,
}: CreateUser) => {
  try {
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    return newUser;
  } catch (error) {
    catchError(error, "Error creating new user");
  }
};

export const deleteUser = async (id: string) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return deletedUser;
  } catch (error) {
    catchError(error, "Error deleting user");
  }
};

// export const updateUser = async (id: string) => {
//     try {
//         const updatedUser = await prisma.user.update({
//             where: {
//                 id: id,
//             },
//             data: {

//             }
//         })
//     } catch (error) {

//     }
// }
