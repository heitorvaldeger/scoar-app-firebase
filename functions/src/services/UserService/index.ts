import {UserRecord} from "firebase-admin/auth";
import defaultAuth from "../../config/firebase-auth";
import {IUserModel} from "../../interfaces/IUserModel";

export class UserService {
  async getAllUsers(): Promise<UserRecord[]> {
    const getUsersResult = await defaultAuth.listUsers();

    return getUsersResult.users;
  }

  async createUser(userModel: IUserModel): Promise<UserRecord> {
    const userResult = await defaultAuth.createUser({
      displayName: userModel.displayName,
      email: userModel.email,
      emailVerified: false,
      password: userModel.matricula,
    });

    if (userModel.isAdmin && userResult) {
      await defaultAuth.setCustomUserClaims(userResult.uid, {isAdmin: true});
    }

    return userResult;
  }

  async deleteUser(uid: string): Promise<void> {
    await defaultAuth.deleteUser(uid);
  }

  async userExists(email: string): Promise<boolean> {
    const user = await defaultAuth.getUserByEmail(email);

    return !!user;
  }
}
