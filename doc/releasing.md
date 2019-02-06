# Releasing

## pre-testing
- `yarn run build`
- `bin/console`
  - enter the node REPL and interact with `lodash`, which is the extended version
  - sample: `lodash.isBlank(false)` should output `true`


## publishing
- edit `package.json` file, bumping `version` key
- run `yarn publish` (a `yarn login` is probably required)
