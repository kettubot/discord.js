# Changelog

## 13.0.0-alpha.4

Going into dot-point form, for more specific changelogs.

- Updated `KettuGuild` and `KettuGuildConfig` structures for consistency with new kAPI documentation.
- Added `KettuGuildConfigRoles` and `KettuGuildConfigSocial`.
- Renamed `APIRouter.js` to `KettuAPIRouter.js`.
- Renamed `KettuImageManager.get` to `KettuImageManager.fetch` and support the `force` parameter.
- Implemented basic functionality for updating prefixes.

## 13.0.0-alpha.3

Integration with kAPI, primarily logging in as Kettu and the WebSocket connection, along with some basic fetch methods for users, guilds & images.

## 13.0.0-alpha.2

Sync with discord.js#master as of release date (Mar 13 2021).

Includes basic structures for KettuClient, KettuGuild, and KettuImages, but not yet integrated with kAPI.

## 12.5.0

Two main additions:

- Merges the current v13 beta from discordjs/discord.js:master
- Merges the interactions beta from devsnek/discord.js:interactions

This was really a v13 alpha, but it was named `12.5.0` for a reason that I can't even remember. Sorry. Just ignore it.