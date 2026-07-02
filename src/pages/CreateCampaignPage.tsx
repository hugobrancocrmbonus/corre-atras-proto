import { useState } from 'react'
import { Switch } from '@ds/Switch/Switch'
import { TextInput } from '@ds/TextInput/TextInput'
import { SelectInput } from '@ds/SelectInput/SelectInput'
import { Textarea } from '@ds/Textarea/Textarea'

/* ── helpers ──────────────────────────────────────────────────────── */

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      border: '1px solid rgba(255,165,0,0.35)',
      borderRadius: 24,
      background: 'linear-gradient(116deg, rgba(255,165,0,0.14) 7%, transparent 26%)',
      padding: '40px 40px 32px',
    }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, lineHeight: '28px', color: 'var(--cds-text-primary)', margin: '0 0 24px' }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

function FieldRow({ children, align = 'end' }: { children: React.ReactNode; align?: 'end' | 'start' }) {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: align }}>
      {children}
    </div>
  )
}

const STORES = [
  { id: 'morumbi',     name: 'Loja Morumbi' },
  { id: 'interlagos', name: 'Loja Interlagos' },
  { id: 'socorro',    name: 'Loja Socorro' },
  { id: 'santoamaro', name: 'Loja Santo Amaro' },
  { id: 'jurubatuba', name: 'Loja Jurubatuba' },
  { id: 'vila',       name: 'Loja Vila Olímpia' },
  { id: 'pinheiros',  name: 'Loja Pinheiros' },
]

const REGION_OPTIONS = [
  { value: 'todas', label: 'Todas as regiões' },
  { value: 'sul',   label: 'Lojas Sul' },
  { value: 'norte', label: 'Lojas Norte' },
  { value: 'leste', label: 'Lojas Leste' },
]

const TEMPLATE_OPTIONS = [
  { value: 'padrao-vivara', label: 'Template padrão Vivara' },
  { value: 'curto',         label: 'Template curto' },
  { value: 'personalizado', label: 'Personalizado' },
]

const DEFAULT_MESSAGE =
  `Ooi, {NOME}! Aqui é da {LOJA} e temos presente para você: um bônus de até R$ {VALORBONUS}!\n` +
  `Faz um tempão que você não compra conosco e queremos muito te receber novamente na loja. Que tal conhecer a nossa coleção?\n` +
  `Importante: esse bônus só será ativado se você clicar em ATIVAR abaixo e selecionar a semana em que poderia vir à loja.\n` +
  `*consulte termos de uso em loja.`

const PREVIEW_MESSAGE =
  `Ooi, Mariana! Aqui é da Vivara Morumbi e temos presente para você: um bônus de até R$ 247,00!\n` +
  `Faz um tempão que você não compra conosco e queremos muito te receber novamente na loja. Que tal conhecer a nossa coleção?\n` +
  `Importante: esse bônus só será ativado se você clicar em ATIVAR abaixo e selecionar a semana em que poderia vir à loja.\n` +
  `*consulte termos de uso em loja.`

/* ── store list ───────────────────────────────────────────────────── */

function StoreList({
  selected,
  onToggle,
  search,
  region,
}: {
  selected: Set<string>
  onToggle: (id: string) => void
  search: string
  region: string
}) {
  const filtered = STORES.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {filtered.map(store => (
        <label
          key={store.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            height: 64,
            borderBottom: '1px solid var(--cds-border-subtle)',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: 12, color: 'var(--crm-fg-neutral-strong)' }}>{store.name}</span>
          <CheckboxIcon checked={selected.has(store.id)} onChange={() => onToggle(store.id)} />
        </label>
      ))}
    </div>
  )
}

function CheckboxIcon({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div
      onClick={e => { e.preventDefault(); onChange() }}
      style={{
        width: 20,
        height: 20,
        borderRadius: 2,
        backgroundColor: checked ? 'var(--crm-btn-primary-bg)' : 'transparent',
        border: checked ? 'none' : '1px solid var(--crm-fg-neutral-weak)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {checked && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="#14171a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  )
}

/* ── WhatsApp preview ────────────────────────────────────────────── */

function WhatsAppPreview() {
  return (
    <div style={{
      width: 558,
      flexShrink: 0,
      border: '1px solid var(--cds-border-subtle)',
      borderRadius: '16px 16px 0 0',
      borderBottom: 'none',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--cds-bg-layer-01)',
    }}>
      {/* phone top bar */}
      <div style={{ backgroundColor: '#003b38', padding: '16px 43px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#fff', overflow: 'hidden', flexShrink: 0 }}>
          <img
            src={`${import.meta.env.BASE_URL}brand/vivara-avatar.png`}
            alt="Vivara"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <span style={{ fontSize: 16, fontWeight: 500, color: '#fff' }}>Vivara</span>
      </div>

      {/* chat area */}
      <div style={{ backgroundColor: '#353e45', padding: 16 }}>
        <div style={{
          backgroundColor: '#25bfb8',
          borderRadius: 16,
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}>
          {PREVIEW_MESSAGE.split('\n').map((line, i) => (
            <p key={i} style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#121416', margin: 0 }}>
              {line}
            </p>
          ))}
          <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.15)', margin: 0 }} />
          <p style={{ fontSize: 16, fontWeight: 600, color: '#003c02', textAlign: 'center', margin: 0 }}>
            Ativar
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── main component ───────────────────────────────────────────────── */

interface CreateCampaignPageProps {
  onCancel: () => void
  onSave: () => void
}

export function CreateCampaignPage({ onCancel, onSave }: CreateCampaignPageProps) {
  const [active, setActive]         = useState(true)
  const [name, setName]             = useState('Última chance – Corre atrás')
  const [bonusPercent, setBonusPct] = useState('20%')
  const [bonusMin, setBonusMin]     = useState('R$ 200,00')
  const [bonusMax, setBonusMax]     = useState('R$ 3.500,00')
  const [volume, setVolume]         = useState('50')
  const [inactMin, setInactMin]     = useState('7 meses')
  const [inactMax, setInactMax]     = useState('36 meses')
  const [reminder, setReminder]     = useState(false)
  const [search, setSearch]         = useState('')
  const [region, setRegion]         = useState('sul')
  const [selectedStores, setSelectedStores] = useState<Set<string>>(
    new Set(['morumbi', 'interlagos'])
  )
  const [template, setTemplate]     = useState('padrao-vivara')

  function toggleStore(id: string) {
    setSelectedStores(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function selectAll() {
    setSelectedStores(new Set(STORES.map(s => s.id)))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>

      {/* scrollable content */}
      <div style={{ flex: 1, padding: '24px 24px 0', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* page title */}
        <h1 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.3, color: 'var(--cds-text-primary)', margin: 0 }}>
          Criar ação
        </h1>

        {/* ── Configurações gerais ─────────────────────────── */}
        <SectionCard title="Configurações gerais">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            <div>
              <div style={{ marginBottom: 8, fontSize: 12, fontWeight: 500, color: 'var(--crm-fg-neutral-strong)' }}>
                Status da campanha
              </div>
              <Switch
                label={active ? 'Campanha Ativada' : 'Campanha Desativada'}
                checked={active}
                onChange={setActive}
              />
            </div>

            <TextInput
              label="Nome da campanha"
              value={name}
              onChange={setName}
              width="100%"
            />

            <FieldRow align="start">
              <TextInput label="Percentual de bônus"              value={bonusPercent} onChange={setBonusPct} mask="percent"  width={140} />
              <TextInput label="Valor mínimo de bônus"            value={bonusMin}     onChange={setBonusMin} mask="currency" width={160} />
              <TextInput label="Valor máximo de bônus"            value={bonusMax}     onChange={setBonusMax} mask="currency" width={160} />
              <TextInput label="Volume de disparos por loja por dia" value={volume}    onChange={setVolume}   mask="integer"  width={220} />
            </FieldRow>

            <FieldRow align="start">
              <TextInput label="Período mínimo de inatividade" value={inactMin} onChange={setInactMin} mask="months" width={200} />
              <TextInput label="Período máximo de inatividade" value={inactMax} onChange={setInactMax} mask="months" width={200} />
            </FieldRow>

          </div>
        </SectionCard>

        {/* ── Lembrete extra ───────────────────────────────── */}
        <SectionCard title="Lembrete extra para Corre Atrás">
          <div>
            <div style={{ marginBottom: 8, fontSize: 12, fontWeight: 500, color: 'var(--crm-fg-neutral-strong)' }}>
              Ativar lembrete?
            </div>
            <Switch
              label={reminder ? 'Lembrete ativado' : 'Lembrete desativado'}
              checked={reminder}
              onChange={setReminder}
            />
          </div>
        </SectionCard>

        {/* ── Lojas ativas ─────────────────────────────────── */}
        <SectionCard title="Lojas ativas">
          <div style={{ width: 689 }}>

            {/* search + filter header */}
            <div style={{
              backgroundColor: 'var(--crm-search-bg)',
              border: '1px solid var(--crm-fg-neutral-weak)',
              borderRadius: '8px 8px 0 0',
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                {/* search input */}
                <div style={{
                  flex: 1,
                  height: 40,
                  backgroundColor: 'var(--crm-search-bg)',
                  border: '1px solid var(--crm-search-border)',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 12,
                  gap: 8,
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <circle cx="7" cy="7" r="5" stroke="var(--crm-fg-neutral-weak)" strokeWidth="1.5" />
                    <path d="M11 11l3 3" stroke="var(--crm-fg-neutral-weak)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Buscar loja"
                    style={{
                      border: 'none',
                      background: 'none',
                      outline: 'none',
                      fontSize: 12,
                      color: 'var(--crm-fg-neutral-strong)',
                      width: '100%',
                    }}
                  />
                </div>

                <SelectInput
                  options={REGION_OPTIONS}
                  value={region}
                  onChange={setRegion}
                  width={200}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  backgroundColor: 'var(--cds-bg-layer-03)',
                  color: 'var(--crm-fg-neutral-strong)',
                  fontSize: 12,
                  fontWeight: 500,
                  padding: '8px 12px',
                  borderRadius: 4,
                }}>
                  {selectedStores.size} {selectedStores.size === 1 ? 'loja selecionada' : 'lojas selecionadas'}
                </span>
                <button
                  onClick={selectAll}
                  style={{ background: 'none', border: 'none', color: 'var(--crm-fg-primary-default)', fontSize: 14, fontWeight: 500, cursor: 'pointer', padding: '8px 16px' }}
                >
                  Selecionar todas
                </button>
              </div>
            </div>

            {/* list */}
            <div style={{
              border: '1px solid var(--crm-fg-neutral-weak)',
              borderTop: 'none',
              borderRadius: '0 0 8px 8px',
              maxHeight: 360,
              overflowY: 'auto',
              backgroundColor: 'var(--cds-bg-layer-02)',
            }}>
              <StoreList
                selected={selectedStores}
                onToggle={toggleStore}
                search={search}
                region={region}
              />
            </div>

          </div>
        </SectionCard>

        {/* ── Configurações de mensagem ─────────────────────── */}
        <SectionCard title="Configurações de mensagem">
          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>

            {/* form */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SelectInput
                label="Template"
                options={TEMPLATE_OPTIONS}
                value={template}
                onChange={setTemplate}
                width="100%"
              />
              <Textarea
                label="Mensagem"
                value={DEFAULT_MESSAGE}
                disabled
                minRows={6}
              />
            </div>

            {/* WhatsApp preview */}
            <WhatsAppPreview />

          </div>
        </SectionCard>

      </div>

      {/* ── Footer ───────────────────────────────────────────── */}
      <div style={{
        borderTop: '1px solid var(--cds-border-subtle)',
        padding: '24px 40px',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 8,
        backgroundColor: 'var(--cds-bg-layer-01)',
        position: 'sticky',
        bottom: 0,
      }}>
        <button
          onClick={onCancel}
          style={{
            height: 48,
            padding: '0 24px',
            backgroundColor: 'transparent',
            border: '1px solid var(--crm-fg-neutral-strong)',
            borderRadius: 4,
            fontSize: 16,
            fontWeight: 500,
            color: 'var(--crm-fg-neutral-strong)',
            cursor: 'pointer',
          }}
        >
          Cancelar
        </button>
        <button
          onClick={onSave}
          style={{
            height: 48,
            padding: '0 32px',
            backgroundColor: 'var(--crm-btn-primary-bg)',
            border: 'none',
            borderRadius: 4,
            fontSize: 16,
            fontWeight: 500,
            color: 'var(--crm-btn-primary-text)',
            cursor: 'pointer',
          }}
        >
          Salvar alterações
        </button>
      </div>

    </div>
  )
}
