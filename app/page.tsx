'use client';

import type React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  Briefcase,
  CalendarDays,
  CheckCircle,
  ChevronDown,
  CirclePlus,
  Heart,
  Handshake,
  Instagram,
  Lightbulb,
  LogIn,
  MapPin,
  MessageCircle,
  Network,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FloatingBees, HoneycombBackdrop } from '@/components/bees';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/** Rótulo editorial de seção: filete dourado + versalete espaçado. */
function SectionLabel({ children, centered = false }: { children: React.ReactNode; centered?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary ${
        centered ? 'justify-center' : ''
      }`}
    >
      <span className="h-px w-10 shrink-0 bg-primary/60" />
      <span className="text-safe">{children}</span>
      {centered && <span className="h-px w-10 shrink-0 bg-primary/60" />}
    </p>
  );
}

export default function LandingPage() {
  const signupUrls = {
    loveDecoration: `${process.env.NEXT_PUBLIC_SISTEMA_URL}/auth/register?type=love-decoration`,
    professional: `${process.env.NEXT_PUBLIC_SISTEMA_URL}/auth/register?type=professional`,
    partnerSupplier: `${process.env.NEXT_PUBLIC_SISTEMA_URL}/auth/register?type=partner-supplier`,
    wellness: `${process.env.NEXT_PUBLIC_SISTEMA_URL}/auth/register?type=wellness`,
  };

  const metrics = [
    { value: '+25', label: 'anos de relacionamento no mercado' },
    { value: '4', label: 'perfis de entrada para a comunidade' },
    { value: '100%', label: 'foco em conexões qualificadas' },
  ];

  const audiences = [
    {
      title: 'Arquitetos e designers',
      description: 'Ganhe visibilidade, encontre fornecedores alinhados e amplie sua rede de indicações.',
      icon: Briefcase,
      color: 'text-blue-300',
    },
    {
      title: 'Lojistas parceiros',
      description: 'Aproxime sua marca de profissionais que especificam, indicam e movimentam projetos reais.',
      icon: Handshake,
      color: 'text-emerald-300',
    },
    {
      title: 'Amo decoração',
      description: 'Entre em uma comunidade que inspira escolhas, tendências e experiências no universo da casa.',
      icon: Heart,
      color: 'text-pink-300',
    },
    {
      title: 'Wellness',
      description: 'Conecte bem-estar, saúde e lifestyle a um público que valoriza experiências completas.',
      icon: CirclePlus,
      color: 'text-teal-300',
    },
  ];

  const benefits = [
    {
      title: 'Networking que vira negócio',
      description: 'Encontros pensados para criar conversas certas, parcerias estratégicas e novas oportunidades.',
      icon: Network,
    },
    {
      title: 'Autoridade e visibilidade',
      description: 'Sua marca aparece em uma rede segmentada, com contexto profissional e relacionamento próximo.',
      icon: Award,
    },
    {
      title: 'Eventos com curadoria',
      description: 'Palestras, visitas e ativações para aproximar pessoas que podem construir algo juntas.',
      icon: CalendarDays,
    },
    {
      title: 'Comunidade ativa',
      description: 'Um ambiente contínuo para trocar indicações, ideias, experiências e boas práticas de mercado.',
      icon: Users,
    },
    {
      title: 'Parcerias inteligentes',
      description: 'Conexão entre quem cria, quem fornece, quem compra e quem entrega experiências de alto valor.',
      icon: Lightbulb,
    },
    {
      title: 'Crescimento consistente',
      description: 'Relacionamento, conteúdo e presença para fortalecer reputação e abrir portas ao longo do tempo.',
      icon: TrendingUp,
    },
  ];

  const steps = [
    'Escolha seu perfil',
    'Cadastre-se na plataforma',
    'Participe das conexões e eventos',
    'Transforme relacionamento em oportunidade',
  ];

  const testimonials = [
    {
      text: 'O UP encurta caminhos. As conversas acontecem com quem entende o mercado e sabe gerar parceria de verdade.',
      name: 'Ana Oliveira',
      role: 'Arquiteta',
    },
    {
      text: 'Entramos para nos aproximar dos profissionais certos e encontramos uma comunidade com muita troca qualificada.',
      name: 'Carlos Mendes',
      role: 'Lojista parceiro',
    },
    {
      text: 'Os eventos têm uma energia muito boa: conteúdo, relacionamento e oportunidades surgindo naturalmente.',
      name: 'Mariana Costa',
      role: 'Designer de interiores',
    },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSignup = (e: { preventDefault: () => void; stopPropagation?: () => void }, userType: keyof typeof signupUrls) => {
    e.preventDefault();
    e.stopPropagation?.();

    window.open(signupUrls[userType], '_blank');
  };

  const signupButtonClass =
    'h-auto min-h-12 max-w-full whitespace-normal px-6 py-3 text-center text-base shadow-lg shadow-primary/20';

  const SignupMenu = ({ label = 'Junte-se agora', className = '' }: { label?: string; className?: string }) => (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button size="lg" className={`${signupButtonClass} ${className}`}>
          {label}
          <ChevronDown className="h-4 w-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 max-w-[calc(100vw-2rem)]"
        sideOffset={8}
        avoidCollisions
      >
        <DropdownMenuItem
          onSelect={(e) => handleSignup(e, 'loveDecoration')}
          className="cursor-pointer px-4 py-3 hover:bg-primary/10"
        >
          <Heart className="mr-3 h-4 w-4 text-pink-500" />
          <div className="layout-safe flex min-w-0 flex-col">
            <span className="text-safe font-medium">Eu amo decoração</span>
            <span className="text-safe text-xs text-muted-foreground">Para entusiastas</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => handleSignup(e, 'professional')}
          className="cursor-pointer px-4 py-3 hover:bg-primary/10"
        >
          <Briefcase className="mr-3 h-4 w-4 text-blue-500" />
          <div className="layout-safe flex min-w-0 flex-col">
            <span className="text-safe font-medium">Profissionais</span>
            <span className="text-safe text-xs text-muted-foreground">Arquitetos e designers</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => handleSignup(e, 'partnerSupplier')}
          className="cursor-pointer px-4 py-3 hover:bg-primary/10"
        >
          <Handshake className="mr-3 h-4 w-4 text-green-500" />
          <div className="layout-safe flex min-w-0 flex-col">
            <span className="text-safe font-medium">Lojista parceiro</span>
            <span className="text-safe text-xs text-muted-foreground">Empresas e lojas</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => handleSignup(e, 'wellness')}
          className="cursor-pointer px-4 py-3 hover:bg-primary/10"
        >
          <CirclePlus className="mr-3 h-4 w-4 text-teal-500" />
          <div className="layout-safe flex min-w-0 flex-col">
            <span className="text-safe font-medium">Wellness</span>
            <span className="text-safe text-xs text-muted-foreground">Bem-estar e saúde</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-background text-foreground">
      <HoneycombBackdrop />
      <header className="relative z-40 sticky top-0 border-b border-white/10 bg-background/90 backdrop-blur-xl">
        <div className="container flex min-h-20 min-w-0 flex-wrap items-center justify-between gap-3 py-3">
          <Link
            href="#inicio"
            onClick={(e) => scrollToSection(e, 'inicio')}
            className="relative h-16 w-20 shrink-0"
          >
            <Image src="/logo-up-completa.svg" alt="UP Connection" fill className="object-contain" priority />
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {[
              ['Sobre', 'sobre'],
              ['Benefícios', 'beneficios'],
              ['Comunidade', 'comunidade'],
              ['Fundadoras', 'fundadoras'],
            ].map(([label, id]) => (
              <Link
                key={id}
                href={`#${id}`}
                className="text-sm font-medium text-white/80 transition-colors hover:text-primary"
                onClick={(e) => scrollToSection(e, id)}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="layout-safe flex shrink-0 items-center gap-2 sm:gap-3">
            <Button
              variant="outline"
              className="h-auto min-h-10 border-white/15 bg-white/5 px-3 text-white hover:bg-white/10 sm:px-4"
              onClick={() => window.open(`${process.env.NEXT_PUBLIC_SISTEMA_URL}/auth/login`, '_blank')}
            >
              <LogIn className="h-4 w-4 shrink-0" />
              <span className="hidden whitespace-normal sm:inline">Login</span>
            </Button>
            <SignupMenu
              label="Junte-se a nós"
              className="hidden min-h-10 px-4 text-sm sm:inline-flex"
            />
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        <section id="inicio" className="relative min-h-[calc(100vh-80px)] py-12 md:py-20">
          <div className="absolute inset-0">
            <Image src="/conectando-profissionais.jpeg" alt="" fill className="object-cover opacity-35" priority />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--background))_0%,hsl(var(--background)/0.9)_38%,hsl(var(--background)/0.35)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
          </div>

          <FloatingBees count={3} seed={11} />

          <div className="container relative z-10 grid min-h-[calc(100vh-220px)] min-w-0 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="layout-safe max-w-3xl space-y-8">
              <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4 shrink-0" />
                <span className="text-safe">
                  Clube de negócios para arquitetura, decoração, design e bem-estar
                </span>
              </div>

              <div className="layout-safe space-y-5">
                <h1 className="text-safe max-w-4xl font-serif text-4xl font-medium leading-[1.12] text-balance sm:text-5xl lg:text-6xl">
                  Conexões certas para transformar <em className="italic text-primary">relacionamento</em> em negócio.
                </h1>
                <p className="text-safe max-w-2xl text-lg leading-8 text-white/78">
                  O UP Connection aproxima profissionais, lojistas e marcas em uma comunidade com curadoria, presença e
                  networking estratégico para gerar indicação, visibilidade e oportunidades reais.
                </p>
              </div>

              <div className="layout-safe flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
                <SignupMenu label="Quero fazer parte" className="w-full sm:w-auto" />
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-auto min-h-12 w-full max-w-full whitespace-normal border-white/15 bg-white/5 px-6 py-3 text-center text-base hover:bg-white/10 sm:w-auto"
                >
                  <Link href="#beneficios" onClick={(e) => scrollToSection(e, 'beneficios')}>
                    Ver benefícios
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-3 pt-3 sm:grid-cols-2 lg:grid-cols-3">
                {metrics.map((item) => (
                  <div key={item.label} className="layout-safe min-w-0 border-l border-primary/40 py-1 pl-4">
                    <p className="font-serif text-4xl font-medium text-primary">{item.value}</p>
                    <p className="text-safe mt-1 text-sm leading-5 text-white/70">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative ml-auto aspect-[4/5] max-w-[500px] overflow-hidden rounded-sm shadow-2xl shadow-black/30">
                <Image
                  src="/fundadoras.jpeg"
                  alt="Fundadoras do UP Connection"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-sm font-medium text-primary">Curadoria de relacionamento</p>
                  <p className="mt-2 max-w-sm text-lg font-semibold">
                    Liderado por fundadoras com trajetória real no mercado de alto padrão.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="sobre" className="relative overflow-hidden py-20">
          <FloatingBees count={2} seed={5} />
          <div className="container relative z-10 grid min-w-0 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image src="/equipe-unida-no-trabalho.jpg" alt="Profissionais em reunião" fill className="object-cover" />
            </div>
            <div className="layout-safe space-y-6">
              <SectionLabel>Por que o UP existe</SectionLabel>
              <h2 className="text-safe font-serif text-3xl font-medium leading-tight sm:text-4xl">
                Networking bom não é quantidade. É contexto, confiança e continuidade.
              </h2>
              <p className="text-safe text-lg leading-8 text-muted-foreground">
                Criamos um ambiente para aproximar profissionais que querem ser lembrados, indicados e reconhecidos. No
                UP, cada encontro é pensado para facilitar troca de conhecimento, conexão qualificada e geração de
                negócios entre pessoas que atuam em mercados complementares.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {['Curadoria de participantes', 'Relacionamento com propósito', 'Eventos e ativações presenciais', 'Ecossistema de indicação'].map((item) => (
                  <div key={item} className="layout-safe flex min-w-0 items-start gap-3 text-white/85">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-safe">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-muted/70 py-20">
          <div className="container relative z-10">
            <div className="layout-safe mx-auto mb-12 max-w-3xl text-center">
              <SectionLabel centered>Para quem é</SectionLabel>
              <h2 className="text-safe mt-4 font-serif text-3xl font-medium sm:text-4xl">
                Uma comunidade para quem influencia decisões.
              </h2>
            </div>

            <div className="grid min-w-0 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {audiences.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="layout-safe min-w-0 border-t border-white/20 pt-6">
                    <Icon className={`h-5 w-5 ${item.color}`} />
                    <h3 className="text-safe mt-5 font-serif text-2xl font-medium">{item.title}</h3>
                    <p className="text-safe mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="beneficios" className="relative overflow-hidden py-20">
          <div className="container relative z-10">
            <div className="mb-12 flex min-w-0 flex-col gap-5 md:flex-row md:flex-wrap md:items-end md:justify-between">
              <div className="layout-safe max-w-2xl">
                <SectionLabel>Benefícios</SectionLabel>
                <h2 className="text-safe mt-4 font-serif text-3xl font-medium sm:text-4xl">
                  O que torna o UP mais forte que um grupo comum.
                </h2>
              </div>
              <SignupMenu label="Começar cadastro" className="w-full md:w-auto" />
            </div>

            <div className="grid min-w-0 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="layout-safe min-w-0 border-t border-white/20 pt-6">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="text-safe mt-5 font-serif text-2xl font-medium">{item.title}</h3>
                    <p className="text-safe mt-3 leading-7 text-muted-foreground">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="comunidade" className="relative overflow-hidden bg-muted/70 py-20">
          <div className="container relative z-10 grid min-w-0 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="layout-safe space-y-6">
              <SectionLabel>Como funciona</SectionLabel>
              <h2 className="text-safe font-serif text-3xl font-medium sm:text-4xl">
                Você entra pelo perfil certo e começa a se conectar.
              </h2>
              <p className="text-safe text-lg leading-8 text-muted-foreground">
                O caminho é simples: cadastro, curadoria e participação nas experiências da comunidade. O objetivo é
                fazer você estar nos ambientes certos, com pessoas certas, no momento certo.
              </p>
              <div className="space-y-4">
                {steps.map((item, index) => (
                  <div key={item} className="layout-safe flex min-w-0 items-baseline gap-5 border-b border-white/10 pb-4">
                    <span className="w-9 shrink-0 font-serif text-3xl font-medium leading-none text-primary/70">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-safe font-medium text-white/90">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-4">
                <div className="layout-safe rounded-lg border border-white/10 bg-card/80 p-6">
                  <Zap className="h-5 w-5 text-primary" />
                  <h3 className="text-safe mt-5 font-serif text-2xl font-medium">Mais presença</h3>
                  <p className="text-safe mt-3 text-sm leading-6 text-muted-foreground">
                    Sua marca circula em uma rede que valoriza reputação e indicação.
                  </p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  <Image src="/networking-estrategico.jpg" alt="Evento de networking" fill className="object-cover" />
                </div>
              </div>
              <div className="space-y-4 sm:pt-10">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  <Image src="/parcerias-inteligentes.jpeg" alt="Parcerias profissionais" fill className="object-cover" />
                </div>
                <div className="layout-safe rounded-lg border border-white/10 bg-card/80 p-6">
                  <ShieldCheck className="h-5 w-5 text-teal-300" />
                  <h3 className="text-safe mt-5 font-serif text-2xl font-medium">Mais confiança</h3>
                  <p className="text-safe mt-3 text-sm leading-6 text-muted-foreground">
                    Relacionamentos crescem com recorrência, curadoria e experiências compartilhadas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20">
          <div className="container relative z-10">
            <div className="layout-safe mx-auto mb-12 max-w-3xl text-center">
              <SectionLabel centered>Depoimentos</SectionLabel>
              <h2 className="text-safe mt-4 font-serif text-3xl font-medium sm:text-4xl">
                Quem participa percebe a diferença.
              </h2>
            </div>
            <div className="grid min-w-0 gap-x-8 gap-y-10 md:grid-cols-3">
              {testimonials.map((item) => (
                <figure key={item.name} className="layout-safe min-w-0 border-t border-white/20 pt-6">
                  <span aria-hidden="true" className="block font-serif text-6xl leading-none text-primary/50">
                    “
                  </span>
                  <blockquote className="text-safe mt-2 font-serif text-lg italic leading-8 text-white/85">
                    {item.text}
                  </blockquote>
                  <figcaption className="mt-6">
                    <p className="text-safe font-semibold">{item.name}</p>
                    <p className="text-safe mt-1 text-sm text-muted-foreground">{item.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="fundadoras" className="relative overflow-hidden bg-muted/70 py-20">
          <div className="container relative z-10">
            <div className="layout-safe mx-auto mb-12 max-w-3xl text-center">
              <SectionLabel centered>Fundadoras</SectionLabel>
              <h2 className="text-safe mt-4 font-serif text-3xl font-medium sm:text-4xl">
                Experiência de mercado por trás da comunidade.
              </h2>
              <p className="text-safe mt-4 text-lg leading-8 text-muted-foreground">
                Meire Ferraz e Rosangela Ferraz unem arquitetura, relações públicas e networking para criar conexões de
                valor no mercado de arquitetura, design, decoração e lifestyle.
              </p>
            </div>

            <div className="grid min-w-0 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-sm">
                <Image src="/fundadoras.jpeg" alt="Rosangela e Meire Ferraz" fill className="object-cover object-top" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    name: 'Meire Ferraz',
                    role: 'Co-fundadora & Relações Públicas',
                    text: 'Especialista em relacionamento estratégico, conecta lojistas, profissionais e marcas por meio de ações, visitas e eventos.',
                  },
                  {
                    name: 'Rosangela Ferraz',
                    role: 'Co-fundadora & Arquiteta de Interiores',
                    text: 'Pós-graduada pela FAAP em Design de Interiores, atua integrando criação, relacionamento e estratégia no mercado de alto padrão.',
                  },
                ].map((founder) => (
                  <div key={founder.name} className="layout-safe min-w-0 border-t border-white/20 pt-6">
                    <h3 className="text-safe font-serif text-2xl font-medium">{founder.name}</h3>
                    <p className="text-safe mt-2 text-sm font-medium uppercase tracking-widest text-primary">
                      {founder.role}
                    </p>
                    <p className="text-safe mt-5 leading-7 text-muted-foreground">{founder.text}</p>
                  </div>
                ))}
                <div className="layout-safe border-l-2 border-primary/60 pl-6 md:col-span-2">
                  <p className="text-safe font-serif text-lg italic leading-8 text-white/86">
                    A força do UP está na combinação entre curadoria humana, experiência de mercado e uma comunidade
                    desenhada para transformar contatos em relações de valor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,hsl(var(--primary)/0.22),hsl(var(--secondary)/0.18),hsl(var(--background)))] p-8 md:p-12 lg:p-16">
              <FloatingBees count={2} seed={42} />
              <div className="layout-safe relative z-10 max-w-3xl space-y-6">
                <p className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-primary">
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  <span className="text-safe">Entre para a comunidade</span>
                </p>
                <h2 className="text-safe font-serif text-3xl font-medium leading-tight sm:text-4xl">
                  O próximo contato certo pode mudar o <em className="italic text-primary">ritmo</em> do seu negócio.
                </h2>
                <p className="text-safe text-lg leading-8 text-white/75">
                  Cadastre-se no perfil ideal e comece a participar de uma rede construída para gerar reputação,
                  parcerias e oportunidades.
                </p>
                <SignupMenu label="Escolher meu perfil" className="w-full sm:w-auto" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-card/50 py-12">
        <div className="container grid min-w-0 gap-8 md:grid-cols-3">
          <div className="layout-safe space-y-4">
            <div className="relative h-16 w-24">
              <Image src="/logo-up-completa.svg" alt="UP Connection" fill className="object-contain" />
            </div>
            <p className="text-safe max-w-sm text-sm leading-6 text-muted-foreground">
              Clube de negócios para conexões estratégicas em arquitetura, decoração, design e wellness.
            </p>
          </div>

          <div className="layout-safe space-y-4">
            <h3 className="font-bold">Contato</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="text-safe">upconnection01@gmail.com</li>
              <li className="text-safe">+55 (11) 96454-0818</li>
              <li className="flex flex-wrap items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-safe">São Paulo, SP - Brasil</span>
              </li>
            </ul>
          </div>

          <div className="layout-safe space-y-4">
            <h3 className="font-bold">Redes sociais</h3>
            <p className="text-sm text-muted-foreground">Acompanhe novidades, eventos e conexões da comunidade.</p>
            <a
              href="https://instagram.com/updesigners_e_arquitetos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/15 text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="container mt-8 border-t border-white/10 pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} UP Connection. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
