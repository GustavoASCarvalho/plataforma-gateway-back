import * as jose from 'jose'

async function generateKeys() {
  const { publicKey, privateKey } = await jose.generateKeyPair('RSA-OAEP-256')

  const pk = await jose.exportPKCS8(privateKey)
  console.log(pk)
  const pub = await jose.exportSPKI(publicKey)
  console.log(pub)
}

generateKeys()
