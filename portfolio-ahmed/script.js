// Portfolio data used to render repeated UI cleanly.
const skills = [
  ["JavaScript", 92, "Dynamic interfaces and API integrations"],
  ["TypeScript", 84, "Safer full stack application code"],
  ["Python", 88, "Backend services and automation"],
  ["Java", 76, "Object-oriented engineering foundations"],
  ["C++", 72, "Core programming and problem solving"],
  ["Node.js", 91, "REST APIs and server-side applications"],
  ["Express.js", 89, "Lightweight backend services"],
  ["Django", 86, "Secure, structured web applications"],
  ["React", 84, "Interactive frontend experiences"],
  ["Next.js", 82, "Full stack React products"],
  ["PostgreSQL", 90, "Relational data modeling"],
  ["MongoDB", 82, "Document-driven application data"],
  ["MySQL", 80, "Relational database workflows"],
  ["REST APIs", 93, "Scalable client-server contracts"],
  ["JWT Authentication", 88, "Secure access flows"],
  ["Git/GitHub", 87, "Version control and collaboration"],
  ["Tailwind CSS", 81, "Fast responsive UI styling"],
];

const typingPhrases = [
  "Backend-Focused Full Stack Engineer",
  "REST API Builder",
  "Scalable Systems Developer",
];

const loader = document.querySelector(".loader");
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const backToTop = document.querySelector(".back-to-top");
const sections = document.querySelectorAll("main section[id]");
const skillsGrid = document.querySelector(".skills-grid");
const form = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

// Loading animation.
window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hidden"), 450);
});

// Render skill cards from the data above.
skills.forEach(([name, level, detail]) => {
  const card = document.createElement("article");
  card.className = "skill-card reveal";
  card.innerHTML = `
    <div class="skill-top">
      <h3>${name}</h3>
      <span>${level}%</span>
    </div>
    <div class="skill-bar" aria-hidden="true">
      <div class="skill-fill" data-level="${level}"></div>
    </div>
    <p>${detail}</p>
  `;
  skillsGrid.appendChild(card);
});

// Mobile navigation.
navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

// Header state and back-to-top button.
function handleScrollChrome() {
  const scrolled = window.scrollY > 24;
  header.classList.toggle("scrolled", scrolled);
  backToTop.classList.toggle("visible", window.scrollY > 650);
}

window.addEventListener("scroll", handleScrollChrome, { passive: true });
handleScrollChrome();

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Active navigation highlighting.
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      navLinks.forEach((link) => link.classList.remove("active"));
      activeLink?.classList.add("active");
    });
  },
  { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
);

sections.forEach((section) => sectionObserver.observe(section));

// Scroll reveal and animated skill progress bars.
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");

      const fill = entry.target.querySelector(".skill-fill");
      if (fill) {
        fill.style.width = `${fill.dataset.level}%`;
      }

      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// Typing animation for the hero title.
const typingTarget = document.querySelector(".typing-text");
let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeHeroText() {
  const phrase = typingPhrases[phraseIndex];
  typingTarget.textContent = phrase.slice(0, letterIndex);

  if (!isDeleting && letterIndex < phrase.length) {
    letterIndex += 1;
    setTimeout(typeHeroText, 58);
    return;
  }

  if (!isDeleting && letterIndex === phrase.length) {
    isDeleting = true;
    setTimeout(typeHeroText, 1300);
    return;
  }

  if (isDeleting && letterIndex > 0) {
    letterIndex -= 1;
    setTimeout(typeHeroText, 34);
    return;
  }

  isDeleting = false;
  phraseIndex = (phraseIndex + 1) % typingPhrases.length;
  setTimeout(typeHeroText, 300);
}

typeHeroText();

// Frontend-only contact form feedback.
form.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "Thanks. This demo form is ready to connect to a backend endpoint.";
  form.reset();
});

// Lightweight animated particle background.
const canvas = document.querySelector(".particle-canvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * pixelRatio;
  canvas.height = window.innerHeight * pixelRatio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

function createParticles() {
  const count = Math.min(Math.floor(window.innerWidth / 18), 78);
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.34,
    vy: (Math.random() - 0.5) * 0.34,
    radius: Math.random() * 1.8 + 0.8,
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
    if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(56, 216, 255, 0.58)";
    ctx.fill();

    for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
      const next = particles[nextIndex];
      const distance = Math.hypot(particle.x - next.x, particle.y - next.y);
      if (distance < 120) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(next.x, next.y);
        ctx.strokeStyle = `rgba(80, 227, 164, ${0.16 * (1 - distance / 120)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawParticles);
}

resizeCanvas();
createParticles();
drawParticles();

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});
