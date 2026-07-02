import { useState } from 'react'
import { AdminLayout } from '@layouts/AdminLayout'
import { TopBar } from '@ds/TopBar/TopBar'
import { Sidebar } from '@ds/Sidebar/Sidebar'
import { BrandDrawer, type Brand } from '@ds/BrandDrawer/BrandDrawer'
import { AgentsPage } from './pages/AgentsPage'
import { CampaignListPage } from './pages/CampaignListPage'
import { CreateCampaignPage } from './pages/CreateCampaignPage'
import { CorreAtrasPage } from './pages/CorreAtrasPage'
import { ConsultorPage } from './pages/ConsultorPage'

type Page = 'agents' | 'campaign-list' | 'create-campaign' | 'corre-atras' | 'consultor'

const MOCK_BRANDS: Brand[] = [
  { id: '1', name: 'Vivara',       csResponsavel: 'Ana Souza',   logoSrc: `${import.meta.env.BASE_URL}brand/vivara.png` },
  { id: '2', name: 'Corello',      csResponsavel: 'Bruno Lima' },
  { id: '3', name: 'Shoulder',     csResponsavel: 'Carla Dias' },
  { id: '4', name: 'Arezzo',       csResponsavel: 'Diego Mota' },
  { id: '5', name: 'Chilli Beans', csResponsavel: 'Elisa Rocha' },
  { id: '6', name: 'Farm',         csResponsavel: 'Felipe Neto' },
  { id: '7', name: 'Reserva',      csResponsavel: 'Gabi Torres' },
]

function IconAgentes() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconConsultor() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l4.93-1.37A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function breadcrumbFor(page: Page, nav: { toCampaignList: () => void; toAgents: () => void }) {
  const home   = { label: 'Página inicial' }
  const agents = { label: 'Agentes IA', onClick: nav.toAgents }
  const corre  = { label: 'Corre Atrás', onClick: nav.toCampaignList }

  switch (page) {
    case 'agents':          return [home, { label: 'Agentes IA' }]
    case 'campaign-list':   return [home, agents, { label: 'Corre Atrás' }]
    case 'create-campaign': return [home, agents, corre, { label: 'Criar ação' }]
    case 'corre-atras':     return [home, agents, corre, { label: 'Última chance – Corre atrás' }]
    case 'consultor':       return [home, { label: 'Consultor IA' }]
  }
}

export function App() {
  const [theme, setTheme]             = useState<'light' | 'dark'>('dark')
  const [sidebarExpanded, setSidebar] = useState(false)
  const [drawerOpen, setDrawerOpen]   = useState(false)
  const [activeBrand, setActiveBrand] = useState<Brand | undefined>(MOCK_BRANDS[0])
  const [activeNav, setActiveNav]     = useState('agents')
  const [page, setPage]               = useState<Page>('agents')

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }

  const nav = {
    toAgents:       () => { setActiveNav('agents'); setPage('agents') },
    toCampaignList: () => setPage('campaign-list'),
  }

  const navItems = [
    {
      id: 'agents',
      label: 'Agentes IA',
      icon: <IconAgentes />,
      active: activeNav === 'agents',
      onClick: () => nav.toAgents(),
    },
    {
      id: 'consultor',
      label: 'Consultor IA',
      icon: <IconConsultor />,
      active: activeNav === 'consultor',
      onClick: () => { setActiveNav('consultor'); setPage('consultor') },
    },
  ]

  function renderPage() {
    switch (page) {
      case 'agents':
        return <AgentsPage onSelectAgent={() => setPage('campaign-list')} />
      case 'campaign-list':
        return (
          <CampaignListPage
            onCreateCampaign={() => setPage('create-campaign')}
            onSelectCampaign={() => setPage('corre-atras')}
          />
        )
      case 'create-campaign':
        return (
          <CreateCampaignPage
            onCancel={() => setPage('campaign-list')}
            onSave={() => setPage('corre-atras')}
          />
        )
      case 'corre-atras':
        return <CorreAtrasPage />
      case 'consultor':
        return <ConsultorPage />
    }
  }

  return (
    <>
      <AdminLayout
        sidebarExpanded={sidebarExpanded}
        topBar={
          <TopBar
            theme={theme}
            breadcrumb={breadcrumbFor(page, nav)}
            showLegacyButton
            brandLogoSrc={activeBrand?.logoSrc}
            brandName={activeBrand?.name}
            onChangeBrand={() => setDrawerOpen(true)}
            avatarAlt="HB"
          />
        }
        sidebar={
          <Sidebar
            expanded={sidebarExpanded}
            onToggle={() => setSidebar(v => !v)}
            items={navItems}
          />
        }
      >
        {renderPage()}
      </AdminLayout>

      <BrandDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        brands={MOCK_BRANDS}
        selectedBrandId={activeBrand?.id}
        mode={activeBrand ? 'change' : 'enabled'}
        onConfirm={brand => setActiveBrand(brand)}
      />
    </>
  )
}
