# Releasing

## pre-testing
- `yarn run build`
- `bin/console`
  - enter the node REPL and interact with `lodash`, which is the extended version
  - sample: `lodash.blank(false)` should output `true`


## publishing
- IMPORTANT: do not edit `package.json` file, bumping `version` key, because `yarn publish` will already do that
  - it updates package.json version
  - creates a new git commit with the specified version as the message
  - creates a new git tag with the specified version as name
- run `yarn publish` (a `yarn login` is probably required)
  + it'll ask for a new version and edit package.json if you provide it
