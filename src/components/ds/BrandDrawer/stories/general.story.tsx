import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrandDrawer, type Brand } from '../BrandDrawer'

const MOCK_BRANDS: Brand[] = [
  { id: '1', name: 'Vivara', csResponsavel: 'Ana Souza', logoSrc: 'https://www.figma.com/api/mcp/asset/ed5eb695-3595-48dd-93e0-e44987eaafd9' },
  { id: '2', name: 'Corello', csResponsavel: 'Bruno Lima' },
  { id: '3', name: 'Shoulder', csResponsavel: 'Carla Dias' },
  { id: '4', name: 'Arezzo', csResponsavel: 'Diego Mota' },
  { id: '5', name: 'Chilli Beans', csResponsavel: 'Elisa Rocha' },
]

const meta: Meta<typeof BrandDrawer> = {
  title: 'Componentes/BrandDrawer',
  component: BrandDrawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Drawer lateral de seleção de marca. Busca, filtro por tabs (Minhas marcas / Todas), seleção com Selector e confirmação.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof BrandDrawer>

export const Open: Story = {
  name: 'Aberto',
  render: () => {
    const [open, setOpen] = useState(true)
    const [selected, setSelected] = useState<Brand | undefined>(MOCK_BRANDS[0])
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#121416', position: 'relative' }}>
        <button
          onClick={() => setOpen(true)}
          style={{ margin: 32, padding: '12px 24px', backgroundColor: '#ffbb40', color: '#121416', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600 }}
        >
          Abrir Drawer
        </button>
        <p style={{ marginLeft: 32, color: 'var(--cds-color-text-secondary)', fontSize: 14 }}>
          Marca selecionada: {selected?.name ?? 'nenhuma'}
        </p>
        <BrandDrawer
          isOpen={open}
          onClose={() => setOpen(false)}
          brands={MOCK_BRANDS}
          selectedBrandId={selected?.id}
          mode="change"
          onConfirm={b => { setSelected(b); setOpen(false) }}
        />
      </div>
    )
  },
}

export const FirstTime: Story = {
  name: 'Primeira seleção',
  render: () => {
    const [open, setOpen] = useState(true)
    const [selected, setSelected] = useState<Brand | undefined>()
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#121416', position: 'relative' }}>
        <button
          onClick={() => setOpen(true)}
          style={{ margin: 32, padding: '12px 24px', backgroundColor: '#ffbb40', color: '#121416', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600 }}
        >
          Selecionar marca
        </button>
        <BrandDrawer
          isOpen={open}
          onClose={() => setOpen(false)}
          brands={MOCK_BRANDS}
          selectedBrandId={selected?.id}
          mode="enabled"
          onConfirm={b => { setSelected(b); setOpen(false) }}
        />
      </div>
    )
  },
}
