// import cors from "cors";
import * as functions from "firebase-functions";
import UserController from "./controllers/UserController";

const userController = new UserController();

export const getAllUsers =
  functions.https.onCall(userController.getAllUsers.bind(userController));

export const createUser =
  functions.https.onCall(userController.createUser.bind(userController));

export const deleteUser =
  functions.https.onCall(userController.deleteUser.bind(userController));
