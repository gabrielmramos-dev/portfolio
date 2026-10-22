export interface Project {
  title: string;
  desc: string[];
  tech: string[];
  githubUrl: string;
  featured?: boolean;
  summary?: string;
}

export const projects: Project[] = [
  {
    title: "ZelaSP",
    featured: true,
    summary: "API de reporte urbano com .NET 9, Clean Architecture e PostGIS.",
    desc: [
      "API de reporte urbano com .NET 9 e Clean Architecture",
      "Arquitetura em camadas (Domain, Application, Infrastructure, Presentation)",
      "Consultas geoespaciais com PostGIS e Entity Framework Core",
      "Interface de mapa com React e Leaflet.js"
    ],
    tech: ["C#", ".NET 9", "Clean Architecture", "PostGIS", "Entity Framework Core", "React", "Leaflet.js", "TypeScript", "Docker"],
    githubUrl: "https://github.com/gabrielmramos-dev/zelasp"
  },
  {
    title: "IAM Microservice Node",
    featured: true,
    summary: "Autenticação JWT + RBAC com Fastify, Prisma e testes E2E.",
    desc: [
      "Microsserviço de autenticação e gerenciamento de identidade construído com Fastify e TypeScript",
      "Implementa autenticação stateless com JWT e Refresh Token via httpOnly cookies para máxima segurança",
      "Clean Architecture com separação estrita entre Routes, Controllers e Use Cases",
      "RBAC (Role-Based Access Control) com níveis diferenciados de acesso para ADMIN e MEMBER",
      "Suite completa de testes E2E com Vitest, validação de schemas com Zod, PostgreSQL com Prisma ORM"
    ],
    tech: ["TypeScript", "Fastify", "Prisma", "PostgreSQL", "JWT", "Clean Architecture"],
    githubUrl: "https://github.com/gabrieldotech/iam-microservice-node"
  },
  {
    title: "AsyncFlow",
    featured: true,
    summary: "Processamento assíncrono distribuído com RabbitMQ, Fastify e PostgreSQL.",
    desc: [
      "Sistema distribuído de processamento assíncrono de tarefas usando arquitetura orientada a mensagens",
      "Implementa padrões de sistemas distribuídos usados em produção: message queuing, idempotência e tolerância a falhas",
      "Arquitetura de 3 camadas: API Producer (Fastify) → RabbitMQ → Worker Consumer, com escalabilidade horizontal",
      "Gerenciamento de estado persistente com PostgreSQL, graceful shutdown e connection pooling otimizado",
      "Monorepo com Node.js Workspaces, Docker Compose para infraestrutura, e foco em boas práticas de sistemas distribuídos"
    ],
    tech: ["TypeScript", "RabbitMQ", "Fastify", "PostgreSQL", "Prisma", "Docker", "Sistemas Distribuídos"],
    githubUrl: "https://github.com/gabrielmramos-dev/asyncflow"
  }
];
