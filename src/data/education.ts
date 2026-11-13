import type { Lang } from '../i18n/ui';

type Text = Record<Lang, string>;

export interface Subject {
  name: Text;
  /** Período letivo em que consta no Moodle. */
  term: '2025-2' | '2026-1' | '2026-2';
  optional?: boolean;
  /** Consta no site, mas não na lista do Moodle. Mantida até o Gabriel confirmar. */
  confirm?: boolean;
}

// Fonte única da formação. Ao virar o semestre, mude `semester`, `currentTerm` e, se preciso, `subjects`: o resto do site acompanha.
export const education = {
  institution: { pt: 'Universidade Braz Cubas', en: 'Braz Cubas University' },
  course: { pt: 'Análise e Desenvolvimento de Sistemas', en: 'Systems Analysis and Development' },
  status: { pt: 'Cursando', en: 'In progress' },
  semester: 3,
  currentTerm: '2026-2',
  currentLabel: { pt: 'Cursando', en: 'In progress' },
  optionalLabel: { pt: 'optativa', en: 'elective' },

  groups: [
    {
      title: { pt: 'Desenvolvimento de software', en: 'Software development' },
      subjects: [
        { name: { pt: 'Programação Web', en: 'Web Programming' }, term: '2025-2' },
        { name: { pt: 'Programação Orientada a Objetos', en: 'Object-Oriented Programming' }, term: '2026-1' },
        { name: { pt: 'Engenharia de Software', en: 'Software Engineering' }, term: '2025-2' },
        { name: { pt: 'Análise e Projeto de Sistemas I', en: 'Systems Analysis and Design I' }, term: '2026-1' },
        { name: { pt: 'Análise e Projeto de Sistemas II', en: 'Systems Analysis and Design II' }, term: '2026-2' },
        { name: { pt: 'Programação para Dispositivos Móveis', en: 'Mobile Device Programming' }, term: '2026-2' },
        { name: { pt: 'Jogos para Internet', en: 'Games for the Web' }, term: '2026-2' },
      ],
    },
    {
      title: { pt: 'Dados', en: 'Data' },
      subjects: [
        { name: { pt: 'Modelagem de Dados', en: 'Data Modeling' }, term: '2025-2' },
        { name: { pt: 'Banco de Dados', en: 'Databases' }, term: '2026-1' },
        { name: { pt: 'Fundamentos de Estruturas de Dados', en: 'Data Structures Fundamentals' }, term: '2026-1' },
        { name: { pt: 'Big Data', en: 'Big Data' }, term: '2026-2' },
        { name: { pt: 'Noções Práticas de Análises Numéricas', en: 'Practical Notions of Numerical Analysis' }, term: '2026-2', optional: true },
      ],
    },
    {
      title: { pt: 'Infraestrutura e sistemas distribuídos', en: 'Infrastructure and distributed systems' },
      subjects: [
        { name: { pt: 'Sistemas Cliente/Servidor', en: 'Client/Server Systems' }, term: '2026-1' },
        { name: { pt: 'Computação em Nuvem', en: 'Cloud Computing' }, term: '2026-1' },
        { name: { pt: 'Redes de Computadores', en: 'Computer Networks' }, term: '2026-2' },
        { name: { pt: 'Computação Paralela e Distribuída', en: 'Parallel and Distributed Computing' }, term: '2026-2' },
      ],
    },
    {
      title: { pt: 'Fundamentos e gestão', en: 'Fundamentals and management' },
      subjects: [
        { name: { pt: 'Matemática Aplicada', en: 'Applied Mathematics' }, term: '2025-2' },
        { name: { pt: 'Gestão de Projetos', en: 'Project Management' }, term: '2026-1' },
        // TODO(gabriel): as duas disciplinas abaixo constavam no site, mas não estão na lista do Moodle (2025-2 a 2026-2).
        // Confirme se você as cursou (ou cursa) e, se não, remova-as daqui.
        { name: { pt: 'Técnicas e Desenvolvimento de Algoritmos', en: 'Algorithm Techniques and Development' }, term: '2025-2', confirm: true },
        { name: { pt: 'Sistemas Operacionais', en: 'Operating Systems' }, term: '2025-2', confirm: true },
      ],
    },
  ] as { title: Text; subjects: Subject[] }[],
};

// Disciplinas do Moodle deixadas de fora de propósito (não são de desenvolvimento): Competências Básicas,
// Cruzeiro Hub, Gestão de Operações e Serviços e os Itinerários Extensionistas 1 e 2.

export const semesterLabel = (lang: Lang) => {
  const n = education.semester;
  if (lang === 'pt') return `${n}º semestre`;
  const suffix = n % 10 === 1 && n !== 11 ? 'st' : n % 10 === 2 && n !== 12 ? 'nd' : n % 10 === 3 && n !== 13 ? 'rd' : 'th';
  return `${n}${suffix} semester`;
};
