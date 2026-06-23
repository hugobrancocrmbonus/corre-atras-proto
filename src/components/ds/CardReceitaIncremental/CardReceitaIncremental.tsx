import { useState, useRef, useEffect } from 'react'

const ICON_SRC = 'https://www.figma.com/api/mcp/asset/3c774f7c-d631-4eae-a6c0-1822514ab1b4'

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
const VALUES = [0.55, 0.61, 0.58, 0.72, 0.81, 0.65, 0.90, 0.95, 0.78, 0.70, 0.63, 0.75]
// Display values for the tooltip
const DISPLAY_VALUES = [
  'R$142k', 'R$158k', 'R$150k', 'R$187k', 'R$210k', 'R$169k',
  'R$234k', 'R$247k', 'R$203k', 'R$182k', 'R$164k', 'R$195k',
]

function buildPath(pts: [number, number][]): string {
  if (pts.length < 2) return ''
  const d: string[] = [`M ${pts[0][0]},${pts[0][1]}`]
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i]
    const [x1, y1] = pts[i + 1]
    const cpx = (x0 + x1) / 2
    d.push(`C ${cpx},${y0} ${cpx},${y1} ${x1},${y1}`)
  }
  return d.join(' ')
}

function WaveChart() {
  const [hovered, setHovered] = useState<number | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(530)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(entries => {
      setContainerWidth(entries[0].contentRect.width)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const W = 530
  const H = 110
  const padLeft = 38
  const padRight = 18
  const padTop = 14
  const padBottom = 20

  // Scale factor: how many viewBox units = 1 screen pixel
  const scale = containerWidth / W
  // Font sizes that always render at ~12px and ~11px on screen
  const fzMonth = Math.round(10.56 / scale)
  const chartW = W - padLeft - padRight
  const chartH = H - padTop - padBottom

  const pts: [number, number][] = VALUES.map((v, i) => {
    const x = padLeft + (i / (MONTHS.length - 1)) * chartW
    const y = padTop + (1 - v) * chartH
    return [x, y]
  })

  const linePath = buildPath(pts)
  const areaPath =
    linePath +
    ` L ${pts[pts.length - 1][0]},${padTop + chartH} L ${pts[0][0]},${padTop + chartH} Z`

  const gridYs = [
    { label: '10%', y: padTop },
    { label: '5%',  y: padTop + chartH / 2 },
    { label: '0%',  y: padTop + chartH },
  ]

  const hPt = hovered !== null ? pts[hovered] : null

  return (
    <div ref={wrapRef} style={{ width: '100%' }}>
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: '100%', height: 'auto', display: 'block', cursor: 'crosshair' }}
      aria-label="Gráfico de receita incremental Jan–Dez"
    >
      <defs>
        <linearGradient id="amberAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#ffbb40" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffbb40" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {gridYs.map(({ label, y }) => (
        <line
          key={label}
          x1={padLeft} y1={y} x2={W - padRight} y2={y}
          stroke="#3D464D" strokeWidth="0.75" strokeDasharray="3 4"
        />
      ))}

      {/* Area fill */}
      <path d={areaPath} fill="url(#amberAreaGrad)" />

      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke="#ffbb40"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Hover: vertical line + tooltip */}
      {hPt && hovered !== null && (
        <g>
          <line
            x1={hPt[0]} y1={padTop}
            x2={hPt[0]} y2={padTop + chartH}
            stroke="#ffbb40"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.6"
          />
          {/* Tooltip box */}
          <rect
            x={hPt[0] - 26}
            y={hPt[1] - 24}
            width={52}
            height={18}
            rx="4"
            fill="#1e2427"
            stroke="rgba(255,187,64,0.4)"
            strokeWidth="0.8"
          />
          <text
            x={hPt[0]}
            y={hPt[1] - 11}
            textAnchor="middle"
            fontSize="10"
            fill="#ffbb40"
            fontWeight="600"
            fontFamily="Inter, sans-serif"
          >
            {DISPLAY_VALUES[hovered]}
          </text>
          {/* Dot */}
          <circle cx={hPt[0]} cy={hPt[1]} r="3.5" fill="#ffbb40" />
          <circle cx={hPt[0]} cy={hPt[1]} r="6" fill="rgba(255,187,64,0.2)" />
        </g>
      )}

      {/* Month labels */}
      {pts.map(([x], i) => (
        <text
          key={MONTHS[i]}
          x={x}
          y={H - 8}
          textAnchor="middle"
          fontSize={fzMonth}
          fill={hovered === i ? '#ffbb40' : '#7b91b0'}
          fontWeight="500"
          fontFamily="Inter, sans-serif"
        >
          {MONTHS[i]}
        </text>
      ))}

      {/* Invisible hover zones over each data point */}
      {pts.map(([x], i) => {
        const colW = chartW / (MONTHS.length - 1)
        return (
          <rect
            key={i}
            x={x - colW / 2}
            y={padTop}
            width={colW}
            height={chartH}
            fill="transparent"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
        )
      })}
    </svg>
    </div>
  )
}

export interface CardReceitaIncrementalProps {
  title?: string
  value?: string
  period?: string
}

export function CardReceitaIncremental({
  title  = 'Receita incremental',
  value  = 'R$ 236,45',
  period = 'Últimos 30 dias',
}: CardReceitaIncrementalProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: 16,
        overflow: 'hidden',
        position: 'relative',
        minHeight: 90,
        width: '100%',
      }}
    >
      {/* Icon */}
      <div style={{ flexShrink: 0, width: 40, height: 40 }}>
        <img src={ICON_SRC} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0, width: 200 }}>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 500, lineHeight: '16px', color: 'var(--cds-color-text-primary)' }}>
          {title} <span style={{ color: 'var(--cds-color-icon-secondary)' }}>({period})</span>
        </p>
        <p style={{ margin: 0, fontSize: 24, fontWeight: 600, lineHeight: '32px', color: 'var(--cds-color-text-primary)', whiteSpace: 'nowrap' }}>
          {value}
        </p>
      </div>

      {/* Wave chart */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <WaveChart />
      </div>
    </div>
  )
}
