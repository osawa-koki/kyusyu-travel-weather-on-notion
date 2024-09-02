
function main() {
  console.log('Hello, World!!!')
}

declare let global: { handler: () => void }
global.handler = main

export default main
