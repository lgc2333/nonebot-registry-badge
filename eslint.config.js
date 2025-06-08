import antfu from '@antfu/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default antfu(
  {
    toml: false,
  },
  {
    rules: {
      ...eslintConfigPrettier.rules,
      'perfectionist/sort-imports': 'off',
      'perfectionist/sort-named-imports': 'off',
      'ts/no-redeclare': ['error', { ignoreDeclarationMerge: true }],
      'antfu/if-newline': 'off',
    },
  },
)
