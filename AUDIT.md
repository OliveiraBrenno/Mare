# Auditoria técnica — Maré

Data: 2 de novembro de 2026. Escopo: landing page atual, sem alterações de implementação.

## Veredito de integridade

**Passa quanto à coerência do produto.** A composição da pesca ao prato, o cardápio e a reserva simulada formam uma experiência específica para o restaurante. A auditoria identificou problemas técnicos que precisam de correção; este resultado não equivale a uma certificação WCAG.

## Saúde: 11/20 — aceitável, com trabalho significativo pendente

| Dimensão | Nota | Evidência principal |
|---|---:|---|
| Acessibilidade | 2/4 | Movimento automático sem controle de pausa |
| Desempenho | 2/4 | 10,39 MiB de imagens disponíveis; atualizações em repouso |
| Tematização | 2/4 | Tokens principais presentes, valores auxiliares dispersos |
| Responsividade | 2/4 | Cabeçalho excede a largura em 601 px |
| Integridade de implementação | 3/4 | Identidade coerente, documentação parcial dos valores reais |
| **Total** | **11/20** | **Aceitável** |

Foram agrupados **8 problemas: 0 P0, 2 P1, 5 P2 e 1 P3**. Avisos repetidos do detector não foram contados como problemas independentes.

## Achados priorizados

### 1. [P1] Movimento automático sem controle de pausa

- Local: `src/main.js:80`, `src/style.css:2` — ondas, luz, partículas e indicação de rolagem.
- Categoria: acessibilidade.
- Evidência: o caminho SVG mudou após 6,1 segundos sem rolagem; a interface não oferece pausa. `prefers-reduced-motion` funciona, mas exige uma preferência externa à página.
- Impacto: usuários que se distraem com movimento não conseguem interrompê-lo enquanto leem.
- Referência: WCAG 2.2.2, nível A, para movimento que inicia automaticamente, dura mais de cinco segundos e acompanha outro conteúdo.
- Recomendação: oferecer controle acessível e persistente para pausar/retomar o movimento ambiente, preservando o conteúdo e a narrativa. Não remover as animações que o usuário aprovou.
- Comando: `$impeccable animate`.
- Fonte: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html

### 2. [P1] Acesso à reserva ultrapassa a tela em larguras intermediárias

- Local: `src/style.css:2`, `src/style.css:5`, `src/style.css:6` — cabeçalho e breakpoint da navegação.
- Categoria: responsividade.
- Evidência: em 601 px, `scrollWidth` = 703 px. A ação “Reserve sua mesa” termina em x=702,88, fora do viewport. O menu reaparece acima de 600 px sem espaço suficiente.
- Impacto: a ação principal fica parcialmente fora da área visível; o recorte horizontal do body não resolve a falta de espaço.
- Recomendação: antecipar o recolhimento da navegação ou permitir um arranjo que preserve marca, links e reserva nessa faixa. Verificar também 602–767 px e os limites dos breakpoints.
- Comando: `$impeccable adapt`.

### 3. [P2] Imagens excessivamente pesadas, sem variantes responsivas

- Local: `public/coral.png`, `public/prato-recortado.png`, imagens do cardápio e fundos em `src/style.css:2–3`.
- Categoria: desempenho.
- Evidência: soma dos arquivos de imagem em public = 10.891.776 bytes (10,39 MiB). Os dois PNGs transparentes somam 6.113.568 bytes (5,83 MiB). As imagens usam uma única resolução; fundos de seções inferiores não têm carregamento adiado explícito. A repetição do coral usa a mesma URL e não deve ser contada como três downloads.
- Impacto: maior custo de dados e tempo de carregamento em celulares. A medida é de arquivos disponíveis, não uma alegação de transferência inicial: a sessão de navegador tinha cache e respostas 304.
- Recomendação: produzir WebP/AVIF preservando alfa, definir variantes com srcset/sizes e tamanhos adequados ao uso, carregar fundos inferiores quando necessários e priorizar a imagem de abertura.
- Comando: `$impeccable optimize`.

### 4. [P2] Loop de animação atualiza estilos em repouso fora das cenas

- Local: `src/main.js:63–100`.
- Categoria: desempenho.
- Evidência: em repouso no rodapé, medição CDP de dois segundos registrou 128 recálculos de estilo, zero layouts e aproximadamente 52 ms de TaskDuration. O loop continua consultando retângulos e reatribuindo currentTime às animações mesmo fora de cena. As partículas e ondas já são condicionadas à visibilidade do oceano.
- Impacto: trabalho desnecessário, com potencial custo de energia; não foi comprovada queda de FPS nem layout thrashing nesta execução.
- Recomendação: atualizar animações de rolagem sob demanda, agrupar leituras antes das escritas e executar o loop ambiente apenas enquanto a cena correspondente estiver visível. Manter o retorno correto ao reabrir a aba.
- Comando: `$impeccable optimize`.

### 5. [P2] Ampliação do texto expõe dimensões rígidas do hero

- Local: `src/style.css:6` — hero com altura mínima/fixa, conteúdo posicionado e cabeçalho em uma linha.
- Categoria: responsividade e acessibilidade.
- Evidência: em 390 px, dobrar os tamanhos de fonte computados gerou largura de conteúdo de 437 px e recorte/sobreposição no cabeçalho e no título. Captura: `.impeccable/review/audit-text200.png`.
- Impacto: risco de perda de leitura e acesso às ações para usuários que ampliam texto.
- Limite: teste por substituição dos tamanhos computados em CSS; não foi zoom nativo do navegador nem prova formal isolada de falha em WCAG 1.4.4.
- Recomendação: permitir crescimento vertical do conteúdo e reorganização do cabeçalho. Revalidar com zoom/texto a 200% no navegador real.
- Comando: `$impeccable adapt`.

### 6. [P2] Valores visuais auxiliares fora dos tokens e documentação incompleta

- Local: `src/style.css:2–6`, front matter de `DESIGN.md`.
- Categoria: tematização/integridade.
- Evidência: há variáveis para a paleta principal, mas valores como #be964d, #b69454, #a79b84 e várias transparências estão escritos diretamente. O detector produziu 24 avisos de cor e 17 de tipografia, incluindo repetidos e falsos positivos. Tamanhos como 12px e 13px são explicados no texto do DESIGN.md, mas não estão na lista estruturada que o detector interpreta.
- Impacto: manutenção e futuras variações ficam mais frágeis; a auditoria automatizada confunde escolhas documentadas em prosa com desvios reais.
- Recomendação: centralizar cores auxiliares em tokens semânticos e alinhar a descrição estruturada às decisões reais. Não redesenhar a paleta aprovada. Não há requisito de modo escuro neste produto; sua ausência não é defeito.
- Comando: `$impeccable document`.

### 7. [P2] Links do rodapé têm área de toque baixa

- Local: `src/style.css:3`, `src/style.css:6`, `index.html:16`.
- Categoria: responsividade/acessibilidade.
- Evidência: em 390 px, os links do rodapé medem aproximadamente 17,59 px de altura; o CTA do cabeçalho mede 39,59 px de altura. As distâncias observadas entre os links permitem a exceção de espaçamento do mínimo de 24 px; não foi classificado como violação WCAG AA comprovada.
- Impacto: selecionar links pode ser difícil em telas de toque, apesar do espaçamento suficiente entre controles.
- Recomendação: ampliar padding ou altura mínima dos alvos para cerca de 44 px sem ampliar a tipografia e sem modificar a composição geral.
- Comando: `$impeccable adapt`.
- Fonte: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html

### 8. [P3] Fontes externas descobertas por @import

- Local: `src/style.css:1`.
- Categoria: desempenho.
- Evidência: o CSS importa Google Fonts; os WOFF2 só são descobertos depois da folha externa. Há fallback e display=swap.
- Impacto: dependência de outra origem e possível atraso/troca de tipografia na abertura; não houve medição fria que quantificasse CLS ou LCP.
- Recomendação: hospedar localmente as fontes necessárias, reduzir subconjuntos/pesos e priorizar apenas a fonte essencial da abertura.
- Comando: `$impeccable optimize`.

## Detector: triagem

48 avisos brutos: 2 de padding, 5 de texto pequeno, 24 de cor e 17 de tipografia.

- Padding no oceano: falso positivo para as camadas fotográficas intencionalmente full bleed; o texto tem recuo próprio.
- Padding do painel: não procede como descrição literal; a regra existente usa `padding:65px 8%`, e `50px 7%` no celular.
- Texto de 11px: medida confirmada; é um alerta de legibilidade, não violação automática de tamanho mínimo WCAG. Áreas de toque estão tratadas separadamente no achado 7.
- `#000` da máscara: canal de máscara, não cor visível fora da paleta.
- Borda preta atribuída à reserva pelo detector: o CSS usa currentColor herdado de navy; não foi confirmado preto no render.
- Cor creme: exceção previamente registrada porque pertence ao mockup aprovado; nenhum novo ignore foi criado nesta auditoria.
- Demais valores de cor/tamanho: agrupados no achado 6, sem transformar cada aviso em um defeito visual.

## Evidências e limites

- Chrome local com Playwright; larguras 320, 390, 600, 601, 768, 850, 1024 e 1440 px. Em todas, exceto 601, scrollWidth permaneceu igual ao viewport.
- Sem erros JavaScript capturados.
- Movimento automático confirmado por mudança de caminhos SVG após 6,1 s. Preferência reduzida confirmou que a onda deixa de mudar.
- Scripts e resultados em `.impeccable/review/audit-browser.mjs`, `audit-browser.json` e `audit-detector.json`.
- Capturas adicionais: `audit-tablet.png`, `audit-text200.png`. As capturas desktop/mobile da implementação continuam em `.impeccable/review/`.
- Reserva, movimento e imagens já possuem três testes Playwright de regressão aprovados na última implementação. Esta auditoria acrescentou as medições acima e não alterou esses testes.
- Não foram realizados teste com leitor de tela, dispositivo físico, gesto de toque sintetizado, Safari/Firefox, rede móvel fria ou análise pixel a pixel de contraste de todas as fotografias/estados. Sem essas evidências, não se declara conformidade AA completa nem pontuação Lighthouse.

## Pontos positivos

- Landmarks, idioma, hierarquia de títulos, link para pular conteúdo e estados de foco estão presentes.
- Formulário usa labels, validação nativa, controle aria-expanded, foco no primeiro campo e anúncio de status; a simulação é explícita.
- Sem dependência de biblioteca de animação no runtime, bundles de CSS/JS pequenos e limite de densidade do canvas.
- Imagens do cardápio têm alt, dimensões e lazy loading.
- A preferência por movimento reduzido deixa o conteúdo visível e cancela as animações WAAPI.
- O layout mantém uma linguagem visual específica e a sequência do mockup aprovado.

## Ordem recomendada

1. **P1 — `$impeccable animate`**: controle de pausa das animações ambientes.
2. **P1/P2 — `$impeccable adapt`**: cabeçalho entre breakpoints, texto ampliado e áreas de toque.
3. **P2/P3 — `$impeccable optimize`**: imagens, loop de rolagem/ambiente e fontes.
4. **P2 — `$impeccable document`**: reconciliar tokens e documentação estruturada com o código.
5. **`$impeccable polish`**: revisão final depois das correções, preservando o mockup.

Os comandos podem ser executados um por vez, juntos ou na ordem preferida. Reexecutar `$impeccable audit` depois das correções para atualizar a pontuação.


## Correções aplicadas após a auditoria

Os oito achados acima foram tratados. O relatório original foi preservado como evidência do estado anterior; a pontuação 11/20 pertence àquele estado e não representa uma nova auditoria de conformidade.

| Achado | Correção | Verificação |
|---|---|---|
| 1 — Pausa | Controle global acessível, persistência local, pausa cancela efeitos espaciais sem ocultar conteúdo; respeita preferência reduzida | Teste de pausa, recarregamento, retomada e mudança da preferência aprovado |
| 2 — Cabeçalho | Navegação recolhe até 1100px; cabeçalho pode quebrar, em fluxo no celular | 12 larguras de 320–1440px, incluindo 600, 601, 620, 767, 768, 1100 e 1101; sem overflow |
| 3 — Imagens | WebP com variantes responsivas, alfa, srcset/sizes e lazy loading; abertura prioritária | 2.804.154 bytes somando todas as variantes, contra 10.891.776 bytes originais: redução de 74,25% no conjunto de arquivos. Não é uma comparação de LCP nem de transferência inicial |
| 4 — Loop em repouso | Rolagem sob demanda, leituras agrupadas, escrita só quando o progresso muda; ciclo ambiente cancelado fora da cena | Regressão verifica menos de 10 recálculos de estilo em 1,1s no rodapé; antes foram 128 em 2s. Nenhuma alegação de FPS em hardware físico |
| 5 — Texto ampliado | Alturas mínimas e conteúdo em fluxo, quebras de títulos e indicadores da jornada | Testes a 200% dos tamanhos computados em 320, 390 e 601px aprovados sem overflow; conteúdo da abertura cabe na cena |
| 6 — Tokens | Cores auxiliares centralizadas em variáveis CSS; valores e escala tipográfica estruturados em DESIGN.md e sidecar | Código e documentação atualizados juntos, sem alterar as cores do mockup |
| 7 — Toque | Área mínima de 44px em navegação, retorno e ações | Teste mede altura e largura dos controles de navegação/ação relevantes no celular |
| 8 — Fontes | WOFF2 locais, sem @import externo, preload da fonte da abertura e licenças OFL incluídas | Teste registra zero requisições fora da origem local |

Validação final: **7 testes Playwright aprovados, build e lint aprovados**. Capturas atualizadas de desktop, celular e ampliação em `.impeccable/review/`. As verificações foram feitas em Chrome com viewports emulados; testes em aparelhos físicos, leitor de tela, Safari/Firefox e zoom nativo continuam fora da evidência deste trabalho. Não se declara conformidade WCAG completa.

Detector após correções: **48 → 7 avisos**. Nenhum aviso de cor ou escala tipográfica fora do sistema permanece. Restam cinco avisos sobre corpo de 11px e dois sobre padding do oceano/painel; mantêm a triagem contextual acima, sem novos ignores. O primeiro é um alerta de legibilidade da tipografia existente, sem piso WCAG absoluto; os dois últimos descrevem incorretamente os recuos do conteúdo ou camadas fotográficas full bleed. O arquivo bruto está em `.impeccable/review/audit-detector-after.json`.


Alteração posterior solicitada pelo usuário: botão de pausa removido. O achado de ausência de pausa na interface volta a ser uma limitação conhecida dessa decisão; a preferência do sistema por movimento reduzido permanece implementada.
