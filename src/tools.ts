
/**
 * Extracts the invite ID from a Discord invite URL.
 *
 * Accepts invite links in the following formats:
 * - `https://discord.gg/{id}`
 * - `https://discord.com/invite/{id}`
 *
 * @param url - The Discord invite URL to extract the invite ID from.
 * @returns The extracted invite ID as a string.
 * @throws {Error} If the URL does not match the expected Discord invite link formats.
 */
export function extractDiscordInviteId(url: string): string {

    // Regular expression to match Discord invite links
    // Accepts both formats: https://discord.gg/{id} and https://discord.com
    const match = url.match(
        /^https:\/\/(www\.)?(discord\.gg|discord\.com\/invite)\/([a-zA-Z0-9-_]+)\/?$/
    );

    // If the URL does not match the expected format, throw an error
    if (!match) {
        throw new Error("Invalid Discord invite link. Accepted formats: https://discord.gg/{id} or https://discord.com/invite/{id}");
    }

    return match[3]; // The invite ID
}

