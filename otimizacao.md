# Plano de Otimização — Index/Home (CRO + SEO)

## Objetivo
Aumentar taxa de conversão (CRO) e visibilidade orgânica (SEO) através de melhorias em metatags, compartilhamento social e marcação estruturada.

## 1. Metatags Essenciais (SEO on-page)

### Title
```html
<title>Luiz Antonio Comiran Bueno — Desenvolvedor Full Stack | Next.js, React, Node.js</title>
```
- Comprimento ideal: 50-60 caracteres
- Palavras-chave principais no início
- Inclui especialidade e tecnologias principais

### Meta Description
```html
<meta name="description" content="Desenvolvedor Full Stack especializado em Next.js, React e Node.js. Criação de aplicações web modernas, responsivas e escaláveis. Veja meu portfolio e entre em contato." />
```
- Comprimento: 155 caracteres
- Inclui especialidades e call-to-action
- Foco em benefícios e expertise

### Canonical e Robots
```html
<link rel="canonical" href="https://www.luiz-antonio-comiran-bueno.com.br/" />
<meta name="robots" content="index, follow" />
```

### Meta Viewport e Charset
```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
```

## 2. Metatags para Compartilhamento

### Open Graph
```html
<meta property="og:locale" content="pt_BR" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Luiz Antonio Comiran Bueno — Desenvolvedor Full Stack" />
<meta property="og:description" content="Desenvolvimento de aplicações web modernas com Next.js, React e Node.js. Veja meu portfolio de projetos." />
<meta property="og:url" content="https://www.luiz-antonio-comiran-bueno.com.br/" />
<meta property="og:site_name" content="Luiz Antonio Comiran Bueno" />
<meta property="og:image" content="https://www.luiz-antonio-comiran-bueno.com.br/img/og-image.jpg" />
<meta property="og:image:alt" content="Portfolio Luiz Antonio Comiran Bueno - Desenvolvedor Full Stack" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

### Twitter Cards
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Luiz Antonio Comiran Bueno — Desenvolvedor Full Stack" />
<meta name="twitter:description" content="Desenvolvimento de aplicações web modernas com Next.js, React e Node.js. Veja meu portfolio de projetos." />
<meta name="twitter:image" content="https://www.luiz-antonio-comiran-bueno.com.br/img/twitter-image.jpg" />
```

## 3. JSON-LD (Schema.org)

### Person Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Luiz Antonio Comiran Bueno",
  "jobTitle": "Desenvolvedor Full Stack",
  "url": "https://www.luiz-antonio-comiran-bueno.com.br",
  "image": "https://www.luiz-antonio-comiran-bueno.com.br/img/perfil.jpg",
  "sameAs": [
    "https://github.com/Nastsukii",
    "https://www.linkedin.com/in/luiz-antonio-comiran-bueno/"
  ],
  "knowsAbout": [
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "Desenvolvimento Web Full Stack"
  ]
}
```

### WebSite Schema
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Portfolio Luiz Antonio Comiran Bueno",
  "url": "https://www.luiz-antonio-comiran-bueno.com.br",
  "description": "Portfolio profissional de Luiz Antonio Comiran Bueno, desenvolvedor Full Stack especializado em Next.js, React e Node.js",
  "inLanguage": "pt-BR"
}
```

## 4. Prioridades CRO na Home

### Hero Section
- Título H1 claro e direto: "Desenvolvedor Full Stack especializado em soluções web modernas"
- Subtítulo com diferencial: "Criando aplicações responsivas e escaláveis com Next.js, React e Node.js"
- CTA primário: "Ver Projetos"
- CTA secundário: "Entrar em Contato"

### Seções Principais (ordem de prioridade)
1. Hero (apresentação e CTAs)
2. Projetos em Destaque
3. Tecnologias e Habilidades
4. Experiência e Formação
5. Timeline de Carreira
6. Formulário de Contato

### Elementos de Conversão
- Formulário de contato simplificado
- Links para redes profissionais (GitHub, LinkedIn)
- Download de currículo
- Botões de contato rápido (WhatsApp, Email)

## 5. Monitoramento e KPIs

### Métricas Principais
- Taxa de conversão do formulário de contato
- Tempo médio na página
- Taxa de rejeição
- Cliques nos CTAs principais

### Ferramentas
- Google Analytics 4
- Google Search Console
- Hotjar/Microsoft Clarity para heatmaps
- PageSpeed Insights para performance

## 6. Checklist de Implementação

- [x] Implementar todas as metatags SEO
- [x] Adicionar tags Open Graph e Twitter Cards
- [x] Implementar schemas JSON-LD
- [x] Otimizar imagens (formato WebP, lazy loading)
- [x] Configurar analytics e eventos de conversão
- [ ] Testar em diferentes dispositivos e navegadores
- [ ] Validar schemas no Google Rich Results Test
- [ ] Verificar PageSpeed Insights score
- [ ] Testar compartilhamento em redes sociais

### Melhorias Implementadas

1. ✅ Componente OptimizedImage com carregamento progressivo
2. ✅ Lazy loading nativo para imagens não críticas
3. ✅ Fallback e placeholder durante carregamento
4. ✅ Imagens SVG otimizadas para Open Graph
5. ✅ Tratamento de erros e estados de carregamento

### Próximos Passos

1. Realizar testes de validação no Google Rich Results Test
2. Verificar performance com PageSpeed Insights
3. Testar compartilhamento em redes sociais
4. Testar em diferentes dispositivos e navegadores
5. Monitorar métricas no Google Analytics
