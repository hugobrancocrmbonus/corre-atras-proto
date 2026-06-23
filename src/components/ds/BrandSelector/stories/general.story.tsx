import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrandSelector } from '../BrandSelector'

const meta: Meta<typeof BrandSelector> = {
  title: 'Componentes/BrandSelector',
  component: BrandSelector,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Chip de marca selecionada na TopBar. Exibe logo, nome e link para trocar de marca.',
      },
    },
  },
  argTypes: {
    brandName: { control: 'text' },
    brandLogoSrc: { control: 'text' },
    onChangeBrand: { action: 'trocar marca' },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'inline-flex', backgroundColor: 'var(--cds-color-background-layer-01, #121416)', padding: 16 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof BrandSelector>

export const WithBrand: Story = {
  name: 'Com marca selecionada',
  args: {
    brandName: 'Vivara',
    brandLogoSrc: 'https://www.figma.com/api/mcp/asset/ed5eb695-3595-48dd-93e0-e44987eaafd9',
  },
}

export const NoSelection: Story = {
  name: 'Sem marca selecionada',
  args: { brandName: undefined, brandLogoSrc: undefined },
}
