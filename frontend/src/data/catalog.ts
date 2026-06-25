export type Product = {
  id: number
  name: string
  brand: string
  category: string
  price: number
  oldPrice?: number
  rating: number
  stock: number
  badge?: string
  icon: string
  description: string
  specs: string[]
}

export type Client = {
  id: number
  name: string
  email: string
  phone: string
  status: 'Ativo' | 'Inativo'
  document: string
  city: string
  address: string
}

export const categories = [
  { name: 'Notebooks', icon: 'pi-desktop', count: 18 },
  { name: 'Smartphones', icon: 'pi-mobile', count: 24 },
  { name: 'Periféricos', icon: 'pi-sliders-h', count: 31 },
  { name: 'Componentes', icon: 'pi-microchip', count: 16 },
  { name: 'Áudio', icon: 'pi-volume-up', count: 12 },
  { name: 'Acessórios', icon: 'pi-box', count: 27 },
]

export const products: Product[] = [
  {
    id: 1,
    name: 'Notebook Aurora X14 Ryzen 7',
    brand: 'NexVolt',
    category: 'Notebooks',
    price: 4599.9,
    oldPrice: 5299.9,
    rating: 4.8,
    stock: 12,
    badge: 'Oferta',
    icon: 'pi-desktop',
    description:
      'Notebook leve para estudos, trabalho e projetos de desenvolvimento, com tela Full HD e SSD NVMe.',
    specs: ['Ryzen 7', '16 GB RAM', 'SSD 512 GB', 'Tela 14 Full HD'],
  },
  {
    id: 2,
    name: 'Smartphone Pulse 5G 256 GB',
    brand: 'VoltOne',
    category: 'Smartphones',
    price: 2199.9,
    oldPrice: 2499.9,
    rating: 4.7,
    stock: 20,
    badge: 'Novo',
    icon: 'pi-mobile',
    description:
      'Smartphone 5G com bateria de longa duracao, camera tripla e armazenamento amplo para o dia a dia.',
    specs: ['5G', '256 GB', 'Camera tripla', 'Bateria 5000 mAh'],
  },
  {
    id: 3,
    name: 'Teclado Mecanico Spark RGB',
    brand: 'KeyLab',
    category: 'Periféricos',
    price: 349.9,
    rating: 4.6,
    stock: 34,
    icon: 'pi-sliders-h',
    description:
      'Teclado mecanico compacto com iluminacao RGB, switches tateis e estrutura reforcada.',
    specs: ['Switch brown', 'RGB', 'Layout ABNT2', 'USB-C'],
  },
  {
    id: 4,
    name: 'Headset NovaSound Pro',
    brand: 'SoundPeak',
    category: 'Áudio',
    price: 289.9,
    oldPrice: 329.9,
    rating: 4.5,
    stock: 18,
    badge: 'Top',
    icon: 'pi-headphones',
    description:
      'Headset confortavel com microfone removivel, isolamento acustico e som imersivo.',
    specs: ['Drivers 50 mm', 'Microfone removivel', 'P2/USB', 'Conchas macias'],
  },
]

export const clients: Client[] = [
  {
    id: 1,
    name: 'Ana Souza',
    email: 'ana.souza@email.com',
    phone: '(11) 98888-1200',
    status: 'Ativo',
    document: '123.456.789-00',
    city: 'Sao Paulo',
    address: 'Rua das Flores, 123',
  },
  {
    id: 2,
    name: 'Carlos Lima',
    email: 'carlos.lima@email.com',
    phone: '(21) 97777-3344',
    status: 'Ativo',
    document: '987.654.321-00',
    city: 'Rio de Janeiro',
    address: 'Av. Atlântica, 500',
  },
  {
    id: 3,
    name: 'Bianca Rocha',
    email: 'bianca.rocha@email.com',
    phone: '(31) 96666-7788',
    status: 'Inativo',
    document: '456.789.123-00',
    city: 'Belo Horizonte',
    address: 'Rua dos Ipês, 200',
  },
]

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
