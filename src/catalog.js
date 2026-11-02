const input = document.querySelector("#dish-search");
const categoryButtons = [...document.querySelectorAll(".category-filter")];
const sections = [...document.querySelectorAll(".catalog-category")];
const clear = document.querySelector("#clear-search");
const empty = document.querySelector(".catalog-empty");
const count = document.querySelector("#catalog-count");
const normalize = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
let category = "todos";
function render(updateUrl = true) {
  const words = normalize(input.value.trim()).split(/\s+/).filter(Boolean);
  let total = 0;
  sections.forEach((section) => {
    let visible = 0;
    section.querySelectorAll(".catalog-dish").forEach((dish) => {
      const matches =
        (category === "todos" || section.dataset.category === category) &&
        words.every((word) => normalize(dish.textContent).includes(word));
      dish.hidden = !matches;
      if (matches) visible++;
    });
    section.hidden = visible === 0;
    total += visible;
  });
  categoryButtons.forEach((button) =>
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.category === category),
    ),
  );
  clear.hidden = !input.value;
  empty.hidden = total !== 0;
  count.textContent = `${total} ${total === 1 ? "opção encontrada" : "opções encontradas"}`;
  if (updateUrl) {
    const params = new window.URLSearchParams();
    if (input.value.trim()) params.set("busca", input.value.trim());
    if (category !== "todos") params.set("categoria", category);
    window.history.replaceState(
      null,
      "",
      window.location.pathname + (params.size ? "?" + params : ""),
    );
  }
}
function restore() {
  const params = new window.URLSearchParams(window.location.search);
  input.value = params.get("busca") || "";
  category = categoryButtons.some(
    (button) => button.dataset.category === params.get("categoria"),
  )
    ? params.get("categoria")
    : "todos";
  render(false);
}
input.addEventListener("input", () => render());
document
  .querySelector(".catalog-search")
  .addEventListener("submit", (event) => event.preventDefault());
categoryButtons.forEach((button) =>
  button.addEventListener("click", () => {
    category = button.dataset.category;
    render();
  }),
);
clear.addEventListener("click", () => {
  input.value = "";
  render();
  input.focus();
});
document.querySelector("#reset-filters").addEventListener("click", () => {
  input.value = "";
  category = "todos";
  render();
  input.focus();
});
window.addEventListener("popstate", restore);
restore();
