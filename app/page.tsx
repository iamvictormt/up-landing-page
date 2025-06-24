'use client';

import type React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  CheckCircle,
  Users,
  Lightbulb,
  TrendingUp,
  Linkedin,
  Instagram,
  LogIn,
  PiggyBank,
  ChevronDown,
  Heart,
  Briefcase,
  Handshake,
  CirclePlus,
} from 'lucide-react';
import { Carousel } from '@/components/carousel';
import { PlansModal } from '@/components/plans-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function LandingPage() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSignup = (e: React.MouseEvent, userType: string) => {
    e.preventDefault();
    e.stopPropagation();

    const signupUrls = {
      loveDecoration: `${process.env.NEXT_PUBLIC_SISTEMA_URL}/auth/register?type=loveDecoration`,
      professional: `${process.env.NEXT_PUBLIC_SISTEMA_URL}/auth/register?type=professional`,
      partnerSupplier: `${process.env.NEXT_PUBLIC_SISTEMA_URL}/auth/register?type=partnerSupplier`,
    };

    window.open(signupUrls[userType as keyof typeof signupUrls], '_blank');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* <ThemeToggle /> */}
      <header className="sticky top-0 z-40 border-b header-gradient">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="relative w-16 h-16">
              <Image src="/logo-up-completa.svg" alt="UP Club Logo" fill className="object-contain" priority />
            </div>
          </div>

          <nav className="hidden md:flex gap-6">
            <Link
              href="#sobre"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={(e) => scrollToSection(e, 'sobre')}
            >
              Sobre
            </Link>
            <Link
              href="#valores"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={(e) => scrollToSection(e, 'valores')}
            >
              Valores
            </Link>
            <Link
              href="#beneficios"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={(e) => scrollToSection(e, 'beneficios')}
            >
              Benefícios
            </Link>
            <Link
              href="#depoimentos"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={(e) => scrollToSection(e, 'depoimentos')}
            >
              Depoimentos
            </Link>
            <Link
              href="#fundadoras"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={(e) => scrollToSection(e, 'fundadoras')}
            >
              Fundadoras
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-primary/30 bg-secondary/10 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
              onClick={() => {
                window.open(`${process.env.NEXT_PUBLIC_SISTEMA_URL}/auth/login`, '_blank');
                window.close();
              }}
            >
              <LogIn />
              Login
            </Button>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button className="w-full sm:w-auto transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
                  Junte-se a nós
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56" sideOffset={5} avoidCollisions={true}>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    handleSignup(e, 'loveDecoration');
                  }}
                  className="cursor-pointer py-3 px-4 hover:bg-primary/10 transition-colors"
                >
                  <Heart className="w-4 h-4 mr-3 text-pink-500" />
                  <div className="flex flex-col">
                    <span className="font-medium">Eu amo decoração</span>
                    <span className="text-xs text-muted-foreground">Para entusiastas</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    handleSignup(e, 'professional');
                  }}
                  className="cursor-pointer py-3 px-4 hover:bg-primary/10 transition-colors"
                >
                  <Briefcase className="w-4 h-4 mr-3 text-blue-500" />
                  <div className="flex flex-col">
                    <span className="font-medium">Profissionais</span>
                    <span className="text-xs text-muted-foreground">Arquitetos e designers</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    handleSignup(e, 'partnerSupplier');
                  }}
                  className="cursor-pointer py-3 px-4 hover:bg-primary/10 transition-colors"
                >
                  <Handshake className="w-4 h-4 mr-3 text-green-500" />
                  <div className="flex flex-col">
                    <span className="font-medium">Fornecedor parceiro</span>
                    <span className="text-xs text-muted-foreground">Empresas e lojas</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <Carousel />
          <div className="container pb-12 pt-4">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto sm:mx-0">
              {/* <Button
                size="lg"
                className="w-full sm:w-auto transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
              >
                Junte-se ao clube
              </Button> */}
              <Link
                href="#fundadoras"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={(e) => scrollToSection(e, 'sobre')}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-primary/30 bg-secondary/10 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                >
                  Saiba mais
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="sobre" className="py-20 bg-muted">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/equipe-unida-no-trabalho.jpg"
                  alt="Reunião de profissionais"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <div className="inline-block rounded-full bg-primary/20 px-3 py-1 text-sm text-primary font-medium">
                  Sobre o UP
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Uma comunidade forte e inspiradora</h2>
                <p className="text-muted-foreground text-lg">
                  O UP Connection nasceu da necessidade de criar um ambiente colaborativo e acolhedor, onde
                  profissionais dos setores criativo e técnico pudessem se encontrar de forma autêntica, trocar
                  experiências valiosas, compartilhar conhecimentos e desenvolver parcerias estratégicas que realmente
                  façam a diferença.
                </p>
                <p className="text-muted-foreground text-lg">
                  Nosso propósito é fomentar conexões genuínas e duradouras, que transcendam o networking tradicional e
                  resultem em crescimento profissional sólido, fortalecimento da comunidade e no surgimento constante de
                  novas oportunidades de negócio para todos os membros envolvidos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section id="valores" className="py-20">
          <div className="container">
            <div className="text-center max-w-[800px] mx-auto mb-16 space-y-4">
              <div className="inline-block rounded-full bg-primary/20 px-3 py-1 text-sm text-primary font-medium">
                Valores que nos definem
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Nossos Valores</h2>
              <p className="text-muted-foreground text-lg">
                Construímos nossa comunidade com base em princípios sólidos que guiam todas as nossas ações e
                iniciativas.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-card/80 backdrop-blur">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Conexão</h3>
                  <p className="text-muted-foreground">
                    Acreditamos no poder das conexões genuínas entre profissionais que compartilham valores e objetivos.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Colaboração</h3>
                  <p className="text-muted-foreground">
                    Promovemos um ambiente onde a troca de conhecimentos e a colaboração são incentivadas e valorizadas.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Crescimento</h3>
                  <p className="text-muted-foreground">
                    Buscamos constantemente o desenvolvimento profissional e pessoal de todos os nossos membros.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="beneficios" className="py-20 bg-muted">
          <div className="container ">
            <div className="text-center max-w-[800px] mx-auto mb-16 space-y-4">
              <div className="inline-block rounded-full bg-primary/20 px-3 py-1 text-sm text-primary font-medium">
                Ser membro é ter mais
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Benefícios para Membros</h2>
              <p className="text-muted-foreground text-lg">
                Fazer parte do UP Connection significa ter acesso a uma série de vantagens exclusivas.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="">
                <div className="flex gap-4 h-[120px]">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold">Networking Estratégico</h3>
                    <p className="text-muted-foreground">
                      Encontros regulares com profissionais qualificados do setor criativo e técnico.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 h-[120px]">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold">Eventos Exclusivos</h3>
                    <p className="text-muted-foreground">
                      Acesso a workshops, palestras e eventos de capacitação com especialistas renomados.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 h-[120px]">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold">Parcerias Estratégicas</h3>
                    <p className="text-muted-foreground">
                      Oportunidades de colaboração em projetos e indicações de negócios entre membros.
                    </p>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="flex gap-4 h-[120px]">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold">Visibilidade Profissional</h3>
                    <p className="text-muted-foreground">
                      Divulgação do seu trabalho e expertise para uma rede qualificada de contatos.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 h-[120px]">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold">Mentoria e Desenvolvimento</h3>
                    <p className="text-muted-foreground">
                      Acesso a programas de mentoria com profissionais experientes do mercado.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 h-[120px]">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold">Comunidade Ativa</h3>
                    <p className="text-muted-foreground">
                      Participação em um grupo exclusivo de troca de experiências e conhecimentos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="depoimentos" className="py-20">
          <div className="container">
            <div className="text-center max-w-[800px] mx-auto mb-16 space-y-4">
              <div className="inline-block rounded-full bg-primary/20 px-3 py-1 text-sm text-primary font-medium">
                Depoimentos de quem vive a experiência
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">O que dizem nossos membros</h2>
              <p className="text-muted-foreground text-lg">
                Conheça as experiências de quem já faz parte da nossa comunidade e descubra como o UP Connection tem
                contribuído para impulsionar conexões, aprendizados e novas oportunidades.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <p className="italic text-muted-foreground">
                    "Desde que me tornei membro do UP, minha rede de contatos se expandiu significativamente e já fechei
                    parcerias importantes para meu escritório de arquitetura."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-muted">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Foto de perfil"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold">Ana Oliveira</p>
                      <p className="text-sm text-muted-foreground">Arquiteta</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <p className="italic text-muted-foreground">
                    "O ambiente colaborativo do clube me permitiu encontrar parceiros ideais para projetos complexos,
                    além de me proporcionar aprendizados valiosos com outros profissionais."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-muted">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Foto de perfil"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold">Carlos Mendes</p>
                      <p className="text-sm text-muted-foreground">Engenheiro Civil</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <p className="italic text-muted-foreground">
                    "As conexões que fiz no UP transformaram minha carreira. Os eventos exclusivos e as oportunidades de
                    networking são incomparáveis."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-muted">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Foto de perfil"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold">Mariana Costa</p>
                      <p className="text-sm text-muted-foreground">Designer de Interiores</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Fundadoras Section */}
        <section id="fundadoras" className="py-20 bg-muted">
          <div className="container">
            <div className="text-center max-w-[800px] mx-auto mb-16 space-y-4">
              <div className="inline-block rounded-full bg-primary/20 px-3 py-1 text-sm text-primary font-medium">
                Nossas Fundadoras
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Conheça quem está por trás do UP Club</h2>
              <p className="text-muted-foreground text-lg">
                Duas arquitetas de interiores que uniram suas experiências e visões para criar uma comunidade única de
                profissionais.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Rosangela Ferraz */}
              <Card className="overflow-hidden flex flex-col h-full">
                <div className="relative h-[300px] w-full">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Rosangela Ferraz - Fundadora do UP Club"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold">Rosangela Ferraz</h3>
                    <p className="text-primary font-medium">Co-fundadora & Arquiteta de Interiores</p>
                  </div>
                  <p className="text-muted-foreground flex-1">
                    Rosangela Ferraz combina criatividade e visão de negócios em sua abordagem para a arquitetura de
                    interiores. Formada pela Mackenzie com especialização em design corporativo, ela acumula experiência
                    em grandes escritórios antes de fundar seu próprio estúdio. Sua paixão por networking e
                    desenvolvimento profissional foi a semente que deu origem ao UP Club.
                  </p>
                  <div className="flex gap-3 mt-4">
                    <Button variant="outline" size="icon" className="rounded-full bg-primary/10">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn de Rosangela Ferraz</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full bg-primary/10">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram de Rosangela Ferraz</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Meire Ferraz */}
              <Card className="overflow-hidden flex flex-col h-full">
                <div className="relative h-[300px] w-full">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Meire Ferraz - Fundadora do UP Club"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold">Meire Ferraz</h3>
                    <p className="text-primary font-medium">Co-fundadora & Arquiteta de Interiores</p>
                  </div>
                  <p className="text-muted-foreground flex-1">
                    Com mais de 15 anos de experiência em projetos residenciais e comerciais, Meire Ferraz traz sua
                    visão estratégica e paixão por conexões genuínas para o UP Club. Formada pela Universidade de São
                    Paulo, especializou-se em design de interiores sustentáveis e já liderou mais de 200 projetos em sua
                    carreira.
                  </p>
                  <div className="flex gap-3 mt-4">
                    <Button variant="outline" size="icon" className="rounded-full bg-primary/10">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn de Meire Ferraz</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full bg-primary/10">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram de Meire Ferraz</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg max-w-[800px] mx-auto text-muted-foreground">
                Juntas, Meire Ferraz e Rosangela Ferraz combinam mais de 25 anos de experiência no setor de arquitetura
                e design de interiores. Elas fundaram o UP Club com a missão de criar um espaço onde profissionais
                possam crescer juntos, compartilhar conhecimentos e desenvolver parcerias estratégicas que beneficiem a
                todos.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 container">
          <div className="rounded-xl bg-muted p-8 md:p-12 lg:p-16 text-center max-w-[900px] mx-auto space-y-6 shadow-lg">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Pronto para impulsionar sua carreira?</h2>
            <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
              Junte-se ao UP - Club de Negócios e faça parte de uma comunidade que valoriza conexão, colaboração e
              crescimento profissional.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-card/50">
        <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <h3 className="font-bold">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#sobre"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => scrollToSection(e, 'sobre')}
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="#valores"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => scrollToSection(e, 'valores')}
                >
                  Valores
                </Link>
              </li>
              <li>
                <Link
                  href="#beneficios"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => scrollToSection(e, 'beneficios')}
                >
                  Benefícios
                </Link>
              </li>
              <li>
                <Link
                  href="#depoimentos"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => scrollToSection(e, 'depoimentos')}
                >
                  Depoimentos
                </Link>
              </li>
              <li>
                <Link
                  href="#fundadoras"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => scrollToSection(e, 'fundadoras')}
                >
                  Fundadoras
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold">Contato</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">upconnection01@gmail.com</li>
              <li className="text-muted-foreground">+55 (11) 96454-0818</li>
              <li className="text-muted-foreground">São Paulo, SP - Brasil</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold">Redes Sociais</h3>
            <p className="text-muted-foreground">Siga-nos e fique por dentro de todas as novidades!</p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/upconnection"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10
               text-white hover:shadow-lg transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="container mt-8 pt-8 border-t border-border/50">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} UP Connection. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
