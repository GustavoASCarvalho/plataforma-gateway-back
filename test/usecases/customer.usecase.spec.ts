import { Customer } from '@prisma/client'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CustomerService } from '../../src/api/asaas/customer.service'
import { CustomerRepository } from '../../src/interfaces/customer.interface'
import { CustomerCreate, CustomerUseCase } from '../../src/usecases/customer.usecase'

vi.mock('../src/repositories/customer.repository')
vi.mock('../src/api/asaas/customer.service')

// testes

describe('CustomerUseCase', () => {
  let useCase: CustomerUseCase
  let mockRepository: CustomerRepository
  let mockService: CustomerService

  const inputData: CustomerCreate = {
    name: 'João da Silva',
    cpf: '12345678900',
    email: 'joao@example.com',
    cellPhone: '11999999999',
    cep: '12345678',
    city: 'São Paulo',
    state: 'SP',
    address: 'Rua Teste',
    number: '123',
    neighborhood: 'Bairro',
    extraInfo: null
  }

  const mockCustomer: Customer = {
    id: '1',
    name: inputData.name,
    externalId: 'ext-123',
    cpf: inputData.cpf,
    email: inputData.email,
    cellPhone: inputData.cellPhone,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
  }

  const userId = 'user-1'

  const mockCustomers: Customer[] = [
    {
      id: '1',
      name: 'João da Silva',
      cpf: '12345678900',
      email: 'joao@example.com',
      cellPhone: '11999999999',
      externalId: 'ext-123',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    },
    {
      id: '1',
      name: 'João da Silva',
      cpf: '12345678900',
      email: 'joao@example.com',
      cellPhone: '11999999999',
      externalId: 'ext-123',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }
  ]

  beforeEach(() => {
    mockRepository = {
      findByCpf: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockResolvedValue(mockCustomer),
      listAllByUserId: vi.fn().mockResolvedValue(mockCustomers)
    } as unknown as CustomerRepository

    mockService = {
      create: vi.fn().mockResolvedValue('ext-123'),
      update: vi.fn()
    } as unknown as CustomerService

    useCase = new CustomerUseCase()
    // @ts-expect-error: acesso interno para teste
    useCase.customerRepository = mockRepository
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    useCase.customerService = mockService
  })

  describe('create', () => {
    it('should create a new customer when not found', async () => {
      const result = await useCase.create(inputData)

      expect(mockRepository.findByCpf).toHaveBeenCalledWith(inputData.cpf)
      expect(mockService.create).toHaveBeenCalled()
      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          ...inputData,
          externalId: 'ext-123'
        })
      )
      expect(result).toEqual(mockCustomer)
    })
  })

  describe('listAllByUserId', () => {
    it('should list all customers by userId', async () => {
      const result = await useCase.listAllByUserId(userId)

      expect(mockRepository.listAllByUserId).toHaveBeenCalledWith(userId)
      expect(result).toEqual(mockCustomers)
    })
  })
})
