const ICON_SRC = 'https://www.figma.com/api/mcp/asset/bfdf3612-9572-495f-ade2-f3744e9bb5fe'

export interface CardIndicadorProps {
  title: string
  value: string | number
  change?: string
  iconSrc?: string
}

export function CardIndicador({ title, value, change = '00%', iconSrc = ICON_SRC }: CardIndicadorProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: 16,
        border: '1px solid var(--cds-color-border-subtle)',
        borderRadius: 8,
        flex: '1 0 0',
        minWidth: 0,
      }}
    >
      <div style={{ flexShrink: 0, width: 40, height: 40, position: 'relative' }}>
        <img
          src={iconSrc}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: 'var(--cds-color-text-primary)', margin: 0, width: '100%' }}>
          {title}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <p style={{ fontSize: 24, fontWeight: 600, lineHeight: '32px', color: 'var(--cds-color-text-primary)', margin: 0, whiteSpace: 'nowrap' }}>
            {value}
          </p>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 32,
              padding: '0 12px',
              backgroundColor: 'rgba(47,55,60,0.2)',
              border: '1px solid #3d464d',
              borderRadius: 999,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: 'var(--cds-color-text-primary)', whiteSpace: 'nowrap' }}>
              {change}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
