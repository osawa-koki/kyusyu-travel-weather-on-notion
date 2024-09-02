/* eslint-disable @typescript-eslint/no-var-requires */

const esbuild = require('esbuild')
const { GasPlugin } = require('esbuild-gas-plugin')

esbuild
  .build({
    entryPoints: ['./src/index.ts'],
    bundle: true,
    outfile: './dist/index.ts',
    plugins: [GasPlugin]
  })
  .then(() => { console.log('Build complete!') })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

/* eslint-enable @typescript-eslint/no-var-requires */
