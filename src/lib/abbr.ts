import type { Lang } from '../i18n/ui';

// Siglas usadas nos estudos de caso. A explicação aparece como dica (title) e também
// na lista "Termos usados nesta página", que funciona sem mouse.
export const terms: Record<string, Record<Lang, string>> = {
  ADR: { pt: 'Registro de decisão de arquitetura', en: 'Architecture decision record' },
  API: { pt: 'Interface de programação de aplicações', en: 'Application programming interface' },
  CI: {
    pt: 'Integração contínua: testes automáticos a cada envio de código',
    en: 'Continuous integration: automated tests on every code push',
  },
  DTO: { pt: 'Objeto de transferência de dados', en: 'Data transfer object' },
  JWT: { pt: 'JSON Web Token: credencial assinada usada no login', en: 'JSON Web Token: a signed credential used at login' },
  MCP: {
    pt: 'Model Context Protocol: padrão que conecta assistentes de IA a fontes de dados',
    en: 'Model Context Protocol: a standard that connects AI assistants to data sources',
  },
  RBAC: { pt: 'Controle de acesso por papéis', en: 'Role-based access control' },
  SLA: { pt: 'Acordo de nível de serviço: prazo combinado', en: 'Service level agreement: an agreed deadline' },
  SRID: { pt: 'Identificador do sistema de coordenadas', en: 'Spatial reference identifier' },
  XLSX: { pt: 'Formato de planilha do Excel', en: 'Excel spreadsheet format' },
};

const pattern = new RegExp(`\\b(${Object.keys(terms).join('|')})(s?)\\b`, 'g');

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Devolve uma função que marca a primeira ocorrência de cada sigla com <abbr>. Uma instância por estudo de caso. */
export function makeAbbr(lang: Lang, used?: Set<string>) {
  const seen = new Set<string>();
  return (text: string): string =>
    escapeHtml(text).replace(pattern, (match, key: string, plural: string) => {
      used?.add(key);
      if (seen.has(key)) return match;
      seen.add(key);
      return `<abbr title="${escapeHtml(terms[key][lang])}">${key}${plural}</abbr>`;
    });
}
