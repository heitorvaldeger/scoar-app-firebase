/* eslint-disable max-len */
import {IUserModel} from "../interfaces/IUserModel";
import {UserService} from "../services/UserService";

import * as functions from "firebase-functions";
import {FirebaseMessages} from "../enums/FirebaseMessages";
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
    try {
      const userResult = await this.userService.createUser(userModel);

      return await this.userService.getUserByUid(userResult.uid);
    } catch (error: any) {
      if (error.errorInfo.code === "auth/email-already-exists") {
        throw new functions.https.HttpsError("already-exists", FirebaseMessages.EMAIL_ALREADY_EXISTS);
      }
      if (error.errorInfo.code === "auth/invalid-email") {
        throw new functions.https.HttpsError("invalid-argument", FirebaseMessages.EMAIL_IS_INVALID);
      }

      throw new functions.https.HttpsError("unknown", FirebaseMessages.DEFAULT);
    }
  }

  async deleteUser(uid: string) {
    console.log(uid);
    if (!uid) {
      throw new functions.https.HttpsError("invalid-argument", FirebaseMessages.UID_PARAM_NOT_FOUND);
    }

    await this.userService.deleteUser(uid);
    return uid;
  }
}

export default UserController;
