# Auditoria técnica — Maré

Data: 06/11/2026. Escopo: home e cardápio. Skill Impeccable invocada explicitamente; auditoria seguida das correções autorizadas.

## Veredito de integridade

Sistema coerente e específico do restaurante: amanhecer, oceano, cozinha, creme e pôr do sol; Cormorant Garamond e DM Sans preservadas. A correção mantém as cenas e a narrativa de rolagem. Nenhum fundo foi adicionado atrás de texto para corrigir contraste.

## Pontuação heurística

| Dimensão | Antes | Após | Evidência |
|---|---:|---:|---|
| Acessibilidade | 2/4 | 3/4 | Indicação de rolagem com contraste corrigido; validação de nome e controles mais legíveis |
| Desempenho | 3/4 | 3/4 | Fontes locais, WebP responsivos, animações limitadas à visibilidade e preferência de movimento |
| Temas/tokens | 3/4 | 3/4 | Paleta existente mantida; alterações usam os tokens existentes |
| Responsividade | 3/4 | 4/4 | Marca e textos do cardápio acomodam ampliação; sem overflow nas larguras medidas |
| Integridade | 3/4 | 4/4 | Estados do formulário e da história verificados; detector sem defeito técnico residual confirmado |
| Total | 14/20 | 17/20 | Bom dentro do escopo Chromium testado |

A pontuação é julgamento técnico, não certificação WCAG ou Lighthouse.

## Problemas encontrados e corrigidos

Quatro achados consolidados: 0 P0, 1 P1, 3 P2. Todos corrigidos.

| Prioridade e achado | Local / impacto | Alteração e evidência |
|---|---|---|
| P1 — Contraste da indicação de rolagem | `src/style.css`, `.scroll-cue`: detector mediu 1,5:1 sobre a área escura da embarcação em 1440×900; prejudicava a leitura, abaixo da referência de 4,5:1 para texto normal | Letras claras no desktop, usando `--cream`; letras marinhas mantidas no celular, onde a região da foto é clara. Detector final não registra baixo contraste. Sem backgrounds, contornos ou sombra novos |
| P2 — Texto funcional pequeno | `src/style.css`, títulos/descrições/preços dos pratos, labels, busca e avisos de demonstração a 10–11 px | Pratos e descrições a 14 px, avisos a 12 px, metadados e filtros legíveis; fontes aprovadas preservadas. WCAG não estabelece um piso geral em px; é melhoria de qualidade de leitura |
| P2 — Marca do catálogo cortada com texto ampliado | `.catalog-header .brand`, layout do cabeçalho e preços na linha do prato; ensaio CSS a 200% cortava a marca | Marca com largura por conteúdo, cabeçalho e cabeçalhos de pratos permitem quebra; ensaio final sem cortes detectados. Risco de refluxo associado a 1.4.4, sem afirmar reprovação formal a partir do ensaio |
| P2 — Prévia de reserva desatualizada e nome só de espaços | `src/main.js`, formulário de reserva: campo required aceitava espaços e mensagem anterior permanecia após edição | Validação nativa com mensagem específica; entrada limpa o estado de validade e a prévia. Testes de nome em branco, correção, conteúdo literal seguro e nova edição aprovados |

## Aspectos preservados

Movimento reduzido, atualização da história também sem animação, foco nos campos, identificação de restaurante fictício, filtros com resultados anunciados, busca sem distinção de acentos, fontes locais e imagens responsivas. Lint e build de produção aprovados.

## Verificação e limites

- Chromium real por CDP, com viewport emulado. As cinco rotas dos dois projetos foram capturadas em 320, 390, 760, 1024 e 1440 px: 25 combinações sem overflow horizontal, imagens quebradas ou cortes geométricos encontrados em escala normal.
- Texto a 200% por CSS em 390 px: as cinco rotas passaram na verificação de overflow e corte horizontal; capturas inspecionadas. É um ensaio, não o zoom nativo do navegador nem certificação WCAG.
- 32 verificações funcionais compartilhadas aprovadas em desktop e mobile: filtros, busca com acentos, vazio e recuperação, persistência e quantidades do carrinho, foco, menu, entrega/retirada, espaços em campos obrigatórios, rascunho seguro e invalidação da prévia.
- Mais 102 verificações de interação aprovadas no script compartilhado de Olivo/Maré, incluindo todas as etapas da história com movimento normal e reduzido e gestos de toque sintetizados. O Kintsuru usa rolagem horizontal nativa; não houve ensaio de gesto físico em iPhone.
- Detector Impeccable executado nas cinco URLs em 390×844 e 1440×900. Resultado final: apenas alertas de paleta creme (um por rota), que correspondem às referências aprovadas; não constituem defeitos desta entrega. Nenhuma configuração de exclusão foi adicionada para esconder resultados. Os alertas de texto pequeno e de contraste encontrados foram corrigidos; os alertas de última palavra isolada desapareceram após text-wrap:pretty.
- Cores corrigidas sem painéis ou backgrounds novos para texto. As fotografias e superfícies de marca foram preservadas.
- Capturas e medições: `../artifacts/mare-kintsuru-audit-before/`, `../artifacts/mare-kintsuru-audit-final/`, `../artifacts/mare-kintsuru-audit-after/` e `../artifacts/mare-kintsuru-functional/`. A infraestrutura visual antiga não está presente; foram usados os scripts CDP compartilhados em `../scripts/`. Artefatos de execução não foram adicionados ao Git.
- Não houve avaliação em Safari/Firefox, leitor de tela, aparelho físico ou Core Web Vitals em campo. Controles inativos de WhatsApp e reservas reais continuam identificados como demonstração; não são tarefas de integração desta auditoria.

## Ordem aplicada

`adapt` e `typeset` para leitura/refluxo, `harden` para recuperação de estados, `optimize` onde necessário e `polish` para conferência final. As recomendações desta auditoria já foram implementadas; os limites de plataformas acima descrevem cobertura ainda não medida, não correções de interface deixadas pela metade.
