import { IUser } from "src/modules/user/domain/interfaces";

/**
 * Abstract class representing a LoginPort with a method to find a user to sign in.
 * @abstract
 * @param {string} username - The username of the user to find.
 * @returns {Promise<IUser | null>} A promise that resolves to the found user or null if not found.
 */
export abstract class LoginPort {
    abstract verifyCredentials(username: string, password: string): Promise<IUser | null>;
}
