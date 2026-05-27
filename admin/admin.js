// ─── Auth ──────────────────────────────────────────────
const DEFAULT_PASS = 'admin123';

function getPass() {
  return localStorage.getItem('admin_password') || DEFAULT_PASS;
}

function doLogin() {
  const val = document.getElementById('loginPass').value;
  if (val === getPass()) {
    sessionStorage.setItem('admin_auth', '1');
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    initAdmin();
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
}

function doLogout() {
  sessionStorage.removeItem('admin_auth');
  location.reload();
}

// Check if already logged in
if (sessionStorage.getItem('admin_auth') === '1') {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
}

// ─── Data ─────────────────────────────────────────────
let D = loadData();

function persist() {
  saveData(D);
  toast('Saved!');
}

// ─── Navigation ───────────────────────────────────────
const panelMeta = {
  dashboard:      { title: 'Dashboard',       sub: 'Overview of your portfolio' },
  personal:       { title: 'Personal Info',   sub: 'Name, contact details, bio and stats' },
  projects:       { title: 'Projects',        sub: 'Manage your projects and CTF writeups' },
  progress:       { title: 'Progress Log',    sub: 'Track updates on ongoing projects' },
  experience:     { title: 'Experience',      sub: 'Work history' },
  skills:         { title: 'Skills',          sub: 'Technical skills and tools' },
  certifications: { title: 'Certifications', sub: 'Credentials and courses' },
  research:       { title: 'Research',        sub: 'Publications and papers' },
  settings:       { title: 'Settings',        sub: 'Password, export/import' },
};

function showPanel(id) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('panel-' + id).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.textContent.trim().toLowerCase().includes(id.replace('-',' ').split(' ')[0].toLowerCase())) {
      n.classList.add('active');
    }
  });
  document.getElementById('panelTitle').textContent = panelMeta[id].title;
  document.getElementById('panelSub').textContent = panelMeta[id].sub;
  renderPanel(id);
}

function renderPanel(id) {
  if (id === 'dashboard') renderDashboard();
  if (id === 'personal') renderPersonal();
  if (id === 'projects') renderProjects();
  if (id === 'progress') renderProgressPanel();
  if (id === 'experience') renderExp();
  if (id === 'skills') renderSkills();
  if (id === 'certifications') renderCerts();
  if (id === 'research') renderResearch();
}

// ─── Init ─────────────────────────────────────────────
function initAdmin() {
  renderDashboard();
}

// ─── Dashboard ────────────────────────────────────────
function renderDashboard() {
  const allProgress = getAllProgress();
  document.getElementById('dashStats').innerHTML = [
    { v: D.projects.length, l: 'Projects' },
    { v: D.experience.length, l: 'Experiences' },
    { v: D.certifications.length, l: 'Certifications' },
    { v: allProgress.length, l: 'Progress Updates' },
  ].map(s => `<div class="stat-card"><div class="stat-card-value">${s.v}</div><div class="stat-card-label">${s.l}</div></div>`).join('');

  const recent = allProgress.sort((a,b) => new Date(b.date)-new Date(a.date)).slice(0,3);
  document.getElementById('dashRecentProgress').innerHTML = recent.length
    ? recent.map(p => `<div class="list-item">
        <div>
          <div class="list-item-title">${p.title}</div>
          <div class="list-item-sub">${p.projectTitle}</div>
          <div class="list-item-meta">${p.date}</div>
        </div>
      </div>`).join('')
    : '<div style="color:var(--text3);font-size:13px;padding:8px 0;">No progress updates yet. <span style="color:var(--green);cursor:pointer;" onclick="showPanel(\'progress\')">Add one →</span></div>';
}

function getAllProgress() {
  const all = [];
  D.projects.forEach(p => (p.progress||[]).forEach(pr => all.push({...pr, projectTitle: p.title, projId: p.id})));
  return all;
}

// ─── Personal ─────────────────────────────────────────
function renderPersonal() {
  const p = D.personal;
  document.getElementById('p_name').value = p.name || '';
  document.getElementById('p_title').value = p.title || '';
  document.getElementById('p_tagline').value = p.tagline || '';
  document.getElementById('p_location').value = p.location || '';
  document.getElementById('p_email').value = p.email || '';
  document.getElementById('p_phone').value = p.phone || '';
  document.getElementById('p_linkedin').value = p.linkedin || '';
  document.getElementById('p_github').value = p.github || '';
  document.getElementById('p_twitter').value = p.twitter || '';
  document.getElementById('p_whatsapp').value = p.whatsapp || '';
  document.getElementById('p_summary').value = p.summary || '';
  document.getElementById('p_availability').value = p.availability || '';
  renderStatsEditor();
}

function renderStatsEditor() {
  document.getElementById('statsEditor').innerHTML = D.stats.map((s, i) => `
    <div style="display:grid;grid-template-columns:1fr 2fr auto;gap:8px;margin-bottom:8px;align-items:center;">
      <input type="text" value="${s.value}" oninput="D.stats[${i}].value=this.value" placeholder="5+">
      <input type="text" value="${s.label}" oninput="D.stats[${i}].label=this.value" placeholder="Years Experience">
      <button class="btn-danger" onclick="D.stats.splice(${i},1);renderStatsEditor()">✕</button>
    </div>`).join('');
}

function addStat() {
  D.stats.push({ value: '', label: '' });
  renderStatsEditor();
}

function savePersonal() {
  D.personal.name = document.getElementById('p_name').value;
  D.personal.title = document.getElementById('p_title').value;
  D.personal.tagline = document.getElementById('p_tagline').value;
  D.personal.location = document.getElementById('p_location').value;
  D.personal.email = document.getElementById('p_email').value;
  D.personal.phone = document.getElementById('p_phone').value;
  D.personal.linkedin = document.getElementById('p_linkedin').value;
  D.personal.github = document.getElementById('p_github').value;
  D.personal.twitter = document.getElementById('p_twitter').value;
  D.personal.whatsapp = document.getElementById('p_whatsapp').value;
  D.personal.summary = document.getElementById('p_summary').value;
  D.personal.availability = document.getElementById('p_availability').value;
  persist();
}

// ─── Projects ─────────────────────────────────────────
let _projTags = [];

function renderProjects() {
  document.getElementById('projectsList').innerHTML = D.projects.map(p => `
    <div class="list-item">
      <div>
        <div class="list-item-title">${p.title}</div>
        <div class="list-item-sub">${p.type} · ${p.tags.join(', ')}</div>
        <div class="list-item-meta">${p.description.slice(0,80)}...</div>
      </div>
      <div class="list-actions">
        <button class="btn-sm" onclick="openProjectModal('${p.id}')">Edit</button>
        <button class="btn-danger" onclick="deleteProject('${p.id}')">Delete</button>
      </div>
    </div>`).join('') || '<div style="color:var(--text3);font-size:13px;">No projects yet.</div>';
}

function openProjectModal(id) {
  _projTags = [];
  document.getElementById('pm_id').value = '';
  document.getElementById('pm_type').value = '';
  document.getElementById('pm_title').value = '';
  document.getElementById('pm_desc').value = '';
  document.getElementById('pm_link').value = '';
  document.getElementById('pm_featured').checked = false;
  document.getElementById('projectModalTitle').textContent = 'New Project';

  if (id) {
    const p = D.projects.find(x => x.id === id);
    if (p) {
      document.getElementById('pm_id').value = p.id;
      document.getElementById('pm_type').value = p.type;
      document.getElementById('pm_title').value = p.title;
      document.getElementById('pm_desc').value = p.description;
      document.getElementById('pm_link').value = p.link || '';
      document.getElementById('pm_featured').checked = p.featured || false;
      _projTags = [...p.tags];
      document.getElementById('projectModalTitle').textContent = 'Edit Project';
    }
  }
  renderProjTags();
  openModal('projectModal');
}

function addProjectTag() {
  const inp = document.getElementById('pm_tag_input');
  const val = inp.value.trim().replace(',','');
  if (val && !_projTags.includes(val)) _projTags.push(val);
  inp.value = '';
  renderProjTags();
}

function renderProjTags() {
  document.getElementById('pm_tags').innerHTML = _projTags.map((t,i) =>
    `<span class="tag-pill">${t}<button onclick="_projTags.splice(${i},1);renderProjTags()">×</button></span>`).join('');
}

function saveProject() {
  const id = document.getElementById('pm_id').value;
  const proj = {
    id: id || 'proj_' + Date.now(),
    type: document.getElementById('pm_type').value,
    title: document.getElementById('pm_title').value,
    description: document.getElementById('pm_desc').value,
    link: document.getElementById('pm_link').value,
    featured: document.getElementById('pm_featured').checked,
    tags: [..._projTags],
    progress: id ? (D.projects.find(p=>p.id===id)||{}).progress || [] : [],
  };
  if (id) {
    const idx = D.projects.findIndex(p => p.id === id);
    if (idx !== -1) D.projects[idx] = proj;
  } else {
    D.projects.push(proj);
  }
  persist();
  closeModal('projectModal');
  renderProjects();
}

function deleteProject(id) {
  if (!confirm('Delete this project?')) return;
  D.projects = D.projects.filter(p => p.id !== id);
  persist();
  renderProjects();
}

// ─── Progress ─────────────────────────────────────────
function renderProgressPanel() {
  const all = getAllProgress().sort((a,b) => new Date(b.date)-new Date(a.date));
  document.getElementById('progressList').innerHTML = all.map(p => `
    <div class="list-item">
      <div>
        <div class="list-item-title">${p.title}</div>
        <div class="list-item-sub">↳ ${p.projectTitle}</div>
        <div class="list-item-meta">${p.date}${p.percent ? ' · ' + p.percent + '%' : ''}</div>
        <div style="color:var(--text3);font-size:12px;margin-top:4px;">${p.text.slice(0,100)}...</div>
      </div>
      <div class="list-actions">
        <button class="btn-sm" onclick="openProgressModal('${p.projId}','${p.id}')">Edit</button>
        <button class="btn-danger" onclick="deleteProgress('${p.projId}','${p.id}')">Delete</button>
      </div>
    </div>`).join('') || '<div style="color:var(--text3);font-size:13px;">No progress updates yet.</div>';
}

function openProgressModal(projId, updateId) {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('prm_id').value = '';
  document.getElementById('prm_proj_id').value = '';
  document.getElementById('prm_title').value = '';
  document.getElementById('prm_text').value = '';
  document.getElementById('prm_date').value = today;
  document.getElementById('prm_percent').value = 0;
  document.getElementById('prm_pct_val').textContent = '0%';
  document.getElementById('prm_status').value = '';
  document.getElementById('progressModalTitle').textContent = 'New Progress Update';

  const sel = document.getElementById('prm_project');
  sel.innerHTML = D.projects.map(p => `<option value="${p.id}">${p.title}</option>`).join('');

  if (projId) sel.value = projId;

  if (updateId && projId) {
    const proj = D.projects.find(p => p.id === projId);
    const update = (proj?.progress||[]).find(u => u.id === updateId);
    if (update) {
      document.getElementById('prm_id').value = update.id;
      document.getElementById('prm_proj_id').value = projId;
      document.getElementById('prm_title').value = update.title;
      document.getElementById('prm_text').value = update.text;
      document.getElementById('prm_date').value = update.date;
      document.getElementById('prm_percent').value = update.percent || 0;
      document.getElementById('prm_pct_val').textContent = (update.percent || 0) + '%';
      document.getElementById('prm_status').value = update.status || '';
      sel.value = projId;
      document.getElementById('progressModalTitle').textContent = 'Edit Progress Update';
    }
  }
  openModal('progressModal');
}

function saveProgress() {
  const projId = document.getElementById('prm_project').value;
  const existingId = document.getElementById('prm_id').value;
  const pct = parseInt(document.getElementById('prm_percent').value);

  const update = {
    id: existingId || 'upd_' + Date.now(),
    title: document.getElementById('prm_title').value,
    text: document.getElementById('prm_text').value,
    date: document.getElementById('prm_date').value,
    percent: pct || undefined,
    status: document.getElementById('prm_status').value || undefined,
  };

  const proj = D.projects.find(p => p.id === projId);
  if (!proj) return;
  if (!proj.progress) proj.progress = [];

  if (existingId) {
    const idx = proj.progress.findIndex(u => u.id === existingId);
    if (idx !== -1) proj.progress[idx] = update;
  } else {
    proj.progress.push(update);
  }

  persist();
  closeModal('progressModal');
  renderProgressPanel();
}

function deleteProgress(projId, updateId) {
  if (!confirm('Delete this update?')) return;
  const proj = D.projects.find(p => p.id === projId);
  if (proj) proj.progress = (proj.progress||[]).filter(u => u.id !== updateId);
  persist();
  renderProgressPanel();
}

// ─── Experience ───────────────────────────────────────
function renderExp() {
  document.getElementById('expList').innerHTML = D.experience.map(e => `
    <div class="list-item">
      <div>
        <div class="list-item-title">${e.title}</div>
        <div class="list-item-sub">${e.company}</div>
        <div class="list-item-meta">${e.period} · ${e.location}</div>
      </div>
      <div class="list-actions">
        <button class="btn-sm" onclick="openExpModal('${e.id}')">Edit</button>
        <button class="btn-danger" onclick="deleteExp('${e.id}')">Delete</button>
      </div>
    </div>`).join('');
}

function openExpModal(id) {
  document.getElementById('em_id').value = '';
  document.getElementById('em_title').value = '';
  document.getElementById('em_company').value = '';
  document.getElementById('em_period').value = '';
  document.getElementById('em_location').value = '';
  document.getElementById('em_bullets').value = '';
  document.getElementById('expModalTitle').textContent = 'New Experience';

  if (id) {
    const e = D.experience.find(x => x.id === id);
    if (e) {
      document.getElementById('em_id').value = e.id;
      document.getElementById('em_title').value = e.title;
      document.getElementById('em_company').value = e.company;
      document.getElementById('em_period').value = e.period;
      document.getElementById('em_location').value = e.location;
      document.getElementById('em_bullets').value = e.bullets.join('\n');
      document.getElementById('expModalTitle').textContent = 'Edit Experience';
    }
  }
  openModal('expModal');
}

function saveExp() {
  const id = document.getElementById('em_id').value;
  const exp = {
    id: id || 'exp_' + Date.now(),
    title: document.getElementById('em_title').value,
    company: document.getElementById('em_company').value,
    period: document.getElementById('em_period').value,
    location: document.getElementById('em_location').value,
    bullets: document.getElementById('em_bullets').value.split('\n').filter(b => b.trim()),
  };
  if (id) {
    const idx = D.experience.findIndex(e => e.id === id);
    if (idx !== -1) D.experience[idx] = exp;
  } else {
    D.experience.unshift(exp);
  }
  persist();
  closeModal('expModal');
  renderExp();
}

function deleteExp(id) {
  if (!confirm('Delete this experience?')) return;
  D.experience = D.experience.filter(e => e.id !== id);
  persist();
  renderExp();
}

// ─── Skills ───────────────────────────────────────────
function renderSkills() {
  const editor = document.getElementById('skillsEditor');
  editor.innerHTML = Object.entries(D.skills).map(([cat, items], ci) => `
    <div class="section-divider" style="margin-top:${ci===0?'0':'16px'};">
      <input type="text" value="${cat}" oninput="renameSkillCat('${cat}',this.value)" style="background:transparent;border:none;color:var(--green);font-size:10px;letter-spacing:.12em;text-transform:uppercase;font-family:var(--mono);outline:none;width:200px;">
      <button class="btn-danger" onclick="deleteSkillCat('${cat}')">✕ Remove</button>
    </div>
    <div class="tags-display" id="skcat_${ci}">
      ${items.map((t,ti) => `<span class="tag-pill">${t}<button onclick="removeSkillTag('${cat}',${ti})">×</button></span>`).join('')}
    </div>
    <div style="display:flex;gap:8px;margin-top:8px;">
      <input type="text" id="sk_inp_${ci}" placeholder="Add skill..." style="max-width:200px;" onkeydown="if(event.key==='Enter'){event.preventDefault();addSkillTag('${cat}',${ci})}">
      <button class="btn-sm" onclick="addSkillTag('${cat}',${ci})">Add</button>
    </div>`).join('');
}

function renameSkillCat(oldName, newName) {
  if (oldName === newName) return;
  const keys = Object.keys(D.skills);
  const vals = Object.values(D.skills);
  const idx = keys.indexOf(oldName);
  if (idx === -1) return;
  keys[idx] = newName;
  D.skills = Object.fromEntries(keys.map((k,i) => [k, vals[i]]));
}

function deleteSkillCat(cat) {
  if (!confirm('Delete this category?')) return;
  delete D.skills[cat];
  renderSkills();
}

function addSkillCategory() {
  D.skills['New Category'] = [];
  renderSkills();
}

function addSkillTag(cat, ci) {
  const inp = document.getElementById('sk_inp_' + ci);
  const val = inp.value.trim();
  if (val && !D.skills[cat].includes(val)) D.skills[cat].push(val);
  inp.value = '';
  renderSkills();
}

function removeSkillTag(cat, idx) {
  D.skills[cat].splice(idx, 1);
  renderSkills();
}

function saveSkills() { persist(); }

// ─── Certifications ───────────────────────────────────
function renderCerts() {
  document.getElementById('certsList').innerHTML = D.certifications.map((c,i) => `
    <div class="list-item">
      <div>
        <div class="list-item-title">${c.name}</div>
        <div class="list-item-sub">${c.issuer}</div>
        <div class="list-item-meta">${c.year}</div>
      </div>
      <div class="list-actions">
        <button class="btn-sm" onclick="openCertModal(${i})">Edit</button>
        <button class="btn-danger" onclick="deleteCert(${i})">Delete</button>
      </div>
    </div>`).join('');
}

function openCertModal(idx) {
  document.getElementById('cm_idx').value = '';
  document.getElementById('cm_name').value = '';
  document.getElementById('cm_issuer').value = '';
  document.getElementById('cm_year').value = '';
  if (idx !== undefined) {
    const c = D.certifications[idx];
    document.getElementById('cm_idx').value = idx;
    document.getElementById('cm_name').value = c.name;
    document.getElementById('cm_issuer').value = c.issuer;
    document.getElementById('cm_year').value = c.year;
  }
  openModal('certModal');
}

function saveCert() {
  const idx = document.getElementById('cm_idx').value;
  const cert = {
    name: document.getElementById('cm_name').value,
    issuer: document.getElementById('cm_issuer').value,
    year: document.getElementById('cm_year').value,
  };
  if (idx !== '') D.certifications[parseInt(idx)] = cert;
  else D.certifications.push(cert);
  persist();
  closeModal('certModal');
  renderCerts();
}

function deleteCert(idx) {
  if (!confirm('Delete?')) return;
  D.certifications.splice(idx,1);
  persist();
  renderCerts();
}

// ─── Research ─────────────────────────────────────────
function renderResearch() {
  document.getElementById('researchList').innerHTML = D.research.map((r,i) => `
    <div class="list-item">
      <div>
        <div class="list-item-title">${r.title}</div>
        <div class="list-item-sub">${r.year}</div>
        <div style="color:var(--text3);font-size:12px;margin-top:4px;">${r.description}</div>
      </div>
      <div class="list-actions">
        <button class="btn-sm" onclick="openResearchModal(${i})">Edit</button>
        <button class="btn-danger" onclick="deleteResearch(${i})">Delete</button>
      </div>
    </div>`).join('');
}

function openResearchModal(idx) {
  document.getElementById('rm_idx').value = '';
  document.getElementById('rm_title').value = '';
  document.getElementById('rm_year').value = '';
  document.getElementById('rm_desc').value = '';
  if (idx !== undefined) {
    const r = D.research[idx];
    document.getElementById('rm_idx').value = idx;
    document.getElementById('rm_title').value = r.title;
    document.getElementById('rm_year').value = r.year;
    document.getElementById('rm_desc').value = r.description;
  }
  openModal('researchModal');
}

function saveResearch() {
  const idx = document.getElementById('rm_idx').value;
  const r = {
    title: document.getElementById('rm_title').value,
    year: document.getElementById('rm_year').value,
    description: document.getElementById('rm_desc').value,
  };
  if (idx !== '') D.research[parseInt(idx)] = r;
  else D.research.push(r);
  persist();
  closeModal('researchModal');
  renderResearch();
}

function deleteResearch(idx) {
  if (!confirm('Delete?')) return;
  D.research.splice(idx,1);
  persist();
  renderResearch();
}

// ─── Settings ─────────────────────────────────────────
function changePassword() {
  const cur = document.getElementById('s_current').value;
  const nw = document.getElementById('s_new').value;
  const conf = document.getElementById('s_confirm').value;
  if (cur !== getPass()) return toast('Current password is wrong', true);
  if (nw !== conf) return toast('Passwords do not match', true);
  if (nw.length < 6) return toast('Password too short (min 6 chars)', true);
  localStorage.setItem('admin_password', nw);
  document.getElementById('s_current').value = '';
  document.getElementById('s_new').value = '';
  document.getElementById('s_confirm').value = '';
  toast('Password changed!');
}

function exportData() {
  const blob = new Blob([JSON.stringify(D, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'portfolio_data.json';
  a.click();
}

function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      D = JSON.parse(ev.target.result);
      saveData(D);
      toast('Data imported!');
    } catch {
      toast('Invalid JSON file', true);
    }
  };
  reader.readAsText(file);
}

function resetData() {
  if (!confirm('This will delete ALL your changes. Are you sure?')) return;
  localStorage.removeItem('portfolio_data');
  D = loadData();
  toast('Data reset to defaults');
}

// ─── Modals ───────────────────────────────────────────
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });
});

// ─── Toast ────────────────────────────────────────────
let toastTimer;
function toast(msg, error) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast show' + (error ? ' error' : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}