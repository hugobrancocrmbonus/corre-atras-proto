import type { CSSProperties } from 'react'
import { StatusCell } from '@ds/Table/Table'
import { PerfilTag, type ClienteRow } from './CorreAtrasPage'

/* ── helpers ─────────────────────────────────────────────────────────── */

const gradientBorder: CSSProperties = {
  borderRadius: 24,
  background: `
    linear-gradient(rgb(20, 23, 26), rgb(20, 23, 26)) padding-box,
    linear-gradient(90deg, rgba(255,187,64,0.65), rgba(34,39,43,0.3)) border-box
  `,
  border: '1px solid transparent',
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
      <span style={{ fontSize: 12, fontWeight: 500, color: '#8896A0', lineHeight: '16px' }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--cds-text-primary)', lineHeight: '20px' }}>{children}</span>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--cds-text-primary)', lineHeight: '20px' }}>
        {title}
      </h3>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>{children}</div>
    </div>
  )
}

function buildMessage(client: ClienteRow): string {
  const firstName = client.nome.split(' ')[0]
  return `Ooi, ${firstName}! Aqui é da Vivara Morumbi e temos presente para você: um bônus de até ${client.bonus}!

Faz um tempão que você não compra conosco e queremos muito te receber novamente na loja. Que tal conhecer a nossa coleção?

Importante: esse bônus só será ativado se você clicar em ATIVAR abaixo e selecionar a semana em que poderia vir à loja.

*consulte termos de uso em loja.`
}

/* ── component ───────────────────────────────────────────────────────── */

interface MessageDetailsPageProps {
  client: ClienteRow
  onBack: () => void
}

export function MessageDetailsPage({ client, onBack }: MessageDetailsPageProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100%' }}>

      {/* ── Page header ──────────────────────────────────────────────── */}
      <div style={{ padding: '40px 32px 0 32px' }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            color: '#8896A0', fontSize: 13, fontWeight: 500, marginBottom: 16, fontFamily: 'inherit',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Voltar
        </button>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, lineHeight: '1.3', letterSpacing: '0.56px', color: 'var(--cds-text-primary)' }}>
          Detalhes do envio
        </h1>
        <p style={{ margin: '4px 0 0 0', fontSize: 14, lineHeight: '1.8', color: '#c0c8ce' }}>
          Informações do cliente e a mensagem enviada
        </p>
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div style={{ padding: '24px 32px 40px 32px' }}>
        <div style={{ ...gradientBorder, display: 'flex', gap: 0, overflow: 'hidden' }}>

          {/* ── Left: Dados do cliente ─────────────────────────────── */}
          <div style={{ flex: '1 1 0', minWidth: 0, padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 28 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--cds-text-primary)' }}>
              Dados do cliente
            </h2>

            <Section title="Dados pessoais">
              <Field label="ID">{client.id}</Field>
              <Field label="Nome">{client.nome}</Field>
              <Field label="Telefone">{client.telefone}</Field>
            </Section>

            <Section title="Status do cliente">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: '#8896A0', lineHeight: '16px' }}>Perfil</span>
                <PerfilTag label={client.perfil} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: '#8896A0', lineHeight: '16px' }}>Status</span>
                <StatusCell label={client.status} />
              </div>
            </Section>

            <Section title="Detalhes de ausência">
              <Field label="Última compra">{client.ultimaCompra}</Field>
              <Field label="Dias ausente">{client.diasAusente}</Field>
              <Field label="Visitas">{client.visitas}</Field>
            </Section>

            <Section title="Dados financeiros">
              <Field label="Ticket">{client.ticket}</Field>
              <Field label="Ticket histórico">{client.totalHistorico}</Field>
              <Field label="Bônus">{client.bonus}</Field>
            </Section>
          </div>

          {/* ── Right: Mensagem enviada ────────────────────────────── */}
          <div style={{ flex: '0 0 526px', maxWidth: 526, padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--cds-text-primary)' }}>
              Mensagem enviada
            </h2>

            {/* WhatsApp mockup */}
            <div style={{
              flex: 1, border: '1px solid #8d9ba5', borderRadius: '16px 16px 0 0',
              overflow: 'hidden', display: 'flex', flexDirection: 'column',
              backgroundColor: '#121416', paddingTop: 16, paddingLeft: 32, paddingRight: 32, gap: 16,
            }}>
              {/* Chat handle */}
              <div style={{ display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: 144, height: 8, borderRadius: 8, backgroundColor: '#353e45' }} />
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
                {/* Header */}
                <div style={{ backgroundColor: '#003b38', padding: '16px 43px', display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#fff', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={`${import.meta.env.BASE_URL}brand/vivara-avatar.png`} alt="Vivara" style={{ width: '110%', height: '110%', objectFit: 'cover' }} />
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 500, lineHeight: '24px', color: '#fff' }}>Vivara</span>
                </div>

                {/* Chat body */}
                <div style={{ flex: 1, backgroundColor: '#353e45', padding: 16, overflowY: 'auto' }} className="dark-scroll">
                  <div style={{
                    backgroundColor: '#25bfb8', borderRadius: 16, padding: 16,
                    display: 'flex', flexDirection: 'column', gap: 10,
                    boxShadow: '0px 8px 16px rgba(16,24,40,0.1), 0px 20px 40px rgba(16,24,40,0.16)', width: '100%',
                  }}>
                    <p style={{ margin: 0, fontSize: 16, lineHeight: '24px', color: '#121416', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                      {buildMessage(client)}
                    </p>
                    <div style={{ borderTop: '1px solid rgba(0,0,0,0.2)', paddingTop: 10, textAlign: 'center' }}>
                      <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', color: '#003c02' }}>Ativar</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
