const { readFileSync, openSync } = require('fs')
const path = require('path')
const envDirectory = path.resolve(__dirname, '..', '..') + '/.env'
function readEnvFile() {
  try {
    openSync(envDirectory, 'r')
    const envContent = readFileSync(envDirectory, {
      encoding: 'utf-8'
    })

    if (!envContent) {
      return
    }
    process.env.PORT = envContent.split('=')[1]
  } catch (error) {
    console.error('.env not found')
  }
}
module.exports = readEnvFile
