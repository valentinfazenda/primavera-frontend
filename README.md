# Primavera App Frontend

**Primavera App Frontend** is a modern web application dedicated to collaborative management and business process optimization.  
Built with **Next.js and React**, it provides a smooth, secure, and scalable user experience with responsive design, real-time communication, and role-based access control.  

---

## 🚀 Key Features

- **🔐 Authentication & Security**  
  Login, registration, token management, secure cookies.

- **👤 User Management**  
  Profile settings, avatars, status, and preferences.

- **🏢 Workspaces**  
  Create, edit, and manage collaborative workspaces.

- **💬 Chat**  
  Real-time chat and communication with all your content leveraging RAG.

- **📝 Waiting List**  
  Registration system for onboarding new users.

- **✨ Modern Interface**  
  Responsive UI, reusable components, intuitive navigation.

---

## 🛠️ Architecture & Technologies

- **Framework**: Next.js (App Router)  
- **UI**: React + Ant Design  
- **Type Safety**: TypeScript + Zod (schema validation)  
- **Icons**: FontAwesome  
- **Cookies Management**: js-cookie  
- **HTTP Requests**: Axios  
- **Assets**: Optimized images & SVGs  
- **Organization**: Domain-driven structure (`auth`, `admin`, `components`, `hooks`, etc.)

---

## ⚡ Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-account/primavera-frontend.git
   cd primavera-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**  
   Create a file `.env.local` in the project root and configure required variables.

---

## 📜 Available Scripts

- `npm run dev` → Start development server (**localhost:3000**)  
- `npm run build` → Build for production  
- `npm run start` → Run production server  
- `npm run lint` → Lint and check code quality  
- `npm run test` → Run unit tests (if configured)  

---

## 📂 Code Organization

```bash
primavera-frontend/
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities and helpers
│   ├── modules/        # Feature-based modules (auth, admin, workspace, etc.)
│   └── styles/         # Global and component-level styles
├── public/             # Static assets (images, icons, etc.)
├── .env.local          # Local environment variables
└── package.json        # Project config & scripts
```

---

## ✅ Best Practices

- 🔒 Strict typing with **TypeScript**  
- 🧾 Client-side data validation using **Zod**  
- 🎯 Clear separation of concerns: components, pages, hooks, utilities  
- 📐 Consistent naming and project structure conventions  
- 🧪 Unit tests for critical functions (to be expanded)  
- ♿ Accessibility-first and responsive design  

---

## 🤝 Contributing

We welcome contributions!  

1. Fork the project  
2. Create a branch:  
   ```bash
   git checkout -b feature/my-feature
   ```
3. Commit your changes:  
   ```bash
   git commit -m "feat: add my feature"
   ```
4. Push your branch and open a Pull Request  

---

## 📬 Support & Contact

For any questions, bugs, or suggestions, please:  
- Open an issue on GitHub  
- Or contact the team at **contact@primavera-app.com**

---

## 📜 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for more details.  

---

🌸 **Primavera App – Empowering your team’s collaboration.**
