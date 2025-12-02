# 📁 ARQUITETURA DE DADOS - LANDING PAGE

## ✅ VERIFICAÇÃO: NENHUM DADO HARDCODED

Todos os dados foram movidos para arquivos JSON externos em `/content/data/`.

---

## 📂 ESTRUTURA DE ARQUIVOS JSON

```
content/data/
├── hero.json              # Dados do Hero Section (foto, badges)
├── stats.json             # Números/Estatísticas
├── about.json             # Seção Sobre resumida
├── services.json          # Serviços oferecidos
├── whyMe.json             # Diferenciais/Por que escolher
├── featuredProjects.json  # Top 3 projetos em destaque
├── technologies.json      # Stack tecnológica
├── timeline.json          # Mini timeline
└── cta.json               # CTA final + contatos
```

---

## 🔍 MAPEAMENTO: JSON → COMPONENTE

### 1. **hero.json** → `Inicio.tsx`
```json
{
  "hero": {
    "badge": {
      "icon": "🎓",
      "textKey": "about.education.degreeShort"
    },
    "experienceBadge": {
      "number": "2+",
      "textKey": "home.hero.experience"
    },
    "photo": {
      "url": "/img/foto perfil.jpeg",
      "alt": "Luiz Antonio Comiran Bueno",
      "width": 400,
      "height": 400
    }
  }
}
```
**Loop usado:** Não usa loop (dados únicos)
**Importação:**
```tsx
import heroData from '../../../content/data/hero.json';
const { badge, experienceBadge, photo } = heroData.hero;
```

---

### 2. **stats.json** → `StatsSection.tsx`
```json
{
  "titleEmoji": "📊",
  "stats": [
    {
      "id": "projects",
      "number": "10+",
      "translationKey": "home.stats.projects",
      "icon": "📊"
    },
    ...
  ]
}
```
**Loop usado:** `.map()`
```tsx
import statsData from '../../../content/data/stats.json';
{statsData.stats.map((stat) => (
  <div key={stat.id}>...</div>
))}
```

---

### 3. **about.json** → `AboutSection.tsx`
```json
{
  "about": {
    "photo": {
      "url": "/img/perfil2.jpeg",
      "alt": "Luiz Antonio Comiran Bueno",
      "width": 300,
      "height": 300
    },
    "link": "/sobre"
  }
}
```
**Loop usado:** Não (dados únicos)
**Importação:**
```tsx
import aboutData from '../../../content/data/about.json';
const { photo, link } = aboutData.about;
```

---

### 4. **services.json** → `ServicesSection.tsx`
```json
{
  "services": [
    {
      "id": "fullstack",
      "icon": "💻",
      "titleKey": "home.services.fullstack.title",
      "descriptionKey": "home.services.fullstack.description",
      "techs": ["Next.js", "React", "Node.js", "APIs"]
    },
    ...
  ]
}
```
**Loops usados:** 2x `.map()` (services + techs)
```tsx
import servicesData from '../../../content/data/services.json';
{servicesData.services.map((service) => (
  <div key={service.id}>
    {service.techs.map((tech, idx) => <span key={idx}>{tech}</span>)}
  </div>
))}
```

---

### 5. **whyMe.json** → `WhyMeSection.tsx`
```json
{
  "reasons": [
    {
      "id": "commitment",
      "icon": "✓",
      "titleKey": "home.whyMe.commitment.title",
      "descriptionKey": "home.whyMe.commitment.description"
    },
    ...
  ]
}
```
**Loop usado:** `.map()`
```tsx
import whyMeData from '../../../content/data/whyMe.json';
{whyMeData.reasons.map((reason) => (
  <div key={reason.id}>...</div>
))}
```

---

### 6. **featuredProjects.json** → `FeaturedProjects.tsx`
```json
{
  "titleEmoji": "🎯",
  "projects": [
    {
      "id": 1,
      "titleKey": "projects.projectNumber",
      "descriptionKey": "home.projects.project1",
      "techs": ["Next.js", "TypeScript", "Tailwind"],
      "featured": true,
      "link": "/projetos"
    },
    ...
  ]
}
```
**Loops usados:** 2x `.map()` (projects + techs)
```tsx
import featuredProjectsData from '../../../content/data/featuredProjects.json';
{featuredProjectsData.projects.map((project) => (
  <Link key={project.id} href={project.link}>
    {project.techs.map((tech, idx) => <span key={idx}>{tech}</span>)}
  </Link>
))}
```

---

### 7. **technologies.json** → `TechStack.tsx`
```json
{
  "titleEmoji": "💡",
  "technologies": [
    {
      "id": "nextjs",
      "nameKey": "home.technologies.nextjs",
      "color": "bg-gradient-to-r from-gray-800..."
    },
    ...
  ]
}
```
**Loop usado:** `.map()`
```tsx
import technologiesData from '../../../content/data/technologies.json';
{technologiesData.technologies.map((tech) => (
  <div key={tech.id} className={tech.color}>
    {t(tech.nameKey)}
  </div>
))}
```

---

### 8. **timeline.json** → `TimelineSection.tsx`
```json
{
  "titleEmoji": "📖",
  "timeline": [
    {
      "id": "item1",
      "dateKey": "home.timeline.item1.date",
      "titleKey": "home.timeline.item1.title"
    },
    ...
  ]
}
```
**Loop usado:** `.map()`
```tsx
import timelineData from '../../../content/data/timeline.json';
{timelineData.timeline.map((item) => (
  <div key={item.id}>...</div>
))}
```

---

### 9. **cta.json** → `CTASection.tsx`
```json
{
  "cta": {
    "titleEmoji": "🚀",
    "link": "/contato",
    "contacts": [
      {
        "type": "email",
        "icon": "email",
        "translationKey": "contact.email"
      },
      {
        "type": "whatsapp",
        "url": "https://wa.me/5545999383320",
        "icon": "whatsapp",
        "label": "WhatsApp"
      }
    ]
  }
}
```
**Loop usado:** `.map()`
```tsx
import ctaData from '../../../content/data/cta.json';
<Link href={ctaData.cta.link}>...</Link>
{ctaData.cta.contacts.map((contact) => <a key={contact.type}>...</a>)}
```

---

## ✅ CHECKLIST DE VERIFICAÇÃO

### Arquivos JSON criados:
- ✓ `content/data/hero.json`
- ✓ `content/data/stats.json`
- ✓ `content/data/about.json`
- ✓ `content/data/services.json`
- ✓ `content/data/whyMe.json`
- ✓ `content/data/featuredProjects.json`
- ✓ `content/data/technologies.json`
- ✓ `content/data/timeline.json`
- ✓ `content/data/cta.json`

### Componentes refatorados:
- ✓ `src/components/Home/Inicio.tsx`
- ✓ `src/components/Home/StatsSection.tsx`
- ✓ `src/components/Home/AboutSection.tsx`
- ✓ `src/components/Home/ServicesSection.tsx`
- ✓ `src/components/Home/WhyMeSection.tsx`
- ✓ `src/components/Home/FeaturedProjects.tsx`
- ✓ `src/components/Home/TechStack.tsx`
- ✓ `src/components/Home/TimelineSection.tsx`
- ✓ `src/components/Home/CTASection.tsx`

### Verificações:
- ✓ Nenhum texto em português/inglês hardcoded
- ✓ Todos os dados vêm de JSON ou traduções
- ✓ Todos os loops usam `.map()` com `key` único
- ✓ Importações estáticas (não fetch)
- ✓ Build passa sem erros
- ✓ TypeScript validado
- ✓ ESLint sem warnings

---

## 📊 TIPOS DE DADOS SEPARADOS

### Dados Estruturais (JSON):
- URLs de imagens
- Links de navegação
- Listas de tecnologias
- Números/estatísticas
- IDs únicos
- Classes CSS de cores
- Ícones/emojis

### Dados Traduzíveis (i18n):
- Títulos
- Descrições
- Textos de botões
- Labels
- Mensagens

---

## 🎯 RESULTADO FINAL

✅ **100% dos dados são externos**
✅ **Código limpo e manutenível**
✅ **Fácil edição de conteúdo**
✅ **Escalável e profissional**
✅ **Build otimizado: 5.9 kB**

**Para editar conteúdo:**
1. Textos traduzíveis → `/public/locales/{pt|en}/common.json`
2. Dados estruturais → `/content/data/*.json`
3. Nunca edite os componentes `.tsx` para mudar conteúdo!

