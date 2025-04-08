'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Users, Lightbulb, TrendingUp, ArrowRight, UserCircle } from 'lucide-react';
import { CadastroModal } from '@/components/cadastro-modal';
import { LoginModal } from '@/components/login-modal';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    toast.success('Bem-vindo de volta ao UP Club.');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Image src="/logo-up.png" alt="Foto de perfil" width={42} height={42} className="object-cover" />
            <span className="hidden sm:inline">- Club de Negócios</span>
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
          </nav>
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <UserCircle className="h-4 w-4" />
                    Meu Perfil
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                  <DropdownMenuItem>Configurações</DropdownMenuItem>
                  <DropdownMenuItem>Meus Eventos</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <LoginModal trigger={<Button variant="outline">Login</Button>} onLoginSuccess={handleLoginSuccess} />
                <CadastroModal trigger={<Button>Associe-se</Button>} />
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted py-20 md:py-32">
          <div className="container relative z-10 grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Conectando <span className="text-primary">profissionais</span>, impulsionando{' '}
                <span className="text-primary">negócios</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-[600px]">
                Um clube exclusivo que une profissionais de interiores, arquitetos, paisagistas e engenheiros para
                colaboração e crescimento mútuo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isLoggedIn ? (
                  <Button size="lg">
                    Ver eventos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <CadastroModal
                    trigger={
                      <Button size="lg">
                        Junte-se ao clube
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    }
                  />
                )}
                <Button size="lg" variant="outline">
                  Saiba mais
                </Button>
              </div>
            </div>
            <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden">
              <Image
                src="/designers.png"
                alt="Designers"
                fill
                quality={100}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="sobre" className="py-20 container">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
              <Image
                src="/comunidade.jpeg"
                alt="Somos up"
                fill
                quality={100}
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-6">
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Sobre o UP</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Uma comunidade forte e inspiradora</h2>
              <p className="text-muted-foreground text-lg">
                O UP - Club de Negócios nasceu da necessidade de criar um ambiente onde profissionais do setor criativo
                e técnico pudessem se encontrar, trocar experiências e desenvolver parcerias estratégicas.
              </p>
              <p className="text-muted-foreground text-lg">
                Nosso propósito é fomentar conexões genuínas que resultem em crescimento profissional e novas
                oportunidades de negócio para todos os membros.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section id="valores" className="py-20 bg-muted">
          <div className="container">
            <div className="text-center max-w-[800px] mx-auto mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Nossos Valores</h2>
              <p className="text-muted-foreground text-lg">
                Construímos nossa comunidade com base em princípios sólidos que guiam todas as nossas ações e
                iniciativas.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-background/60 backdrop-blur">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Conexão</h3>
                  <p className="text-muted-foreground">
                    Acreditamos no poder das conexões genuínas entre profissionais que compartilham valores e objetivos.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/60 backdrop-blur">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Colaboração</h3>
                  <p className="text-muted-foreground">
                    Promovemos um ambiente onde a troca de conhecimentos e a colaboração são incentivadas e valorizadas.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/60 backdrop-blur">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
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
        <section id="beneficios" className="py-20 container">
          <div className="text-center max-w-[800px] mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Benefícios para Membros</h2>
            <p className="text-muted-foreground text-lg">
              Fazer parte do UP - Club de Negócios significa ter acesso a uma série de vantagens exclusivas.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-8">
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

            <div className="space-y-8">
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
        </section>

        {/* Testimonials Section */}
        <section id="depoimentos" className="py-20 bg-muted">
          <div className="container">
            <div className="text-center max-w-[800px] mx-auto mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">O que dizem nossos membros</h2>
              <p className="text-muted-foreground text-lg">
                Conheça as experiências de quem já faz parte da nossa comunidade.
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

        {/* CTA Section */}
        <section className="py-20 container">
          <div className="rounded-xl bg-primary/10 p-8 md:p-12 lg:p-16 text-center max-w-[900px] mx-auto space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Pronto para impulsionar sua carreira?</h2>
            <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
              Junte-se ao UP - Club de Negócios e faça parte de uma comunidade que valoriza conexão, colaboração e
              crescimento profissional.
            </p>
            {isLoggedIn ? (
              <Button size="lg" className="px-8">
                Ver próximos eventos
              </Button>
            ) : (
              <CadastroModal
                trigger={
                  <Button size="lg" className="px-8">
                    Associe-se agora
                  </Button>
                }
              />
            )}
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/40">
        <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="font-bold text-xl">
              <span className="text-primary">UP</span> - Club de Negócios
            </div>
            <p className="text-muted-foreground">Conectando profissionais.</p>
          </div>

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
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold">Contato</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">contato@upclubdenegocios.com.br</li>
              <li className="text-muted-foreground">+55 (11) 99999-9999</li>
              <li className="text-muted-foreground">São Paulo, SP - Brasil</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold">Inscreva-se</h3>
            <p className="text-muted-foreground">Receba novidades e informações sobre nossos eventos.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button type="submit" variant="outline">
                Enviar
              </Button>
            </div>
          </div>
        </div>

        <div className="container mt-8 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} UP - Club de Negócios. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
