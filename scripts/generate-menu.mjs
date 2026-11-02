import { readFile, writeFile } from "node:fs/promises";
import { categories, dishes, formatPrice } from "../src/menu-data.js";
const home = await readFile("index.html", "utf8");
const header = home
  .match(/<header[\s\S]*?<\/header>/)[0]
  .replace(/href="#inicio"/g, 'href="%BASE_URL%"')
  .replace(/href="#/g, 'href="%BASE_URL%#');
const footer = home
  .match(/<footer[\s\S]*?<\/footer>/)[0]
  .replace(/href="#inicio"/g, 'href="%BASE_URL%"')
  .replace(/href="#/g, 'href="%BASE_URL%#');
const filters = [["todos", "Todos"], ...categories]
  .map(
    ([id, label]) =>
      `<button type="button" class="category-filter" data-category="${id}" aria-pressed="${id === "todos"}">${label}<span>${id === "todos" ? dishes.length : dishes.filter((d) => d[0] === id).length}</span></button>`,
  )
  .join("");
const sections = categories
  .map(
    ([id, label]) =>
      `<section class="catalog-category" data-category="${id}" aria-labelledby="category-${id}"><h2 id="category-${id}">${label}</h2><div class="catalog-items">${dishes
        .filter((d) => d[0] === id)
        .map(
          ([, name, description, price]) =>
            `<article class="catalog-dish"><div class="dish-heading"><h3>${name}</h3><span>${formatPrice(price)}</span></div><p>${description}</p></article>`,
        )
        .join("")}</div></section>`,
  )
  .join("");
await writeFile(
  "cardapio/index.html",
  `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Explore o cardápio fictício do Maré: entradas, pratos do mar, sobremesas e bebidas. Busque e filtre por categoria."><meta name="theme-color" content="#f6efdf"><title>Cardápio completo — Maré</title><link rel="preload" href="/fonts/cormorant-garamond.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/src/style.css"><script type="module" src="/src/catalog.js"></script></head><body class="catalog-page"><a class="skip" href="#cardapio-completo">Pular para o cardápio</a><div class="catalog-header">${header}</div><main id="cardapio-completo"><section class="catalog-intro"><div><a class="catalog-back" href="%BASE_URL%">← Voltar para a nossa história</a><h1>O mar à sua mesa.</h1><p>Escolha por onde começar. Dos primeiros encontros aos últimos sabores, descubra nosso cardápio completo.</p><p class="catalog-disclaimer">Restaurante fictício · Pratos e preços ilustrativos.</p></div><img src="/prato-recortado-640.webp" alt="Polvo grelhado com batatas e tomates" width="640" height="640" fetchpriority="high"></section><div class="catalog-browser"><aside class="catalog-sidebar" aria-label="Categorias do cardápio"><h2>Explore os sabores</h2><div class="category-filters">${filters}</div></aside><div class="catalog-results"><form class="catalog-search" role="search"><label for="dish-search">Encontre seu próximo sabor</label><div class="search-field"><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/></svg><input type="search" id="dish-search" placeholder="Busque um prato ou ingrediente" autocomplete="off"><button type="button" id="clear-search" hidden>Limpar</button></div></form><p id="catalog-count" class="catalog-count" role="status" aria-live="polite">${dishes.length} opções no cardápio</p><div id="catalog-sections">${sections}</div><div class="catalog-empty" hidden><h2>Nenhum sabor por aqui.</h2><p>Tente outro ingrediente ou explore todas as categorias.</p><button type="button" id="reset-filters" class="gold-button">Ver todo o cardápio</button></div><noscript><p>A busca precisa de JavaScript. Todos os pratos estão disponíveis nesta página.</p></noscript></div></div><section class="catalog-close"><h2>A próxima história<br>começa à mesa.</h2><a class="gold-button" href="%BASE_URL%#reserva">Simular uma reserva <span aria-hidden="true">→</span></a></section></main>${footer}</body></html>`,
);
