import { useEffect, useRef, useState, type ReactNode } from 'react'

export interface TableColumn<T> {
  key: keyof T | string
  label: string
  width?: number | string
  render?: (row: T) => ReactNode
  align?: 'left' | 'center' | 'right'
}

export interface TableRowAction<T> {
  label: string
  onClick: (row: T) => void
}

export interface TableProps<T extends Record<string, unknown>> {
  columns: TableColumn<T>[]
  rows: T[]
  onSearch?: (q: string) => void
  searchQuery?: string
  /** Itens do menu (kebab) por linha. Se omitido, o kebab não abre menu. */
  rowActions?: TableRowAction<T>[]
}

const STATUS_COLORS: Record<string, string> = {
  Enviado:   '#7a8994',
  Ativado:   '#4db6a3',
  Resgatado: '#81d147',
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function FunnelIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 3h12M4 8h8M6 13h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export function Table<T extends Record<string, unknown>>({ columns, rows, onSearch, searchQuery = '', rowActions }: TableProps<T>) {
  const [openRow, setOpenRow] = useState<number | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (openRow === null) return
    function onDocClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenRow(null)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [openRow])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Header toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          paddingBottom: 16,
        }}
      >
        {/* Search */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            height: 40,
            backgroundColor: 'var(--crm-search-bg)',
            border: '1px solid var(--crm-search-border)',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <input
            type="text"
            placeholder="Busca"
            value={searchQuery}
            onChange={e => onSearch?.(e.target.value)}
            style={{
              flex: 1,
              height: '100%',
              padding: '0 16px',
              background: 'none',
              border: 'none',
              outline: 'none',
              fontSize: 14,
              color: 'var(--crm-fg-neutral-strong)',
              caretColor: '#ffbb40',
            }}
          />
          <div
            style={{
              flexShrink: 0,
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderLeft: '1px solid var(--crm-search-border)',
              color: 'var(--crm-fg-neutral-weak)',
            }}
          >
            <SearchIcon />
          </div>
        </div>

        {/* Filtro button */}
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            height: 40,
            padding: '0 12px',
            background: 'none',
            border: '1px solid var(--crm-fg-neutral-strong)',
            borderRadius: 4,
            cursor: 'pointer',
            color: 'var(--crm-fg-neutral-strong)',
            fontSize: 14,
            fontWeight: 500,
            whiteSpace: 'nowrap',
          }}
        >
          <FunnelIcon />
          Filtro
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
          }}
        >
          {/* Head */}
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={String(col.key)}
                  style={{
                    padding: '0 12px',
                    height: 56,
                    width: col.width,
                    textAlign: col.align ?? 'left',
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: '16px',
                    color: 'var(--crm-fg-neutral-weak)',
                    borderBottom: '1px solid var(--cds-border-subtle)',
                    borderTop: '1px solid var(--cds-border-subtle)',
                    backgroundColor: 'var(--cds-bg-layer-01)',
                    whiteSpace: 'nowrap',
                    userSelect: 'none',
                  }}
                >
                  {col.label}
                </th>
              ))}
              {/* Actions header */}
              <th
                style={{
                  padding: '0 12px',
                  height: 56,
                  width: 48,
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: 500,
                  lineHeight: '16px',
                  color: 'var(--crm-fg-neutral-weak)',
                  borderBottom: '1px solid var(--cds-border-subtle)',
                  borderTop: '1px solid var(--cds-border-subtle)',
                  backgroundColor: 'var(--cds-bg-layer-01)',
                }}
              />
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                style={{ transition: 'background 0.1s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--cds-bg-layer-02)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {columns.map(col => (
                  <td
                    key={String(col.key)}
                    style={{
                      padding: '0 12px',
                      height: 64,
                      textAlign: col.align ?? 'left',
                      fontSize: 12,
                      fontWeight: 400,
                      lineHeight: '20px',
                      color: 'var(--crm-fg-neutral-strong)',
                      borderBottom: '1px solid var(--cds-border-subtle)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {col.render ? col.render(row) : String(row[col.key] ?? '')}
                  </td>
                ))}
                {/* Kebab menu */}
                <td
                  style={{
                    padding: '0 12px',
                    height: 64,
                    textAlign: 'center',
                    borderBottom: '1px solid var(--cds-border-subtle)',
                    position: 'relative',
                  }}
                >
                  <button
                    style={{
                      width: 32,
                      height: 32,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--crm-fg-neutral-weak)',
                      fontSize: 18,
                      lineHeight: 1,
                      borderRadius: 4,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--crm-fg-neutral-strong)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--crm-fg-neutral-weak)')}
                    onClick={() => rowActions?.length && setOpenRow(openRow === ri ? null : ri)}
                    aria-label="Ações"
                  >
                    ⋮
                  </button>

                  {openRow === ri && rowActions?.length ? (
                    <div
                      ref={menuRef}
                      style={{
                        position: 'absolute',
                        top: 48,
                        right: 12,
                        zIndex: 20,
                        minWidth: 160,
                        backgroundColor: 'var(--cds-bg-layer-02, #22272b)',
                        border: '1px solid var(--cds-border-subtle, #353e45)',
                        borderRadius: 8,
                        boxShadow: '0 8px 24px -6px rgba(0,0,0,0.5)',
                        overflow: 'hidden',
                        textAlign: 'left',
                      }}
                    >
                      {rowActions.map(action => (
                        <button
                          key={action.label}
                          onClick={() => { setOpenRow(null); action.onClick(row) }}
                          style={{
                            display: 'block',
                            width: '100%',
                            textAlign: 'left',
                            padding: '10px 16px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: 13,
                            color: 'var(--cds-text-primary)',
                            fontFamily: 'inherit',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)')}
                          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination stub */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 0',
          borderTop: '1px solid var(--cds-border-subtle)',
          fontSize: 13,
          color: 'var(--crm-fg-neutral-weak)',
        }}
      >
        <span>{rows.length} registros</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {[1, 2, 3].map(p => (
            <button
              key={p}
              style={{
                width: 32,
                height: 32,
                border: p === 1 ? '1px solid #ffbb40' : '1px solid var(--cds-border-subtle)',
                borderRadius: 4,
                background: p === 1 ? 'rgba(255,187,64,0.12)' : 'none',
                color: p === 1 ? '#ffbb40' : 'var(--crm-fg-neutral-weak)',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: p === 1 ? 600 : 400,
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function StatusCell({ label }: { label: string }) {
  const color = STATUS_COLORS[label] ?? '#7a8994'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: color,
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 12, color }}>{label}</span>
    </div>
  )
}
