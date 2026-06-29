# Kindev - Agencia de Desarrollo de Software

Landing page moderna para **Kindev**, agencia de desarrollo de software. Construida con React, Vite, TailwindCSS y desplegada en Firebase Hosting.

## Tech Stack

- **React 19** + TypeScript
- **Vite 6** (dev server + bundler)
- **TailwindCSS 4** (styling)
- **Motion** (animaciones)
- **Lucide React** (iconos)
- **Firebase Hosting** (deploy)
- **Docker** (contenedores)

## Requisitos

- Node.js 20+
- npm 10+
- Docker y Docker Compose (opcional, para contenedores)

## Desarrollo Local

### Sin Docker

```bash
npm install
cp .env.example .env.local    # Configura tus variables de entorno
npm run dev                   # http://localhost:3000
```

### Con Docker

```bash
cp .env.example .env.local    # Configura tus variables de entorno
docker-compose up             # http://localhost:3000
```

## Build de Producción

```bash
npm run build        # Genera la carpeta dist/
npm run preview      # Preview local del build
```

### Docker en Producción

```bash
docker-compose --profile production up web-prod   # http://localhost:8080
```

## Deploy a Firebase

```bash
npm run build
npx firebase deploy --only hosting
```

## Estructura del Proyecto

```
kindev/
├── src/                    # Código fuente React
│   ├── components/         # Componentes de la landing
│   ├── lib/                # Utilidades
│   ├── App.tsx             # Componente raíz
│   ├── main.tsx            # Entry point React
│   └── index.css           # Estilos globales + Tailwind
├── public/                 # Assets estáticos
├── index.html              # HTML entry point (Vite)
├── firebase.json           # Config de Firebase Hosting
├── Dockerfile              # Multi-stage (dev + producción)
├── docker-compose.yml      # Servicios Docker
└── vite.config.ts          # Configuración Vite
```
