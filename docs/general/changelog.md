# Changelog

## 13.0.0-alpha.19

Sync with discord.js#master as of release.

This release contains no features, but acts as a signal point for a significant breaking change.

See [#5758](https://github.com/discordjs/discord.js/pull/5758) and [#5791](https://github.com/discordjs/discord.js/pull/5791).

## 13.0.0-alpha.18

Sync with discord.js#master as of release. **This includes message components!**

- `KettuWebSocket` no longer supports `RETRIEVE_GUILDS` (moved to kettu source)
- `KettuClient` no longer screws up with event names
- `Constants` has been synced with kAPI

## 13.0.0-alpha.17

Sync with discord.js#master as of release.

- `KettuWebSocket` supports blacklist options
- New retrieve guilds behaviour implemented

## 13.0.0-alpha.16

Sync with discord.js#master as of release.

**Supports slash commands beta!**

- Fixed a bug in `KettuUser` where `voteRM` would return undefined
- Added `KettuAPIError` for more useful errors

## 13.0.0-alpha.15

- Added the property `KettuImage#feedback` and the method `KettuImage#removeFeedback`
- `KettuImageManager#fetch` now forces by default (to ensure up-to-date feedback)

## 13.0.0-alpha.14

Alpha 14 removes devsnek's interactions branch. This was never tested (by me) and has been superceded by vaporox's branch, which is expected to be merged into the discord.js master soon.

The sync with discord.js#master has also been redone to, you know, work properly.

## 13.0.0-alpha.13

*Warning: this release is unstable and may not function properly.*

Sync with discord.js#master as of release.

- `KettuWebSocket` now supports `RETRIEVE_GUILDS` according to kAPI spec
- `KettuClient` has improved reconnecting behaviour

## 13.0.0-alpha.12

- `KettuGuild` and `KettuUser` substructures now extend `Base` and pass through `client`
- `KettuClient` now supports a number of dispatch events

## 13.0.0-alpha.11

Bugfix.

## 13.0.0-alpha.10

*Warning: this release is unstable and may not function properly.*

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