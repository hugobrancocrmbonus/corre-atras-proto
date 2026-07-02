import { ChatWidget } from '../components/ChatWidget'

function getResponse(input: string): string {
  const q = input.toLowerCase()

  if (q.includes('segmentação') || q.includes('segmento'))
    return 'Para criar uma segmentação, acesse o módulo Corre Atrás e clique em "Criar ação". Você configura período de inatividade, ticket mínimo, lojas participantes e parâmetros de bônus. Segmentações com inatividade de 9–18 meses têm historicamente a melhor conversão da plataforma.'

  if (q.includes('receita incremental') || q.includes('receita'))
    return 'A receita incremental acumulada nas campanhas ativas este trimestre é de R$ 188.500, contra uma meta de R$ 250.000 (75% do objetivo). O Agente Corre Atrás responde por 100% desse resultado. Para acessar o detalhamento por campanha, entre no módulo Corre Atrás.'

  if (q.includes('módulo') || q.includes('indicado') || q.includes('qual usar'))
    return 'A plataforma tem hoje o módulo Corre Atrás, focado em reativação de clientes inativos via bônus progressivo. É o módulo com melhor ROI comprovado (97%) para marcas com base de clientes inativa acima de 6 meses. Novos módulos de nutrição e upsell estão previstos para os próximos trimestres.'

  if (q.includes('próximos passos') || q.includes('o que fazer') || q.includes('recomenda'))
    return 'Recomendações para maximizar os resultados na plataforma: 1) Revise as campanhas ativas no Corre Atrás e ajuste o bônus mínimo para R$ 200 nas lojas com ticket médio alto. 2) Crie uma nova segmentação focada em clientes com 9–18 meses de inatividade. 3) Acompanhe a taxa de conversão semanal — o benchmark da plataforma é 16%.'

  if (q.includes('corre atrás') || q.includes('campanha') || q.includes('ação'))
    return 'O Agente Corre Atrás é o módulo de reativação da plataforma. Ele identifica clientes inativos e envia ofertas personalizadas via WhatsApp. Atualmente, há 2 campanhas configuradas com taxa de conversão média de 18% e ROI de 97%. Acesse o menu Agentes IA para ver os detalhes.'

  if (q.includes('cliente') || q.includes('base') || q.includes('perfil'))
    return 'O perfil médio dos clientes reativados pela plataforma: faixa etária 32–45 anos, inatividade de 14 meses no momento do envio, ticket médio de R$ 520. Clientes reativados tendem a comprar 1,8x nos 6 meses seguintes ao primeiro resgate.'

  if (q.includes('roi') || q.includes('retorno') || q.includes('resultado'))
    return 'O ROI consolidado da plataforma neste trimestre é de 97% — cada R$ 1 investido em bônus retornou R$ 1,97 em receita incremental. O custo total em bônus foi de R$ 95.700 e a receita gerada foi R$ 188.500.'

  if (q.includes('loja') || q.includes('lojas') || q.includes('unidade'))
    return 'A plataforma opera em 12 lojas ativas no Agente Corre Atrás. As lojas da zona Sul concentram 58% dos resgates e têm a melhor taxa de conversão (23% na loja Morumbi). Recomendo ampliar o alcance para mais 8 lojas da região para otimizar os resultados.'

  return 'Sou o Consultor IA da plataforma CRMBonus. Posso te ajudar com insights sobre os módulos disponíveis, métricas gerais, recomendações de segmentação, receita incremental e próximos passos estratégicos. O que você precisa saber?'
}

const SUGGESTIONS = [
  'Quero criar uma segmentação',
  'Qual é a receita incremental atual?',
  'Qual é o módulo mais indicado?',
  'Quais são os próximos passos?',
]

export function ConsultorPage() {
  return (
    <ChatWidget
      mode="full-page"
      title="O que você precisa saber sobre o cliente?"
      subtitle="Utilize nossa IA e peça insights, próximos passos, análise dos números, etc."
      suggestions={SUGGESTIONS}
      getResponse={getResponse}
    />
  )
}
