import type { Lang } from '../i18n/ui';

type Text = Record<Lang, string>;
type TextList = Record<Lang, string[]>;

export interface FlowNode {
  title: Text;
  detail?: Text;
  /** Tracejado: etapa planejada ou ainda em desenvolvimento. */
  planned?: boolean;
}

/** Figura que abre o estudo de caso: diagrama de fluxo, capturas de tela, imagem ou espaço reservado. */
export type ProjectFigure =
  | { kind: 'flow'; nodes: FlowNode[]; note?: Text; alt: Text }
  | { kind: 'shots'; shots: { src: string; alt: Text }[] }
  | { kind: 'image'; src: string; alt: Text }
  | { kind: 'placeholder'; alt: Text };

export interface Project {
  id: string;
  title: string;
  /** Selo ao lado do título (ex.: "Em andamento"). */
  badge?: Text;
  /** Cor do selo: `ok` para estado positivo (ex.: release). */
  badgeTone?: 'ok';
  summary: Text;
  problem: Text;
  decisions: TextList;
  /** O que NÃO está resolvido ou verificado. Cada item vem do README do repositório (ou do código, quando indicado). */
  limits: TextList;
  result: Text;
  tech: string[];
  githubUrl: string;
  figure: ProjectFigure;
  featured?: boolean;
  /** Fora da lista pública por decisão editorial; o conteúdo fica guardado. */
  hidden?: boolean;
}

// Fonte dos fatos: README e código de cada repositório (conferidos em 2026-11-13).
export const projects: Project[] = [
  {
    id: 'sp156-mcp',
    title: 'sp156-mcp',
    badge: { pt: 'Em andamento', en: 'In progress' },
    summary: {
      pt: 'Servidor MCP não oficial, em C#, sobre os dados abertos do SP156 (central de atendimento da Prefeitura de São Paulo).',
      en: 'Unofficial MCP server in C# over the SP156 open data (São Paulo City Hall service center).',
    },
    problem: {
      pt: 'Os dados abertos do SP156 vêm em planilhas XLSX enormes (742.904 linhas só no 1º trimestre de 2025). O objetivo é permitir que um assistente de IA responda perguntas agregadas sobre os pedidos, sempre com as ressalvas dos dados.',
      en: 'The SP156 open data comes as huge XLSX spreadsheets (742,904 rows in Q1 2025 alone). The goal is to let an AI assistant answer aggregate questions about the requests, always with the data caveats attached.',
    },
    decisions: {
      pt: [
        'Privacidade por esquema: o banco SQLite não tem colunas de endereço nem de coordenadas, e um teste verifica isso (ADR 0002).',
        'Sem deduplicação: 47,65% das linhas são duplicatas exatas e não há ID de protocolo, então a contagem é de linhas registradas, não de problemas distintos (ADR 0003).',
        'Escrita segura: a ingestão nunca sobrescreve o destino e grava em um arquivo temporário renomeado só no fim.',
        'Fluxo spec, testes e implementação, com 7 ADRs e CI no GitHub Actions.',
      ],
      en: [
        'Privacy by schema: the SQLite database has no address or coordinate columns, and a test checks it (ADR 0002).',
        'No deduplication: 47.65% of rows are exact duplicates and there is no protocol ID, so counts are of registered rows, not distinct problems (ADR 0003).',
        'Safe writes: ingestion never overwrites the destination and writes to a temporary file renamed only at the end.',
        'Spec, tests, then implementation, with 7 ADRs and CI on GitHub Actions.',
      ],
    },
    // Fonte: README, seções "O que NÃO está verificado" e "Limitações dos dados".
    limits: {
      pt: [
        'Tudo foi verificado em um único arquivo (1º trimestre de 2025): formato, colunas, valores e amostra de privacidade. Outros trimestres e anos não foram testados.',
        'A proteção de privacidade vem do esquema (a coluna de endereço não existe no banco). O teste de valores é uma amostra, não uma verificação exaustiva.',
        'O status é um retrato de data desconhecida. Pedidos de janeiro a março de 2025 ainda abertos meses depois mostram que o tempo até finalizar tem censura, então qualquer média desse tempo é enviesada.',
        'Os dados só registram solicitações feitas pela população. O volume de pedidos não mede os serviços executados nem os problemas existentes na cidade.',
      ],
      en: [
        'Everything was verified on a single file (Q1 2025): format, columns, values and the privacy sample. Other quarters and years were not tested.',
        'The privacy protection comes from the schema (the address column does not exist in the database). The value test is a sample, not an exhaustive check.',
        'The status is a snapshot of unknown date. Requests from January to March 2025 still open months later show that time-to-close is censored, so any average of that time is biased.',
        'The data only records requests made by the public. Request volume does not measure services performed or problems that exist in the city.',
      ],
    },
    result: {
      pt: 'Marco 1 concluído: ingestão do XLSX para SQLite, sem endereços. O servidor MCP ainda está em desenvolvimento.',
      en: 'Milestone 1 done: XLSX ingestion into SQLite, without addresses. The MCP server is still in development.',
    },
    // TODO(gabriel): o README diz que o Marco 2 (servidor MCP) está "ainda não iniciado". Alinhe o texto do site ou o README.
    tech: ['C#', '.NET 10', 'SQLite', 'xUnit', 'MCP', 'GitHub Actions'],
    githubUrl: 'https://github.com/gabrielmramos-dev/sp156-mcp',
    // TODO(gabriel): opcional: GIF do comando `ingerir` gravando o banco, para acompanhar o diagrama.
    figure: {
      kind: 'flow',
      alt: {
        pt: 'Diagrama do pipeline: planilha XLSX do SP156, comando ingerir, banco SQLite sem endereços e, em desenvolvimento, o servidor MCP para um assistente de IA.',
        en: 'Pipeline diagram: SP156 XLSX spreadsheet, the ingest command, a SQLite database without addresses and, in development, the MCP server for an AI assistant.',
      },
      nodes: [
        { title: { pt: 'Planilha XLSX do SP156', en: 'SP156 XLSX spreadsheet' }, detail: { pt: '742.904 linhas no 1º trimestre de 2025', en: '742,904 rows in Q1 2025' } },
        { title: { pt: 'Comando ingerir', en: 'Ingest command' }, detail: { pt: 'C#; descarta endereço e coordenadas', en: 'C#; drops address and coordinates' } },
        { title: { pt: 'Banco SQLite', en: 'SQLite database' }, detail: { pt: 'Gravado em arquivo temporário e renomeado só no fim', en: 'Written to a temporary file and renamed only at the end' } },
        { title: { pt: 'Servidor MCP', en: 'MCP server' }, detail: { pt: 'Em desenvolvimento: perguntas agregadas para um assistente de IA', en: 'In development: aggregate questions for an AI assistant' }, planned: true },
      ],
    },
    featured: true,
  },
  {
    id: 'sinalcerto-app',
    title: 'SinalCerto',
    badge: { pt: 'v1.0.0', en: 'v1.0.0' },
    badgeTone: 'ok',
    summary: {
      pt: 'App acessível que mostra, em linguagem simples, a qualidade prevista da internet por hora e região.',
      en: 'Accessible app that shows, in plain language, the predicted internet quality by hour and region.',
    },
    problem: {
      pt: 'Quem não entende de redes não sabe a melhor hora para uma chamada de vídeo, um envio de arquivo ou uma aula on-line. O app traduz a previsão de uma API em Boa, Regular ou Instável. Projeto integrador em equipe (Braz Cubas), no qual atuei como Product Owner e desenvolvedor.',
      en: 'People who do not know networks cannot tell the best hour for a video call, a file upload or an online class. The app turns an API forecast into Good, Fair or Unstable. Team capstone project (Braz Cubas), where I was Product Owner and developer.',
    },
    decisions: {
      pt: [
        'Contrato único de dados (ForecastSource) com três implementações: API real, previsão guardada no app e um fallback que usa a API e cai na previsão guardada quando ela não responde.',
        'Acessibilidade medida: status sempre em texto, forma e cor; contraste de todos os pares de cores testado nos modos claro e escuro; áreas de toque de 48 dp; VoiceOver testado no iPhone em todas as telas.',
        'Todos os textos do app em um glossário único, com um teste que impede termos técnicos fora da tela Sobre.',
        'CI no GitHub Actions rodando tipos, lint com regras de acessibilidade e testes a cada push.',
      ],
      en: [
        'Single data contract (ForecastSource) with three implementations: the real API, a forecast bundled in the app and a fallback that uses the API and drops to the bundled forecast when it does not answer.',
        'Measured accessibility: status always in text, shape and color; contrast of every color pair tested in light and dark modes; 48 dp touch targets; VoiceOver tested on iPhone on every screen.',
        'All app texts in a single glossary, with a test that blocks technical terms outside the About screen.',
        'CI on GitHub Actions running types, lint with accessibility rules and tests on every push.',
      ],
    },
    // Fonte: README, seção "Limitações" e tabela de requisitos.
    limits: {
      pt: [
        'A previsão vale para a região escolhida (um ponto de medição numa capital), não exatamente para o celular de quem usa. O app não mede a conexão: mostra uma estimativa que pode errar.',
        'Os dados da API cobrem só um dia (19 a 20/08/2026), então o app mostra sempre a data real e nunca chama a previsão de "agora".',
        'Jogos online ficou de fora: a API não tem essa atividade.',
        'O app ainda não foi testado em um aparelho Android, nem com o TalkBack.',
      ],
      en: [
        'The forecast applies to the chosen region (one measurement point in a capital city), not exactly to the user’s phone. The app does not measure the connection: it shows an estimate that can be wrong.',
        'The API data covers a single day (Aug 19 to 20, 2026), so the app always shows the real date and never calls the forecast "now".',
        'Online games was left out: the API has no such activity.',
        'The app has not yet been tested on an Android device, nor with TalkBack.',
      ],
    },
    result: {
      pt: 'Release v1.0.0 (29/10/2026), com APK para Android gerado pelo EAS. Limites declarados: o teste com TalkBack ainda está pendente e "jogos online" ficou de fora porque a API não oferece essa atividade.',
      en: 'Release v1.0.0 (Oct 29, 2026), with an Android APK built by EAS. Stated limits: TalkBack testing is still pending and "online games" was left out because the API does not offer that activity.',
    },
    tech: ['React Native', 'Expo SDK 58', 'TypeScript', 'Jest', 'GitHub Actions'],
    githubUrl: 'https://github.com/gabrielmramos-dev/sinalcerto-app',
    // As capturas vêm de docs/design/ do repositório. O botão azul de engrenagem nelas é do Expo Go, não do app.
    figure: {
      kind: 'shots',
      shots: [
        {
          src: '/projects/sinalcerto-inicio.webp',
          alt: {
            pt: 'Tela Início do SinalCerto: São Paulo (SP), cartão Regular às 20:00, faixa das 24 horas e os melhores e piores horários do dia.',
            en: 'SinalCerto home screen: São Paulo (SP), a Fair card at 8:00 PM, the 24-hour strip and the best and worst hours of the day.',
          },
        },
        {
          src: '/projects/sinalcerto-atividades.webp',
          alt: {
            pt: 'Tela Atividades do SinalCerto: seis atividades com o status no horário escolhido e os melhores horários de cada uma.',
            en: 'SinalCerto activities screen: six activities with their status at the chosen hour and the best hours for each.',
          },
        },
        {
          src: '/projects/sinalcerto-detalhes-aberta.webp',
          alt: {
            pt: 'Tela Detalhes do SinalCerto: a hora 23:00 aberta, com tempo de resposta, informação perdida e a nota.',
            en: 'SinalCerto details screen: the 11:00 PM hour expanded, with response time, lost information and the score.',
          },
        },
      ],
    },
    featured: true,
  },
  {
    id: 'asyncflow',
    title: 'AsyncFlow',
    hidden: true,
    summary: {
      pt: 'Processamento assíncrono de tarefas com Fastify, RabbitMQ e PostgreSQL.',
      en: 'Asynchronous task processing with Fastify, RabbitMQ and PostgreSQL.',
    },
    problem: {
      pt: 'Tirar trabalho lento de dentro da requisição HTTP: a API registra a tarefa e responde 202, e um worker separado processa depois.',
      en: 'Move slow work out of the HTTP request: the API records the task and answers 202, and a separate worker processes it later.',
    },
    decisions: {
      pt: [
        'A API valida a entrada com Zod, grava a tarefa como PENDING no PostgreSQL e publica na fila; só então responde 202 Accepted.',
        'Fila durável com mensagens persistentes, prefetch(1) para entregar uma tarefa por vez a cada worker e ack manual: ack ao concluir, nack com requeue em caso de falha.',
        'Monorepo com Node.js Workspaces separando API e worker, e Docker Compose para PostgreSQL e RabbitMQ.',
      ],
      en: [
        'The API validates input with Zod, stores the task as PENDING in PostgreSQL and publishes to the queue; only then it answers 202 Accepted.',
        'Durable queue with persistent messages, prefetch(1) to hand each worker one task at a time and manual acks: ack on success, nack with requeue on failure.',
        'Monorepo with Node.js Workspaces separating API and worker, and Docker Compose for PostgreSQL and RabbitMQ.',
      ],
    },
    // Fonte: README, seções "Current Status & Design Philosophy" e "Potential Evolutions"; o item sobre nack vem do código do worker.
    limits: {
      pt: [
        'O processamento é simulado de propósito (atraso de 5 s), para focar na arquitetura.',
        'Em caso de falha, o worker devolve a mensagem à fila sem limite de tentativas. Dead letter queue e retry com backoff são evoluções mapeadas, ainda não implementadas.',
      ],
      en: [
        'Processing is deliberately simulated (5 s delay) to focus on the architecture.',
        'On failure, the worker returns the message to the queue with no retry limit. Dead letter queue and retry with backoff are mapped next steps, not implemented yet.',
      ],
    },
    result: {
      pt: 'Fluxo completo de ponta a ponta (API, fila, worker e banco). O processamento é simulado de propósito, com um atraso de 5 s, para focar na arquitetura. Evoluções mapeadas: dead letter queue, retry com backoff e observabilidade.',
      en: 'Complete end-to-end flow (API, queue, worker and database). Processing is deliberately simulated with a 5 s delay to focus on the architecture. Mapped next steps: dead letter queue, retry with backoff and observability.',
    },
    // TODO(gabriel): as métricas do README (5 ms, 100 tarefas/s, 1/3/5 workers, "100% após restart") não têm teste ou benchmark no repositório; não foram usadas aqui.
    // TODO(gabriel): o README afirma idempotência, graceful shutdown e Prisma singleton, mas o código não os tem; por isso não aparecem aqui.
    tech: ['TypeScript', 'Fastify', 'RabbitMQ', 'PostgreSQL', 'Prisma', 'Zod', 'Docker Compose'],
    githubUrl: 'https://github.com/gabrielmramos-dev/asyncflow',
    // TODO(gabriel): opcional: GIF do fluxo (POST na API, mensagem na UI do RabbitMQ, status COMPLETED no banco).
    figure: {
      kind: 'flow',
      alt: {
        pt: 'Diagrama do fluxo: cliente, API Fastify, PostgreSQL com a tarefa PENDING, fila RabbitMQ, worker e PostgreSQL com a tarefa COMPLETED.',
        en: 'Flow diagram: client, Fastify API, PostgreSQL with the PENDING task, RabbitMQ queue, worker and PostgreSQL with the COMPLETED task.',
      },
      nodes: [
        { title: { pt: 'API (Fastify)', en: 'API (Fastify)' }, detail: { pt: 'Valida com Zod, grava PENDING e responde 202', en: 'Validates with Zod, stores PENDING and answers 202' } },
        { title: { pt: 'Fila RabbitMQ', en: 'RabbitMQ queue' }, detail: { pt: 'Durável, mensagens persistentes, prefetch(1)', en: 'Durable, persistent messages, prefetch(1)' } },
        { title: { pt: 'Worker', en: 'Worker' }, detail: { pt: 'ack ao concluir, nack com requeue em falha', en: 'ack on success, nack with requeue on failure' } },
        { title: { pt: 'PostgreSQL', en: 'PostgreSQL' }, detail: { pt: 'Status da tarefa: PENDING, depois COMPLETED', en: 'Task status: PENDING, then COMPLETED' } },
      ],
    },
    featured: true,
  },
  {
    id: 'iam-microservice-node',
    title: 'IAM Microservice',
    hidden: true,
    summary: {
      pt: 'Microsserviço de identidade e acesso com Fastify, TypeScript e Clean Architecture.',
      en: 'Identity and access microservice with Fastify, TypeScript and Clean Architecture.',
    },
    problem: {
      pt: 'Um hub de autenticação desacoplado para um ecossistema, com regras de negócio independentes da infraestrutura (Fastify, Prisma). O próprio repositório o descreve como um protótipo focado em arquitetura.',
      en: 'A decoupled authentication hub for an ecosystem, with business rules independent of infrastructure (Fastify, Prisma). The repository itself describes it as an architecture-focused prototype.',
    },
    decisions: {
      pt: [
        'Clean Architecture: rotas, controllers e use cases separados; os casos de uso não dependem de Fastify nem de Prisma.',
        'Access token JWT de 10 minutos na resposta e refresh token de 7 dias em cookie httpOnly; senhas com bcrypt.',
        'RBAC com os papéis ADMIN e MEMBER e validação de entrada com Zod na borda.',
        'Trade-offs de segurança escritos no próprio README, com o que ficou para o roadmap (veja Limites).',
      ],
      en: [
        'Clean Architecture: routes, controllers and use cases kept apart; use cases depend on neither Fastify nor Prisma.',
        '10-minute JWT access token in the response and 7-day refresh token in an httpOnly cookie; passwords hashed with bcrypt.',
        'RBAC with ADMIN and MEMBER roles and input validation with Zod at the edge.',
        'Security trade-offs written in the README itself, with what was left for the roadmap (see Limits).',
      ],
    },
    // Fonte: README, seção "Architectural Trade-offs & Security Notes"; o item sobre o refresh vem do código (refresh.ts).
    limits: {
      pt: [
        'JWT stateless: não há revogação imediata de sessão; ela depende da expiração curta do access token (10 min) e da invalidação manual do refresh token.',
        'O refresh token é reemitido a cada uso, mas o anterior não é invalidado: a rotation completa, a blacklist em Redis e o rate limiting estão no roadmap, não implementados.',
        'O próprio repositório se descreve como protótipo focado em arquitetura.',
      ],
      en: [
        'Stateless JWT: there is no immediate session revocation; it relies on the short access token lifetime (10 min) and manual invalidation of the refresh token.',
        'A new refresh token is issued on every use, but the previous one is not invalidated: full rotation, a Redis blacklist and rate limiting are on the roadmap, not implemented.',
        'The repository itself describes this as an architecture-focused prototype.',
      ],
    },
    result: {
      pt: 'Fluxo de cadastro, login, refresh e perfil implementado, com specs dos casos de uso (cadastro e autenticação) e um teste E2E do perfil, em Vitest.',
      en: 'Sign-up, login, refresh and profile flow implemented, with use-case specs (sign-up and authentication) and an E2E test of the profile, in Vitest.',
    },
    // TODO(gabriel): o README fala em "suíte E2E completa", mas o repositório tem 1 spec E2E e 2 specs de use case.
    tech: ['TypeScript', 'Fastify', 'Prisma', 'PostgreSQL', 'JWT', 'Zod', 'Vitest', 'Docker'],
    githubUrl: 'https://github.com/gabrielmramos-dev/iam-microservice-node',
    figure: {
      kind: 'image',
      src: '/blog/iam-fluxo.png',
      alt: {
        pt: 'Diagrama do fluxo de autenticação: rotas de login e refresh, com emissão de access token (10 min) e refresh token (7 dias) em cookie.',
        en: 'Authentication flow diagram: login and refresh routes, issuing an access token (10 min) and a refresh token (7 days) in a cookie.',
      },
    },
  },
  {
    id: 'zelasp',
    title: 'ZelaSP',
    summary: {
      pt: 'Plataforma de reportes urbanos com .NET 9, Clean Architecture e PostGIS.',
      en: 'Urban issue reporting platform with .NET 9, Clean Architecture and PostGIS.',
    },
    problem: {
      pt: 'Aproximar moradores de São Paulo dos serviços municipais: o cidadão marca um problema geolocalizado no mapa, e gestores fazem a triagem e o acompanhamento. Estudo de caso técnico.',
      en: 'Bring São Paulo residents closer to city services: citizens pin a geolocated problem on the map, and managers triage and track it. Technical case study.',
    },
    decisions: {
      pt: [
        'Clean Architecture em quatro projetos (API, Application, Domain e Infrastructure), com dependências apontando para o domínio.',
        'Consultas geoespaciais nativas: coordenadas como Point do PostGIS (SRID 4326) e busca por raio com cálculo de distância no banco.',
        'Triagem com criticidade e setor responsável, protocolo no formato SP-AAAA-NNNN e alerta de SLA para pedidos abertos há mais de 7 dias.',
        'Painel de gestão protegido por JWT (8 h) e acompanhamento anônimo para o cidadão, por token guardado no navegador; foto obrigatória no registro.',
      ],
      en: [
        'Clean Architecture in four projects (API, Application, Domain and Infrastructure), with dependencies pointing to the domain.',
        'Native geospatial queries: coordinates as a PostGIS Point (SRID 4326) and radius search with distance computed in the database.',
        'Triage with severity and responsible department, protocol in the SP-YYYY-NNNN format and an SLA alert for requests open for more than 7 days.',
        'Management panel protected by JWT (8 h) and anonymous tracking for citizens through a token kept in the browser; photo required on submission.',
      ],
    },
    // Fonte: README, tabela de endpoints e seção "Sobre o Projeto".
    limits: {
      pt: [
        'É um estudo de caso técnico, não um serviço em produção.',
        'A listagem e a busca por raio de solicitações são públicas, sem autenticação. Só a triagem e a mudança de status exigem JWT.',
      ],
      en: [
        'This is a technical case study, not a production service.',
        'Listing and radius search of requests are public, with no authentication. Only triage and status changes require a JWT.',
      ],
    },
    result: {
      pt: 'Fluxo completo do reporte à triagem e ao acompanhamento, com API documentada em Swagger e frontend React com mapa Leaflet, rodando localmente via Docker Compose.',
      en: 'Complete flow from report to triage and tracking, with a Swagger-documented API and a React frontend with a Leaflet map, running locally through Docker Compose.',
    },
    // TODO(gabriel): o repositório não tem testes automatizados; vale adicionar alguns antes de destacar este projeto.
    tech: ['C#', '.NET 9', 'ASP.NET Core', 'EF Core', 'PostgreSQL', 'PostGIS', 'React', 'TypeScript', 'Leaflet'],
    githubUrl: 'https://github.com/gabrielmramos-dev/zelasp',
    // TODO(gabriel): o diagrama de camadas é provisório; só você pode tirar capturas do mapa com os reportes e do painel de triagem.
    figure: {
      kind: 'flow',
      alt: {
        pt: 'Diagrama das camadas do ZelaSP: frontend React com mapa Leaflet, API ASP.NET Core, camada Application, Infrastructure com EF Core e PostgreSQL com PostGIS.',
        en: 'ZelaSP layers diagram: React frontend with a Leaflet map, ASP.NET Core API, Application layer, Infrastructure with EF Core and PostgreSQL with PostGIS.',
      },
      nodes: [
        { title: { pt: 'Frontend', en: 'Frontend' }, detail: { pt: 'React, TypeScript e mapa Leaflet', en: 'React, TypeScript and a Leaflet map' } },
        { title: { pt: 'ZelaSP.API', en: 'ZelaSP.API' }, detail: { pt: 'ASP.NET Core, JWT e tratamento global de erros', en: 'ASP.NET Core, JWT and global error handling' } },
        { title: { pt: 'ZelaSP.Application', en: 'ZelaSP.Application' }, detail: { pt: 'Serviços, DTOs e regras de negócio', en: 'Services, DTOs and business rules' } },
        { title: { pt: 'ZelaSP.Infrastructure', en: 'ZelaSP.Infrastructure' }, detail: { pt: 'EF Core, repositórios e consultas PostGIS', en: 'EF Core, repositories and PostGIS queries' } },
        { title: { pt: 'PostgreSQL + PostGIS', en: 'PostgreSQL + PostGIS' }, detail: { pt: 'Ponto SRID 4326 e busca por raio', en: 'SRID 4326 point and radius search' } },
      ],
      note: {
        pt: 'O Domain (entidades e contratos de repositório) fica no centro: Application e Infrastructure dependem dele, e ele não depende de nada.',
        en: 'The Domain (entities and repository contracts) sits at the center: Application and Infrastructure depend on it, and it depends on nothing.',
      },
    },
  },
];

export const visibleProjects = projects.filter((p) => !p.hidden);
