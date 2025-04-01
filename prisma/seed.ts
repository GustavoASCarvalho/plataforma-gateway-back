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
      name: 'PIX',
      code: 1
    }
  })
  await prisma.paymentMethod.upsert({
    where: { name: 'CARTAO_DE_CREDITO' },
    update: {},
    create: {
      name: 'CARTAO_DE_CREDITO',
      code: 2
    }
  })
  await prisma.paymentMethod.upsert({
    where: { name: 'CARTAO_DE_DEBITO' },
    update: {},
    create: {
      name: 'CARTAO_DE_DEBITO',
      code: 3
    }
  })
  await prisma.paymentMethod.upsert({
    where: { name: 'BOLETO' },
    update: {},
    create: {
      name: 'BOLETO',
      code: 4
    }
  })

  const produtosDigitaisawaitDepartmentClassification = await prisma.departmentClassification.upsert({
    where: { name: 'Produtos Digitais' },
    update: {},
    create: {
      name: 'Produtos Digitais',
      code: 1
    }
  })

  await prisma.department.upsert({
    where: { name: 'Aplicativos' },
    update: {},
    create: {
      departmentClassficationId: produtosDigitaisawaitDepartmentClassification.id,
      name: 'Aplicativos',
      code: 1
    }
  })

  await prisma.department.upsert({
    where: { name: 'Livros' },
    update: {},
    create: {
      departmentClassficationId: produtosDigitaisawaitDepartmentClassification.id,
      name: 'Livros',
      code: 2
    }
  })

  await prisma.department.upsert({
    where: { name: 'Jogos' },
    update: {},
    create: {
      departmentClassficationId: produtosDigitaisawaitDepartmentClassification.id,
      name: 'Jogos',
      code: 3
    }
  })

  const educacaoDepartmentClassification = await prisma.departmentClassification.upsert({
    where: { name: 'Educação' },
    update: {},
    create: {
      name: 'Educação',
      code: 2
    }
  })

  await prisma.department.upsert({
    where: { name: 'Faculdades ou universidades' },
    update: {},
    create: {
      departmentClassficationId: educacaoDepartmentClassification.id,
      name: 'Faculdades ou universidades',
      code: 4
    }
  })

  await prisma.department.upsert({
    where: { name: 'Outros serviços educacionais' },
    update: {},
    create: {
      departmentClassficationId: educacaoDepartmentClassification.id,
      name: 'Outros serviços educacionais',
      code: 5
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
