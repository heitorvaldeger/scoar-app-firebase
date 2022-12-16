import {UserRecord} from "firebase-admin/auth";
import {IUserModel} from "../../interfaces/IUserModel";
import defaultAuth from "../../config/firebase-auth";

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

    if (userResult) {
      // eslint-disable-next-line max-len
      await defaultAuth.setCustomUserClaims(userResult.uid, {role: userModel.role});
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

  async getUserByUid(uid: string): Promise<UserRecord> {
    const user = await defaultAuth.getUser(uid);

    return user;
  }
}
