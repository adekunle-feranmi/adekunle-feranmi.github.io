# Cybersecurity Portfolio

A clean, professional single-file portfolio website built for freelance cybersecurity consultants. Includes a password-protected admin panel for easy content management — no backend, no framework, no dependencies.

---

## Features

- **7 portfolio sections** — Hero, About, Skills & Tools, Certifications, Projects/CTF Writeups, Research Studies, Blog/Writeups, and Contact
- **Admin panel** — password-protected interface to manage all content without touching code
- **Persistent storage** — all changes saved to browser localStorage and survive page refreshes
- **Research document uploads** — attach PDFs/DOCs or link to hosted documents
- **Single HTML file** — deploy anywhere static hosting is supported
- **Fully responsive** — works on desktop and mobile

---

## Getting Started

### 1. Open the portfolio

Just open `portfolio.html` in any modern browser. No install or build step needed.

### 2. Log in to the admin panel

Click the **⚙ admin** button in the top-right corner of the navigation bar.

| Field    | Default value |
|----------|---------------|
| Password | `admin123`    |

> **Important:** Change your password immediately after first login via the **Settings** tab.

### 3. Fill in your content

Work through each admin tab in order:

| Tab | What you can edit |
|-----|-------------------|
| **Hero** | Your name, tagline, specialty tags |
| **About** | Bio text, stats (years of experience, clients, etc.) |
| **Skills** | Skill categories and tools (comma-separated) |
| **Certs** | Certification name, issuing org, year, abbreviation |
| **Projects** | Project type, title, description, tags, link |
| **Research** | Upload PDFs/DOCs or paste document URLs |
| **Blog** | Post title, date, excerpt, external link |
| **Contact** | Social links, email, contact note |
| **Settings** | Change admin password, reset all data |

---

## Deployment

The portfolio is a single `.html` file — deploy it on any static host.

### GitHub Pages (free)
```bash
# Create a new repo, add the file, enable Pages in repo settings
git init
git add portfolio.html
git commit -m "initial portfolio"
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
# Then go to Settings > Pages > Deploy from branch (main / root)
```

### Netlify (free, drag & drop)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop `portfolio.html` onto the deploy area
3. Your site is live instantly with a free `.netlify.app` subdomain

### Vercel (free)
```bash
npm i -g vercel
vercel deploy portfolio.html
```

### Any web host
Upload `portfolio.html` to your public HTML directory via FTP/SFTP. Rename it to `index.html` if you want it to load at the root URL.

---

## Admin Panel Guide

### Accessing the panel
The admin button is always visible in the nav bar. It is not hidden from view — security relies on the password. Do not share your deployed URL with your password.

### Changing your password
1. Click ⚙ admin → log in
2. Go to the **Settings** tab
3. Enter and confirm your new password → click **Change Password**

### Adding research documents
- **Uploaded file:** Click the upload area in the Research tab and select a PDF or DOC. The file is stored as a temporary object URL — best used locally or replace with a hosted link before deploying.
- **Hosted document:** Paste a direct URL (Google Drive, Dropbox, your own server) in the URL field of a research entry.

### Resetting all data
Settings tab → **Reset all data**. This restores the demo content and cannot be undone.

---

## File Structure

```
portfolio.html     # The entire portfolio — HTML, CSS, and JS in one file
README.md          # This file
```

---

## Customisation Tips

| Goal | How |
|------|-----|
| Change accent color | Find `--accent: #1a4f3a` in the `<style>` block and replace the hex value |
| Change font | Replace the Google Fonts import URL and update `--sans` / `--mono` variables |
| Add a new section | Duplicate an existing `<section>` block in the HTML, add a nav link, and wire up an admin tab following the same pattern |
| Remove a section | Delete the `<section>` block and its corresponding nav link and admin tab |

---

## Browser Support

Works in all modern browsers: Chrome, Firefox, Safari, Edge. Requires JavaScript enabled.

---

## License

MIT — free to use, modify, and deploy for personal and commercial projects.
