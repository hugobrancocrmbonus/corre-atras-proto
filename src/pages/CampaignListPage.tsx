import type { CSSProperties } from 'react'
import { ChatWidget } from '../components/ChatWidget'

/* ── mock data (matches Figma) ───────────────────────────────────────── */

interface Campaign {
  id: string
  name: string
  lojas: number
  bonusPercent: string
  bonusMin: string
  bonusMax: string
  volume: number
  inativoMin: string
  inativoMax: string
  status: 'Ativada' | 'Desativada'
}

const MOCK_CAMPAIGNS: Campaign[] = [
  { id: '4321', name: 'Última chance – Corre atrás', lojas: 12, bonusPercent: '20%', bonusMin: 'R$200,00', bonusMax: 'R$400,00', volume: 50,  inativoMin: '7 meses',  inativoMax: '14 meses', status: 'Ativada' },
  { id: '2109', name: 'Campanha de maio',             lojas: 34, bonusPercent: '40%', bonusMin: 'R$100,00', bonusMax: 'R$200,00', volume: 100, inativoMin: '10 meses', inativoMax: '24 meses', status: 'Desativada' },
]

/* ── chat responses focused on Corre Atrás ──────────────────────────── */

function getResponse(input: string): string {
  const q = input.toLowerCase()
  if (q.includes('performou') || q.includes('melhor') || q.includes('resultado'))
    return 'A campanha "Última chance – Corre atrás" (ID 4321) é a melhor: 18% de conversão, 50 disparos/loja/dia e bônus de R$200–R$400. Recomendo manter e ampliar para mais lojas.'
  if (q.includes('resgataram') || q.includes('resgates') || q.includes('conversão') || q.includes('taxa'))
    return 'Taxa de conversão atual: 18% na campanha ativa. A Campanha de maio (ID 2109) está desativada — se reativada com bônus ajustado, pode atingir 15–20% de conversão.'
  if (q.includes('próximos passos') || q.includes('recomenda') || q.includes('o que fazer'))
    return '3 ações recomendadas para o Corre Atrás: 1) Reativar Campanha de maio com bônus mínimo de R$200. 2) Criar nova segmentação para lojas Sul (7–14 meses de inatividade). 3) Aumentar volume de disparos para 75/loja/dia nas top performers.'
  if (q.includes('loja') || q.includes('lojas') || q.includes('volume'))
    return 'As campanhas ativas cobrem 12 lojas com 50 disparos/loja/dia. A zona Sul concentra 58% dos resgates. Recomendo expandir para pelo menos 20 lojas e ajustar volume para 75/dia.'
  if (q.includes('criar') || q.includes('nova ação') || q.includes('nova campanha'))
    return 'Clique em "Criar ação" acima para configurar uma nova campanha. Sugestão de configuração: bônus 20–25%, mínimo R$200, volume 50/loja/dia, inatividade 9–18 meses, lojas Sul prioritárias.'
  if (q.includes('bônus') || q.includes('bonus') || q.includes('percentual'))
    return 'O percentual de bônus mais eficiente é 20% (campanha ativa). A Campanha de maio usa 40% — muito alto para o ticket médio. Recomendo 15–25% para equilibrar conversão e custo.'
  return 'Posso te ajudar com insights sobre as ações do Corre Atrás. Pergunte sobre resultados, recomendações, configurações de bônus ou próximos passos.'
}

const SUGGESTIONS = [
  'Qual campanha performou melhor?',
  'Quantos clientes resgataram?',
  'Qual é a taxa de conversão?',
  'Quais são os próximos passos?',
]

/* ── table styles ────────────────────────────────────────────────────── */

const thStyle: CSSProperties = {
  padding: '16px 16px',
  textAlign: 'left',
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '16px',
  color: 'var(--cds-text-secondary)',
  whiteSpace: 'nowrap',
  backgroundColor: '#22272B',
}

const tdStyle: CSSProperties = {
  padding: '0 16px',
  fontSize: 12,
  fontWeight: 400,
  lineHeight: '64px',
  color: 'var(--cds-text-primary)',
  whiteSpace: 'nowrap',
  borderBottom: '1px solid var(--cds-border-subtle)',
  height: 64,
}

/* ── component ────────────────────────────────────────────────────────── */

interface CampaignListPageProps {
  onCreateCampaign: () => void
  onSelectCampaign: (id: string) => void
}

export function CampaignListPage({ onCreateCampaign, onSelectCampaign }: CampaignListPageProps) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      backgroundColor: 'var(--cds-bg-layer-01)',
    }}>

      {/* page title */}
      <div style={{ padding: '24px 24px 0' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--cds-text-primary)', margin: 0, lineHeight: '40px' }}>
          Corre Atrás
        </h1>
        <p style={{ fontSize: 14, color: 'var(--cds-text-secondary)', margin: '2px 0 0', lineHeight: '20px' }}>
          Seleciona e reativa clientes inativos com alto potencial de retorno
        </p>
      </div>

      {/* ── chat section ──────────────────────────────────────────────── */}
      <div style={{ padding: '0 24px' }}>
        <ChatWidget
          mode="inline"
          title="Quer algum insight sobre o Corre Atrás?"
          subtitle="Peça insights, métricas de campanhas, análise de dados e muito mais."
          suggestions={SUGGESTIONS}
          getResponse={getResponse}
        />
      </div>

      {/* ── table section ──────────────────────────────────────────────── */}
      <div style={{ padding: '0 24px 40px' }}>

        {/* table header */}
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--cds-text-primary)', margin: '0 0 4px' }}>
            Lista de ações
          </h2>
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--cds-text-secondary)', margin: 0 }}>
            Lista de ações criadas com o Agente Corre Atrás
          </p>
        </div>

        {/* search + buttons */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
          <div style={{ flex: 1, display: 'flex' }}>
            <input
              placeholder="Busca"
              style={{
                flex: 1, height: 40, padding: '0 16px',
                backgroundColor: '#22272B', border: '1px solid #58656F',
                borderRight: 'none', borderRadius: '4px 0 0 4px',
                color: 'var(--cds-text-primary)', fontSize: 14, outline: 'none',
                fontFamily: 'inherit',
              }}
            />
            <div style={{
              width: 40, height: 40, backgroundColor: '#22272B',
              border: '1px solid #58656F', borderRadius: '0 4px 4px 0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9eaab3" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </div>
          </div>
          <button style={{
            height: 40, padding: '0 12px', display: 'flex', alignItems: 'center', gap: 8,
            border: '1px solid var(--cds-text-primary)', borderRadius: 4,
            backgroundColor: 'transparent', color: 'var(--cds-text-primary)',
            fontSize: 14, fontWeight: 500, cursor: 'pointer',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filtro
          </button>
          <button
            onClick={onCreateCampaign}
            style={{
              height: 40, padding: '0 12px', display: 'flex', alignItems: 'center', gap: 8,
              border: 'none', borderRadius: 4,
              backgroundColor: '#E69400', color: '#14171A',
              fontSize: 14, fontWeight: 500, cursor: 'pointer',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Criar ação
          </button>
        </div>

        {/* table */}
        <div style={{ overflowX: 'auto', borderRadius: '8px 8px 0 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1100 }}>
            <thead>
              <tr style={{ borderRadius: '8px 8px 0 0', overflow: 'hidden' }}>
                {['ID','Campanha','Qtd. de lojas','% bônus','Bônus mín.','Bônus máx.','Vol. disparos/loja/dia','Inatividade mín.','Inatividade máx.','Status',''].map((col, i) => (
                  <th key={i} style={{
                    ...thStyle,
                    borderRadius: i === 0 ? '8px 0 0 0' : i === 9 ? '0 8px 0 0' : 0,
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_CAMPAIGNS.map(c => (
                <tr key={c.id} style={{ backgroundColor: 'var(--cds-bg-layer-02)' }}>
                  <td style={tdStyle}>{c.id}</td>
                  <td style={{ ...tdStyle, fontWeight: 500 }}>{c.name}</td>
                  <td style={tdStyle}>{c.lojas}</td>
                  <td style={tdStyle}>{c.bonusPercent}</td>
                  <td style={tdStyle}>{c.bonusMin}</td>
                  <td style={tdStyle}>{c.bonusMax}</td>
                  <td style={tdStyle}>{c.volume}</td>
                  <td style={tdStyle}>{c.inativoMin}</td>
                  <td style={tdStyle}>{c.inativoMax}</td>
                  <td style={tdStyle}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontSize: 14, fontWeight: 500,
                      color: c.status === 'Ativada' ? '#81D147' : '#DD3C3C',
                    }}>
                      <span style={{
                        width: 8, height: 8, borderRadius: '50%',
                        backgroundColor: 'currentColor', flexShrink: 0,
                      }} />
                      {c.status}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <button
                      onClick={() => onSelectCampaign(c.id)}
                      style={{
                        background: 'none', border: 'none', padding: 0,
                        fontSize: 12, color: '#80CDE9', cursor: 'pointer',
                        fontWeight: 400,
                      }}
                    >
                      Ver detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
