# Maré — cozinha do mar

Landing page de um restaurante fictício, com narrativa da pesca ao prato, cardápio ilustrativo e simulação de reserva. Nenhum dado é enviado a um servidor e nenhuma reserva real é criada.

## Desenvolvimento

Requer Node.js 20.19+ ou 22.12+ e npm.

```sh
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm test
npm run format
```

`index.html` contém o conteúdo e a estrutura; `src/style.css` define o visual responsivo; `src/main.js` cuida das animações e da simulação; `public/` contém as imagens utilizadas pela página. A composição aprovada está em `assets/`.

## Validação visual e de comportamento

`npm test` executa Playwright usando o Google Chrome instalado em `/Applications/Google Chrome.app`. Em outro sistema, ajuste `executablePath` em `playwright.config.js`. Os testes verificam movimento do oceano, simulação de reserva, imagens e ausência de overflow em desktop e celular. Capturas ficam em `.impeccable/review/`.

As cenas usam Web Animations API sincronizada à rolagem, ondas SVG e partículas em canvas. A preferência por movimento reduzido mantém todas as informações visíveis e remove os movimentos espaciais.

## Otimização de mídia

As fontes são servidas localmente em `public/fonts/`, com cópias das licenças OFL. As imagens finais WebP têm versões responsivas, canal alfa preservado quando aplicável e carregamento adiado abaixo da abertura. Os arquivos de origem estão em `assets/source/`.

```sh
npm run optimize:images
```

O Sharp é usado apenas nesta etapa de desenvolvimento. Não é dependência de execução da página. O navegador carrega a variante apropriada a cada viewport e densidade de tela.

## Acessibilidade e movimento

O botão de pausa foi removido a pedido do usuário. A preferência do sistema por movimento reduzido continua respeitada e mantém todo o conteúdo visível. As atualizações da rolagem ocorrem sob demanda; o ciclo ambiente só roda com o oceano visível e a aba ativa.

A suíte tem sete testes de navegação, reserva, pausa/retomada, preferência reduzida, imagens/fontes, alvos de toque, trabalho em repouso e reflow. Ela cobre 12 larguras entre 320 e 1440 px e ampliação simulada do texto a 200% em 320, 390 e 601 px. A emulação do Chrome não substitui testes em aparelhos físicos, leitores de tela ou outros motores.

## Cardápio completo

`/cardapio/` é uma entrada separada do build Vite. Os dados ilustrativos ficam em `src/menu-data.js`; `npm run generate:menu` gera o HTML completo a partir desses dados. O arquivo `src/catalog.js` adiciona busca e filtro sem depender de servidor/API. A home mantém a seleção de quatro pratos. Depois de alterar os dados, gere a página antes do build.

A imagem mestre de abertura corrigida é `assets/source/pesca.png`; a original permanece em `assets/source/pesca.jpg`. A edição gerada e o processamento que restringe a mudança à região do morro ficam em `assets/source/pesca-landmark-edit.png` e `scripts/constrain-landmark-edit.mjs`. `npm run optimize:images` gera os WebP de entrega.

## GitHub Pages

Destino: https://oliveirabrenno.github.io/Mare/

O workflow `.github/workflows/deploy.yml` instala o lockfile com Node.js 24, verifica o lint, gera o build e publica `dist` quando a branch `main` recebe alterações. A origem do Pages deve ser **GitHub Actions**. As duas páginas são compiladas com o prefixo `/Mare/`; os links usam `%BASE_URL%` para também funcionar no servidor local.

```sh
npm run build:pages
npm run preview:pages
npm run test:pages
```

`test:pages` inicia uma prévia própria e verifica recursos, busca do cardápio e navegação até a reserva sob o prefixo real de produção. Requer o Chrome local configurado no arquivo Playwright. O teste não depende de uma publicação no GitHub.
