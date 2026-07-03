import { useState } from 'react'
import { Tabs }        from '@ds/Tabs/Tabs'
import { SelectInput } from '@ds/SelectInput/SelectInput'
import { Macrocard }   from '@ds/Macrocard/Macrocard'
import { CardReceitaIncremental }    from '@ds/CardReceitaIncremental/CardReceitaIncremental'
import { Table, StatusCell }         from '@ds/Table/Table'
import { Switch }                    from '@ds/Switch/Switch'
import { TextInput }                 from '@ds/TextInput/TextInput'
import { Textarea }                  from '@ds/Textarea/Textarea'

// ── mock data ────────────────────────────────────────────────────────────────

export interface ClienteRow {
  id: number
  nome: string
  telefone: string
  perfil: string
  ultimaCompra: string
  diasAusente: string
  visitas: number
  ticket: string
  totalHistorico: string
  bonus: string
  status: string
  [key: string]: unknown
}

const MOCK_CLIENTES: ClienteRow[] = [
  { id: 1,  nome: 'Mariana Cunha',    telefone: '11 91234-5678', perfil: 'Alto valor - Sensível a bônus',  ultimaCompra: '01-07-2023', diasAusente: '352 dias', visitas: 12, ticket: 'R$1.234,00', totalHistorico: 'R$12.340,00', bonus: 'R$247,00', status: 'Resgatado' },
  { id: 2,  nome: 'Ricardo Oliveira', telefone: '11 92345-6789', perfil: 'Alto valor - Esfriando',         ultimaCompra: '15-08-2023', diasAusente: '307 dias', visitas: 34, ticket: 'R$5.678,00', totalHistorico: 'R$56.780,00', bonus: 'R$236,45', status: 'Ativado' },
  { id: 3,  nome: 'Fernanda Lima',    telefone: '11 93456-7890', perfil: 'Fiel - Recompra em janela',      ultimaCompra: '20-09-2023', diasAusente: '271 dias', visitas:  9, ticket: 'R$9.012,00', totalHistorico: 'R$90.120,00', bonus: 'R$200,00', status: 'Ativado' },
  { id: 4,  nome: 'Carlos Souza',     telefone: '11 94567-8901', perfil: 'Fiel - Sensível a bônus',       ultimaCompra: '05-10-2023', diasAusente: '256 dias', visitas: 22, ticket: 'R$3.456,00', totalHistorico: 'R$34.560,00', bonus: 'R$200,00', status: 'Enviado' },
  { id: 5,  nome: 'Beatriz Alves',    telefone: '11 95678-9012', perfil: 'Alto valor - Esfriando',         ultimaCompra: '10-11-2023', diasAusente: '220 dias', visitas: 18, ticket: 'R$7.890,00', totalHistorico: 'R$78.900,00', bonus: 'R$214,00', status: 'Ativado' },
  { id: 6,  nome: 'Paulo Mendes',     telefone: '11 96789-0123', perfil: 'Alto valor - Sensível a bônus', ultimaCompra: '25-11-2023', diasAusente: '205 dias', visitas:  7, ticket: 'R$2.345,00', totalHistorico: 'R$23.450,00', bonus: 'R$200,00', status: 'Enviado' },
  { id: 7,  nome: 'Juliana Ferreira', telefone: '11 97890-1234', perfil: 'Alto valor - Sensível a bônus', ultimaCompra: '01-12-2023', diasAusente: '199 dias', visitas: 15, ticket: 'R$6.789,00', totalHistorico: 'R$67.890,00', bonus: 'R$215,00', status: 'Ativado' },
  { id: 8,  nome: 'Thiago Rocha',     telefone: '11 98901-2345', perfil: 'Alto valor - Sensível a bônus', ultimaCompra: '10-01-2024', diasAusente: '159 dias', visitas: 28, ticket: 'R$4.567,00', totalHistorico: 'R$45.670,00', bonus: 'R$200,00', status: 'Ativado' },
  { id: 9,  nome: 'Larissa Costa',    telefone: '11 99012-3456', perfil: 'Alto valor - Sensível a bônus', ultimaCompra: '15-01-2024', diasAusente: '154 dias', visitas:  5, ticket: 'R$8.901,00', totalHistorico: 'R$89.010,00', bonus: 'R$200,00', status: 'Enviado' },
  { id: 10, nome: 'André Pereira',    telefone: '11 90123-4567', perfil: 'Alto valor - Sensível a bônus', ultimaCompra: '20-02-2024', diasAusente: '118 dias', visitas: 41, ticket: 'R$1.023,00', totalHistorico: 'R$10.230,00', bonus: 'R$200,00', status: 'Ativado' },
]

const TABS = [
  { id: 'visao-geral',   label: 'Visão geral' },
  { id: 'configuracoes', label: 'Configurações' },
]


const PERFIL_COLORS: { keyword: string; color: string; bg: string }[] = [
  { keyword: 'esfriando',  color: '#4db6a3', bg: 'rgba(77,182,163,0.2)'  },
  { keyword: 'recompra',   color: '#4db6a3', bg: 'rgba(77,182,163,0.2)'  },
  { keyword: 'inativo',    color: '#8896A0', bg: 'rgba(136,150,160,0.15)' },
]

export function PerfilTag({ label }: { label: string }) {
  const lower = label.toLowerCase()
  const match = PERFIL_COLORS.find(c => lower.includes(c.keyword))
  const color = match?.color ?? '#ffbb40'
  const bg    = match?.bg    ?? 'rgba(230,148,0,0.2)'
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center',
      height: 32, padding: '0 12px',
      backgroundColor: bg,
      border: `1px solid ${color}`,
      borderRadius: 9999,
      whiteSpace: 'nowrap',
    }}>
      <span style={{ fontSize: 12, fontWeight: 500, color, lineHeight: '16px' }}>
        {label}
      </span>
    </div>
  )
}

const COLUMNS = [
  { key: 'id',             label: 'ID',              width: 56 },
  { key: 'nome',           label: 'Nome',            width: 180 },
  { key: 'telefone',       label: 'Telefone',        width: 140 },
  { key: 'perfil',         label: 'Perfil',          width: 224, render: (row: ClienteRow) => <PerfilTag label={row.perfil} /> },
  { key: 'ultimaCompra',   label: 'Última compra',   width: 130 },
  { key: 'diasAusente',    label: 'Dias ausente',    width: 120 },
  { key: 'visitas',        label: 'Visitas',         width: 80,  align: 'center' as const },
  { key: 'ticket',         label: 'Ticket',          width: 120 },
  { key: 'totalHistorico', label: 'Total histórico', width: 150 },
  { key: 'bonus',          label: 'Bônus',           width: 110 },
  {
    key: 'status',
    label: 'Status',
    width: 140,
    render: (row: ClienteRow) => <StatusCell label={row.status} />,
  },
]

// ── mock stores ──────────────────────────────────────────────────────────────

const REGION_OPTIONS = [
  { value: 'todas', label: 'Todas as regiões' },
  { value: 'sul',   label: 'Lojas Sul' },
  { value: 'norte', label: 'Lojas Norte' },
  { value: 'leste', label: 'Lojas Leste' },
  { value: 'oeste', label: 'Lojas Oeste' },
]

const ALL_STORES = [
  { id: 'morumbi',    name: 'Loja Morumbi',    region: 'sul' },
  { id: 'interlagos', name: 'Loja Interlagos',  region: 'sul' },
  { id: 'socorro',    name: 'Loja Socorro',     region: 'sul' },
  { id: 'santo-amaro',name: 'Loja Santo Amaro', region: 'sul' },
  { id: 'jurubatuba', name: 'Loja Jurubatuba',  region: 'sul' },
  { id: 'paulista',   name: 'Loja Paulista',    region: 'norte' },
  { id: 'ibirapuera', name: 'Loja Ibirapuera',  region: 'norte' },
  { id: 'pinheiros',  name: 'Loja Pinheiros',   region: 'norte' },
  { id: 'moema',      name: 'Loja Moema',       region: 'leste' },
  { id: 'tatuape',    name: 'Loja Tatuapé',     region: 'leste' },
  { id: 'lapa',       name: 'Loja Lapa',        region: 'oeste' },
  { id: 'osasco',     name: 'Loja Osasco',      region: 'oeste' },
]

const TEMPLATE_OPTIONS = [
  { value: 'padrao',        label: 'Template padrão Vivara' },
  { value: 'reativacao',    label: 'Reativação simples' },
  { value: 'oferta',        label: 'Oferta especial' },
  { value: 'personalizado', label: 'Personalizado' },
]

const TEMPLATE_MESSAGES: Record<string, string> = {
  padrao: `Ooi, {NOME}! Aqui é da {LOJA} e temos presente para você: um bônus de até R$ {VALORBONUS}!\n\nFaz um tempão que você não compra conosco e queremos muito te receber novamente na loja. Que tal conhecer a nossa coleção?\n\nImportante: esse bônus só será ativado se você clicar em ATIVAR abaixo e selecionar a semana em que poderia vir à loja — o bônus é exclusivo e será válido apenas nos dias da semana que você escolher.\n\n*consulte termos de uso em loja.`,
  reativacao: `Olá, {NOME}! Sentimos sua falta na {LOJA}. Temos um bônus especial de R$ {VALORBONUS} esperando por você!\n\nVenha nos visitar e aproveite esta oferta exclusiva.\n\n*consulte termos de uso em loja.`,
  oferta: `{NOME}, temos uma oferta incrível para você na {LOJA}! Bônus de R$ {VALORBONUS} válido esta semana.\n\nNão perca essa oportunidade!\n\n*consulte termos de uso em loja.`,
  personalizado: '',
}

// ── ConfiguracoesTab ─────────────────────────────────────────────────────────

const INITIAL_STATE = {
  campanhaAtiva: true,
  percBonus: '20%',
  minBonus: 'R$ 200,00',
  maxBonus: 'R$ 3.500,00',
  volumeDiario: '50',
  minInatividade: '7 meses',
  maxInatividade: '36 meses',
  semanasValidade: '2 semanas',
  template: 'padrao',
  mensagem: TEMPLATE_MESSAGES['padrao'],
  selected: new Set(['morumbi', 'interlagos']),
}

function ConfiguracoesTab() {
  const [isDirty, setIsDirty] = useState(false)

  // Gerais
  const [campanhaAtiva, setCampanhaAtiva]     = useState(INITIAL_STATE.campanhaAtiva)
  const [percBonus,     setPercBonus]         = useState(INITIAL_STATE.percBonus)
  const [minBonus,      setMinBonus]          = useState(INITIAL_STATE.minBonus)
  const [maxBonus,      setMaxBonus]          = useState(INITIAL_STATE.maxBonus)
  const [volumeDiario,  setVolumeDiario]      = useState(INITIAL_STATE.volumeDiario)
  const [minInatividade,setMinInatividade]    = useState(INITIAL_STATE.minInatividade)
  const [maxInatividade,setMaxInatividade]    = useState(INITIAL_STATE.maxInatividade)
  const [semanasValidade,setSemanasValidade]  = useState(INITIAL_STATE.semanasValidade)

  function dirty<T>(setter: (v: T) => void) {
    return (v: T) => { setter(v); setIsDirty(true) }
  }

  // Lojas ativas
  const [storeSearch,   setStoreSearch]       = useState('')
  const [region,        setRegion]            = useState('')
  const [selected,      setSelected]          = useState<Set<string>>(new Set(INITIAL_STATE.selected))

  const filteredStores = ALL_STORES.filter(s => {
    const matchName   = s.name.toLowerCase().includes(storeSearch.toLowerCase())
    const matchRegion = !region || region === 'todas' || s.region === region
    return matchName && matchRegion
  })

  function toggleStore(id: string) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      setIsDirty(true)
      return next
    })
  }

  function toggleAll() {
    const allIds = filteredStores.map(s => s.id)
    const allSelected = allIds.every(id => selected.has(id))
    setSelected(prev => {
      const next = new Set(prev)
      if (allSelected) allIds.forEach(id => next.delete(id))
      else             allIds.forEach(id => next.add(id))
      setIsDirty(true)
      return next
    })
  }

  // Mensagem
  const [template,    setTemplate]    = useState(INITIAL_STATE.template)
  const [mensagem,    setMensagem]    = useState(INITIAL_STATE.mensagem)
  const isCustom = template === 'personalizado'

  function handleTemplateChange(val: string) {
    setTemplate(val)
    if (val !== 'personalizado') setMensagem(TEMPLATE_MESSAGES[val] ?? '')
    else setMensagem('')
    setIsDirty(true)
  }

  function handleCancel() {
    setCampanhaAtiva(INITIAL_STATE.campanhaAtiva)
    setPercBonus(INITIAL_STATE.percBonus)
    setMinBonus(INITIAL_STATE.minBonus)
    setMaxBonus(INITIAL_STATE.maxBonus)
    setVolumeDiario(INITIAL_STATE.volumeDiario)
    setMinInatividade(INITIAL_STATE.minInatividade)
    setMaxInatividade(INITIAL_STATE.maxInatividade)
    setSemanasValidade(INITIAL_STATE.semanasValidade)
    setTemplate(INITIAL_STATE.template)
    setMensagem(INITIAL_STATE.mensagem)
    setSelected(new Set(INITIAL_STATE.selected))
    setIsDirty(false)
  }

  const previewText = mensagem
    .replace(/\{NOME\}/g, 'Mariana')
    .replace(/\{LOJA\}/g, 'Vivara Morumbi')
    .replace(/\{VALORBONUS\}/g, maxBonus || 'R$ 247,00')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '24px 32px 96px 32px' }}>

      {/* ── Configurações gerais ─────────────────────────────────────── */}
      <Macrocard title="Configurações gerais">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: '100%' }}>

          {/* Switch */}
          <Switch
            label={campanhaAtiva ? 'Campanha Ativada' : 'Campanha Desativada'}
            checked={campanhaAtiva}
            onChange={dirty(setCampanhaAtiva)}
          />

          {/* Row 1 */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
            <TextInput label="Percentual de bônus"             value={percBonus}      onChange={dirty(setPercBonus)}      width={140} mask="percent" />
            <TextInput label="Valor mínimo de bônus"           value={minBonus}       onChange={dirty(setMinBonus)}       width={160} mask="currency" />
            <TextInput label="Valor máximo de bônus"           value={maxBonus}       onChange={dirty(setMaxBonus)}       width={160} mask="currency" />
            <TextInput label="Volume de disparos por loja/dia" value={volumeDiario}   onChange={dirty(setVolumeDiario)}   width={208} mask="integer" />
          </div>

          {/* Row 2 */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
            <TextInput label="Período mínimo de inatividade"               value={minInatividade}  onChange={dirty(setMinInatividade)}  width={180} mask="months" />
            <TextInput label="Período máximo de inatividade"               value={maxInatividade}  onChange={dirty(setMaxInatividade)}  width={180} mask="months" />
            <TextInput label="Semanas de validade para o cliente escolher" value={semanasValidade} onChange={dirty(setSemanasValidade)} width={260} mask="weeks" />
          </div>

        </div>
      </Macrocard>

      {/* ── Lojas ativas ─────────────────────────────────────────────── */}
      <Macrocard title="Lojas ativas">
        <div
          style={{
            width: '100%',
            maxWidth: 720,
            border: '1px solid var(--cds-color-icon-secondary, #9eaab3)',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          {/* Search toolbar */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              padding: 16,
              backgroundColor: 'var(--cds-color-background-layer-02, #22272b)',
              borderBottom: '1px solid var(--cds-color-icon-secondary, #9eaab3)',
            }}
          >
            {/* Search + Region select */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              {/* Search */}
              <div
                style={{
                  flex: 1,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'var(--cds-color-background-layer-02, #22272b)',
                  border: '1px solid var(--cds-color-border-subtle, #3d464d)',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--cds-color-icon-secondary)' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3"/><path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                </div>
                <input
                  type="text"
                  placeholder="Buscar loja"
                  value={storeSearch}
                  onChange={e => setStoreSearch(e.target.value)}
                  style={{
                    flex: 1,
                    height: '100%',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    fontSize: 12,
                    color: 'var(--cds-color-text-primary)',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              {/* Region select */}
              <SelectInput
                placeholder="Todas as regiões"
                options={REGION_OPTIONS}
                value={region}
                onChange={setRegion}
                width={240}
              />
            </div>

            {/* Count badge + select all */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  backgroundColor: 'var(--cds-color-background-layer-02, #2f373c)',
                  borderRadius: 4,
                  padding: '0 12px',
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--cds-color-text-primary)', whiteSpace: 'nowrap' }}>
                  {selected.size} {selected.size === 1 ? 'loja selecionada' : 'lojas selecionadas'}
                </span>
              </div>

              <button
                onClick={toggleAll}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#ffbb40',
                  padding: '0 16px',
                  height: 32,
                }}
              >
                {filteredStores.every(s => selected.has(s.id)) ? 'Desselecionar todas' : 'Selecionar todas'}
              </button>
            </div>
          </div>

          {/* Stores list */}
          <div className="dark-scroll" style={{ height: 320, overflowY: 'auto', backgroundColor: 'var(--cds-color-background-layer-01, #121416)' }}>
            {filteredStores.map(store => (
              <div
                key={store.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 56,
                  padding: '0 16px',
                  borderBottom: '1px solid var(--cds-color-border-subtle, #353e45)',
                  cursor: 'pointer',
                  justifyContent: 'space-between',
                }}
                onClick={() => toggleStore(store.id)}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--cds-color-background-layer-02, #1f252a)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <span style={{ fontSize: 12, color: 'var(--cds-color-text-primary)' }}>{store.name}</span>
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 2,
                    border: selected.has(store.id) ? 'none' : '1px solid var(--cds-color-border-strong, #c0c8ce)',
                    backgroundColor: selected.has(store.id) ? '#e69400' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'background-color 0.15s',
                  }}
                >
                  {selected.has(store.id) && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l3 3 5-6" stroke="#14171a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
            ))}
            {filteredStores.length === 0 && (
              <div style={{ padding: 24, fontSize: 12, color: 'var(--cds-color-icon-secondary)', textAlign: 'center' }}>
                Nenhuma loja encontrada
              </div>
            )}
          </div>
        </div>
      </Macrocard>

      {/* ── Configurações de mensagem ─────────────────────────────────── */}
      <Macrocard title="Configurações de mensagem">
        <div style={{ display: 'flex', gap: 32, width: '100%', alignItems: 'flex-start' }}>

          {/* Left: template select + textarea — 50% */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
            <SelectInput
              label="Template"
              options={TEMPLATE_OPTIONS}
              value={template}
              onChange={handleTemplateChange}
              width="100%"
            />
            <Textarea
              label="Mensagem"
              value={mensagem}
              onChange={isCustom ? setMensagem : undefined}
              disabled={!isCustom}
              minRows={14}
            />
          </div>

          {/* Right: WhatsApp mockup — 50% */}
          <div
            style={{
              flex: 1,
              maxWidth: 560,
              flexShrink: 0,
              border: '1px solid #8d9ba5',
              borderRadius: '16px 16px 0 0',
              overflow: 'hidden',
              alignSelf: 'stretch',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#121416',
              paddingTop: 16,
              paddingLeft: 32,
              paddingRight: 32,
              gap: 16,
            }}
          >
            {/* Chat handle */}
            <div style={{ display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: 144, height: 8, borderRadius: 8, backgroundColor: '#353e45' }} />
            </div>

            {/* Content area (header + body) */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
              {/* WhatsApp header */}
              <div style={{ backgroundColor: '#003b38', padding: '16px 43px', display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#fff', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={`${import.meta.env.BASE_URL}brand/vivara-avatar.png`} alt="Vivara" style={{ width: '110%', height: '110%', objectFit: 'cover' }} />
                </div>
                <span style={{ fontSize: 16, fontWeight: 500, lineHeight: '24px', color: '#fff' }}>Vivara</span>
              </div>

              {/* Chat background */}
              <div style={{ flex: 1, backgroundColor: '#353e45', padding: 16, overflowY: 'auto' }} className="dark-scroll">
                {/* Message bubble */}
                <div
                  style={{
                    backgroundColor: '#25bfb8',
                    borderRadius: 16,
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    boxShadow: '0px 8px 16px rgba(16,24,40,0.1), 0px 20px 40px rgba(16,24,40,0.16)',
                    width: '100%',
                  }}
                >
                  <p style={{ margin: 0, fontSize: 16, lineHeight: '24px', color: '#121416', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {previewText || '…'}
                  </p>
                  <div style={{ borderTop: '1px solid rgba(0,0,0,0.2)', paddingTop: 10, textAlign: 'center' }}>
                    <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', color: '#003c02' }}>Ativar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Macrocard>

      {/* ── Sticky footer — only visible when isDirty ────────────────── */}
      {isDirty && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 80,
            right: 0,
            zIndex: 50,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 8,
            padding: '16px 32px',
            backgroundColor: 'var(--cds-color-background-layer-01, #121416)',
            borderTop: '1px solid var(--cds-color-border-subtle, #353e45)',
          }}
        >
          <button
            onClick={handleCancel}
            style={{
              height: 48,
              padding: '0 24px',
              border: '1px solid var(--cds-color-text-primary, #eef0f2)',
              borderRadius: 4,
              background: 'none',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 500,
              color: 'var(--cds-color-text-primary)',
              fontFamily: 'inherit',
            }}
          >
            Cancelar
          </button>
          <button
            onClick={() => setIsDirty(false)}
            style={{
              height: 48,
              padding: '0 32px',
              border: 'none',
              borderRadius: 4,
              backgroundColor: '#e69400',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 500,
              color: '#14171a',
              fontFamily: 'inherit',
            }}
          >
            Salvar alterações
          </button>
        </div>
      )}

    </div>
  )
}

// ── component ─────────────────────────────────────────────────────────────────

interface CorreAtrasPageProps {
  onOpenMessage?: (client: ClienteRow) => void
}

export function CorreAtrasPage({ onOpenMessage }: CorreAtrasPageProps = {}) {
  const [activeTab,   setActiveTab]   = useState('visao-geral')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = MOCK_CLIENTES.filter(c =>
    c.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.telefone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100%' }}>

      {/* ── Page header ──────────────────────────────────────────────── */}
      <div style={{ padding: '40px 32px 0 32px' }}>
        <h1
          style={{
            margin: 0,
            fontSize: 28,
            fontWeight: 700,
            lineHeight: '1.3',
            letterSpacing: '0.56px',
            color: 'var(--cds-color-text-primary)',
          }}
        >
          Corre Atrás
        </h1>
        <p style={{ margin: '4px 0 0 0', fontSize: 14, lineHeight: '1.8', color: '#c0c8ce' }}>
          Agente de reativação de clientes inativos com alto potencial de retorno
        </p>
      </div>

      {/* ── Tabs ─────────────────────────────────────────────────────── */}
      <div style={{ padding: '0 32px' }}>
        <Tabs items={TABS} activeId={activeTab} onChange={setActiveTab} />
      </div>

      {/* ── Tab: Visão geral ─────────────────────────────────────────── */}
      {activeTab === 'visao-geral' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '24px 32px 32px 32px' }}>

          {/* Macrocard — resultados do período */}
          <Macrocard
            title="Resultados dos últimos 90 dias"
            tagLabel="Rodou às 9h02 · 50 clientes selecionados"
            cards={[
              { title: 'Selecionados',    value: '100', change: '00%', iconSrc: `${import.meta.env.BASE_URL}icons/icon-target.png` },
              { title: 'Enviados',        value: '114', change: '00%', iconSrc: `${import.meta.env.BASE_URL}icons/icon-message.png` },
              { title: 'Ativados',        value: '24',  change: '00%', iconSrc: `${import.meta.env.BASE_URL}icons/icon-calendar.png` },
              { title: 'Resgatados',      value: '3',   change: '00%', iconSrc: `${import.meta.env.BASE_URL}icons/icon-check.png` },
              { title: 'Não resgataram',  value: '1',   change: '00%', iconSrc: `${import.meta.env.BASE_URL}icons/icon-fail.png` },
            ]}
          />

          {/* Macrocard — histórico da receita */}
          <Macrocard
            title="Histórico da receita"
            cards={[]}
          >
            <CardReceitaIncremental />
          </Macrocard>

          {/* Table */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, lineHeight: '24px', color: 'var(--cds-color-text-primary)' }}>
                Clientes selecionados
              </h2>
              <p style={{ margin: '2px 0 0 0', fontSize: 13, color: 'var(--cds-color-icon-secondary)' }}>
                Contatos incluídos no disparo de hoje
              </p>
            </div>
            <Table
              columns={COLUMNS}
              rows={filtered}
              onSearch={setSearchQuery}
              searchQuery={searchQuery}
              rowActions={onOpenMessage ? [{ label: 'Detalhes', onClick: onOpenMessage }] : undefined}
            />
          </div>

        </div>
      )}

      {/* ── Tab: Configurações ───────────────────────────────────────── */}
      {activeTab === 'configuracoes' && (
        <ConfiguracoesTab />
      )}
    </div>
  )
}
