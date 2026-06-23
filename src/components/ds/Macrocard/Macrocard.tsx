import { motion } from 'framer-motion'
import { type ReactNode } from 'react'
import { Tag } from '@ds/Tag/Tag'
import { CardIndicador, type CardIndicadorProps } from '@ds/CardIndicador/CardIndicador'

export interface MacrocardProps {
  title: string
  tagLabel?: string
  cards?: CardIndicadorProps[]
  children?: ReactNode
}

export function Macrocard({ title, tagLabel, cards = [], children }: MacrocardProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        borderRadius: 24,
        background: `
          linear-gradient(rgb(20, 23, 26), rgb(20, 23, 26)) padding-box,
          linear-gradient(90deg, rgba(255,187,64,0.65), rgba(34,39,43,0.3)) border-box
        `,
        border: '1px solid transparent',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Halo amber — percorre o card */}
      <motion.div
        aria-hidden
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          width: 576,
          height: 576,
          borderRadius: '50%',
          background: 'rgba(255,187,64,0.08)',
          filter: 'blur(80px)',
        }}
        animate={{
          top:  ['8%',  '8%',  '60%', '60%', '8%'],
          left: ['55%', '75%', '75%', '55%', '55%'],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      {/* Raio rotacionando — glow central branco */}
      <motion.div
        aria-hidden
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '55%',
          height: 64,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
          filter: 'blur(40px)',
          originX: '0%',
          originY: '0%',
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      {/* Shimmer top-left */}
      <motion.div
        aria-hidden
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          top: '4%',
          left: '4%',
          height: 1,
          width: '40%',
          background: 'linear-gradient(to right, rgba(255,255,255,0.22), transparent)',
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Shimmer bottom-right */}
      <motion.div
        aria-hidden
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          bottom: '4%',
          right: '4%',
          height: 1,
          width: '40%',
          background: 'linear-gradient(to left, rgba(255,255,255,0.22), transparent)',
        }}
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '32px 40px 40px 40px' }}>
        {/* Header: title + tag */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
          <p
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 700,
              lineHeight: '28px',
              color: 'var(--cds-color-text-primary)',
            }}
          >
            {title}
          </p>
          {tagLabel && (
            <div style={{ alignSelf: 'flex-start', display: 'inline-flex' }}>
              <Tag label={tagLabel} variant="success" />
            </div>
          )}
        </div>

        {/* Cards row or custom children */}
        <div style={{ display: 'flex', gap: 16 }}>
          {children
            ? children
            : cards.map((card, i) => <CardIndicador key={i} {...card} />)
          }
        </div>
      </div>
    </div>
  )
}
