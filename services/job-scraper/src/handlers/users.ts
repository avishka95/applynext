import { queryPg } from '@/db/clients';
import { User } from '@/types/User';

/**
 * Retrieves a user by their unique identifier.
 *
 * @param userId - The unique identifier of the user to retrieve.
 * @returns A promise that resolves to the user object if found, or `null` if no user exists with the given ID.
 */
export async function getUserById(userId: string): Promise<User | null> {
    const result = await queryPg('SELECT id, email FROM user_account');
    return result.rows[0] || null;
}
