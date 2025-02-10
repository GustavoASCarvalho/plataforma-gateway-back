import axios from 'axios'

export interface CustomerServiceCreate {
  name: string
  cpfCnpj: string
  email?: string | null
  phone?: string | null
  mobilePhone?: string | null
  postalCode?: string | null
  address?: string | null
  addressNumber?: string | null
  complement?: string | null
  province?: string | null
  externalReference?: string | null
  notificationDisabled?: boolean
  additionalEmails?: string | null
  municipalInscription?: string | null
  stateInscription?: string | null
  observations?: string | null
}

export class CustomerService {
  private BASE_URL = ''
  private ACCESS_TOKEN = ''
  constructor() {
    console.log('BASE_URL', process.env)
    if (!process.env.ASAAS_API_BASE_URL) throw new Error('ASAAS_API_BASE_URL is required')
    this.BASE_URL = process.env.ASAAS_API_BASE_URL

    if (!process.env.ASAAS_API_KEY) throw new Error('ASAAS_API_KEY is required')
    this.ACCESS_TOKEN = process.env.ASAAS_API_KEY
  }

  async create(data: CustomerServiceCreate): Promise<string | null> {
    const response = await axios.request({
      url: `${this.BASE_URL}/customers`,
      method: 'POST',
      headers: {
        access_token: this.ACCESS_TOKEN
      },
      data: data
    })

    if (response.status === 200) return response.data.id
    return null
  }

  async update(id: string, data: CustomerServiceCreate): Promise<string | null> {
    const response = await axios.request({
      url: `${this.BASE_URL}/customers/${id}`,
      method: 'PUT',
      headers: {
        access_token: this.ACCESS_TOKEN
      },
      data: data
    })

    if (response.status === 200) return response.data.id
    return null
  }
}
