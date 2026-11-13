// Números do README e de docs/DATA.md do sp156-mcp, conferidos lá contra o arquivo real do 1º trimestre de 2025.
export const sp156Data = {
  quarter: { pt: '1º trimestre de 2025', en: 'Q1 2025' },
  totalRows: 742_904,
  duplicateRatePct: 47.65,
  status: [
    { id: 'finalizada', label: { pt: 'Finalizada', en: 'Closed' }, rows: 715_139 },
    { id: 'aberto', label: { pt: 'Aberto', en: 'Open' }, rows: 23_504 },
    { id: 'cancelada', label: { pt: 'Cancelada', en: 'Canceled' }, rows: 3_948 },
    { id: 'andamento', label: { pt: 'Em andamento', en: 'In progress' }, rows: 313 },
  ],
  sourceUrl: 'https://github.com/gabrielmramos-dev/sp156-mcp/blob/main/docs/DATA.md',
} as const;
