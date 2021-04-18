# Changelog

## 13.0.0-alpha.12

- `KettuGuild` and `KettuUser` substructures now extend `Base` and pass through `client`
- `KettuClient` now supports a number of dispatch events

## 13.0.0-alpha.11

Bugfix.

## 13.0.0-alpha.10

- `KettuUser#settings#[x]Prefs` now exist all the time
- A number of kAPI connection events are now available from `KettuClient`
- The process now automatically reconnects to kAPI when possible

## 13.0.0-alpha.9

- `KettuImageManager#fetchAll` now fetches all images from a category
- `KettuImage#addFeedback` allows feedback to be added to a specific image

## 13.0.0-alpha.8

- `KettuUser#settings`: fix a bug where my brain actually doesn't work

## 13.0.0-alpha.7

- `KettuUser#settings`: properties `social` and `animal` renamed to `socialDisabled` and `animalDisabled` respectively
- `WebSocket`: allows packing of BigInts.

## 13.0.0-alpha.6

- `KettuUser`: integrate methods with kAPI, update some method examples
- `KettuWebSocket`: implement new heartbeat ACKs, add Retrieve Guilds logic

## 13.0.0-alpha.5

- `KettuUser`: renamed `social` to `socialPrefs`, added `social`, `animal` and `animalPrefs`

## 13.0.0-alpha.4

Going into dot-point form, for more specific changelogs.

- Updated `KettuGuild` and `KettuGuildConfig` structures for consistency with new kAPI documentation.
- Added `KettuGuildConfigRoles` and `KettuGuildConfigSocial`.
- Added `KettuUserPerms` for `KettuUser.perms`.
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