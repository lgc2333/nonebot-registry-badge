<!-- markdownlint-disable MD024 -->

# NoneBot Registry Badge

A [Shields.io Endpoint Badge](https://shields.io/badges/endpoint-badge) displays your plugin's statuses in the NoneBot Registry.

## Badges

### Plugin Test Status

#### Endpoint & Params

```plaintext
https://nbbdg.lgc2333.top/plugin/<query>
```

- `<query>`: Can be one of the following:
  - Plugin PyPI Project name (Without `nonebot-plugin-` prefix is OK)
  - Plugin module name (Without `nonebot_plugin_` prefix is OK)

#### Examples

[![NoneBot Registry](https://img.shields.io/endpoint?url=https%3A%2F%2Fnbbdg.lgc2333.top%2Fplugin%2Fnonebot-plugin-picstatus)](https://registry.nonebot.dev/plugin/nonebot-plugin-picstatus:nonebot_plugin_picstatus)  
[![NoneBot Registry](https://img.shields.io/endpoint?url=https%3A%2F%2Fnbbdg.lgc2333.top%2Fplugin%2Fharuka-bot)](https://registry.nonebot.dev/plugin/haruka-bot:haruka_bot)

```markdown
[![NoneBot Registry](https://img.shields.io/endpoint?url=https%3A%2F%2Fnbbdg.lgc2333.top%2Fplugin%2Fnonebot-plugin-picstatus)](https://registry.nonebot.dev/plugin/nonebot-plugin-picstatus:nonebot_plugin_picstatus)  
[![NoneBot Registry](https://img.shields.io/endpoint?url=https%3A%2F%2Fnbbdg.lgc2333.top%2Fplugin%2Fharuka-bot)](https://registry.nonebot.dev/plugin/haruka-bot:haruka_bot)
```

### Plugin Supported Adapters

#### Endpoint & Params

```plaintext
https://nbbdg.lgc2333.top/plugin-adapters/<query>?force_show=true
```

- `<query>`: Can be one of the following:
  - Plugin PyPI Project name (Without `nonebot-plugin-` prefix is OK)
  - Plugin module name (Without `nonebot_plugin_` prefix is OK)
- `force_show`: Optional, default is `false`.  
  Set to `true` to force show all adapters instead `Same as xxx` or `All`.

#### Examples

[![Supported Adapters](https://img.shields.io/endpoint?url=https%3A%2F%2Fnbbdg.lgc2333.top%2Fplugin-adapters%2Fnonebot-plugin-alconna)](https://registry.nonebot.dev/plugin/nonebot-plugin-alconna:nonebot_plugin_alconna)  
[![Supported Adapters](https://img.shields.io/endpoint?url=https%3A%2F%2Fnbbdg.lgc2333.top%2Fplugin-adapters%2Fnonebot-plugin-send-anything-anywhere)](https://registry.nonebot.dev/plugin/nonebot-plugin-send-anything-anywhere:nonebot_plugin_saa)  
[![Supported Adapters](https://img.shields.io/endpoint?url=https%3A%2F%2Fnbbdg.lgc2333.top%2Fplugin-adapters%2Fnonebot-plugin-status)](https://registry.nonebot.dev/plugin/nonebot-plugin-status:nonebot_plugin_status)  
[![Supported Adapters](https://img.shields.io/endpoint?url=https%3A%2F%2Fnbbdg.lgc2333.top%2Fplugin-adapters%2Fnonebot-plugin-bilichat)](https://registry.nonebot.dev/plugin/nonebot-plugin-bilichat:nonebot_plugin_bilichat)  
[![Supported Adapters](https://img.shields.io/endpoint?url=https%3A%2F%2Fnbbdg.lgc2333.top%2Fplugin-adapters%2Fnonebot-plugin-send-anything-anywhere?force_show=true)](https://registry.nonebot.dev/plugin/nonebot-plugin-send-anything-anywhere:nonebot_plugin_saa)

```markdown
[![Supported Adapters](https://img.shields.io/endpoint?url=https%3A%2F%2Fnbbdg.lgc2333.top%2Fplugin-adapters%2Fnonebot-plugin-alconna)](https://registry.nonebot.dev/plugin/nonebot-plugin-alconna:nonebot_plugin_alconna)  
[![Supported Adapters](https://img.shields.io/endpoint?url=https%3A%2F%2Fnbbdg.lgc2333.top%2Fplugin-adapters%2Fnonebot-plugin-send-anything-anywhere)](https://registry.nonebot.dev/plugin/nonebot-plugin-send-anything-anywhere:nonebot_plugin_saa)  
[![Supported Adapters](https://img.shields.io/endpoint?url=https%3A%2F%2Fnbbdg.lgc2333.top%2Fplugin-adapters%2Fnonebot-plugin-status)](https://registry.nonebot.dev/plugin/nonebot-plugin-status:nonebot_plugin_status)  
[![Supported Adapters](https://img.shields.io/endpoint?url=https%3A%2F%2Fnbbdg.lgc2333.top%2Fplugin-adapters%2Fnonebot-plugin-bilichat)](https://registry.nonebot.dev/plugin/nonebot-plugin-bilichat:nonebot_plugin_bilichat)  
[![Supported Adapters](https://img.shields.io/endpoint?url=https%3A%2F%2Fnbbdg.lgc2333.top%2Fplugin-adapters%2Fnonebot-plugin-send-anything-anywhere?force_show=true)](https://registry.nonebot.dev/plugin/nonebot-plugin-send-anything-anywhere:nonebot_plugin_saa)
```
