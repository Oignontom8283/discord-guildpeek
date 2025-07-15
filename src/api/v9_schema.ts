import { z } from "zod";

const ClanSchema = z.object({
    identity_guild_id: z.string(),
    identity_enabled: z.boolean(),
    tag: z.string(),
    badge: z.string(),
});

const AvatarDecorationSchema = z.object({
    asset: z.string(),
    sku_id: z.string(),
    expires_at: z.number(),
});

const UserSchema = z.object({
    id: z.string(),
    username: z.string(),
    avatar: z.string().nullable(),
    discriminator: z.string(),
    public_flags: z.number(),
    flags: z.number(),
    banner: z.string().nullable(),
    accent_color: z.number().nullable(),
    global_name: z.string().nullable(),
    avatar_decoration_data: AvatarDecorationSchema.optional().nullable(),
    collectibles: z.unknown().nullable(), // unknown type for collectibles
    display_name_styles: z.unknown().nullable(), // unknown type for display name styles
    banner_color: z.string().nullable(),
    clan: ClanSchema.optional().nullable(),
    primary_guild: ClanSchema.optional().nullable(),
});

const GuildSchema = z.object({
    id: z.string(),
    name: z.string(),
    splash: z.string().nullable(),
    banner: z.string().nullable(),
    description: z.string().nullable(),
    icon: z.string().nullable(),
    features: z.array(z.string()),
    verification_level: z.number(),
    vanity_url_code: z.string().nullable(),
    nsfw_level: z.number(),
    nsfw: z.boolean(),
    premium_subscription_count: z.number(),
    premium_tier: z.number(),
});

const ChannelSchema = z.object({
    id: z.string(),
    type: z.number(),
    name: z.string(),
});

const ProfileSchema = z.object({
    id: z.string(),
    name: z.string(),
    icon_hash: z.string().nullable(),
    member_count: z.number(),
    online_count: z.number(),
    description: z.string().nullable(),
    banner_hash: z.string().nullable(),
    game_application_ids: z.array(z.string()),
    game_activity: z.unknown(), // unknown type for game activity
    tag: z.string().nullable(),
    badge: z.number(),
    badge_color_primary: z.string(),
    badge_color_secondary: z.string(),
    badge_hash: z.string().nullable(),
    traits: z.array(z.unknown()),
    features: z.array(z.string()),
    visibility: z.number(),
    custom_banner_hash: z.string().nullable(),
    premium_subscription_count: z.number(),
    premium_tier: z.number(),
});

export const DiscordInviteSchemaV9 = z.object({
    type: z.number(),
    code: z.string(),
    inviter: UserSchema,
    expires_at: z.union([z.string(), z.null()]),
    guild: GuildSchema,
    guild_id: z.string(),
    channel: ChannelSchema,
    profile: ProfileSchema,
    approximate_member_count: z.number().optional(),
    approximate_presence_count: z.number().optional(),
});
