// Load data (from localStorage if saved, else default)
const data = loadData();

// ─── Hero Typing Effect ───────────────────────────────
function typeText(el, text, speed = 60) {
  let i = 0;
  el.textContent = '';
  return new Promise(resolve => {
    const t = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) { clearInterval(t); resolve(); }
    }, speed);
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  await typeText(document.getElementById('heroName'), data.personal.name, 55);
  document.getElementById('heroRole').innerHTML =
    data.personal.title.replace('·', '<span style="color:var(--text3)">·</span>').replace('·', '<span style="color:var(--text3)">·</span>');
});

// ─── Stats ────────────────────────────────────────────
const statsRow = document.getElementById('statsRow');
data.stats.forEach(s => {
  statsRow.innerHTML += `<div class="stat-item">
    <div class="stat-value">${s.value}</div>
    <div class="stat-label">${s.label}</div>
  </div>`;
});

// ─── About ────────────────────────────────────────────
document.getElementById('aboutText').innerHTML = `<p>${data.personal.summary}</p>`;

const skillsGrid = document.getElementById('skillsGrid');
Object.entries(data.skills).forEach(([cat, items]) => {
  skillsGrid.innerHTML += `<div class="skill-category">
    <div class="skill-cat-name">${cat}</div>
    <div class="skill-tags">${items.map(t => `<span class="skill-tag">${t}</span>`).join('')}</div>
  </div>`;
});

// ─── Experience ───────────────────────────────────────
const expList = document.getElementById('expList');
data.experience.forEach(exp => {
  const div = document.createElement('div');
  div.className = 'exp-item';
  div.innerHTML = `
    <div class="exp-header" onclick="this.parentElement.classList.toggle('open')">
      <div>
        <div class="exp-title">${exp.title}</div>
        <div class="exp-company">${exp.company}</div>
        <div class="exp-meta">${exp.period} &nbsp;·&nbsp; ${exp.location}</div>
      </div>
      <div class="exp-toggle">+</div>
    </div>
    <div class="exp-body">
      <ul class="exp-bullets">${exp.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
    </div>`;
  expList.appendChild(div);
});
// Open first
if (expList.children[0]) expList.children[0].classList.add('open');

// ─── Projects ─────────────────────────────────────────
const projectsGrid = document.getElementById('projectsGrid');
data.projects.forEach(proj => {
  const card = document.createElement(proj.link ? 'a' : 'div');
  card.className = 'project-card' + (proj.featured ? ' featured' : '');
  if (proj.link) { card.href = proj.link; card.target = '_blank'; }
  card.innerHTML = `
    <div class="project-type">${proj.type}</div>
    <div class="project-title">${proj.title}</div>
    <div class="project-desc">${proj.description}</div>
    <div class="project-tags">${proj.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
    ${proj.link ? `<div class="project-link">View →</div>` : ''}`;
  projectsGrid.appendChild(card);
});

// ─── Progress Log ─────────────────────────────────────
renderProgress();

function renderProgress() {
  const container = document.getElementById('progressContainer');
  const allProgress = [];
  data.projects.forEach(proj => {
    (proj.progress || []).forEach(p => allProgress.push({ ...p, projectTitle: proj.title }));
  });
  allProgress.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (allProgress.length === 0) {
    container.innerHTML = `<div class="progress-empty">
      <div class="pe-icon">◎</div>
      <div class="pe-title">Progress updates coming soon</div>
      <div class="pe-sub">Check back for updates on ongoing projects, CTF challenges, and research.</div>
    </div>`;
    return;
  }
  container.innerHTML = `<div class="progress-list">${allProgress.map(p => `
    <div class="progress-card">
      <div class="progress-card-header">
        <div class="progress-card-title">${p.title}</div>
        <div class="progress-card-date">${p.date}</div>
      </div>
      <div class="progress-card-project">↳ ${p.projectTitle}</div>
      <div class="progress-card-text">${p.text}</div>
      ${p.percent !== undefined ? `<div class="progress-bar-wrap">
        <div class="progress-bar-label"><span>${p.status || 'Progress'}</span><span>${p.percent}%</span></div>
        <div class="progress-bar"><div class="progress-bar-fill" style="width:${p.percent}%"></div></div>
      </div>` : ''}
    </div>`).join('')}</div>`;
}

// ─── Coursework ───────────────────────────────────────
document.getElementById('courseworkTitle').textContent = data.coursework.title;
document.getElementById('courseworkDesc').textContent = data.coursework.description;
const coursesList = document.getElementById('coursesList');
data.coursework.courses.forEach(c => {
  coursesList.innerHTML += `<span class="skill-tag">${c}</span>`;
});

// ─── Certifications ───────────────────────────────────
const certsGrid = document.getElementById('certsGrid');
data.certifications.forEach(cert => {
  certsGrid.innerHTML += `<div class="cert-card">
    <div class="cert-icon">✦</div>
    <div>
      <div class="cert-name">${cert.name}</div>
      <div class="cert-issuer">${cert.issuer}</div>
      <div class="cert-year">${cert.year}</div>
    </div>
  </div>`;
});

// ─── Research ─────────────────────────────────────────
const researchList = document.getElementById('researchList');
data.research.forEach(r => {
  researchList.innerHTML += `<div style="background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:20px 24px;display:flex;gap:24px;align-items:flex-start;">
    <div style="color:var(--green);font-size:11px;letter-spacing:.06em;min-width:40px;margin-top:3px;">${r.year}</div>
    <div>
      <div style="font-family:var(--sans);font-size:16px;font-weight:700;color:var(--text);margin-bottom:4px;">${r.title}</div>
      <div style="font-size:13px;color:var(--text2);">${r.description}</div>
    </div>
  </div>`;
});

// ─── Contact ──────────────────────────────────────────
document.getElementById('contactDesc').textContent = data.personal.availability;

const contactLinks = document.getElementById('contactLinks');
const links = [
  { icon: 'ti-mail', label: 'Email', value: data.personal.email, href: `mailto:${data.personal.email}` },
  { icon: 'ti-brand-linkedin', label: 'LinkedIn', value: 'lordz-fedora', href: data.personal.linkedin },
  { icon: 'ti-brand-github', label: 'GitHub', value: 'adekunle-feranmi', href: data.personal.github },
  { icon: 'ti-brand-twitter', label: 'Twitter', value: data.personal.twitter, href: `https://twitter.com/${data.personal.twitter.replace('@','')}` },
  { icon: 'ti-brand-whatsapp', label: 'WhatsApp', value: data.personal.whatsapp, href: `https://wa.me/${data.personal.whatsapp.replace('+','')}` },
];
links.forEach(l => {
  contactLinks.innerHTML += `<a href="${l.href}" target="_blank" class="contact-link">
    <i class="ti ${l.icon} contact-link-icon"></i>
    <div>
      <div class="contact-link-label">${l.label}</div>
      <div class="contact-link-value">${l.value}</div>
    </div>
  </a>`;
});

// ─── Footer ───────────────────────────────────────────
document.getElementById('footerYear').textContent = `© ${new Date().getFullYear()} Adekunle Feranmi`;

// ─── Scroll Animation ─────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
