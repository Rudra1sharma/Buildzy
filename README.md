
# Buildzy - Visual Website Builder with GitHub Integration

Buildzy is a low-code web development platform that allows users to visually design web pages using a drag-and-drop interface powered by GrapesJS. The generated code can be seamlessly pushed to a user's GitHub repository, making it an ideal tool for rapid prototyping, UI experimentation, and collaborative web development.

## Features

### Visual Editor (Powered by GrapesJS)
- Drag-and-drop components such as buttons, containers, and input fields
- Real-time HTML and CSS generation
- Full design customization: layout, typography, colors, spacing, etc.
- Clean exportable code

### GitHub Integration
- Sign in with GitHub using OAuth (NextAuth)
- Create and manage repositories
- Create and modify files
- Commit and view commit history
- Save generated designs directly to a GitHub repository

### Session and Authentication
- User authentication managed with NextAuth.js
- Secure session management using encrypted cookies
- GitHub access tokens scoped to repository actions

## Tech Stack

- Framework: Next.js (App Router)
- UI Library: GrapesJS, ShadCN UI, Tailwind CSS
- Authentication: NextAuth.js with GitHub OAuth Provider
- State Management: NextAuth Session
- GitHub API: REST v3
- Deployment: Vercel (or any Node.js-compatible platform)

## Getting Started

### Prerequisites
- Node.js >= 18.x
- GitHub account
- GitHub OAuth App (Client ID and Client Secret)
- pnpm / npm / yarn

### Clone the Repository

```bash
git clone https://github.com/kr1shr1/Buildzy.git
cd Buildzy
```

### Install Dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### Configure Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
GITHUB_ID=your_github_oauth_client_id
GITHUB_SECRET=your_github_oauth_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=some_random_secret_key
```

### Run the Development Server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to access the app.

## Folder Structure (Important Modules)

- `src/app/studio`: Main drag-and-drop canvas logic using GrapesJS
- `src/app/api/github`: Handles all GitHub-related API routes (file creation, commit, repo actions)
- `src/lib/github`: GitHub API logic abstraction
- `src/components`: UI components (custom buttons, layout containers)
- `src/context`: Context providers (if any)

## Use Cases

- Prototyping UIs without writing code
- Quickly publishing static pages to GitHub
- Educational tool for learning web development
- Collaborative UI design and version control

## License

This project is licensed under the MIT License.
