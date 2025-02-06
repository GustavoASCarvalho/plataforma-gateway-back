import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
async function main() {
  await prisma.user.upsert({
    where: { email: 'gustavo@gmail.com' },
    update: {},
    create: {
      email: 'gustavo@gmail.com',
      name: 'gustavo',
      password: bcrypt.hashSync('gustavoadmin', 10),
      role: 'ADMIN'
    }
  })
  await prisma.paymentMethod.upsert({
    where: { name: 'PIX' },
    update: {},
    create: {
      name: 'PIX'
    }
  })
  await prisma.paymentMethod.upsert({
    where: { name: 'CARTAO_DE_CREDITO' },
    update: {},
    create: {
      name: 'CARTAO_DE_CREDITO'
    }
  })
  await prisma.paymentMethod.upsert({
    where: { name: 'CARTAO_DE_DEBITO' },
    update: {},
    create: {
      name: 'CARTAO_DE_DEBITO'
    }
  })
  await prisma.paymentMethod.upsert({
    where: { name: 'BOLETO' },
    update: {},
    create: {
      name: 'BOLETO'
    }
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
