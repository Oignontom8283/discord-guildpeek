
# discord-guildpeek

Get a public preview of a Discord server from its invite code, without authentication.

You can notably retrieve (in real time) the **number of members**, the **number of members online**, the **name of the guild**, the **icon** of the guild, the **banner** of the guild (if there is one). Name, global name, avatar, banner of the inventor (if there is one). And the channel where the invite was created.

[![npm version](https://img.shields.io/npm/v/discord-guildpeek.svg)](https://www.npmjs.com/package/discord-guildpeek)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

## 📦 Installation

```bash
npm install discord-guildpeek
# or
yarn add discord-guildpeek
```

## 🚀 Usage

```ts
import { getStatus } from 'discord-guildpeek';

getStatus('INVITE_ID').then(info => {
  console.log(info);
  console.log(info.guild.members); // Total members in the server
});
```

### Example Output

```json
{
  "code": "INVITE_ID",
  "guild": {
    "id": "SERVER_ID",
    "name": "Server Name",
    "description": "Description...",
    "members": 1234,
    "onlines": 56,
    "icon": "https://cdn.discordapp.com/icons/SERVER_ID/ICON_ID.png",
    "banner": "https://cdn.discordapp.com/banners/SERVER_ID/BANNER_ID.png",
    ...
  },
  "invitor": {
    "id": "USER_ID",
    "username": "InvitorName",
    "discriminator": "1234",
    "avatar": "https://cdn.discordapp.com/avatars/USER_ID/AVATAR_ID.png",
    ...
  },
  "channel": {
    "id": "CHANNEL_ID",
    "name": "general",
    "type": 0
  },
  "expiresAt": "2025-01-01T00:00:00.000Z",
  ...
}
1234
```

## 🧰 Features

* 🔍 `getInviteStatus(code: string)` — Fetches public metadata of a Discord server using an invite code (async).
* 🌐 Function `extractDiscordInviteId()` for extracting the invite ID from a Discord invite link.
* 📎 No token or authentication required.
* 📦 Supports ESM, CommonJS, and UMD (browser) builds.

## 📁 Supported Formats

| Format   | Output Path         |
| -------- | ------------------- |
| CommonJS | `dist/cjs/index.js` |
| ESM      | `dist/esm/index.js` |
| Browser  | `dist/browser/`     |

## 🔍 Technical Overview

* Fully typed with TypeScript (`strict: true`)
* Response validation via [Zod](https://github.com/colinhacks/zod)
* Bundled with [Vite](https://vitejs.dev/) for browser builds

## Github

Repository: [https://github.com/Oignontom8283/discord-guildpeek](https://github.com/Oignontom8283/discord-guildpeek)

## 📜 License

MIT — © 2025 [Oignontom8283](https://github.com/Oignontom8283)

> **This module is not affiliated with Discord Inc.**

