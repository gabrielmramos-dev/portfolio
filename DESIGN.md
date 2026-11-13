# Design do portfólio

Este arquivo é a fonte única das decisões visuais. Toda página e todo componente usam os tokens daqui. Mudou uma decisão, muda este arquivo primeiro.

Estado: **proposta, aguardando aprovação**. Nenhum código foi alterado.

## Briefing

- **Assunto:** portfólio de um desenvolvedor backend júnior (.NET e TypeScript).
- **Público:** recrutadores e líderes técnicos, no Brasil agora e no exterior depois.
- **Função principal:** provar julgamento de engenharia em poucos minutos: o que foi decidido, por quê, o que foi medido e o que ainda não foi verificado.
- **Atributo de marca:** rigoroso.
- **Decisões do Gabriel:** temas escuro e claro, com alternador no fim da página; sem foto de perfil; o site mostra só trabalho de desenvolvimento (sem trajetória fora da área).

## Conceito

**O site é um documento de engenharia.** Precisão em vez de enfeite: números exatos, tabelas, decisões com motivo e limites declarados. A marca vem de tipografia, proporção e espaçamento, não de uma cor nem de um efeito.

O elemento memorável é o estudo de caso de cada projeto (problema, decisões, limites, resultado). Todo o resto fica quieto para que ele apareça.

## Princípios

1. **Dado antes de adjetivo.** Onde existe um número verificável, ele aparece. Onde não existe, o texto diz o que falta.
2. **Estrutura é informação.** Régua, borda, tabela e barra lateral só aparecem quando indicam algo (uma linha de tabela, um limite, uma figura). Nada decorativo.
3. **Os dois temas são de primeira classe.** O tema claro não é o escuro invertido: cada um tem seus valores, conferidos um a um.
4. **Uma cor com função.** Azul só em links e em dados. Verde e âmbar só para estado. O resto é neutro.
5. **Calma.** Sem gradiente, sombra, brilho, vidro, textura de fundo nem animação de entrada.

## Cores

Neutros levemente frios. Sem creme, sem terracota, sem verde ácido.

| Token | Claro | Escuro | Uso |
|---|---|---|---|
| `--bg` | `#F5F6F7` | `#0F1114` | fundo da página |
| `--surface` | `#FFFFFF` | `#16191D` | figuras e blocos de dados |
| `--text` | `#14171A` | `#E9ECEF` | texto principal |
| `--muted` | `#505A64` | `#9BA5AF` | texto secundário |
| `--border` | `#C8CED4` | `#2B3137` | réguas de tabela e listas |
| `--border-strong` | `#7A858F` | `#6B7680` | bordas de controles interativos |
| `--link` | `#1B4DB5` | `#8FB4FF` | links e valores de dados |
| `--ok` | `#0F6B45` | `#4FC38A` | estado positivo (ex.: "concluído") |
| `--warn` | `#8A4B00` | `#E0A24C` | limite ou ressalva |

Contraste calculado (WCAG), texto sobre `--bg`:

| Token | Claro | Escuro |
|---|---|---|
| `--text` | 16,6:1 | 16,0:1 |
| `--muted` | 6,5:1 | 7,6:1 |
| `--link` | 7,0:1 | 9,1:1 |
| `--ok` | 6,1:1 | 8,6:1 |
| `--warn` | 6,3:1 | 8,5:1 |
| `--border-strong` (controles, mínimo 3:1) | 3,5:1 | 4,1:1 |

`--border` (1,4:1) só serve para réguas de apoio. Nunca é o único indicador de um controle.

## Tipografia

Três famílias, cada uma com um papel. Auto-hospedadas (pacotes `@fontsource-variable/*`), para não depender de CDN nem bloquear a renderização.

| Papel | Família | Observação |
|---|---|---|
| Títulos e interface | Schibsted Grotesk (variável) | grotesk neutro, com personalidade nos títulos |
| Texto longo (blog) | Newsreader (variável) | serifa de leitura; só em posts |
| Dados e código | JetBrains Mono | só para valores, trechos de código e tabelas de dados; `font-variant-numeric: tabular-nums` |

Verificar licença e disponibilidade de cada pacote na instalação. Se alguma não servir, a troca acontece aqui, e não na página.

Escala (px): 14 / 16 / 18 / 22 / 30 / 44. Texto corrido em 16 com entrelinha de 1,55; texto de blog em 18 com 1,65. Largura de linha de no máximo 68 caracteres.

Regras:

- Rótulos em sentence case. Sem caixa-alta espaçada e sem rótulo acima de conteúdo que dispensa rótulo.
- Sem palavra de destaque em itálico ou cor dentro de um título.
- Fonte mono nunca em rótulo decorativo.

## Forma e espaço

- **Unidade de espaço:** 4 px; passos de 4, 8, 12, 16, 24, 32, 48, 64.
- **Raio:** 2 px em controles; 0 em tabelas e figuras. Um único valor, sem exceção por hierarquia.
- **Sombra, gradiente e textura de fundo:** não usar.
- **Bordas:** 1 px, só onde indicam estrutura.

## Layout

Coluna de leitura de 720 px, alinhada à esquerda. Uma coluna lateral de 220 px no desktop.

```
DESKTOP
┌ lateral ──────┬ conteúdo ─────────────────────────────┐
│ Gabriel Ramos │ Gabriel Ramos                         │
│ Developer     │ Software Developer Intern             │
│ Intern        │ Backend .NET/TypeScript · APIs, ...   │
│               │                                       │
│ Projetos      │ Projetos                              │
│ Experiência   │ ─────────────────────────────────     │
│ Formação      │ sp156-mcp   Em andamento  C#, .NET    │
│ Blog          │ ─────────────────────────────────     │
│               │ SinalCerto  v1.0.0        RN, TS      │
│               │ ─────────────────────────────────     │
│ PT / EN       │ ZelaSP      ...                       │
│ Tema: escuro  │                                       │
└───────────────┴───────────────────────────────────────┘

MOBILE: barra superior com o nome e o botão de menu; o alternador de tema
e o de idioma ficam no rodapé da página.
```

- **Navegação:** só texto, sem ícones. Os ícones eram decorativos.
- **Alternador de tema:** no fim da coluna lateral (desktop) e no rodapé (mobile). Segue `prefers-color-scheme` na primeira visita, guarda a escolha com `try/catch` e define o tema antes da primeira renderização, para não piscar.
- **Idioma:** o alternador PT/EN continua ao lado do tema.

## Componentes

**Marca.** Um wordmark em texto: "Gabriel Ramos" em peso 600, com o cargo abaixo. Sem foto e sem logotipo desenhado.

**Índice de projetos (home).** Uma tabela, não cartões: nome, estado, tecnologias principais e um link para o estudo de caso. Em telas estreitas, cada linha empilha. Os cartões de navegação da home saem, porque repetem o menu.

**Estudo de caso.** Estrutura fixa: figura, problema, decisões, limites, resultado, tecnologias. Os limites têm uma barra lateral de 2 px em `--warn`, o que marca a diferença entre decisão e limite.

**Figura de dados.** Barras horizontais com rótulo direto e valores em texto, na cor `--link`. A tabela equivalente fica acessível para leitor de tela. O gráfico do sp156-mcp (duplicatas e status) continua, restilizado.

**Atividade no GitHub.** Mapa de contribuições em uma rampa de `--link`, sem verde. Lista de eventos como linhas de tabela. Só repositórios em destaque.

**Tecnologias.** Texto corrido separado por vírgulas, sem chips.

**Botões e links.** Link é sublinhado. Botão tem borda de `--border-strong` e foco visível de 2 px.

## Movimento

Nenhuma animação de entrada. Transições de 120 ms só em resposta a uma ação (hover, foco, tema). `prefers-reduced-motion` desliga tudo.

## Texto

- Frases específicas ao trabalho. Teste: se serviria em qualquer outro portfólio, reescrever.
- Voz ativa, termos que quem lê entende, verbo no botão ("Baixar currículo", não "Enviar").
- Nenhum número sem fonte. Quando a fonte é o README de um repositório, o código aponta a seção (comentário no arquivo de dados).
- Português por padrão; inglês em `/en`.

## Verificação antes de qualquer merge

- [ ] Cores, fontes e espaços vêm dos tokens (nenhum valor solto).
- [ ] Os dois temas passam no contraste (tabela acima) e foram vistos em tela, em desktop e em celular.
- [ ] Nenhum "tell": gradiente, brilho, vidro, textura, rótulo em caixa-alta, palavra de destaque em título, cartões iguais em série, seta no fim de link.
- [ ] Foco visível e navegação por teclado em tudo.
- [ ] `prefers-reduced-motion` respeitado.
- [ ] Lighthouse mantém 100 em desempenho, acessibilidade, boas práticas e SEO.
- [ ] Sem link quebrado.

## Fora do escopo agora

- Logotipo desenhado.
- Screenshots e GIFs dos projetos (aguardam material do Gabriel).
- Conteúdo novo. O texto atual é preservado até o Gabriel mandar outro.

## Plano de implementação (um commit por passo)

1. Tokens, fontes auto-hospedadas e alternador de tema (sem flash).
2. Coluna lateral e rodapé: wordmark, navegação em texto, idioma e tema; remoção da foto e dos ícones.
3. Home: índice de projetos em tabela e remoção dos cartões de navegação.
4. Estudo de caso e figura de dados restilizados.
5. Atividade no GitHub, blog e páginas de experiência e formação.
6. Verificação: Lighthouse nos dois temas, links e capturas de tela.
