# 📝 Guia de Configuração do Blog com Notion

Este guia vai te ajudar a configurar o blog do seu portfólio para puxar posts diretamente do Notion.

---

## Passo 1: Criar uma Integration no Notion

1. Acesse: https://www.notion.so/my-integrations
2. Clique em **"+ New integration"**
3. Preencha:
   - **Name**: `Portfolio Blog` (ou o nome que preferir)
   - **Logo**: Opcional
   - **Associated workspace**: Selecione seu workspace
4. Clique em **"Submit"**
5. **Copie o "Internal Integration Secret"** (começa com `secret_...`)
   - Este é o seu `NOTION_API_KEY`

---

## Passo 2: Criar a Database de Posts

1. No Notion, crie uma nova página
2. Adicione uma **Database - Full page**
3. Configure as seguintes propriedades (colunas):

| Nome da Propriedade | Tipo | Descrição |
|---------------------|------|-----------|
| **Title** | Title | Título do post (já existe por padrão) |
| **Slug** | Text | URL amigável (ex: `meu-primeiro-post`) |
| **Description** | Text | Descrição curta para preview |
| **Published** | Checkbox | Marque para publicar o post |
| **Date** | Date | Data de publicação |
| **Tags** | Multi-select | Categorias (ex: Tecnologia, Reflexões) |

### Conectar a Integration à Database

1. Na página da database, clique nos **"..."** (menu) no canto superior direito
2. Vá em **"Connections"** → **"Connect to"**
3. Selecione a integration que você criou (`Portfolio Blog`)

### Copiar o ID da Database

1. Abra a database no navegador
2. Na URL, copie o ID da database:
   ```
   https://www.notion.so/workspace/DATABASE_ID?v=xxx
                              ^^^^^^^^^^^^^^^^
                              Copie esta parte (32 caracteres)
   ```
   - Este é o seu `NOTION_DATABASE_ID`

---

## Passo 3: Configurar Variáveis de Ambiente

### Para Desenvolvimento Local

Crie um arquivo `.env` na raiz do projeto:

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> ⚠️ **IMPORTANTE**: Nunca faça commit do arquivo `.env`! Ele já está no `.gitignore`.

### Para Deploy no Vercel

1. Acesse seu projeto no [Vercel Dashboard](https://vercel.com/dashboard)
2. Vá em **Settings** → **Environment Variables**
3. Adicione as variáveis:
   - `NOTION_API_KEY` = seu token
   - `NOTION_DATABASE_ID` = ID da database

---

## Passo 4: Criar seu Primeiro Post

1. Na database do Notion, clique em **"+ New"**
2. Preencha:
   - **Title**: Título do seu post
   - **Slug**: `meu-primeiro-post` (sem espaços, lowercase)
   - **Description**: Uma descrição curta
   - **Date**: Data de hoje
   - **Tags**: Adicione algumas tags
   - **Published**: ✅ Marque para publicar
3. Escreva o conteúdo do post na página

### Blocos Suportados

O blog suporta os seguintes blocos do Notion:

- ✅ Parágrafos
- ✅ Headings (H1, H2, H3)
- ✅ Listas (bullet e numerada)
- ✅ Código com syntax highlighting
- ✅ Imagens
- ✅ Citações (blockquote)
- ✅ Dividers (linha horizontal)
- ✅ Callouts
- ✅ Toggles
- ✅ Bookmarks/Links
- ✅ Formatação inline (negrito, itálico, código, etc.)

---

## Passo 5: Testar Localmente

```bash
npm run dev
```

Acesse `http://localhost:4321/blog` para ver seus posts!

---

## Rebuild Automático (Opcional)

Para que o site atualize automaticamente quando você editar no Notion:

### No Vercel:

1. Vá em **Settings** → **Git** → **Deploy Hooks**
2. Crie um hook (ex: `notion-update`)
3. Copie a URL gerada

### No Notion:

1. Use uma ferramenta como [Pipedream](https://pipedream.com) ou [Make](https://make.com)
2. Configure para chamar o webhook do Vercel quando houver mudanças na database

**Alternativa simples**: Faça um deploy manual no Vercel sempre que atualizar posts.

---

## Troubleshooting

### "Não foi possível carregar os posts"
- Verifique se o `NOTION_API_KEY` está correto
- Verifique se o `NOTION_DATABASE_ID` está correto
- Confirme que a Integration está conectada à database

### Posts não aparecem
- Verifique se o checkbox **Published** está marcado
- Verifique se a **Date** está preenchida

### Erros de build
- Certifique-se de que todas as propriedades da database estão criadas com os nomes exatos

---

## Estrutura de Arquivos Criados

```
src/
├── lib/
│   └── notion.ts          # Integração com API do Notion
├── components/
│   └── BlogCard.astro     # Card de preview do post
├── pages/
│   ├── blog.astro         # Listagem de posts
│   └── blog/
│       └── [slug].astro   # Página individual do post
public/
└── assets/
    └── blog.svg           # Ícone do blog
```

---

Pronto! Agora você pode escrever posts diretamente no Notion e eles aparecerão no seu portfólio! 🚀
