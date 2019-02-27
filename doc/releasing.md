# Releasing

## pre-testing
- `yarn run build`
- `bin/console`
  - enter the node REPL and interact with `lodash`, which is the extended version
  - sample: `lodash.blank(false)` should output `true`


## publishing
- edit `package.json` file, bumping `version` key
- run `yarn publish` (a `yarn login` is probably required)
  + it'll ask for a new version and edit package.json if you provide it
