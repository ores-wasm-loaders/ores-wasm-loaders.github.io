# Repository instructions

This repository follows the canonical rules in [`ORESoftware/my-ai/AGENTS.md`](https://github.com/ORESoftware/my-ai/blob/main/AGENTS.md).

Repository-specific requirements:

- This repository is the public static publication surface for the `ores-wasm-loaders` organization; do not imply executable/runtime behavior that is not backed by tested implementation repositories.
- `.cli-flags.toml` is the repository governance CLI/env authority; keep the static publication surface free of invented application environment variables.
- Contract/runtime claims must point to the independent TypeSpec + JSON Schema authorities and TJSV admission evidence maintained by `owls-interfaces` and its tested consumers.
- Never commit credentials or generated decrypted environment files.
