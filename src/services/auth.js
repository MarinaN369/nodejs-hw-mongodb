import { UsersCollection } from "../db/models/user";

export const registerUser = async(payload) => {
    await UsersCollection.create(payload);
};
