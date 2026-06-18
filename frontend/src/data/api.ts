import type { Client, Product } from '@/data/catalog'

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8081/api').replace(
  /\/$/,
  '',
)

type ApiProduct = {
  id: number
  name: string
  brand: string
  category: string
  price: string | number
  old_price?: string | number | null
  stock: number
  badge?: string | null
  icon?: string | null
  description?: string | null
}

type ApiClient = {
  id: number
  name: string
  email: string
  phone?: string | null
  document?: string | null
  city?: string | null
  address?: string | null
  status: 'Ativo' | 'Inativo'
}

export type ProductPayload = {
  name: string
  brand: string
  category: string
  price: number
  oldPrice?: number | null
  stock: number
  badge?: string | null
  icon?: string | null
  description?: string | null
}

export type ClientPayload = Omit<Client, 'id'>

const request = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao acessar ${path}`)
  }

  if (response.status === 204) {
    return null as T
  }

  return response.json() as Promise<T>
}

const toNumber = (value: string | number | null | undefined) =>
  value === null || value === undefined ? undefined : Number(value)

const mapProduct = (product: ApiProduct): Product => ({
  id: product.id,
  name: product.name,
  brand: product.brand,
  category: product.category,
  price: Number(product.price),
  oldPrice: toNumber(product.old_price),
  rating: 5,
  stock: product.stock,
  badge: product.badge || undefined,
  icon: product.icon || 'pi-box',
  description: product.description || 'Produto cadastrado no back-end Laravel.',
  specs: ['Cadastro via API Laravel', 'Dados persistidos no MySQL'],
})

const mapClient = (client: ApiClient): Client => ({
  id: client.id,
  name: client.name,
  email: client.email,
  phone: client.phone || '',
  document: client.document || '',
  city: client.city || '',
  address: client.address || '',
  status: client.status,
})

const productBody = (product: ProductPayload) =>
  JSON.stringify({
    name: product.name,
    brand: product.brand,
    category: product.category,
    price: product.price,
    old_price: product.oldPrice || null,
    stock: product.stock,
    badge: product.badge || null,
    icon: product.icon || null,
    description: product.description || null,
  })

export const getProducts = async () => {
  const products = await request<ApiProduct[]>('/products')
  return products.map(mapProduct)
}

export const getProduct = async (id: number) => {
  const product = await request<ApiProduct>(`/products/${id}`)
  return mapProduct(product)
}

export const createProduct = async (product: ProductPayload) => {
  const created = await request<ApiProduct>('/products', {
    method: 'POST',
    body: productBody(product),
  })
  return mapProduct(created)
}

export const updateProduct = async (id: number, product: ProductPayload) => {
  const updated = await request<ApiProduct>(`/products/${id}`, {
    method: 'PUT',
    body: productBody(product),
  })
  return mapProduct(updated)
}

export const deleteProduct = (id: number) =>
  request<null>(`/products/${id}`, {
    method: 'DELETE',
  })

export const getClients = async () => {
  const clients = await request<ApiClient[]>('/clients')
  return clients.map(mapClient)
}

export const createClient = async (client: ClientPayload) => {
  const created = await request<ApiClient>('/clients', {
    method: 'POST',
    body: JSON.stringify(client),
  })
  return mapClient(created)
}

export const updateClient = async (id: number, client: ClientPayload) => {
  const updated = await request<ApiClient>(`/clients/${id}`, {
    method: 'PUT',
    body: JSON.stringify(client),
  })
  return mapClient(updated)
}

export const deleteClient = (id: number) =>
  request<null>(`/clients/${id}`, {
    method: 'DELETE',
  })