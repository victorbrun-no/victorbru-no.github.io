import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  BarChart3,
  Bot,
  Brain,
  BriefcaseBusiness,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Cloud,
  Code2,
  Building2,
  Cpu,
  DatabaseZap,
  ExternalLink,
  Heart,
  Layers3,
  Mail,
  MapPin,
  Monitor,
  Phone,
  Rocket,
  Server,
  Target,
  Timer,
  UserRound,
  UsersRound,
  X
} from 'lucide-react';

const ICONS = {
  age: <><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M8 2v4M16 2v4M3 10h18" /></>,
  heart: <path d="M12 20s-7-4.35-9-8.5A5.5 5.5 0 0 1 12 5a5.5 5.5 0 0 1 9 6.5C19 15.65 12 20 12 20Z" />,
  pin: <><path d="M12 21s6-5.8 6-11a6 6 0 1 0-12 0c0 5.2 6 11 6 11Z" /><circle cx="12" cy="10" r="2.2" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 20a8 8 0 0 1 16 0" /></>,
  screen: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></>,
  server: <><rect x="4" y="4" width="16" height="6" rx="2" /><rect x="4" y="14" width="16" height="6" rx="2" /><path d="M8 7h.01M8 17h.01" /></>,
  chart: <><path d="M4 20V10" /><path d="M10 20V4" /><path d="M16 20v-7" /><path d="M22 20H2" /></>,
  bot: <><rect x="4" y="8" width="16" height="10" rx="4" /><path d="M12 4v4M8 13h.01M16 13h.01M9 18h6" /></>,
  cloud: <path d="M18 18a4 4 0 0 0 .4-8A6 6 0 0 0 7 8.5 4.5 4.5 0 0 0 7.5 18H18Z" />,
  brain: <><path d="M9.5 4A3.5 3.5 0 0 0 6 7.5V10a2.5 2.5 0 0 0-2 2.5A2.5 2.5 0 0 0 6 15v1.5A3.5 3.5 0 0 0 9.5 20H12V4H9.5Z" /><path d="M14.5 4A3.5 3.5 0 0 1 18 7.5V10a2.5 2.5 0 0 1 2 2.5A2.5 2.5 0 0 1 18 15v1.5A3.5 3.5 0 0 1 14.5 20H12V4h2.5Z" /></>,
  code: <><path d="m8 9-4 3 4 3" /><path d="m16 9 4 3-4 3" /><path d="m14 5-4 14" /></>,
  building: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01" /></>,
  office: <><path d="M3 21h18" /><path d="M6 21V7l6-4 6 4v14" /><path d="M9 11h.01M12 11h.01M15 11h.01M9 14h.01M12 14h.01M15 14h.01M12 21v-4" /></>,
  calendar: <><rect x="3" y="4" width="18" height="17" rx="3" /><path d="M8 2v4M16 2v4M3 10h18" /></>,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M20 4 15 9" /></>,
  check: <><circle cx="12" cy="12" r="9" /><path d="m8.5 12.5 2.2 2.2 4.8-5.2" /></>,
  layers: <><path d="m12 3 8 4-8 4-8-4 8-4Z" /><path d="m4 11 8 4 8-4" /><path d="m4 15 8 4 8-4" /></>,
  rocket: <><path d="M4.5 16.5c-1.1 1.1-1.6 3.3-1.6 3.3s2.2-.5 3.3-1.6" /><path d="M9 15 5 19" /><path d="M14.5 4.5c2.7-.8 5 0 5 0s.8 2.3 0 5c-.8 2.6-3 5.6-6.5 8.1L8.4 13c2.5-3.5 5.5-5.7 6.1-8.5Z" /><circle cx="15" cy="9" r="1.7" /></>,
  external: <><path d="M14 5h5v5" /><path d="M10 14 19 5" /><path d="M19 13v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  left: <path d="m15 18-6-6 6-6" />,
  right: <path d="m9 18 6-6-6-6" />,
  linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-12h4v2" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
  github: <path d="M9 19c-4 1.5-4-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3 0 6-1.8 6-8a6.2 6.2 0 0 0-1.7-4.3 5.7 5.7 0 0 0-.1-4.2s-1.4-.4-4.6 1.7a15.8 15.8 0 0 0-8.4 0C2.1.6.7 1 .7 1a5.7 5.7 0 0 0-.1 4.2A6.2 6.2 0 0 0-1 9.5c0 6.2 3 8 6 8a3.4 3.4 0 0 0-.9 2.6V24" />
};

function Icon({ name, size = 20, className = '' }) {
  const LucideComponent = LUCIDE_ICONS[name];
  if (LucideComponent) {
    return <LucideComponent className={`icon ${className}`} size={size} strokeWidth={2.05} aria-hidden="true" />;
  }

  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

const LUCIDE_ICONS = {
  age: Timer,
  heart: Heart,
  pin: MapPin,
  mail: Mail,
  phone: Phone,
  user: UserRound,
  screen: Monitor,
  server: Server,
  chart: BarChart3,
  bot: Bot,
  cloud: Cloud,
  brain: Brain,
  code: Code2,
  building: Building2,
  office: Building2,
  calendar: CalendarDays,
  target: Target,
  check: CircleCheck,
  layers: Layers3,
  rocket: Rocket,
  external: ExternalLink,
  close: X,
  left: ChevronLeft,
  right: ChevronRight,
  briefcaseBusiness: BriefcaseBusiness,
  building2: Building2,
  cpu: Cpu,
  databaseZap: DatabaseZap,
  usersRound: UsersRound
};

const PROFILE_IMAGE_ID = '12twXsOMb1QuneWoWiW3LSyFIyU4zoISv';
const PRINT_IDS = [
  '1o3GttK54Do2KVCaqXuNhwURIBM4tu04J',
  '1kZ6kMK8mRrUgSq2MY5_oqgZRP1ePRX7c',
  '1_gkVJpuIrrbPBh1ccGH-vpoddaWZvU-U',
  '1UZtmR5S0uj4KIcZeMc8QFLBbCZSFnWyJ',
  '1Wk_rMYO4XSPIWTB3Xw51Nqz42kYx18mZ',
  '196EP6sTa70Krn8yaPhjPwafKkBKyTIW8',
  '1pT8IAb7UtW3WsMIeLZ3Th0BIYfPVBauz',
  '1czjFoSZ2rdNOEz9yBWG2mIvxbBuiEpG2',
  '1pfnN5PuwIzhToALMJeVl4Rpo4VmqPgHh',
  '1QbK00e2FLmSTsc-JiGal6pTgu09XMeqq',
  '1Lo7k_RJdAlS8CLGInHBjNy0bYZHdSInI',
  '19Th5NE_TidY6c3sPjTLMpb0n7vqMSicO',
  '10kiB3Ztr6eUzgEXpmsKE8-9pIyWcLA-z'
];
const idAt = (n) => PRINT_IDS[n - 1];

const DRIVE_MEDIA = {
  smartFlowMonitorar: '1g2qPYUU8WfXGglFQOzRftOJa-vApUdUL',
  smartFlowMonitorar2: '1yUwqIAJamuB6yuooiNaURoBtYHffll_g',
  smartFlowMonitorar3: '1YEKllfKvChWrasD4qr6DusMNUzy9gQlG',
  smartFlowNode: '1eslJoOIHCaT33mtIGc7tUAPTgNULSI1B',
  fluxoSmartDash: '1svmugXxLOZLuuKaVB0OmZd100G2nsocX',
  fluxoLandingPage: '1JXbGTSoLIqQK1Wecu4kJvOq30hInBay_',
  fluxoAgenteIA: '1fUJgJswiuQjZddy0dTKQYF3axGVo0bYD',
  fluxoAgentStudio: '1BDe5sTlBYv4lvLv9fy60iEQa4eDrALSd',
  fluxoVideo: '1_MNqaABSrt1xp_AeBya-THprBXOaYhS8',
  rprotecProfile: '1aqz0GUYKgsyIOhUb5uDIYwwdUjX7v278',
  rprotecServicos: '1_We1Ob-D-hbXz08lgsY5p2068uPreYVL',
  consultasProIntegracoesTipos: '1wzwrEZvwCRQx9voLAAUJe0jyhI-udjok'
};

const profile = {
  name: 'Victor Bruno',
  role: 'Desenvolvedor Full Cycle',
  headline: 'Automação • Dados • IA ',
  email: 'vi-tor_bru@hotmail.com',
  phone: '(38) 99181-3627',
  location: 'Belo Horizonte - MG',
  age: '28 anos',
  status: 'Solteiro',
  linkedin: 'https://www.linkedin.com/in/victorbrun-no/',
  github: ''
};

const chips = [
  { icon: 'age', label: profile.age },
  { icon: 'heart', label: profile.status },
  { icon: 'pin', label: profile.location },
  { icon: 'phone', label: profile.phone },
  { icon: 'mail', label: profile.email }
];

const navItems = [
  { id: 'top', label: 'Sobre' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'competencias', label: 'Competências' },
  { id: 'stacks', label: 'Stacks' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'contato', label: 'Contato' }
];

const highlights = [
  { value: 'Full Cycle', label: 'Entrega de ponta a ponta' },
  { value: 'IA + Dados', label: 'Automação aplicada ao negócio' },
  { value: 'DevOps', label: 'Deploy, containers e sustentação' }
];

const seniorSignals = [
  {
    icon: 'layers',
    title: 'Arquitetura antes do código',
    text: 'Transformo necessidade de negócio em fluxo, componente, API, dado, automação e rotina de sustentação.'
  },
  {
    icon: 'code',
    title: 'Execução full cycle',
    text: 'Atuo da concepção ao deploy: UX, front-end, back-end, banco, servidor, observabilidade e melhoria contínua.'
  },
  {
    icon: 'rocket',
    title: 'Perfil orientado a impacto',
    text: 'Priorizo clareza, estabilidade, velocidade de entrega e soluções que reduzem gargalo operacional.'
  }
];

const experiences = [
  {
    role: 'Gestor / Desenvolvedor',
    roleIcon: 'briefcaseBusiness',
    company: 'Operação própria / serviços como PJ e freelancer',
    period: 'Atualmente',
    text: 'Estruturação e gestão de operação própria focada em desenvolvimento de software, automações, integrações e aplicações com inteligência artificial. Criação de soluções completas do zero, envolvendo atendimento consultivo, descoberta, arquitetura, desenvolvimento, infraestrutura, implantação e suporte.',
    bullets: [
      'Desenvolvimento de sistemas web, painéis administrativos, automações e integrações.',
      'Criação de fluxos com n8n, APIs, filas, logs, banco de dados e monitoramento operacional.',
      'Integração com modelos de IA como Gemini, ChatGPT, Llama e ambientes on-premise/cloud.',
      'Gestão de servidores, containers, proxy reverso, domínios, deploy e pipelines.'
    ]
  },
  {
    role: 'Hapvida',
    roleIcon: 'building2',
    company: 'Especialista em Análise de Negócio',
    period: '10/01/2024 – 07/07/2025',
    text: 'Atuação sênior com foco em análise, estruturação, visão crítica e suporte à tomada de decisão, reunindo experiência em dados, processos, performance e operação em contexto corporativo robusto.',
    bullets: [
      'Desenvolvimento e manutenção de sistemas, automações e reportes avançados.',
      'Apoio a projetos estratégicos com forte perfil analítico e sistêmico.'
    ]
  },
  {
    role: 'Mundiale',
    roleIcon: 'building2',
    company: 'Data Analyst IV / Analista Sênior',
    period: '01/03/2023 – 08/01/2024',
    text: 'Continuidade da atuação analítica e sistêmica em ambiente de alta complexidade, com interface entre dados, operação, processos e melhoria contínua, apoiando eficiência, visibilidade e tomada de decisão.',
    bullets: [
      'Desenvolvimento de soluções internas, integrações e análise de dados.',
      'Melhoria contínua de processos e sistemas ligando operação, performance e tecnologia.'
    ]
  },
  {
    role: 'Jurify Tecnologia',
    roleIcon: 'building2',
    company: 'Technical architecture lead',
    period: '01/07/2021 – 14/12/2022',
    text: 'Atuação como liderança técnica e de execução, participando da estruturação dos sistemas que serviram de base para a operação da empresa. Responsável por decisões de arquitetura, organização técnica, banco de dados, servidores e evolução do produto.',
    bullets: [
      'Coordenação de desenvolvimento e apoio técnico em projetos estratégicos.',
      'Estruturação de bases de dados, integrações e componentes centrais da plataforma.',
      'Atuação próxima da engenharia, produto e operação para sustentação do crescimento.'
    ]
  },
  {
    role: 'VGX – Contact Center S/A',
    roleIcon: 'building2',
    company: 'Analista de Planejamento III / Analista Sênior',
    period: '01/02/2018 – 04/06/2021',
    text: 'Responsável por atividades ligadas a planejamento, MIS e análise de dados, com forte atuação em relatórios, interpretação de indicadores, apoio à operação e geração de insumos para tomada de decisão em ambiente corporativo de grande porte.',
    bullets: [
      'Construção e manutenção de relatórios operacionais e gerenciais.',
      'Análise crítica de performance, produtividade e processos.',
      'Uso avançado de Excel, VBA e bancos de dados para automação e inteligência operacional.'
    ]
  }
];

const skillGroups = [
  {
    icon: 'cpu',
    title: 'Técnicas e Infra',
    items: [
      ['Front-end / UI/UX aplicada', 87],
      ['Arquitetura de sistemas / DevOps', 92],
      ['Docker / containers / deploy', 92],
      ['Node.js / Back-end modular', 83],
      ['CI/CD / Git / observabilidade', 89]
    ]
  },
  {
    icon: 'databaseZap',
    title: 'Dados e Automação',
    items: [
      ['Análise de dados / BI', 87],
      ['Automação / integração / RPA', 97],
      ['IA aplicada / Prompt Engineering', 95],
      ['Banco de dados / modelagem', 92],
      ['Excel / Power BI / VBA', 94]
    ]
  },
  {
    icon: 'usersRound',
    title: 'Interpessoais',
    items: [
      ['Comunicação', 95],
      ['Trabalho em equipe', 92],
      ['Aprendizado rápido', 97],
      ['Adaptabilidade', 96],
      ['Visão de negócios', 98]
    ]
  }
];

const stacks = [
  {
    icon: 'screen',
    title: 'Front-end',
    text: 'JavaScript, TypeScript, React, Next.js, Vite, componentização, interfaces modernas, foco em usabilidade e experiência do usuário pensada para ser simples, prática e bonita.',
    tags: ['JavaScript', 'React', 'Next.js', 'Vite', 'UI/UX']
  },
  {
    icon: 'server',
    title: 'Back-end',
    text: 'Node.js, PHP, Python, APIs REST, autenticação, integrações, arquitetura modular, organização de serviços e código estruturado para escala, manutenção e evolução contínua.',
    tags: ['Node.js', 'PHP', 'Python', 'APIs REST', 'DDD']
  },
  {
    icon: 'chart',
    title: 'Dados e BI',
    text: 'SQL, MySQL, SQL Server, PostgreSQL, Power BI, Excel avançado, VBA, business intelligence, modelagem, relatórios gerenciais, análise crítica de dados e apoio à decisão.',
    tags: ['SQL', 'Power BI', 'Excel', 'VBA']
  },
  {
    icon: 'bot',
    title: 'Automação',
    text: 'n8n, RPA, webhooks, integrações sistêmicas, fluxos operacionais, comunicação automatizada, tratamento de eventos, filas, logs e conexão entre plataformas e processos.',
    tags: ['n8n', 'RPA', 'Webhooks']
  },
  {
    icon: 'cloud',
    title: 'Infra / DevOps',
    text: 'Docker, containers, VPS, máquinas virtuais, Git, CI/CD, DNS, proxies, Redis, monitoramento, filas, observabilidade, deploy e sustentação de ambientes produtivos.',
    tags: ['Docker', 'VPS', 'CI/CD', 'DNS', 'Redis', 'Logs']
  },
  {
    icon: 'brain',
    title: 'IA e complementares',
    text: 'ChatGPT, Gemini, Llama, prompt engineering, agentes, soluções on-premise e cloud, além de Active Directory, redes, Windows Server e gestão/instalação de banco de dados.',
    tags: ['ChatGPT', 'Gemini', 'Llama', 'Prompt Engineering']
  }
];

const projects = [
  {
    title: 'Fluxo Inteligente',
    category: 'Sistema Web • 7 telas + vídeo',
    description: 'Plataforma pensada para centralizar operação, agentes e painéis em uma experiência clara e objetiva: leitura rápida, navegação funcional e produtividade no uso diário.',
    tags: ['Node.js', 'UX/UI', 'Arquitetura própria', 'Operação'],
    mediaItems: [
      { type: 'image', id: DRIVE_MEDIA.fluxoLandingPage },
      { type: 'image', id: DRIVE_MEDIA.fluxoAgentStudio },
      { type: 'image', id: idAt(7) },
      { type: 'image', id: DRIVE_MEDIA.fluxoSmartDash },
      { type: 'image', id: idAt(6) },
      { type: 'image', id: DRIVE_MEDIA.fluxoAgenteIA },
      { type: 'image', id: idAt(5) },
      { type: 'video', id: DRIVE_MEDIA.fluxoVideo, posterId: DRIVE_MEDIA.fluxoLandingPage }
    ]
  },
  {
    title: 'Smart Flow',
    category: 'Sistema Web • 4 telas',
    description: 'Camada de monitoramento e acompanhamento operacional com foco em visibilidade em tempo real, leitura clara dos eventos e apoio rápido à tomada de decisão.',
    tags: ['Monitoramento', 'Dashboard', 'Node.js', 'Operação'],
    mediaItems: [
      { type: 'image', id: DRIVE_MEDIA.smartFlowMonitorar },
      { type: 'image', id: DRIVE_MEDIA.smartFlowMonitorar2 },
      { type: 'image', id: DRIVE_MEDIA.smartFlowMonitorar3 },
      { type: 'image', id: DRIVE_MEDIA.smartFlowNode }
    ]
  },
  {
    title: 'Rprotec',
    category: 'Plataforma Web • 5 telas',
    description: 'Interface orientada à conversão, organização e clareza visual: leitura rápida, navegação intuitiva e apresentação premium do produto.',
    tags: ['Conversão', 'Design system', 'Full stack'],
    mediaItems: [
      { type: 'image', id: DRIVE_MEDIA.rprotecProfile },
      { type: 'image', id: idAt(13) },
      { type: 'image', id: idAt(2) },
      { type: 'image', id: idAt(12) }
    ]
  },
  {
    title: 'Consultas Pro',
    category: 'Produto Web • 4 telas',
    description: 'Dashboard e operação escaláveis, com visão prática de produto, módulos integrados e sustentação de um ecossistema técnico amplo.',
    tags: ['Dashboard', 'SaaS', 'Dados', 'Integrações'],
    mediaItems: [
      { type: 'image', id: DRIVE_MEDIA.consultasProIntegracoesTipos },
      { type: 'image', id: idAt(4) },
      { type: 'image', id: idAt(3) },
      { type: 'image', id: idAt(1) }
    ]
  },
  {
    title: 'Alguns outros...',
    category: 'Full cycle',
    description: 'Painéis e fluxos operacionais, APIs, filas, banco e observabilidade, servidores e deploy — o mesmo eixo full cycle da operação própria e das competências em arquitetura, dados e DevOps.',
    tags: ['n8n', 'Docker', 'Integrações', 'IA aplicada'],
    mediaItems: [
      { type: 'image', id: idAt(11) },
      { type: 'image', id: idAt(8) },
      { type: 'image', id: idAt(9) },
      { type: 'image', id: idAt(10) }
    ]
  }
];

const differentials = [
  {
    icon: 'user',
    title: 'UX/UI com visão prática',
    text: 'Interfaces intuitivas, elegantes e voltadas para resultado real, sem excesso visual e sem perder funcionalidade.'
  },
  {
    icon: 'target',
    title: 'Visão de negócio',
    text: 'Entendimento profundo de processos para entregar soluções que resolvem gargalos operacionais e geram valor.'
  },
  {
    icon: 'check',
    title: 'Autonomia total',
    text: 'Capacidade de conduzir discovery, arquitetura, desenvolvimento, deploy e evolução contínua de forma responsável.'
  }
];

function driveThumbnail(id, width = 900) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;
}

function driveCandidates(id, profile = 'full') {
  const sizes = {
    avatar: [720, 560, 400],
    thumb: [520, 720, 920],
    full: [1920, 1600, 1200, 920]
  };

  const urls = (sizes[profile] || sizes.full).map((size) => driveThumbnail(id, size));
  if (profile === 'full') {
    urls.push(`https://drive.google.com/uc?id=${id}&export=view`, `https://lh3.googleusercontent.com/d/${id}`);
  }
  return urls;
}

function DriveImage({ id, alt, profile = 'thumb', className = '', loading = 'lazy' }) {
  const sources = useMemo(() => driveCandidates(id, profile), [id, profile]);
  const [index, setIndex] = useState(0);

  useEffect(() => setIndex(0), [id, profile]);

  return (
    <img
      className={className}
      src={sources[index]}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setIndex((current) => Math.min(current + 1, sources.length - 1))}
    />
  );
}

function videoPreview(id) {
  return `https://drive.google.com/file/d/${id}/preview`;
}

function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...props }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
}

function SectionHeader({ eyebrow, title, text, icon }) {
  return (
    <Reveal className="section-head">
      <div>
        {eyebrow && (
          <div className="section-badge-line">
            <span className="eyebrow">
              {icon && <Icon name={icon} size={14} />}
              {eyebrow}
            </span>
            <div className="section-line" />
          </div>
        )}
        <h2>{title}</h2>
      </div>
      {text && <p>{text}</p>}
    </Reveal>
  );
}

function TagList({ items, className = '' }) {
  return (
    <div className={`tags ${className}`}>
      {items.map((item) => (
        <span className="tag" key={item}>{item}</span>
      ))}
    </div>
  );
}

function Navigation() {
  const [active, setActive] = useState('top');
  const [scrolled, setScrolled] = useState(false);
  const [showIdentity, setShowIdentity] = useState(false);
  const menuRef = useRef(null);

  const scrollMenuToNavId = useCallback((navId, behavior = 'smooth') => {
    const menu = menuRef.current;
    if (!menu) return;
    const btn = menu.querySelector(`button[data-nav-id="${navId}"]`);
    if (!btn) return;
    const maxScroll = Math.max(0, menu.scrollWidth - menu.clientWidth);
    const targetLeft = btn.offsetLeft - (menu.clientWidth - btn.offsetWidth) / 2;
    menu.scrollTo({
      left: Math.min(Math.max(0, targetLeft), maxScroll),
      behavior
    });
  }, []);

  useEffect(() => {
    const navOffset = () => (window.matchMedia('(min-width: 780px)').matches ? 112 : 96);

    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const offset = navOffset() + 24;
      const current = navItems.reduce((last, item) => {
        const element = document.getElementById(item.id);
        if (element && element.offsetTop - offset <= window.scrollY) return item.id;
        return last;
      }, 'top');
      setActive(current === 'sobre' ? 'top' : current);

      const aboutSection = document.getElementById('sobre');
      const threshold = aboutSection ? Math.max(aboutSection.offsetTop - navOffset(), 72) : Number.POSITIVE_INFINITY;
      setShowIdentity(window.scrollY >= threshold);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => scrollMenuToNavId(active, 'smooth'));
    return () => cancelAnimationFrame(frame);
  }, [active, scrollMenuToNavId]);

  function jumpTo(id) {
    const element = document.getElementById(id);
    if (!element) return;
    scrollMenuToNavId(id, 'auto');
    const offset = window.matchMedia('(min-width: 780px)').matches ? 112 : 96;
    const top = Math.max(element.getBoundingClientRect().top + window.scrollY - offset, 0);
    window.scrollTo({ top, behavior: 'smooth' });
    window.history.replaceState(null, '', `#${id}`);
  }

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`} aria-label="Navegação principal">
      <div className="container nav-inner">
        <button
          className={`brand brand--profile ${showIdentity ? 'is-visible' : ''}`}
          type="button"
          onClick={() => jumpTo('top')}
          aria-label="Ir para o início"
        >
          <span className="brand-avatar" aria-hidden="true">
            <DriveImage id={PROFILE_IMAGE_ID} profile="avatar" alt="" />
          </span>
          <span className="brand-name">{profile.name}</span>
        </button>
        <span className={`brand-name-subtitle ${showIdentity ? 'is-visible' : ''}`}>• Desenvolvedor Full Cycle</span>

        <div className="menu" ref={menuRef} role="list">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              data-nav-id={item.id}
              className={active === item.id || (item.id === 'top' && active === 'sobre') ? 'active' : ''}
              onClick={() => jumpTo(item.id)}
              aria-current={active === item.id || (item.id === 'top' && active === 'sobre') ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero section" id="top">
      <div className="container hero-grid">
        <Reveal className="portrait-wrap" delay={80}>
          <div className="portrait-stack">
            <div className="portrait">
              <DriveImage id={PROFILE_IMAGE_ID} profile="avatar" alt="Foto de Victor Bruno" loading="eager" />
            </div>
            <p className="portrait-name-badge">
              <span className="portrait-name-badge-icon" aria-hidden="true"><Icon name="user" size={16} /></span>
              <span>{profile.name}</span>
            </p>
          </div>
        </Reveal>

        <Reveal className="hero-copy" delay={140}>
          {/* <span className="eyebrow hero-eyebrow">Portfólio • Currículo • Full cycle</span> */}
          <h1 className="hero-title-text">{profile.name}</h1>
          <p className="sub">
            <strong>{profile.role}</strong> • {profile.headline}
          </p>
          <p className="lead">
            Autodidata, versátil e apaixonado por criar soluções que fazem a diferença. Experiênte em<strong>  desenvolvimento </strong> de sistemas completos,
            <strong> automações</strong>  inteligentes, análises de <strong> dados</strong>  e <strong> integrações</strong>  robustas que unem experiência de usuário,
            <strong> arquitetura moderna</strong>  e tecnologia de ponta para gerar <strong> valor real para o negócio.</strong> 
          </p>

          <div className="chips" aria-label="Informações rápidas">
            {chips.map((chip) => (
              <span className="chip" key={chip.label}>
                <span className="chip-icon"><Icon name={chip.icon} /></span>
                {chip.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      {/* <Reveal className="container stats-panel" delay={220}>
        {highlights.map((item) => (
          <div className="stat" key={item.value}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </Reveal> */}
    </header>
  );
}

function About() {
  return (
    <section className="section" id="sobre">
      <div className="container">
        <SectionHeader
          eyebrow="Perfil"
          title="Sobre mim"
          text="Experiência corporativa e empreendimentos próprios: do diagnóstico à entrega em produção."
        />
        <Reveal className="about-card premium-card" delay={120}>
          <div className="about-marker" />
          <div className="about-copy">
            <p>
              Minha atuação combina <strong>planejamento, dados, engenharia de software, infraestrutura e automação</strong>. Experiência em ambientes corporativos e empreendimentos próprios, liderando e executando projetos do diagnóstico à entrega: desenho de arquitetura, bancos de dados, APIs, interfaces, servidores, filas, integrações, observabilidade e evolução contínua do produto.
            </p>
            <p>
              Ampla visão de negócio, profundidade técnica e forte capacidade de transformar <strong>problemas complexos em soluções escaláveis</strong>, funcionais e bem estruturadas. Consigo conduzir projetos de forma completa e autônoma, com baixa necessidade de supervisão mesmo em ambientes de alta complexidade.
            </p>
          </div>
          <div className="about-signature">
            <span>Perfil sênior orientado a entrega</span>
            <small>Discovery → Arquitetura → Código → Deploy → Evolução</small>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SeniorSignals() {
  return (
    <section className="section section-compact" id="destaques" aria-label="Destaques de senioridade">
      <div className="container signal-grid">
        {seniorSignals.map((item, index) => (
          <Reveal as="article" className="signal-card premium-card" delay={index * 90} key={item.title}>
            <div className="card-head">
              <div className="card-icon icon-pop"><Icon name={item.icon} /></div>•
              <h3>{item.title}</h3>
            </div>
            <p>{item.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section" id="experiencia">
      <div className="container">
        <SectionHeader
          eyebrow="Trajetória"
          title="Experiência profissional"
          text="Linha principal da trajetória, com entregas-chave, responsabilidades e contexto técnico de cada período."
        />
        <div className="timeline">
          {experiences.map((item, index) => (
            <Reveal as="article" className="timeline-item premium-card" delay={index * 90} key={`${item.role}-${item.period}`}>
              <div className="timeline-dot" aria-hidden="true" />
              <div className="timeline-content">
                <div className="timeline-top">
                  <div className="timeline-role-wrap">
                    <h3 className="timeline-title">
                      <span className="timeline-title-icon"><Icon name={item.roleIcon || 'building2'} size={17} /></span>
                      {item.role}
                    </h3>
                    <span className="timeline-company">• {item.company}</span>
                  </div>
                </div>
                <p className="timeline-body">{item.text}</p>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <p className="date-pill timeline-date">
                  <Icon name="calendar" size={12} /> {item.period}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Competencies() {
  return (
    <section className="section" id="competencias">
      <div className="container">
        <SectionHeader
          eyebrow="Competências"
          title="Capacidades centrais"
          text="Níveis orientativos com foco em análise, automação, IA, UI/UX e DevOps."
          icon="target"
        />
        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <Reveal className="skill-card premium-card" delay={index * 120} key={group.title}>
              <div className="skill-card-head">
                <span className="skill-card-icon icon-pop" aria-hidden="true"><Icon name={group.icon} size={18} /></span>
                <h3>{group.title}</h3>
              </div>
              <div className="skill-list">
                {group.items.map(([label, value]) => (
                  <div className="skill-item" key={label}>
                    <div className="skill-row">
                      <span>{label}</span>
                      <strong>{value}%</strong>
                    </div>
                    <div className="bar" aria-hidden="true">
                      <span style={{ '--value': `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stacks() {
  return (
    <section className="section" id="stacks">
      <div className="container">
        <SectionHeader
          eyebrow="Stack"
          title="Amplitude técnica"
          text="Escopo de atuação em produto, dados, operação, IA e infraestrutura."
        />
        <div className="stack-grid">
          {stacks.map((item, index) => (
            <Reveal as="article" className="stack-card premium-card" delay={index * 70} key={item.title}>
              <div className="card-head">
                <div className="card-icon icon-pop"><Icon name={item.icon} /></div> 
                <h3>{item.title}</h3>
              </div>
              <p>{item.text}</p>
              <TagList items={item.tags} className="muted-tags" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function previewItems(project) {
  const imageItems = project.mediaItems.filter((item) => item.type === 'image');
  const list = imageItems.length ? imageItems : project.mediaItems;
  const result = list.slice(0, 4);
  while (result.length < 4) result.push(result[result.length - 1]);
  return result;
}

function ProjectCard({ project, index, onOpen }) {
  const previews = previewItems(project);

  return (
    <Reveal as="article" className="project-card premium-card" delay={index * 90}>
      <button
        className="project-button"
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Abrir galeria do projeto ${project.title}`}
      >
        <div className="project-main">
          <div className="project-collage-host">
            <div className="project-collage">
              {previews.map((item, previewIndex) => (
                <div className={`shot preview-${previewIndex + 1}`} key={`${project.title}-${previewIndex}`}>
                  <DriveImage
                    id={item.type === 'video' ? item.posterId || item.id : item.id}
                    alt=""
                    profile="thumb"
                  />
                </div>
              ))}
            </div>
            <span className="project-open-inline"><Icon name="external" size={17} /> Abrir galeria</span>
          </div>
          <div className="project-content">
            <div className="project-card-top">
              <h3>
                <span><Icon name="layers" size={22} /></span>
                {project.title}
              </h3>
              <span className="project-category">{project.category}</span>
              <TagList items={project.tags} className="project-tags" />
            </div>
            <div className="project-info">
              <p>{project.description}</p>
            </div>
          </div>
        </div>
      </button>
    </Reveal>
  );
}

function Projects() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section" id="projetos">
      <div className="container">
        <SectionHeader
          eyebrow="Projetos"
          title="Projetos em destaque"
          text="Projetizados e desenvolvidos por mim: front-end, back-end, banco de dados, arquitetura e implantação."
        />
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} onOpen={setOpenIndex} key={project.title} />
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <ProjectModal
          project={projects[openIndex]}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}

function ProjectModal({ project, onClose }) {
  const [mediaIndex, setMediaIndex] = useState(0);
  const media = project.mediaItems[mediaIndex];
  const titleId = useId();
  const shellRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    document.body.classList.add('modal-lock');
    closeButtonRef.current?.focus();

    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') setMediaIndex((i) => (i - 1 + project.mediaItems.length) % project.mediaItems.length);
      if (event.key === 'ArrowRight') setMediaIndex((i) => (i + 1) % project.mediaItems.length);

      if (event.key === 'Tab' && shellRef.current) {
        const focusable = shellRef.current.querySelectorAll(
          'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('modal-lock');
      document.removeEventListener('keydown', onKey);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [onClose, project.mediaItems.length]);

  const next = () => setMediaIndex((i) => (i + 1) % project.mediaItems.length);
  const prev = () => setMediaIndex((i) => (i - 1 + project.mediaItems.length) % project.mediaItems.length);

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-shell" ref={shellRef}>
        <div className="modal-top">
          <div>
            <span>{project.category}</span>
            <h3 id={titleId}>{project.title}</h3>
          </div>
          <button ref={closeButtonRef} className="icon-button" type="button" onClick={onClose} aria-label="Fechar galeria">
            <Icon name="close" />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-gallery">
            <div className="modal-media">
              {media.type === 'video' ? (
                <iframe
                  src={videoPreview(media.id)}
                  title={`${project.title} — vídeo`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <DriveImage id={media.id} alt={`${project.title} — imagem ${mediaIndex + 1}`} profile="full" />
              )}
            </div>
            <div className="thumb-row" role="list" aria-label="Mídias do projeto">
              {project.mediaItems.map((item, index) => (
                <button
                  type="button"
                  className={`thumb ${index === mediaIndex ? 'active' : ''}`}
                  key={`${item.type}-${item.id}`}
                  onClick={() => setMediaIndex(index)}
                  aria-label={`Abrir mídia ${index + 1} de ${project.mediaItems.length}`}
                  aria-current={index === mediaIndex ? 'true' : undefined}
                >
                  <DriveImage id={item.type === 'video' ? item.posterId || item.id : item.id} alt="" profile="thumb" />
                  {item.type === 'video' && <span>Vídeo</span>}
                </button>
              ))}
            </div>
          </div>

          <aside className="modal-info">
            <p>{project.description}</p>
            <TagList items={project.tags} />
            <div className="modal-actions">
              <button className="icon-button" type="button" onClick={prev} aria-label="Mídia anterior"><Icon name="left" /></button>
              <button className="icon-button" type="button" onClick={next} aria-label="Próxima mídia"><Icon name="right" /></button>
            </div>
            <button className="btn btn-primary modal-close-mobile" type="button" onClick={onClose}>Fechar galeria</button>
            <small>Use as miniaturas, as setas ou o teclado para navegar.</small>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Differentials() {
  return (
    <section className="section" id="diferenciais">
      <div className="container">
        <SectionHeader  eyebrow="Entregas" title="Diferenciais" icon="target" />
        <div className="diff-grid">
          {differentials.map((item, index) => (
            <Reveal as="article" className="diff-card premium-card" delay={index * 110} key={item.title}>
              <div className="card-head">
                <div className="card-icon icon-pop"><Icon name={item.icon} /></div>•
                <h3>{item.title}</h3>
              </div>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="contato">
      <div className="container footer-grid">
        <Reveal>
          <span className="eyebrow dark">Contato</span>
          <h2>Vamos conversar?</h2>
          <p>Estou aberto a novos desafios, parcerias e projetos que precisem de execução técnica com visão de negócio.</p>
        </Reveal>
        <Reveal className="footer-card" delay={100}>
          <a href={`mailto:${profile.email}`}><Icon name="mail" /> {profile.email}</a>
          <span><Icon name="pin" /> {profile.location}</span>
          <span><Icon name="phone" /> {profile.phone}</span>
        </Reveal>
        <Reveal className="footer-social" delay={180}>
          <a className="social" href={`mailto:${profile.email}`} aria-label="E-mail"><Icon name="mail" /></a>
          <a className="social" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
          {profile.github && (
            <a className="social" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Icon name="github" /></a>
          )}
        </Reveal>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Navigation />
      <main id="conteudo">
        <Hero />
        <About />
        <SeniorSignals />
        <Experience />
        <Competencies />
        <Stacks />
        <Projects />
        <Differentials />
      </main>
      <Footer />
    </>
  );
}

export default App;
