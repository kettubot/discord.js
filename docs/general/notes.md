# Notes

To keep discord.js intact and the fork non-breaking, we decided to extend most objects with a `kettu` property, which contains all further properties, methods, and events that relate to kettu.

For example, `Guild` remains unchanged aside from the new property `kettu`, which returns a `KettuGuild` object.

The same goes for `User`s and the `Client`.

These properties are only added if the {@link ClientOptions#kettu} option is enabled.

## Using as Kettu

When using the fork for an instance of `kettu`, remember to use `client.kettu.login` rather than `client.login`, and a Kettu token instead of a Discord token. The Discord token will automatically be loaded in through kAPI.