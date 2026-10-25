import type { Category, Product } from "../types/product"

// Catálogo de exemplo para desenvolvimento do layout.
// Será substituído pelos dados reais via painel administrativo na Fase 3.

export const categories: Category[] = [
  { id: "racoes", name: "Rações", slug: "racoes", tone: "mata" },
  { id: "acessorios", name: "Acessórios Pet", slug: "acessorios", tone: "verde-suave" },
  { id: "aves", name: "Aves & Pássaros", slug: "aves", tone: "terracota" },
  { id: "pintinhos", name: "Pintinhos", slug: "pintinhos", tone: "mata" },
  { id: "codornas", name: "Codornas", slug: "codornas", tone: "verde-suave" },
  { id: "medicamentos", name: "Medicamentos", slug: "medicamentos", tone: "terracota" },
  { id: "garden", name: "Garden", slug: "garden", tone: "mata" },
]

export const products: Product[] = [
  { id: "1", slug: "racao-premium-caes-adultos-15kg", name: "Ração Premium Cães Adultos", description: "Ração completa para cães adultos de porte médio, com proteína de qualidade.", brand: "Campo Vivo", categoryId: "racoes", unit: "15kg", price: 189.9, stock: 24, tone: "mata" },
  { id: "2", slug: "racao-filhotes-gatos-3kg", name: "Ração Filhotes Gatos", description: "Fórmula para filhotes de gatos com DHA para desenvolvimento cognitivo.", brand: "Felina Bela", categoryId: "racoes", unit: "3kg", price: 69.9, stock: 15, tone: "verde-suave" },
  { id: "3", slug: "racao-caes-senior-10kg", name: "Ração Cães Sênior", description: "Indicada para cães acima de 7 anos, com glucosamina para as articulações.", brand: "Campo Vivo", categoryId: "racoes", unit: "10kg", price: 159.0, stock: 8, tone: "mata" },
  { id: "4", slug: "racao-gatos-castrados-3kg", name: "Ração Gatos Castrados", description: "Controle de peso para gatos castrados, baixo teor de carboidratos.", brand: "Felina Bela", categoryId: "racoes", unit: "3kg", price: 74.9, stock: 0, tone: "verde-suave" },
  { id: "5", slug: "comedouro-campo-inox", name: "Comedouro de Campo Inox", description: "Comedouro em aço inox, fácil higienização, resistente a ferrugem.", brand: "Rural Casa", categoryId: "acessorios", unit: "unidade", price: 54.0, stock: 30, tone: "mata" },
  { id: "6", slug: "coleira-nylon-ajustavel", name: "Coleira de Nylon Ajustável", description: "Coleira resistente com fivela de segurança, tamanhos P ao G.", brand: "Rural Casa", categoryId: "acessorios", unit: "unidade", price: 32.5, stock: 40, tone: "terracota" },
  { id: "7", slug: "caixa-transporte-pet-n2", name: "Caixa de Transporte Pet", description: "Caixa plástica ventilada para transporte seguro de cães e gatos de pequeno porte.", brand: "Rural Casa", categoryId: "acessorios", unit: "nº 2", price: 118.0, stock: 6, tone: "verde-suave" },
  { id: "8", slug: "mistura-passaros-silvestres-5kg", name: "Mistura para Pássaros Silvestres", description: "Mix de sementes para pássaros silvestres e de gaiola.", brand: "Asa Livre", categoryId: "aves", unit: "5kg", price: 42.5, stock: 20, tone: "terracota" },
  { id: "9", slug: "racao-calopsitas-1kg", name: "Ração Extrusada Calopsitas", description: "Alimento extrusado balanceado para calopsitas e periquitos.", brand: "Asa Livre", categoryId: "aves", unit: "1kg", price: 28.9, stock: 12, tone: "mata" },
  { id: "10", slug: "gaiola-aves-media", name: "Gaiola para Aves Média", description: "Gaiola em arame galvanizado, com poleiros e comedouros inclusos.", brand: "Rural Casa", categoryId: "aves", unit: "unidade", price: 145.0, stock: 4, tone: "verde-suave" },
  { id: "11", slug: "racao-pintinhos-iniciais-20kg", name: "Ração Pintinhos Inicial", description: "Fórmula inicial para pintinhos de 1 a 21 dias, rica em proteína.", brand: "Campo Vivo", categoryId: "pintinhos", unit: "20kg", price: 78.0, stock: 18, tone: "mata" },
  { id: "12", slug: "campanula-aquecedora-pintinhos", name: "Campânula Aquecedora para Pintinhos", description: "Equipamento para aquecimento de pintinhos recém-nascidos.", brand: "Rural Casa", categoryId: "pintinhos", unit: "unidade", price: 189.0, stock: 3, tone: "terracota" },
  { id: "13", slug: "racao-codornas-postura-25kg", name: "Ração Codornas Postura", description: "Ração balanceada para codornas em fase de postura.", brand: "Campo Vivo", categoryId: "codornas", unit: "25kg", price: 94.0, stock: 10, tone: "mata" },
  { id: "14", slug: "gaiola-codornas-bateria", name: "Gaiola para Codornas em Bateria", description: "Estrutura modular para criação de codornas em pequena escala.", brand: "Rural Casa", categoryId: "codornas", unit: "unidade", price: 320.0, stock: 2, tone: "verde-suave" },
  { id: "15", slug: "vermifugo-caes-ate-10kg", name: "Vermífugo Cães até 10kg", description: "Vermífugo de amplo espectro para cães, uso veterinário orientado.", brand: "VetCampo", categoryId: "medicamentos", unit: "comprimido", price: 24.9, stock: 50, tone: "terracota" },
  { id: "16", slug: "antipulgas-gatos-pipeta", name: "Antipulgas e Carrapatos Gatos", description: "Pipeta de aplicação única, proteção por até 30 dias.", brand: "VetCampo", categoryId: "medicamentos", unit: "pipeta", price: 45.0, stock: 0, tone: "mata" },
  { id: "17", slug: "soro-caseiro-aves", name: "Soro Reidratante para Aves", description: "Suplemento hidroeletrolítico para aves em situação de estresse.", brand: "VetCampo", categoryId: "medicamentos", unit: "100g", price: 18.5, stock: 22, tone: "verde-suave" },
  { id: "18", slug: "substrato-vegetal-20l", name: "Substrato Vegetal para Garden", description: "Substrato rico em matéria orgânica para hortas e jardins.", brand: "Terra Boa", categoryId: "garden", unit: "20L", price: 38.9, stock: 35, tone: "mata" },
  { id: "19", slug: "adubo-organico-5kg", name: "Adubo Orgânico Compostado", description: "Adubo 100% orgânico, livre de agrotóxicos, para uso geral.", brand: "Terra Boa", categoryId: "garden", unit: "5kg", price: 22.0, stock: 28, tone: "terracota" },
  { id: "20", slug: "vaso-ceramica-medio", name: "Vaso de Cerâmica Médio", description: "Vaso artesanal em cerâmica, ideal para plantas de médio porte.", brand: "Terra Boa", categoryId: "garden", unit: "unidade", price: 56.0, stock: 9, tone: "verde-suave" },
]

export function getCategoryById(id: string) {
  return categories.find((category) => category.id === id)
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}
