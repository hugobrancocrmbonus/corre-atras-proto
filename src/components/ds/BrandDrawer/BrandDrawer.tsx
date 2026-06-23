import { useState, useEffect, useRef } from 'react'
import { Selector } from '@ds/Selector/Selector'

export interface Brand {
  id: string
  name: string
  csResponsavel?: string
  logoSrc?: string
}

export interface BrandDrawerProps {
  isOpen: boolean
  onClose: () => void
  brands: Brand[]
  selectedBrandId?: string
  onConfirm: (brand: Brand) => void
  /** "enabled" = selecionando pela primeira vez | "change" = já tem marca, trocando */
  mode?: 'enabled' | 'change'
}

export function BrandDrawer({
  isOpen,
  onClose,
  brands,
  selectedBrandId,
  onConfirm,
  mode = 'enabled',
}: BrandDrawerProps) {
  const [activeTab, setActiveTab] = useState<'mine' | 'all'>('mine')
  const [search, setSearch] = useState('')
  const [pendingId, setPendingId] = useState<string | undefined>(selectedBrandId)
  const searchRef = useRef<HTMLInputElement>(null)

  // Foca no campo de busca ao abrir
  useEffect(() => {
    if (isOpen) {
      setPendingId(selectedBrandId)
      setTimeout(() => searchRef.current?.focus(), 200)
    }
  }, [isOpen, selectedBrandId])

  // Fecha com Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const filtered = brands.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase())
  )

  const pendingBrand = brands.find(b => b.id === pendingId)
  const canConfirm = Boolean(pendingId)

  const confirmLabel = mode === 'change' ? 'Trocar marca' : 'Selecionar marca'

  function handleConfirm() {
    if (pendingBrand) {
      onConfirm(pendingBrand)
      onClose()
    }
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        aria-hidden
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          backgroundColor: 'rgba(0,0,0,0.56)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal
        aria-label="Selecionar marca"
        className="fixed top-0 right-0 z-50 flex flex-col h-full transition-transform duration-300 ease-in-out"
        style={{
          width: 443,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* ── Header: título + fechar ─────────────────────────────────── */}
        <div
          className="flex items-center justify-between shrink-0 overflow-hidden"
          style={{
            padding: '24px 22px',
            backgroundColor: 'var(--cds-color-background-layer-02)',
            borderBottom: '1px solid var(--cds-color-border-subtle)',
          }}
        >
          <span
            className="text-[16px] font-semibold leading-[1.5] truncate"
            style={{
              color: 'var(--cds-color-text-primary)',
              letterSpacing: '0.32px',
            }}
          >
            Trocar marca
          </span>

          <button
            onClick={onClose}
            className="flex items-center justify-center shrink-0 bg-transparent border-none cursor-pointer"
            style={{ width: 44, height: 44 }}
            aria-label="Fechar"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="var(--cds-color-text-primary)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* ── Barra de busca + tabs ───────────────────────────────────── */}
        <div
          className="flex flex-col shrink-0"
          style={{
            paddingTop: 16,
            paddingLeft: 16,
            paddingRight: 16,
            backgroundColor: 'var(--cds-color-background-layer-02)',
            borderLeft: '1px solid var(--cds-color-border-subtle)',
            borderRight: '1px solid var(--cds-color-border-subtle)',
            borderBottom: '1px solid var(--cds-color-border-subtle)',
          }}
        >
          {/* Search input */}
          <div className="mb-0" style={{ paddingBottom: 16 }}>
            <div
              className="flex items-center h-[40px] overflow-hidden"
              style={{
                borderRadius: 'var(--cds-border-radius-sm)',
                backgroundColor: 'var(--cds-color-background-field)',
                border: '1px solid var(--cds-color-border-subtle)',
              }}
            >
              {/* Ícone lupa */}
              <div className="flex items-center justify-center shrink-0" style={{ width: 40, height: 40 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <circle cx="7" cy="7" r="4.5" stroke="var(--cds-color-icon-secondary)" strokeWidth="1.3" />
                  <path d="M10.5 10.5L13.5 13.5" stroke="var(--cds-color-icon-secondary)" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
              <input
                ref={searchRef}
                type="text"
                placeholder="Busque por marca"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 min-w-0 bg-transparent border-none outline-none text-[12px] leading-[16px]"
                style={{
                  color: 'var(--cds-color-text-primary)',
                  caretColor: 'var(--cds-color-brand-text)',
                }}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center">
            {(['mine', 'all'] as const).map(tab => {
              const isActive = activeTab === tab
              const label = tab === 'mine' ? 'Minhas marcas' : 'Todas as marcas'
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="relative flex items-center justify-center bg-transparent border-none cursor-pointer"
                  style={{
                    height: 48,
                    padding: '12px 16px',
                  }}
                >
                  <span
                    className="text-[14px] leading-[20px] font-medium whitespace-nowrap"
                    style={{
                      color: isActive
                        ? 'var(--cds-color-brand-text)'
                        : 'var(--cds-color-text-primary)',
                    }}
                  >
                    {label}
                  </span>
                  {/* Indicador ativo */}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0"
                      style={{
                        height: 2,
                        borderRadius: '2px 2px 0 0',
                        backgroundColor: 'var(--cds-color-brand-text)',
                      }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Lista de marcas (scrollável) ────────────────────────────── */}
        <div
          className="flex-1 overflow-y-auto flex flex-col gap-[10px]"
          style={{
            padding: '16px 18px',
            backgroundColor: 'var(--cds-color-background-layer-01)',
          }}
        >
          {filtered.length === 0 ? (
            <p
              className="text-[14px] text-center py-8"
              style={{ color: 'var(--cds-color-icon-secondary)' }}
            >
              Nenhuma marca encontrada.
            </p>
          ) : (
            filtered.map(brand => (
              <Selector
                key={brand.id}
                brandName={brand.name}
                csResponsavel={brand.csResponsavel}
                logoSrc={brand.logoSrc}
                state={pendingId === brand.id ? 'pressed' : 'default'}
                onClick={() => setPendingId(brand.id)}
              />
            ))
          )}
        </div>

        {/* ── Footer: Cancelar + Confirmar ────────────────────────────── */}
        <div
          className="flex items-center justify-end gap-4 shrink-0 overflow-hidden"
          style={{
            padding: '24px 22px',
            backgroundColor: 'var(--cds-color-background-layer-02)',
            border: '1px solid var(--cds-color-border-subtle)',
          }}
        >
          {/* Cancelar */}
          <button
            onClick={onClose}
            className="flex items-center justify-center h-[48px] px-4 bg-transparent cursor-pointer"
            style={{
              borderRadius: 'var(--cds-border-radius-sm)',
              border: '1px solid var(--cds-color-text-primary)',
            }}
          >
            <span
              className="text-[14px] leading-[20px] font-medium whitespace-nowrap"
              style={{ color: 'var(--cds-color-text-primary)' }}
            >
              Cancelar
            </span>
          </button>

          {/* Confirmar */}
          <button
            onClick={handleConfirm}
            disabled={!canConfirm}
            className="flex items-center justify-center h-[48px] px-4 cursor-pointer"
            style={{
              borderRadius: 'var(--cds-border-radius-sm)',
              backgroundColor: 'var(--cds-color-brand-background)',
              border: 'none',
              opacity: canConfirm ? 1 : 0.3,
              cursor: canConfirm ? 'pointer' : 'not-allowed',
            }}
          >
            <span
              className="text-[14px] leading-[20px] font-medium whitespace-nowrap"
              style={{ color: 'var(--cds-color-text-on-brand)' }}
            >
              {confirmLabel}
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
