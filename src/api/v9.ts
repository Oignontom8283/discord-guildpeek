import z from "zod";
import { DiscordInviteSchemaV9 } from "./v9_schema";

export * from "./v9_schema";

/**
 * Fetches the status of a Discord invite using the v9 API and validates the response against the provided schema.
 *
 * @param inviteId - The unique identifier of the Discord invite to fetch.
 * @returns A promise that resolves to the validated invite data conforming to `DiscordInviteSchemaV9`.
 * @throws Will throw an error if the fetch fails or if the response data does not match the expected schema.
 */
export async function fetchInviteStatusV9(inviteId: string): Promise<z.infer<typeof DiscordInviteSchemaV9>> {

    const url = `https://discord.com/api/v9/invites/${inviteId}?with_counts=true&with_expiration=true`

    // Fetch the invite status from Discord API
    const response = await fetch(url);

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
        throw new Error(`Failed to fetch invite status: ${response.statusText}`);
    }

    // Parse the response JSON and validate it against the schema
    const data = await response.json();

    // Validate the data structure using the schema
    const parsedData = DiscordInviteSchemaV9.safeParse(data);

    // If validation fails, throw an error with the validation message
    if (!parsedData.success) {
        throw new Error(`Invalid data structure: ${parsedData.error.message}`);
    }

    return parsedData.data;
}

/**
 * Retrieves the status of a Discord invite using the V9 API.
 *
 * @param inviteId - The unique identifier of the Discord invite.
 * @returns A promise that resolves to the invite status in the V9 format.
 */
export async function getInviteStatusV9(inviteId: string): Promise<DiscordInviteStatusV9> {
    const inviteData = await fetchInviteStatusV9(inviteId);
    return convertInviteStatusV9(inviteData);
}


/**
 * Enum representing the allowed image file extensions for Discord assets.
 * 
 * These extensions are commonly supported for user avatars, guild icons, and other media.
 * 
 * @remarks The values correspond to the file formats accepted by Discord's API.
 */
enum AllowedExtensions {
    WEBP = "webp",
    PNG = "png",
    JPG = "jpg",
    JPEG = "jpeg",
    GIF = "gif"
}

/**
 * Represents the types of resources available in the Discord API.
 */
enum RessourceType {
    AVATARS = 'avatars',
    BANNERS = 'banners',
    ICONS = 'icons',
    SPLASHES = 'splashes'
}

/**
 * Options for generating an image URL.
 *
 * @property `size` - The size specified in the image URL.
 * @property `extension` - The extension to use for the image URL. Defaults to `png`.
 */
type ImageUrlOptions = {

    /**
     * The size specified in the image URL
     */
    size?: number;

    /**
     * The extension to use for the image URL
     * 
     * @defaultValue `png`
     */
    extension?: AllowedExtensions;
}

/**
 * Represents a function that generates an image URL based on the provided options.
 *
 * @param args - The options used to construct the image URL.
 * @returns The generated image URL as a string.
 */
type ImageGetterFunction = (args: ImageUrlOptions) => string;

/**
 * Returns a function that generates a Discord CDN image URL for a given media type, user ID, and resource ID.
 *
 * @param mediaType - The type of media resource (e.g., "avatars", "banners").
 * @param userId - The ID of the user associated with the resource.
 * @param ressourceId - The ID of the specific resource (e.g., avatar hash).
 * @returns A function that takes image options (size and extension) and returns the corresponding CDN URL.
 */
function ImageGetter(mediaType:RessourceType, userId:string, ressourceId:string): ImageGetterFunction {
    return (args) => {
        const size = args.size ? `?size=${args.size}` : "";
        const extension  = args.extension ? args.extension : AllowedExtensions.PNG; 
        return `https://cdn.discordapp.com/${mediaType}/${userId}/${ressourceId}.${extension}${size}`;
    };
}

/**
 * Represents the status of a Discord invite in API version 9.
 */
export interface DiscordInviteStatusV9 {
    code: string;
    expiresAt: Date | null;
    guild: {
        id: string;
        name: string;
        description: string | null;
        member: number;
        online: number;

        icon: ImageGetterFunction;
        banner: ImageGetterFunction | null;

        features: string[];
        verificationLevel: number;
        vanityUrl: string | null;
        nsfwLevel: number;
        nsfw: boolean;
        premiumSubscription: number;
        premiumTier: number;
        tag: string | null;
        badge: {
            count: number;
            colorPrimary: string;
            colorSecondary: string;
            hash: string | null;
        },
        traits: unknown[];
        visibility: number;
    },
    channel: {
        id: string;
        type: number;
        name: string;
    },
    inviter: {
        id: string;
        username: string;
        globalName: string;

        avatar: ImageGetterFunction;
        banner: ImageGetterFunction | null;

        discriminator: string;
        flags: number;
        publicFlags: number;
        accentColor: number | null;
        bannerColor: string | null;
    } | null,
    
}

/**
 * Converts a Discord invite object conforming to the `DiscordInviteSchemaV9` schema
 * into a `DiscordInviteStatusV9` object, transforming and formatting fields as needed.
 *
 * This function handles the conversion of date strings to `Date` objects, constructs
 * CDN URLs for guild and inviter assets (icons, banners, avatars), and maps nested
 * guild, channel, and inviter information to the output structure.
 *
 * @param data - The invite data object to convert, validated against `DiscordInviteSchemaV9`.
 * @returns The converted invite status object in the `DiscordInviteStatusV9` format.
 */
function convertInviteStatusV9(data: z.infer<typeof DiscordInviteSchemaV9>): DiscordInviteStatusV9 {
    return {
        code: data.code,
        expiresAt: data.expires_at ? new Date(data.expires_at) : null,
        guild: {
            id: data.guild.id,
            name: data.guild.name,

            icon: ImageGetter(RessourceType.ICONS, data.guild.id, data.guild.icon),

            banner: data.guild.splash ? ImageGetter(RessourceType.SPLASHES, data.guild.id, data.guild.splash) : null,

            member: data.profile.member_count,
            online: data.profile.online_count,
            description: data.guild.description,
            features: data.guild.features,
            verificationLevel: data.guild.verification_level,
            vanityUrl: data.guild.vanity_url_code,
            nsfwLevel: data.guild.nsfw_level,
            nsfw: data.guild.nsfw,
            premiumSubscription: data.guild.premium_subscription_count,
            premiumTier: data.guild.premium_tier,
            tag: data.profile.tag,
            badge: {
                count: data.profile.badge,
                colorPrimary: data.profile.badge_color_primary,
                colorSecondary: data.profile.badge_color_secondary,
                hash: data.profile.badge_hash,
            },
            traits: data.profile.traits,
            visibility: data.profile.visibility
        },
        channel: {
            id: data.channel.id,
            type: data.channel.type,
            name: data.channel.name,
        },
        inviter: data.inviter ? {
            id: data.inviter.id,
            username: data.inviter.username,
            globalName: data.inviter.global_name || "",

            avatar: ImageGetter(RessourceType.AVATARS, data.inviter.id, data.inviter.avatar),
            banner: data.inviter.banner ? ImageGetter(RessourceType.BANNERS, data.inviter.id, data.inviter.banner) : null,

            discriminator: data.inviter.discriminator,
            flags: data.inviter.flags,
            publicFlags: data.inviter.public_flags,
            accentColor: data.inviter.accent_color || null,
            bannerColor: data.inviter.banner_color ? `${data.inviter.banner_color}` : null
        } : null,

    }
}