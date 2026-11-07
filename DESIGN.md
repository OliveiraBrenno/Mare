---
name: Maré — Cozinha do mar
description: Uma jornada visual do litoral brasileiro, da pesca ao prato.
colors:
  navy: "#092638"
  cream: "#f6efdf"
  gold: "#f1b633"
  coral: "#cd684b"
  ocean: "#073048"
  wave-front: "#073f59"
  wave-back: "#0b7b9d"
  footer: "#092536"
  form-surface: "#eee4d0"
  gold-hover: "#ffcc58"
  focus: "#b85a37"
  scrollbar-thumb: "#b99659"
  focus: "#b85a37"
  hover-wash: "#ffffff22"
  sunrise-wash: "#f9e9be55"
  ocean: "#073048"
  wave-back: "#0b7b9d"
  wave-front: "#073f59"
  ocean-shade-strong: "#042538f2"
  ocean-shade-middle: "#042538a8"
  ocean-shade-clear: "#04253805"
  ocean-shade-bottom: "#062b3d88"
  journey-line: "#d7e7eb66"
  journey-text: "#e9eee9"
  journey-dot: "#b8d3de"
  light-ray: "#b2e8f51c"
  mask-solid: "#000"
  ornament-gold: "#cc9b3b"
  plate-shadow: "#00000022"
  link-rule: "#be964d"
  image-placeholder: "#e7ddc9"
  price-rule: "#b69454"
  muted-text: "#766647"
  terrace-shade-strong: "#062332d9"
  terrace-shade-bottom: "#072738a6"
  gold-hover: "#ffcc58"
  form-surface: "#eee4d0"
  input-rule: "#a79b84"
  caret: "#ac6d32"
  placeholder: "#6c6354"
  footer: "#092536"
  footer-rule: "#b8ccd055"
  mobile-sunrise-strong: "#fff0cde6"
  mobile-sunrise-middle: "#fff0cda8"
  mobile-ocean-strong: "#042538ef"
  mobile-ocean-middle: "#04253855"
  mobile-ocean-bottom: "#04253866"
  mobile-journey-line: "#ffffff66"
  mobile-terrace-strong: "#062332e6"
  mobile-terrace-clear: "#06233220"
  mobile-terrace-bottom: "#09263888"

typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(62px, 7.8vw, 112px)"
    fontWeight: 400
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(46px, 5.2vw, 80px)"
    fontWeight: 400
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.9
    letterSpacing: "0.27em"
  size-11:
    fontSize: "11px"
  size-12:
    fontSize: "12px"
  size-13:
    fontSize: "13px"
  size-14:
    fontSize: "14px"
  size-20:
    fontSize: "20px"
  size-21:
    fontSize: "21px"
  size-24:
    fontSize: "24px"
  size-25:
    fontSize: "25px"
  size-30:
    fontSize: "30px"
  size-36:
    fontSize: "36px"
  size-40:
    fontSize: "40px"
  size-42:
    fontSize: "42px"
  size-44:
    fontSize: "44px"
  size-46:
    fontSize: "46px"
  size-48:
    fontSize: "48px"
  size-50:
    fontSize: "50px"
  size-52:
    fontSize: "52px"
  size-61:
    fontSize: "61px"
  size-62:
    fontSize: "62px"
  size-65:
    fontSize: "65px"
  size-70:
    fontSize: "70px"
  size-76:
    fontSize: "76px"
  size-80:
    fontSize: "80px"
  size-90:
    fontSize: "90px"
  size-112:
    fontSize: "112px"

rounded:
  flat: "0"
  action: "25px"
  outline-action: "30px"
  circle: "50%"
spacing:
  field-gap: "8px"
  menu-gap: "13px"
  form-gap: "20px"
  section-inset: "8%"
  mobile-inset: "7%"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.navy}"
    rounded: "{rounded.action}"
    padding: "14px 25px"
  button-primary-hover:
    backgroundColor: "{colors.gold-hover}"
    textColor: "{colors.navy}"
  button-outline:
    backgroundColor: "transparent"
    rounded: "{rounded.outline-action}"
    padding: "12px 24px"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.navy}"
    rounded: "{rounded.flat}"
    padding: "0 4px"
    height: "45px"
  menu-item:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.navy}"
    rounded: "{rounded.flat}"
---

# Design System: Maré

## Overview

**Creative North Star: "Da pesca ao prato"**

Maré traduz a jornada da pesca ao prato em uma experiência editorial de litoral brasileiro. Fotografia de sol, mar, pessoas e comida ocupa grandes superfícies; títulos serifados e legendas espaçadas dão ritmo à narrativa. A identidade combina a leveza da manhã, a profundidade do oceano e o calor de uma mesa ao pôr do sol.

A referência visual aprovada é `assets/composicao-inicial.png`. Ela rege a composição desta página: pesca ao amanhecer com texto azul; passagem ondulada para o oceano; cozinheiro à esquerda, texto em creme ao centro e prato à direita; cardápio; reserva ao pôr do sol; rodapé azul. O código em `src/style.css` e `src/main.js` é a fonte dos valores implementados. A referência orienta a continuidade visual de futuras alterações, sem exigir que novas páginas repitam toda a sequência narrativa.

**Key Characteristics:**
- Fotografia contínua, com transições orgânicas entre cenas.
- Contraste entre azul profundo e creme quente.
- Serifas expressivas, texto funcional discreto e uma anotação manuscrita.
- Movimento ligado à rolagem, com versão estática completa.

## Colors

### Primary

- **Azul profundo (`navy`)**: cor do texto sobre o creme e sobre o amanhecer; estrutura da marca e das ações.
- **Dourado solar (`gold`)**: ação de reserva, seleção de texto e ponto ativo da jornada. O estado de hover usa `gold-hover`.

### Secondary

- **Coral costeiro (`coral`)**: detalhe orgânico nas ilustrações; não substitui o dourado como cor de ação.
- **Azuis submersos (`ocean`, `wave-front`, `wave-back`)**: profundidade do trecho oceânico e suas duas camadas de água.

### Neutral

- **Creme de areia (`cream`)**: superfície editorial e texto sobre fundos escuros.
- **Areia de formulário (`form-surface`)**: painel da simulação de reserva.
- **Azul de rodapé (`footer`)**: encerramento escuro e contínuo da página.
- **Terracota de foco (`focus`)**: contorno visível de teclado, com espessura de 2px e afastamento de 5px.

**The A superfície conduz o contraste Rule.** Use azul profundo sobre fotografias claras e creme sobre as cenas submersas e de pôr do sol. Preserve uma área legível para cada bloco de texto.

## Typography

**Display Font:** Cormorant Garamond, com Georgia e serif como alternativas.

**Body Font:** DM Sans, com sans-serif como alternativa.

Não há anotação manuscrita na abertura.

A serifa tem desenho leve, entrelinha compacta e grandes quebras editoriais. DM Sans sustenta parágrafos, navegação, preços e controles.

- **Display:** título de abertura. Em telas até 600px, usa 76px e pode quebrar sem recorte.
- **Headline:** títulos de seção; oceano e cozinha usam `clamp(40px, 4.6vw, 70px)`. No celular, os tamanhos variam por cena entre 44px e 62px.
- **Body:** base de 14px; parágrafos editoriais usam 12–14px conforme a cena, com entrelinha de 1.65–1.7. Manter linhas curtas junto às imagens.
- **Label:** caixa alta e espaçamento generoso; navegação, botões, preços e rótulos usam no mínimo 11px, com peso 700 nas ações. Preservar esse piso de leitura em todos os tamanhos de tela.


## Layout

A página usa cenas de largura total, com blocos editoriais recuados em cerca de 8% no desktop e 7% no celular. Os títulos se alinham ao texto; as imagens podem ultrapassar as bordas. Não aplicar uma largura máxima global que quebre a continuidade dos fundos.

No desktop, o hero tem altura mínima de clamp(610px, 52vw, 850px), crescendo com o conteúdo; o oceano tem altura mínima de clamp(500px, 40vw, 650px), crescendo com o conteúdo; a cozinha mede 42vw, entre 510px e 680px; a reserva mede 36vw, entre 430px e 610px. A cozinha mantém três planos: cozinheiro com 43% de largura, texto a partir de 47% e prato transparente com 44% de largura, proporção quadrada e início em 74%, parcialmente fora da cena.

O cardápio é uma grade de quatro colunas iguais, com intervalo de 13px e fotografias quase quadradas (razão 0.96). Título, descrição e preço ficam sobre o próprio fundo creme. O formulário tem duas colunas, com nome ocupando a linha inteira.

Os ajustes intermediários entram até 850px. Até 1100px, a navegação horizontal do cabeçalho se recolhe, mantendo marca e acesso à reserva. Até 600px; o hero usa altura mínima de max(650px, 90svh), crescendo com o conteúdo; o oceano tem mínimo de 670px; cozinheiro e texto se empilham; o prato mantém o contorno transparente, com 65% de largura e início em 73%, parcialmente fora da cena; o cardápio passa para duas colunas; a reserva tem mínimo de 570px; formulário e rodapé se empilham. No hero móvel, o véu claro usa `linear-gradient(90deg, #fff0cde6 0%, #fff0cda8 52%, transparent 100%)` para sustentar o contraste do texto azul. Em telas a partir de 1600px, ajustar a posição vertical dos blocos sem alterar a composição.

## Elevation & Depth

A profundidade vem de fotografias, gradientes de contraste, raios de luz, recortes e cor de superfície. Os blocos de cardápio são planos. Só a imagem do prato de destaque recebe sombra ambiente por `filter: drop-shadow(0 15px 18px #00000022)`, acompanhando seu contorno transparente e separando-o do creme sem criar uma interface de cartões flutuantes.

**The A fotografia tem profundidade Rule.** Reserve sombra para o prato em destaque; os demais blocos ganham profundidade com sobreposição, recorte e mudança de superfície.

## Shapes

A forma orgânica principal é a passagem SVG entre amanhecer e oceano, com duas camadas onduladas. Botões têm extremidades arredondadas; o símbolo de âncora fica em um círculo de 35px; o prato de destaque preserva o contorno real de `/prato-recortado-1000.webp`, com canal alfa, `object-fit: contain` e área visível sem máscara elíptica de CSS. Campos e fotografias do cardápio mantêm cantos retos. Contornos e sublinhados são finos, geralmente de 1px.

## Components

### Ações e navegação

A ação principal é dourada com texto azul, caixa alta, seta fina e raio de 25px. No hover, clareia e sobe 2px. A ação secundária é transparente, com contorno de 1px na cor atual e raio de 30px; sobre fundo escuro usa texto creme. Setas avançam 5px em 300ms. Links de navegação revelam um sublinhado na mesma duração. Todo controle recebe o foco terracota visível.

### Cardápio

Cada item combina fotografia recortada em WebP responsivo (`/ceviche-*.webp`, `/camarao-*.webp`, `/peixe-*.webp` e `/polvo-*.webp`), nome em caixa alta, descrição curta e preço com traço dourado. A imagem amplia até 1.07 no hover ao longo de 1s. Não há contorno, preenchimento separado ou sombra envolvendo o item.

### Reserva simulada

A ação abre um painel creme mais escuro abaixo da fotografia, atualiza `aria-expanded` e leva o foco ao nome. Campos têm fundo transparente, borda inferior de 1px e altura de 45px. O primeiro campo ocupa toda a grade. A confirmação fica em uma região de status e explicita que nenhuma reserva real foi efetuada.

### Contrato de movimento

**The O conteúdo sobrevive ao movimento Rule.** A animação acompanha a narrativa; títulos, pratos, navegação e reserva devem funcionar integralmente em estado estático.

A rolagem controla animações pausadas da Web Animations API. A duração interna é de 1000ms para mapear progresso, não para impor um tempo de reprodução. O progresso de cada cena é calculado como `(altura da janela − topo da cena) / (altura da janela + altura da cena)`, limitado a 0–1; os intervalos e keyframes completos ficam no sidecar.

A abertura aproxima e desloca a fotografia para baixo enquanto texto e anotação sobem; o oceano desloca o fundo lateralmente e revela o texto; a cozinha aproxima o cozinheiro e faz o prato entrar com rotação; os itens do cardápio aparecem em sequência; a varanda se move lentamente no eixo vertical. Preservar deslocamentos suaves e movimento reversível com a rolagem.

A água é um SVG com dois caminhos senoidais atualizados em tempo real. O oceano também usa 28 partículas em canvas e dois raios discretos. O desenho ambiente roda apenas enquanto a cena oceânica está visível e o movimento está habilitado, pausa em aba oculta e limita a densidade do canvas a 1.5 vezes a resolução CSS; o ciclo de desenho tem intervalo mínimo de 30ms. Não converter a página em uma apresentação com rolagem capturada.

Com `prefers-reduced-motion: reduce`, cancelar animações WAAPI, remover partículas e raios, eliminar deslocamentos, preservar feedback curto de cor/foco e desativar a rolagem suave. A composição estática, a onda SVG e todo conteúdo permanecem legíveis. A mudança da preferência durante a sessão também deve funcionar.

## Do's and Don'ts

### Do:
- Do preservar a composição aprovada em assets/composicao-inicial.png e adaptar seu ritmo ao tamanho da tela.
- Do usar imagens finais de pesca, oceano, cozinheiro, pratos e varanda com recortes intencionais.
- Do manter conteúdo, navegação, cardápio e formulário acessíveis com movimento reduzido.
- Do comunicar junto ao cardápio e à reserva que a experiência é fictícia.

### Don't:
- Don't inverter o hero claro para uma abertura escura com texto branco.
- Don't transformar o cardápio em cartões arredondados com sombras.
- Don't ocultar texto ou ações quando a animação está desativada.
- Don't adicionar caixas para corrigir contraste sobre fotografias.

## Correções da auditoria — novembro de 2026

O hero usa conteúdo em fluxo e altura mínima, permitindo crescer com o texto. A navegação superior se recolhe até 1100px; links e botões têm área mínima de 44px. O formulário e o rodapé permitem quebra e reorganização sem ocultar conteúdo.

O controle fixo “Pausar animações” cancela os efeitos espaciais para manter todas as cenas legíveis e para o movimento ambiente. A escolha fica no armazenamento local, quando disponível. “Retomar animações” restaura o movimento no progresso atual. Com movimento reduzido no sistema, o controle informa esse estado e fica desabilitado; feedback de cor e foco permanece.

O loop de rolagem agora roda sob demanda, com leituras dos contêineres estáveis agrupadas antes das escritas. O loop ambiente roda somente com o oceano visível e a aba ativa. Ao sair da cena ou pausar, nenhum frame ambiente continua agendado. O indicador de rolagem também pausa fora da abertura.

As fontes WOFF2 são locais em public/fonts com licenças. Cenas e pratos usam img com WebP, srcset/sizes e dimensões; a abertura é prioritária, e imagens inferiores são lazy. Origens para regeneração ficam em assets/source; npm run optimize:images recompõe os derivados. Nenhuma imagem aprovada foi substituída por uma nova composição.

No celular, marca e reserva participam do fluxo da abertura, seguidas da anotação manuscrita e do título. O cabeçalho pode quebrar em linhas quando o texto aumenta; a marca principal mantém a palavra inteira. Entre 601–850px, o bloco da cozinha cresce com o texto. Até 850px, os indicadores da jornada usam grade de quatro colunas com quebra, em vez de depender de uma linha de largura fixa. Links de navegação e ações têm área mínima de 44px sem aumentar a tipografia aprovada.

## Ajuste confirmado pelo usuário — legibilidade

A anotação da abertura usa DM Sans, peso 600, 13px (12px no celular), sem inclinação ou escrita manuscrita, sobre superfície creme sólida com texto navy. Os indicadores da jornada usam superfície navy sólida, texto cream e estado ativo gold. A linha e os pontos ficam dentro dessa superfície para preservar contraste independentemente da fotografia.

O usuário solicitou remover o controle de pausa. Essa decisão substitui o contrato anterior de pausa manual: não existe botão nem leitura da antiga escolha no localStorage. A preferência do dispositivo por movimento reduzido continua respeitada, inclusive mudanças durante a sessão.

## Composição revisada a partir das capturas do usuário

Esta definição substitui os tratamentos anteriores de caixa para contraste e as dimensões do hero descritas no histórico. A frase redundante da abertura foi retirada. O hero tem altura mínima de 100svh e duas linhas em grid: cabeçalho em fluxo e bloco de título, apoio e ação centralizado no espaço disponível. A altura cresce com o conteúdo ampliado. Há 88px de respiro inferior, reduzido a 64px em janelas de até 740px de altura e a 72px no celular. O título considera simultaneamente largura e altura da janela. A navegação superior se recolhe até 1100px.

A cena oceânica tem overflow hidden, e a imagem transformada fica sempre dentro de sua seção. As ondas ocupam somente os 26px iniciais dessa própria cena, sem deslocamento negativo. Não há fotografia ou barra de água sobre a abertura. Os indicadores têm fundo transparente, linha fina e texto claro; seu contraste vem de um sombreado contínuo sobre o lado direito da imagem. No celular, o sombreado termina na parte inferior e os indicadores se distribuem em quatro colunas. O coral fica atrás do sombreado e dos textos.

Verificação: 8 testes aprovados; abertura medida em 1996×1058, 1440×760, 1280×680, 1140×604, 1024×600 e 390×844. O link mantém pelo menos 48px até o fim da cena e 40px até o fim da janela nas larguras de desktop testadas. Revisão visual independente aprovou as capturas de 1140, 1440 e celular.

## Página de cardápio e reforço de movimento

/cardapio/ herda o creme, navy, dourado, Cormorant Garamond e DM Sans. A abertura editorial combina título e prato recortado; a consulta usa categorias em coluna lateral e lista de pratos com descrições e preços. No celular, as categorias ficam em uma faixa com rolagem horizontal nativa. A busca e a categoria se combinam; a comparação ignora caixa e acentos. Os parâmetros busca/categoria são mantidos na URL. Há contagem anunciada, limpeza e recuperação de busca vazia, e todo o conteúdo está disponível no HTML mesmo sem JavaScript.

Na home, o título entra como uma maré ascendente por clip-path; descrição e ação seguem em sequência. A indicação de rolagem é visível no rodapé da abertura. A travessia do oceano tem maior deslocamento lateral, aproximação de imagem e amplitude visual das ondas; o prato percorre −28° a 22°. A entrada é cancelada ao sair da abertura, e o oceano só atualiza frames quando está visível. Tudo continua respeitando movimento reduzido.

A correção do Pão de Açúcar é feita sobre a fonte original: somente a região x1445–1672, y315–540 é composta a partir da edição gerada; fora dela, os pixels RGB do master PNG são idênticos aos da fonte JPEG decodificada. Os WebP de entrega são derivados comprimidos desse master.

A ação “Descubra essa jornada” é filha direta do hero, posicionada no rodapé da cena com bottom:64px, recuo lateral de 8% (7% no celular) e largura limitada ao viewport. O padding inferior de 144px (156px no celular) reserva espaço para a ação, inclusive com texto ampliado.


## Refinamento técnico após auditoria — 06/11/2026

A indicação “Role para mergulhar” usa papel claro no desktop e navy no celular, sem painel. Texto funcional de pratos e catálogo cresce; a marca do catálogo pode ocupar a largura necessária com texto ampliado. A reserva rejeita nome só de espaços e invalida a prévia ao editar. O indicador da história é vertical também no mobile e mantém a ordem As pessoas, O mar, A cozinha, O sabor.

Relatório, evidências e limites em AUDIT.md. As decisões desta seção prevalecem sobre as descrições históricas correspondentes.
