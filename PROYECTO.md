# Stttock Website — Guia de Configuracion y Flujo de Trabajo

## Descripcion General

Landing page + CRM interno para **Stttock**, SaaS de gestion para bares y restaurantes en Mexico.
Dominio en produccion: **stttock.com**
Repositorio: **ArkVault/stttockWebsite** (GitHub)
Proyecto Vercel ID: `prj_TPeJ63L8mASiu7hBTDImVjJxXbez`

---

## Stack Tecnico

| Capa | Tecnologia | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.0 |
| UI | React | 19 |
| Lenguaje | TypeScript | ^5 |
| Estilos | Tailwind CSS | v4 (sin tailwind.config.js) |
| Componentes | shadcn/ui + Radix UI | — |
| Animaciones | tw-animate-css | 1.3.3 |
| Base de datos | Supabase (PostgreSQL) | @supabase/ssr ^0.10.2 |
| Pagos | Stripe | ^22.0.2 |
| Analytics | Vercel Analytics | 1.6.1 |
| 3D | React Three Fiber + Three.js | 9.5.0 / 0.182.0 |
| Package manager | **pnpm** (pnpm-lock.yaml) | — |

---

## Estructura del Proyecto

```
/
├── app/
│   ├── layout.tsx          ← Root layout, metadata SEO, fuentes
│   ├── page.tsx            ← Landing page principal (ruta /)
│   ├── globals.css         ← Tokens de diseño, animaciones globales
│   ├── actions/
│   │   ├── crm-auth.ts     ← Server actions: login/logout CRM
│   │   ├── crm-leads.ts    ← Server actions: CRUD leads (CRM)
│   │   ├── leads.ts        ← Server action: insertar lead desde landing
│   │   └── stripe.ts       ← Server action: crear sesion de pago
│   └── crm/
│       ├── layout.tsx      ← Layout protegido del CRM
│       ├── page.tsx        ← Dashboard CRM (requiere auth)
│       └── login/page.tsx  ← Login del CRM
├── components/
│   ├── ui/                 ← Componentes shadcn/ui genericos
│   └── *.tsx               ← Componentes especificos del sitio
├── lib/
│   ├── plans.ts            ← Stripe Price IDs por plan/ciclo
│   ├── stripe.ts           ← Instancia de Stripe
│   ├── utils.ts            ← cn() helper
│   └── supabase/
│       ├── client.ts       ← Cliente Supabase (browser)
│       ├── server.ts       ← Cliente Supabase (server/RSC)
│       └── middleware.ts   ← Proteccion de rutas /crm/*
├── middleware.ts            ← Middleware Next.js (llama a updateSession)
├── scripts/
│   └── 001_create_leads.sql ← Migracion: tabla leads con RLS
├── public/
│   ├── fonts/SenseFont-Regular.ttf  ← Fuente local
│   └── images/             ← Assets estaticos
├── next.config.mjs
├── tsconfig.json
└── components.json         ← Configuracion shadcn/ui
```

---

## Variables de Entorno Requeridas

Configurar en **Vercel Dashboard > Settings > Environment Variables** y en archivo `.env.local` para desarrollo local.

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://<tu-proyecto>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>

# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...   # Solo si hay webhooks

# URL del sitio (para redirects de Stripe)
NEXT_PUBLIC_SITE_URL=https://stttock.com
```

---

## Base de Datos (Supabase)

### Tabla: `public.leads`

Migración: `scripts/001_create_leads.sql`

| Columna | Tipo | Notas |
|---|---|---|
| id | UUID | PK, auto |
| created_at | TIMESTAMPTZ | auto |
| nombre | TEXT | — |
| negocio | TEXT | — |
| correo | TEXT | — |
| telefono | TEXT | — |
| plan | TEXT | 'cadena' o 'enterprise' |
| sucursales | INTEGER | — |
| meseros | INTEGER | default 0 |
| jefes_barra | INTEGER | default 0 |
| managers | INTEGER | default 0 |
| admins | INTEGER | default 0 |
| status | TEXT | 'nuevo' / 'contactado' / 'demo' / 'cerrado' / 'perdido' |
| notas | TEXT | nullable |

### RLS (Row Level Security)

- **INSERT**: permitido para todos (anon) — formulario de landing
- **SELECT / UPDATE / DELETE**: solo usuarios autenticados (CRM admins)

### Agregar nuevas migraciones

Siempre crear un archivo nuevo con version incremental:
```
scripts/002_<descripcion>.sql
scripts/003_<descripcion>.sql
```
Nunca editar scripts que ya fueron ejecutados.

---

## Autenticacion (CRM)

- Usa **Supabase Auth** nativo
- Rutas protegidas: `/crm/*` (excepto `/crm/login`)
- El middleware (`middleware.ts` → `lib/supabase/middleware.ts`) redirige a `/crm/login` si no hay sesion
- El middleware runtime es `nodejs` (requerido por `nodeMiddleware: true` en next.config)
- Los CRM admins se crean directamente desde el dashboard de Supabase (Auth > Users)

---

## Pagos (Stripe)

### Price IDs configurados en `lib/plans.ts`

| Plan | Ciclo | Price ID | Precio |
|---|---|---|---|
| starter | monthly | price_1TNnVPGVivqH3Bo8c0MxbxoL | $1,899 MXN/mes |
| starter | annual | price_1TNnVOGVivqH3Bo86xOWqten | $1,499 MXN/mes |
| business | monthly | price_1TNnVOGVivqH3Bo85IqgsaGa | $3,499 MXN/mes |
| business | annual | price_1TNnVPGVivqH3Bo8iUGDwNRx | $2,999 MXN/mes |

Para cambiar precios: editar `lib/plans.ts` con los nuevos Price IDs de Stripe Dashboard.

---

## Tipografia

Definida en `app/layout.tsx` + `app/globals.css`:

| Variable CSS | Fuente | Uso |
|---|---|---|
| `--font-sans` | Geist | Body, default |
| `--font-mono` | Geist Mono | Codigo |
| `--font-afacad` | Afacad | Elementos UI |
| `--font-display` | Space Grotesk | Titulos/display |
| `--font-sense` | SenseFont (local) | Branding |
| `--font-outfit` | Outfit | Textos secundarios |

Clases Tailwind: `font-sans`, `font-mono`, `font-display`, `font-afacad`, `font-sense`, `font-outfit`.

---

## next.config.mjs

```js
{
  typescript: { ignoreBuildErrors: true },  // Builds no fallan por errores TS
  images: { unoptimized: true },            // Sin optimizacion de imagenes
  experimental: { nodeMiddleware: true },   // Permite runtime nodejs en middleware
}
```

---

## Flujo de Trabajo con v0 + GitHub

### Rama activa en v0

v0 trabaja siempre en la rama: **`v0/uncuratedmail-3569-b8de122a`**
La rama base es: **`main`**

### Como hacer cambios desde v0

1. Pide el cambio directamente en este chat de v0
2. v0 edita los archivos y hace commit automatico a la rama `v0/uncuratedmail-3569-b8de122a`
3. Vercel despliega un preview de esa rama automaticamente
4. Cuando el cambio se ve bien en el preview → mergear a `main`

### Como mergear a main sin romper nada

**Desde GitHub (recomendado):**
1. Ir a **ArkVault/stttockWebsite** en GitHub
2. Pull Request de `v0/uncuratedmail-3569-b8de122a` → `main`
3. Revisar el build de Vercel en el PR
4. Si el build pasa: **Merge**
5. Vercel redespliega `main` automaticamente al dominio `stttock.com`

**Reglas para no romper produccion:**
- Nunca hacer push directo a `main`
- Siempre verificar el preview de Vercel antes de mergear
- Si se agregan variables de entorno nuevas, agregarlas en Vercel Dashboard ANTES de mergear
- Si se crean nuevas migraciones SQL, ejecutarlas en Supabase ANTES de mergear (o simultaneamente)
- No editar scripts SQL ya ejecutados, siempre crear uno nuevo con numero mayor

### Como agregar nuevas rutas o paginas

- Crear archivo en `app/<ruta>/page.tsx`
- Si requiere autenticacion, agregar el path al matcher en `middleware.ts` o en la logica de `lib/supabase/middleware.ts`

### Como agregar nuevos componentes shadcn/ui

- Los componentes van en `components/ui/`
- Seguir el patron existente (ver cualquier archivo en esa carpeta)

---

## Deployment

| Entorno | Rama | URL |
|---|---|---|
| Production | main | https://stttock.com |
| Preview | v0/uncuratedmail-3569-b8de122a | URL generada por Vercel |

El deployment es automatico en cada push a cualquier rama conectada en Vercel.

---

## Notas Importantes

- **pnpm** es el package manager — no usar npm ni yarn
- Tailwind v4 no usa `tailwind.config.js` — toda la config va en `globals.css` dentro de `@theme inline`
- TypeScript errors no bloquean el build (`ignoreBuildErrors: true`) pero igual se deben corregir
- El `runtime = 'nodejs'` en `middleware.ts` es obligatorio por `nodeMiddleware: true` en next.config
- Vercel Analytics esta integrado en el layout raiz
- Las fuentes locales van en `public/fonts/`
