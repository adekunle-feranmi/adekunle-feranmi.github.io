# Feranmi Adekunle — Cybersecurity Portfolio

A dark-themed, terminal-aesthetic cybersecurity portfolio with a built-in admin panel for managing content.

## 🚀 Hosting on GitHub Pages

### Step 1 — Create a GitHub repository
1. Go to [github.com](https://github.com) and sign in
2. Click **New repository**
3. Name it `portfolio` (or anything you want)
4. Set it to **Public**
5. Click **Create repository**

### Step 2 — Upload the files
1. In your new repo, click **Add file → Upload files**
2. Upload everything in this folder (keep the folder structure):
   ```
   index.html
   css/style.css
   js/data.js
   js/main.js
   admin/index.html
   admin/admin.css
   admin/admin.js
   README.md
   ```
3. Click **Commit changes**

### Step 3 — Enable GitHub Pages
1. Go to **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose **main** branch, **/ (root)** folder
4. Click **Save**
5. Your site will be live at: `https://yourusername.github.io/portfolio`

---

## 🔐 Admin Panel

Visit `your-site-url/admin` to access the admin panel.

**Default password:** `admin123`
> Change this immediately in Settings after first login!

### What you can manage:
- **Personal Info** — Name, bio, contact details, stats
- **Projects** — Add, edit, delete projects and CTF writeups
- **Progress Log** — Post updates on ongoing work (with progress bars)
- **Experience** — Work history
- **Skills** — Skill categories and tags
- **Certifications** — Credentials
- **Research** — Papers and publications
- **Settings** — Change password, export/import data

### ⚠️ Important Notes
- The admin panel uses **localStorage** to save changes — this means changes persist in the browser.
- To update the live site permanently, use **Export JSON** from Settings and replace `js/data.js` with your exported data wrapped in the `const PORTFOLIO_DATA = {...}` format.
- Never share your admin URL publicly in sensitive contexts.

---

## 📁 File Structure

```
portfolio/
├── index.html          ← Main portfolio page
├── css/
│   └── style.css       ← All styling
├── js/
│   ├── data.js         ← All your content (edit this to update defaults)
│   └── main.js         ← Page rendering logic
├── admin/
│   ├── index.html      ← Admin panel
│   ├── admin.css       ← Admin styles
│   └── admin.js        ← Admin logic
└── README.md
```

---

## ✏️ Editing Content Permanently

For permanent changes (so they survive browser resets), edit `js/data.js` directly and push to GitHub. Or:

1. Make changes in the admin panel
2. Go to **Settings → Export JSON**
3. Open `js/data.js`, replace the `PORTFOLIO_DATA` object with your exported data
4. Push to GitHub

---

Built with vanilla HTML/CSS/JS — no frameworks, no build step, no dependencies.
