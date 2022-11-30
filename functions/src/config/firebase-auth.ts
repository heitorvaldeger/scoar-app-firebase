import {getAuth} from "firebase-admin/auth";
import defaultApp from "./firebase-admin";

const defaultAuth = getAuth(defaultApp);

export default defaultAuth;
