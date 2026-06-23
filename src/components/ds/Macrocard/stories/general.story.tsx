import type { Meta, StoryObj } from '@storybook/react-vite'
import { Macrocard } from '../Macrocard'
import { CardIndicador } from '@ds/CardIndicador/CardIndicador'

const meta: Meta<typeof Macrocard> = {
  title: 'Componentes/Macrocard',
  component: Macrocard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Container principal de seção com borda gradient amber, halo animado e suporte a CardIndicadors ou children customizados.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    tagLabel: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Macrocard>

export const WithCards: Story = {
  name: 'Com CardIndicadors',
  render: () => (
    <Macrocard title="Visão geral" tagLabel="Ativo">
      <CardIndicador title="Clientes alcançados" value="12.483" change="+8,3%" />
      <CardIndicador title="Retorno médio" value="R$ 247" change="+12,1%" />
      <CardIndicador title="Receita incremental" value="R$ 3,08M" change="+5,4%" />
    </Macrocard>
  ),
}

export const WithCustomContent: Story = {
  name: 'Com conteúdo customizado',
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <Macrocard title="Configurações gerais">
        <div style={{ color: 'var(--cds-color-text-secondary)', fontSize: 14 }}>
          Conteúdo customizado via children
        </div>
      </Macrocard>
    </div>
  ),
}

export const NoTag: Story = {
  name: 'Sem tag',
  render: () => (
    <div style={{ maxWidth: 500 }}>
      <Macrocard title="Lojas ativas">
        <div style={{ color: 'var(--cds-color-text-secondary)', fontSize: 14 }}>Conteúdo</div>
      </Macrocard>
    </div>
  ),
}
