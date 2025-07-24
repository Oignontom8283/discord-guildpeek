import { DiscordInviteStatusV9, getInviteStatusV9 } from './api/v9';

// Export utilities and types
export * from './tools';

// Export all API versions
export * from './api/v9';


/**
 * Represents the status of a Discord invite.
 * 
 * This type is an alias for the latest version of the Discord invite status.
 * For compatibility with previous versions, use the version-specific types such as DiscordInviteStatusV9, etc.
 *
 * @see DiscordInviteStatusV9
 */
export type DiscordInviteStatus = DiscordInviteStatusV9;

/**
 * Retrieves the status of a Discord invite by its ID.
 * 
 * This function is a wrapper for the latest version of the Discord API (**V9**).
 * For compatibility with previous versions, use the version-specific functions such as getInviteStatusV9, etc.
 *
 * @param inviteId - The unique identifier of the Discord invite.
 * @returns A promise that resolves to the status of the Discord invite.
 */
export function getInviteStatus(inviteId: string): Promise<DiscordInviteStatus> {
    return getInviteStatusV9(inviteId);
}