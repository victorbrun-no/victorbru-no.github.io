# Victor Bruno — Currículo/Portfólio React

Projeto convertido para **React + Vite**, com visual mobile-first, animações sutis, galeria de projetos, SEO básico e configuração pronta para GitHub Pages.

## Rodar localmente

```bash
npm install
npm run dev
```

## Validar e gerar build de produção

```bash
npm run validate
npm run preview
```

A pasta final será `dist/`.

## Publicar no GitHub Pages

### Opção recomendada: GitHub Actions

1. Suba todos os arquivos deste projeto para o repositório.
2. No GitHub, vá em **Settings → Pages**.
3. Em **Build and deployment**, selecione **GitHub Actions**.
4. Faça push na branch `main`.
5. O workflow `.github/workflows/deploy.yml` instala dependências, roda `npm run validate` e publica a pasta `dist` automaticamente.

## O que foi priorizado na revisão

- Layout mobile-first com estética premium e minimalista.
- Animações com `transform` e `opacity`, respeitando `prefers-reduced-motion`.
- Modal com navegação por teclado, foco inicial e retorno de foco ao fechar.
- Skip link para acessibilidade.
- Metadados de SEO, Open Graph, canonical, sitemap e robots.
- Dependências versionadas com ranges explícitos em vez de `latest`.

## Observação sobre imagens

As imagens do portfólio continuam sendo carregadas por links do Google Drive, como no arquivo original. Garanta que os arquivos estejam públicos/compartilháveis para aparecerem corretamente no GitHub Pages.

## Ajustes opcionais antes de publicar

- Atualize o link do GitHub no `src/App.jsx` se houver perfil público. Ele foi deixado vazio para evitar link quebrado.
- Se souber a URL definitiva do GitHub Pages, você pode adicionar `canonical` e `og:url` no `index.html`.
