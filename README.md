# Michael Krog Portfolio

A personal portfolio website built with Gatsby.

## 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd portfolio_v4
   ```

2. **Install Node.js 18 (LTS) and use it:**
   This project requires Node.js **v18.x** for best compatibility.
   - If you use [nvm](https://github.com/nvm-sh/nvm):
     ```bash
     nvm install 18
     nvm use 18
     ```
   - Or install Node 18 from [nodejs.org](https://nodejs.org/)

3. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

4. **Start the development server:**
   ```bash
   npm run develop
   ```
   Your site will be running at [http://localhost:8000](http://localhost:8000)

5. **Clean the cache (if you run into issues):**
   ```bash
   npm run clean
   ```

## 📦 Build for Production

```bash
npm run build
```

## 📝 Content Structure
- Markdown content in `/content` (posts, projects, jobs, etc.)
- Images in `/src/images` (import in components) or `/static` (reference by URL)
- Components in `/src/components`

## 🛠️ Tech Stack
- Gatsby 4.x
- React 18
- Styled-components
- Markdown for content
- Gatsby plugins for images, SEO, PWA, etc.

## ⚠️ Troubleshooting
- **Node version errors:** Make sure you are using Node 18 (`node -v` should show `v18.x.x`).
- **Image not showing:** Use static imports for images in `/src/images`, or place images in `/static` and reference by URL.
- **Plugin errors:** Run `npm install --legacy-peer-deps` after changing Node versions or dependencies.

## 📄 License
[0BSD](./LICENSE)
