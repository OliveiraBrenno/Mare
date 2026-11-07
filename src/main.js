const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
const hero = document.querySelector(".hero");
const ocean = document.querySelector(".ocean");
const kitchen = document.querySelector(".kitchen");
const terrace = document.querySelector(".reservation");
const canvas = document.querySelector("#ocean-particles");
const context = canvas.getContext("2d");
const frontWave = document.querySelector(".wave-front");
const backWave = document.querySelector(".wave-back");
const rayOne = document.querySelector(".ray-one");
const rayTwo = document.querySelector(".ray-two");
const storySteps = [...document.querySelectorAll(".story-progress span")];
const storyIndicator = document.querySelector(".story-progress");
const mobileStory = window.matchMedia("(max-width: 600px)");
let activeStoryStep = -1;
function syncStoryProgress() {
  const bounds = ocean.getBoundingClientRect();
  if (!bounds.height || !storySteps.length) return;
  // The viewport's reading line crosses the scene from its top to its bottom.
  // This keeps the final phase from activating before most of the scene is read.
  let progress = (window.innerHeight * 0.5 - bounds.top) / bounds.height;
  if (mobileStory.matches && storyIndicator) {
    // On mobile the indicator sits below the copy, so measure its visible
    // passage through the viewport instead of advancing while it is offscreen.
    const indicator = storyIndicator.getBoundingClientRect();
    const visibleTravel = window.innerHeight - indicator.height;
    if (visibleTravel > 0) progress = (window.innerHeight - indicator.bottom) / visibleTravel;
  }
  progress = clamp(progress);
  const active = Math.min(storySteps.length - 1, Math.floor(progress * storySteps.length));
  if (active === activeStoryStep) return;
  activeStoryStep = active;
  storySteps.forEach((step, index) => {
    step.classList.toggle("active", index === active);
    if (index === active) step.setAttribute("aria-current", "step");
    else step.removeAttribute("aria-current");
  });
}
const particles = Array.from({ length: 28 }, (_, index) => ({
  x: ((index * 97) % 101) / 100,
  y: ((index * 37) % 101) / 100,
  radius: 1 + (index % 4) * 0.65,
  speed: 0.012 + (index % 5) * 0.004,
}));
let bubbleStroke;
let width = 0;
let height = 0;
let ambientFrame = 0;
let scrollFrame = 0;
let previousTime = 0;
let elapsedTime = 0;
let oceanVisible = false;
const animations = [];
const introAnimations = [];
const motionEnabled = () => !motionPreference.matches;
function scrub(selector, keyframes, section, start = 0, end = 1) {
  const element = document.querySelector(selector);
  if (!element?.animate) return;
  const animation = element.animate(keyframes, {
    duration: 1000,
    fill: "both",
    easing: "linear",
  });
  animation.pause();
  animations.push({ animation, section, start, end, currentTime: -1 });
}
function updateScroll() {
  scrollFrame = 0;
  syncStoryProgress();
  if (!motionEnabled() || document.hidden) return;
  // Read stable containers first, then apply all animation and state writes.
  const viewport = window.innerHeight;
  const sections = new Map(
    [...new Set(animations.map((item) => item.section))].map((section) => [
      section,
      section.getBoundingClientRect(),
    ]),
  );
  const updates = animations.map((item) => {
    const rect = sections.get(item.section);
    const progress = clamp((viewport - rect.top) / (viewport + rect.height));
    return [
      item,
      clamp((progress - item.start) / (item.end - item.start)) * 1000,
    ];
  });
  updates.forEach(([item, time]) => {
    if (Math.abs(time - item.currentTime) > 0.01) {
      item.animation.currentTime = time;
      item.currentTime = time;
    }
  });

}
function requestScrollUpdate() {
  if (!scrollFrame && !document.hidden)
    scrollFrame = requestAnimationFrame(updateScroll);
}
function wavePath(time, amplitude, baseline) {
  let path = `M0 ${baseline}`;
  for (let x = 0; x <= 1440; x += 30)
    path += ` L${x} ${(baseline + Math.sin(x / 310 + time) * amplitude + Math.sin(x / 155 + time * 0.7) * amplitude * 0.25).toFixed(1)}`;
  return `${path} V100 H0Z`;
}
function draw(time) {
  ambientFrame = 0;
  if (!motionEnabled() || document.hidden || !oceanVisible || !context) {
    previousTime = 0;
    return;
  }
  if (!previousTime) previousTime = time;
  const delta = time - previousTime;
  if (delta >= 30) {
    elapsedTime += Math.min(delta, 100) / 1000;
    previousTime = time;
    frontWave.setAttribute("d", wavePath(elapsedTime * 0.65, 19, 50));
    backWave.setAttribute("d", wavePath(elapsedTime * 0.48 + 2, 24, 35));
    rayOne.style.transform = `rotate(${20 + Math.sin(elapsedTime * 0.5) * 5}deg)`;
    rayTwo.style.opacity = String(0.4 + Math.sin(elapsedTime * 0.8) * 0.2);
    context.clearRect(0, 0, width, height);
    context.strokeStyle = bubbleStroke;
    context.lineWidth = 0.6;
    particles.forEach((particle) => {
      const y =
        (1 - ((particle.y + elapsedTime * particle.speed) % 1)) * height;
      const x =
        particle.x * width + Math.sin(elapsedTime + particle.y * 10) * 15;
      context.beginPath();
      context.arc(x, y, particle.radius, 0, Math.PI * 2);
      context.stroke();
    });
  }
  ambientFrame = requestAnimationFrame(draw);
}
function syncAmbient() {
  if (ambientFrame) window.cancelAnimationFrame(ambientFrame);
  ambientFrame = 0;
  previousTime = 0;
  if (motionEnabled() && !document.hidden && oceanVisible && context)
    ambientFrame = requestAnimationFrame(draw);
}
function resizeCanvas() {
  width = ocean.clientWidth;
  height = ocean.clientHeight;
  const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  context?.setTransform(ratio, 0, 0, ratio, 0, 0);
  bubbleStroke = window
    .getComputedStyle(canvas)
    .getPropertyValue("--bubble-stroke")
    .trim();
  requestScrollUpdate();
}
function configureMotion() {
  if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
  scrollFrame = 0;
  animations.forEach(({ animation }) => animation.cancel());
  animations.length = 0;
  introAnimations.forEach((animation) => animation.cancel());
  introAnimations.length = 0;
  const enabled = motionEnabled();
  document.documentElement.classList.toggle("motion-paused", !enabled);
  if (enabled) {
    scrub(
      ".hero-image",
      [
        { transform: "scale(1)" },
        { transform: "translateY(160px) scale(1.15)" },
      ],
      hero,
      0.48,
      1,
    );
    scrub(
      ".hero-content",
      [
        { transform: "translateY(0)", opacity: 1 },
        { transform: "translateY(-100px)", opacity: 0.1 },
      ],
      hero,
      0.62,
      1,
    );
    scrub(
      ".underwater-image",
      [
        { transform: "scale(1.35) translateX(-7%)" },
        { transform: "scale(1.08) translateX(5%)" },
      ],
      ocean,
    );
    scrub(
      ".ocean-content",
      [
        { transform: "translateY(95px)", opacity: 0 },
        { transform: "translateY(0)", opacity: 1, offset: 0.48 },
        { transform: "translateY(-35px)", opacity: 1 },
      ],
      ocean,
      0.03,
      0.88,
    );
    scrub(
      ".chef-image",
      [
        { transform: "scale(1.12) translateX(-3%)" },
        { transform: "scale(1) translateX(0)" },
      ],
      kitchen,
      0,
      0.8,
    );
    scrub(
      ".kitchen-copy",
      [{ transform: "translateY(65px)" }, { transform: "translateY(-25px)" }],
      kitchen,
    );
    scrub(
      ".featured-plate",
      [
        { transform: "translateX(120px) rotate(-28deg)" },
        { transform: "translateX(-35px) rotate(22deg)" },
      ],
      kitchen,
    );
    scrub(
      ".terrace-image",
      [
        { transform: "scale(1.16) translateY(-30px)" },
        { transform: "scale(1.02) translateY(30px)" },
      ],
      terrace,
    );
    const menu = document.querySelector(".menu-list");
    document.querySelectorAll(".menu-item").forEach((element, index) => {
      const animation = element.animate(
        [
          { transform: `translateY(${65 + index * 22}px)`, opacity: 0 },
          { transform: "translateY(0)", opacity: 1 },
        ],
        { duration: 1000, fill: "both" },
      );
      animation.pause();
      animations.push({
        animation,
        section: menu,
        start: 0,
        end: 0.4 + index * 0.045,
        currentTime: -1,
      });
    });
    requestScrollUpdate();
  } else {
    context?.clearRect(0, 0, width, height);
  }
  syncAmbient();
  requestScrollUpdate();
}
const visibilityObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.target === ocean) oceanVisible = entry.isIntersecting;
    if (entry.target === hero && !entry.isIntersecting) {
      introAnimations.forEach((animation) => animation.cancel());
      introAnimations.length = 0;
    }
    if (entry.target === hero)
      document.documentElement.classList.toggle(
        "hero-offscreen",
        !entry.isIntersecting,
      );
  });
  syncAmbient();
});
visibilityObserver.observe(ocean);
visibilityObserver.observe(hero);
resizeCanvas();
configureMotion();
window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", resizeCanvas, { passive: true });
window.addEventListener("load", requestScrollUpdate);
mobileStory.addEventListener("change", requestScrollUpdate);
document.fonts.ready.then(requestScrollUpdate);
document.addEventListener("visibilitychange", () => {
  syncAmbient();
  requestScrollUpdate();
});
motionPreference.addEventListener("change", configureMotion);
const openReservation = document.querySelector("#open-reservation");
const panel = document.querySelector("#reservation-panel");
openReservation.addEventListener("click", () => {
  const opening = panel.hidden;
  panel.hidden = !opening;
  openReservation.setAttribute("aria-expanded", String(opening));
  if (opening) {
    panel.scrollIntoView({
      behavior: motionPreference.matches ? "instant" : "smooth",
      block: "start",
    });
    panel.querySelector("input").focus({ preventScroll: true });
  }
});
const dateInput = document.querySelector('input[name="data"]');
function minimumDate() {
  const today = new Date();
  return new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
}
const reservationForm = document.querySelector('#reservation-form');
const reservationName = reservationForm.elements.nome;
reservationName.addEventListener('input', () => reservationName.setCustomValidity(reservationName.value.trim() ? '' : 'Informe seu nome.'));
reservationForm.addEventListener('input', () => { document.querySelector('#form-message').textContent = ''; });
dateInput.min = minimumDate();
dateInput.addEventListener("focus", () => {
  dateInput.min = minimumDate();
});
document
  .querySelector("#reservation-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    dateInput.min = minimumDate();
    reservationName.setCustomValidity(reservationName.value.trim() ? '' : 'Informe seu nome.');
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const date = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "long",
      timeZone: "UTC",
    }).format(new Date(`${data.get("data")}T12:00:00Z`));
    document.querySelector("#form-message").textContent =
      `${data.get("nome")}, sua reserva simulada para ${data.get("pessoas")}, em ${date} às ${data.get("horario")}, está pronta. Nenhuma reserva real foi efetuada.`;
  });

// The opening reveals like a rising tide; scroll continues the journey inside the clipped scenes.
document.fonts.ready.then(() => {
  if (!motionEnabled() || window.scrollY > 50 || document.hidden) return;
  const title = document.querySelector(".hero-content h1");
  introAnimations.push(
    title.animate(
      [
        { clipPath: "inset(0 0 100% 0)", transform: "translateY(28px)" },
        { clipPath: "inset(0 0 0% 0)", transform: "translateY(0)" },
      ],
      { duration: 1000, easing: "cubic-bezier(.16,1,.3,1)" },
    ),
  );
  for (const [selector, delay] of [
    [".hero-description", 180],
    [".journey-link", 360],
  ]) {
    introAnimations.push(
      document.querySelector(selector).animate(
        [
          { opacity: 0, transform: "translateY(16px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 750,
          delay,
          fill: "backwards",
          easing: "cubic-bezier(.16,1,.3,1)",
        },
      ),
    );
  }
});
