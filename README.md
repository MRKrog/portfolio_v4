# Michael Krog Portfolio

A personal portfolio website built with Gatsby.

## 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd portfolio_v4
   ```

2. **Install Node.js 18 (LTS):**
   This project requires Node.js **v18.x**.
   - With [nvm](https://github.com/nvm-sh/nvm):
     ```bash
     nvm install 18
     nvm use 18
     ```
   - Or install Node 18 from [nodejs.org](https://nodejs.org/)

3. **Install dependencies (yarn):**
   ```bash
   yarn install
   ```

4. **Start the development server:**
   ```bash
   yarn develop
   ```
   Your site will be running at [http://localhost:8000](http://localhost:8000)

5. **Clean the cache (if you run into issues):**
   ```bash
   yarn clean
   ```

## 📦 Build for Production

```bash
yarn build
```

## ⚙️ Environment Variables

Create a `.env.development` / `.env.production` (gitignored) with:

```
GATSBY_CONTACT_ENDPOINT=https://your-api/contact
```

If unset, the contact form falls back to the default endpoint baked into the code.

## 📝 Content Structure
- Markdown content in `/content` (posts, projects, jobs, etc.)
- Images in `/src/images` (import in components) or `/static` (reference by URL)
- Components in `/src/components`

## 🛠️ Tech Stack
- Gatsby 4.x
- React 18
- Styled-components
- Markdown for content

## ⚠️ Troubleshooting
- **Node version errors:** ensure `node -v` shows `v18.x.x`.
- **Image not showing:** import images from `/src/images`, or place in `/static` and reference by URL.

## 📄 License
[0BSD](./LICENSE)
