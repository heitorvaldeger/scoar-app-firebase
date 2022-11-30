/* eslint-disable max-len */
import {IUserModel} from "../interfaces/IUserModel";
import {UserService} from "../services/UserService";

import * as functions from "firebase-functions";

class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return users;
  }

  async createUser(userModel: IUserModel) {
    const userExists = await this.userService.userExists(userModel.email);
    if (userExists) {
      throw new functions.https.HttpsError("already-exists", "O e-mail fornecido já está em uso.");
    }
    const userResult = await this.userService.createUser(userModel);

    return userResult;
  }

  async deleteUser(uid: string) {
    if (!uid) {
      throw new functions.https.HttpsError("invalid-argument", "O UID do usuário não foi informado.");
    }

    await this.userService.deleteUser(uid);
    return uid;
  }
}

export default UserController;
