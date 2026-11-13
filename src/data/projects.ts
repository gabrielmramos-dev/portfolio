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
    title: "sp156-mcp",
    featured: true,
    summary: "Servidor MCP não oficial, em C#, sobre os dados abertos do SP156. Marco 1 concluído, servidor em desenvolvimento.",
    desc: [
      "Em andamento: servidor MCP não oficial, em C#, sobre os dados abertos do SP156 (central de atendimento da Prefeitura de São Paulo), para que um assistente de IA responda perguntas agregadas sobre os pedidos",
      "Marco 1 concluído: ingestão do XLSX do SP156 (742.904 linhas no 1º trimestre de 2025) para um banco SQLite, sem nenhuma coluna de endereço ou coordenada. O servidor MCP ainda está em desenvolvimento",
      "Privacidade por esquema, verificada por teste, e escrita segura: a ingestão nunca sobrescreve o destino",
      "Decisões registradas em 7 ADRs e limites dos dados documentados: um único trimestre e 47,65% de linhas duplicatas exatas, sem deduplicação",
      "Testes com xUnit e CI no GitHub Actions"
    ],
    tech: ["C#", ".NET 10", "SQLite", "xUnit", "MCP", "GitHub Actions"],
    githubUrl: "https://github.com/gabrielmramos-dev/sp156-mcp"
  },
  {
    title: "SinalCerto",
    featured: true,
    summary: "App acessível que mostra a qualidade prevista da internet por hora e região (release v1.0.0).",
    desc: [
      "Projeto integrador em equipe (Braz Cubas), no qual atuei como Product Owner e desenvolvedor: app mobile em React Native, Expo SDK 58 e TypeScript que mostra, em linguagem simples, a qualidade prevista da internet por hora e região",
      "Release v1.0.0, com APK para Android gerado pelo EAS e CI no GitHub Actions (tipos, lint com regras de acessibilidade e testes)",
      "Acessibilidade medida: status em texto, forma e cor, contraste testado nos modos claro e escuro, áreas de toque de 48 dp e VoiceOver testado no iPhone",
      "Fonte de dados abstraída por um contrato único: API real, previsão guardada no app e fallback automático",
      "Limites declarados: TalkBack ainda não testado e jogos online fora, porque a API não oferece essa atividade"
    ],
    tech: ["React Native", "Expo SDK 58", "TypeScript", "Jest", "GitHub Actions", "Acessibilidade"],
    githubUrl: "https://github.com/gabrielmramos-dev/sinalcerto-app"
  },
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
  }
];
