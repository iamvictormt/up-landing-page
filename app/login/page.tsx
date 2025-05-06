'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Lock,
  User,
  AlertCircle,
  ArrowLeft,
  Mail,
  UserPlus,
  Briefcase,
  LogIn,
  Building2,
  Phone,
  CreditCard,
  WholeWord,
  Pin,
  IdCard,
  Fingerprint,
  Building,
  Ticket,
  Tickets,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { toast } from 'sonner';
import { applyDocumentMask, applyPhoneMask, applyRgMask } from '@/utils/masks';

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('login');
  const [registerType, setRegisterType] = useState<'professional' | 'shopkeeper'>('professional');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [loginData, setLoginData] = useState({
    email: '',
    senha: '',
  });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const [professionalData, setProfessionalData] = useState({
    name: '',
    officeName: '',
    generalRegister: '',
    registrationAgency: '',
    address: '',
    email: '',
    document: '',
    password: '',
    confirmPassword: '',
    phone: '',
    profession: '',
  });

  const [shopkeeperData, setShopkeeperData] = useState({
    name: '',
    email: '',
    document: '',
    password: '',
    confirmPassword: '',
    phone: '',
    segment: '',
  });

  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    if (loginError) setLoginError(null);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);
    setLoginError(null);

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.senha,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) toast.error(errorData.message || 'Email ou senha inválidos');
        if (response.status === 403) toast.info(errorData.message);
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);

      toast.success('Login realizado com sucesso!');
      router.push('/');
    } catch (error: any) {
      console.error('Erro no login:', error);
      toast.error('Erro de indisponibilidade, contate o administrador.');
    } finally {
      setIsLoginLoading(false);
    }
  };

  // Professional Register handlers
  const handleProfessionalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      setProfessionalData((prev) => ({ ...prev, [name]: applyPhoneMask(value) }));
    } else if (name === 'generalRegister') {
      setProfessionalData((prev) => ({ ...prev, [name]: applyRgMask(value) }));
    } else if (name === 'document') {
      setProfessionalData((prev) => ({ ...prev, [name]: applyDocumentMask(value) }));
    } else {
      setProfessionalData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleProfessionalSelectChange = (value: string) => {
    setProfessionalData((prev) => ({ ...prev, profession: value }));
  };

  // Shopkeeper Register handlers
  const handleShopkeeperChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      setShopkeeperData((prev) => ({ ...prev, [name]: applyPhoneMask(value) }));
    } else if (name === 'document') {
      setShopkeeperData((prev) => ({ ...prev, [name]: applyDocumentMask(value) }));
    } else {
      setShopkeeperData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleShopkeeperSelectChange = (value: string) => {
    setShopkeeperData((prev) => ({ ...prev, segment: value }));
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegisterLoading(true);

    const data = registerType === 'professional' ? professionalData : shopkeeperData;
    if (data.password !== data.confirmPassword) {
      toast.error('As senhas não coincidem.');
      setIsRegisterLoading(false);
      return;
    }

    const isProfessional = registerType === 'professional';
    const url = `http://localhost:8080/api/${isProfessional ? 'professional' : 'shopkeeper'}`;

    // Preparar o payload conforme o tipo de registro
    const payload: any = {
      user: { email: data.email, password: data.password },
    };

    if (isProfessional) {
      payload.professional = {
        name: data.name,
        document: data.document,
        phone: data.phone,
        profession: data.profession, // Usando 'profession' para 'merchant'
      };
    } else {
      payload.shopkeeper = {
        name: data.name,
        document: data.document,
        phone: data.phone,
        segment: data.segment, // Usando 'segment' para 'shopkeeper'
      };
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Erro no cadastro.');

      toast.success('Cadastro realizado com sucesso! Redirecionando para o login...');
      setRegisterSuccess(true);
      setTimeout(() => {
        setActiveTab('login');
        setRegisterSuccess(false);
        setLoginData((prev) => ({ ...prev, email: data.email }));
      }, 2000);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsRegisterLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10 bg-background">
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="container py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar para o site</span>
          </Link>
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">UP</span>
            <span className="text-foreground">Connection</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container flex items-center justify-center py-8 ">
        <div
          className={cn(
            'flex w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl border border-border/50',
            isMobile ? 'flex-col' : 'flex-row h-[600px]'
          )}
        >
          {/* Sidebar with tabs */}
          <div
            className={cn(
              'bg-gradient-to-b from-primary/20 to-secondary/20 backdrop-blur-sm',
              isMobile ? 'w-full p-4' : 'w-1/3 p-8'
            )}
          >
            <h2 className={cn('text-2xl font-bold mb-6 text-center mt-24', isMobile ? 'hidden' : 'block')}>
              Bem-vindo ao UP Connection
            </h2>

            <div className={cn('space-y-4', isMobile ? 'flex space-y-0 gap-4' : 'block')}>
              <button
                onClick={() => setActiveTab('login')}
                className={cn(
                  'w-full group flex items-center gap-3 p-4 rounded-lg transition-all duration-300',
                  activeTab === 'login'
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-card/30 text-foreground hover:bg-card/50',
                  isMobile ? 'justify-center flex-1' : ''
                )}
              >
                <div
                  className={cn(
                    'flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300',
                    activeTab === 'login' ? 'bg-primary-foreground/20' : 'bg-primary/20 group-hover:bg-primary/30'
                  )}
                >
                  <LogIn
                    className={cn(
                      'h-5 w-5 transition-all duration-300',
                      activeTab === 'login' ? 'text-primary-foreground' : 'text-primary'
                    )}
                  />
                </div>
                <div className={isMobile ? 'hidden' : 'block'}>
                  <p className="font-medium text-lg">Login</p>
                  <p
                    className={cn(
                      'text-xs',
                      activeTab === 'login' ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    )}
                  >
                    Acesse sua conta
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('register')}
                className={cn(
                  'w-full group flex items-center gap-3 p-4 rounded-lg transition-all duration-300',
                  activeTab === 'register'
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-card/30 text-foreground hover:bg-card/50',
                  isMobile ? 'justify-center flex-1' : ''
                )}
              >
                <div
                  className={cn(
                    'flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300',
                    activeTab === 'register' ? 'bg-primary-foreground/20' : 'bg-primary/20 group-hover:bg-primary/30'
                  )}
                >
                  <UserPlus
                    className={cn(
                      'h-5 w-5 transition-all duration-300',
                      activeTab === 'register' ? 'text-primary-foreground' : 'text-primary'
                    )}
                  />
                </div>
                <div className={isMobile ? 'hidden' : 'block'}>
                  <p className="font-medium text-lg">Cadastro</p>
                  <p
                    className={cn(
                      'text-xs',
                      activeTab === 'register' ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    )}
                  >
                    Crie sua conta
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Content area */}
          <div className={cn('bg-card/50 backdrop-blur-sm', isMobile ? 'w-full p-6' : 'w-2/3 p-8')}>
            <div className="h-full flex flex-col">
              {/* Login Form */}
              {activeTab === 'login' && (
                <div className="flex-1">
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold mb-2">Acesse sua conta</h1>
                    <p className="text-muted-foreground">Entre com suas credenciais para acessar</p>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-6">
                    {loginError && (
                      <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{loginError}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email
                        </Label>
                        <div className="relative">
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                            className="pl-10 bg-card/50 border-border/50 focus:border-primary"
                            placeholder="seu@email.com"
                            required
                          />
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="senha" className="text-sm font-medium">
                            Senha
                          </Label>
                          <Button variant="link" className="h-auto p-0 text-xs" type="button">
                            Esqueceu a senha?
                          </Button>
                        </div>
                        <div className="relative">
                          <Input
                            id="senha"
                            name="senha"
                            type="password"
                            value={loginData.senha}
                            onChange={handleLoginChange}
                            className="pl-10 bg-card/50 border-border/50 focus:border-primary"
                            required
                          />
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                      disabled={isLoginLoading}
                    >
                      {isLoginLoading ? 'Entrando...' : 'Entrar'}
                    </Button>

                    <div className="text-center text-sm">
                      <span className="text-muted-foreground">Não tem uma conta?</span>{' '}
                      <Button variant="link" className="p-0 h-auto" onClick={() => setActiveTab('register')}>
                        Cadastre-se
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Register Form */}
              {activeTab === 'register' && (
                <div className="flex-1 overflow-auto pr-5 pl-1">
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold mb-2">Crie sua conta</h1>
                    <p className="text-muted-foreground">Escolha o tipo de cadastro</p>
                  </div>

                  {/* Register Type Selector */}
                  <div className="flex gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setRegisterType('professional')}
                      className={cn(
                        'flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border transition-all duration-300',
                        registerType === 'professional'
                          ? 'bg-primary/20 border-primary shadow-md'
                          : 'bg-card/30 border-border/50 hover:bg-card/50'
                      )}
                    >
                      <div
                        className={cn(
                          'flex items-center justify-center h-12 w-12 rounded-full',
                          registerType === 'professional' ? 'bg-primary/30' : 'bg-primary/10'
                        )}
                      >
                        <User
                          className={cn(
                            'h-6 w-6',
                            registerType === 'professional' ? 'text-primary-foreground' : 'text-primary'
                          )}
                        />
                      </div>
                      <div className="text-center">
                        <p className="font-medium">Profissional</p>
                        <p className="text-xs text-muted-foreground"></p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRegisterType('shopkeeper')}
                      className={cn(
                        'flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border transition-all duration-300',
                        registerType === 'shopkeeper'
                          ? 'bg-primary/20 border-primary shadow-md'
                          : 'bg-card/30 border-border/50 hover:bg-card/50'
                      )}
                    >
                      <div
                        className={cn(
                          'flex items-center justify-center h-12 w-12 rounded-full',
                          registerType === 'shopkeeper' ? 'bg-primary/30' : 'bg-primary/10'
                        )}
                      >
                        <Building2
                          className={cn(
                            'h-6 w-6',
                            registerType === 'shopkeeper' ? 'text-primary-foreground' : 'text-primary'
                          )}
                        />
                      </div>
                      <div className="text-center">
                        <p className="font-medium">Fornecedor Parceiro</p>
                        <p className="text-xs text-muted-foreground"></p>
                      </div>
                    </button>
                  </div>

                  {/* Professional Registration Form */}
                  {registerType === 'professional' && (
                    <form onSubmit={handleRegisterSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium">
                            Nome completo
                          </Label>
                          <div className="relative">
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              value={professionalData.name}
                              onChange={handleProfessionalChange}
                              className="pl-10 bg-card/50 border-border/50 focus:border-primary"
                              placeholder="Seu nome completo"
                              required
                              disabled={registerSuccess}
                            />
                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="office-name" className="text-sm font-medium">
                            Nome do escritório
                          </Label>
                          <div className="relative">
                            <Input
                              id="office-name"
                              name="officeName"
                              type="text"
                              value={professionalData.officeName}
                              onChange={handleProfessionalChange}
                              className="pl-10 bg-card/50 border-border/50 focus:border-primary"
                              placeholder="Nome do seu escritório"
                              required
                              disabled={registerSuccess}
                            />
                            <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="profession" className="text-sm font-medium">
                              Profissão
                            </Label>
                            <div className="relative">
                              <Select
                                value={professionalData.profession}
                                onValueChange={handleProfessionalSelectChange}
                                disabled={registerSuccess}
                              >
                                <SelectTrigger className="pl-10 bg-card/50 border-border/50 focus:border-primary">
                                  <SelectValue placeholder="Selecione sua profissão" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Arquiteto(a)">Arquiteto(a)</SelectItem>
                                  <SelectItem value="Designer de Interiores">Designer de Interiores</SelectItem>
                                  <SelectItem value="Engenheiro(a)">Engenheiro(a)</SelectItem>
                                  <SelectItem value="Paisagista">Paisagista</SelectItem>
                                  <SelectItem value="Outro">Outro</SelectItem>
                                </SelectContent>
                              </Select>
                              <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="document" className="text-sm font-medium">
                              CPF/CNPJ
                            </Label>
                            <div className="relative">
                              <Input
                                id="document"
                                name="document"
                                type="text"
                                value={professionalData.document}
                                onChange={handleProfessionalChange}
                                onBlur={(e) => {
                                  e.target.value.length !== 14 && e.target.value.length !== 18
                                    ? setProfessionalData((prev) => ({ ...prev, document: '' }))
                                    : '';
                                }}
                                className="pl-10 bg-card/50 border-border/50 focus:border-primary"
                                required
                                disabled={registerSuccess}
                                placeholder={'CPF ou CNPJ'}
                              />
                              <Fingerprint className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="general-register" className="text-sm font-medium">
                              RG
                            </Label>
                            <div className="relative">
                              <Input
                                id="general-register"
                                name="generalRegister"
                                type="text"
                                value={professionalData.generalRegister}
                                onChange={handleProfessionalChange}
                                onBlur={(e) => {
                                  e.target.value.length !== 12
                                    ? setProfessionalData((prev) => ({ ...prev, generalRegister: '' }))
                                    : '';
                                }}
                                className="pl-10 bg-card/50 border-border/50 focus:border-primary"
                                placeholder="00.000.000-0"
                                required
                                disabled={registerSuccess}
                              />
                              <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="registration-agency" className="text-sm font-medium">
                              CREA/CAU/ABD
                            </Label>
                            <div className="relative">
                              <Input
                                id="registration-agency"
                                name="registrationAgency"
                                type="text"
                                value={professionalData.registrationAgency}
                                onChange={handleProfessionalChange}
                                className="pl-10 bg-card/50 border-border/50 focus:border-primary"
                                placeholder="CREA/CAU/ABD"
                                required
                                maxLength={20}
                                pattern="[A-Za-z0-9\-\/]+"
                                disabled={registerSuccess}
                              />
                              <Tickets className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address" className="text-sm font-medium">
                            Endereço
                          </Label>
                          <div className="relative">
                            <Input
                              id="address"
                              name="address"
                              type="text"
                              value={professionalData.address}
                              onChange={handleProfessionalChange}
                              className="pl-10 bg-card/50 border-border/50 focus:border-primary"
                              placeholder="Av. Rio de janeiro, Quadra 3 A, Lote 1"
                              required
                              disabled={registerSuccess}
                            />
                            <Pin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-medium">
                            Whatsapp
                          </Label>
                          <div className="relative">
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={professionalData.phone}
                              onChange={handleProfessionalChange}
                              onBlur={(e) => {
                                e.target.value.length !== 15
                                  ? setProfessionalData((prev) => ({ ...prev, phone: '' }))
                                  : '';
                              }}
                              className="pl-10 bg-card/50 border-border/50 focus:border-primary"
                              placeholder="(00) 00000-0000"
                              required
                              disabled={registerSuccess}
                            />
                            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="professional-email" className="text-sm font-medium">
                            Email
                          </Label>
                          <div className="relative">
                            <Input
                              id="professional-email"
                              name="email"
                              type="email"
                              value={professionalData.email}
                              onChange={handleProfessionalChange}
                              className="pl-10 bg-card/50 border-border/50 focus:border-primary"
                              placeholder="seu@email.com"
                              required
                              maxLength={55}
                              disabled={registerSuccess}
                            />
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">
                              Senha
                            </Label>
                            <div className="relative">
                              <Input
                                id="password"
                                name="password"
                                type="password"
                                value={professionalData.password}
                                onChange={handleProfessionalChange}
                                className="pl-10 bg-card/50 border-border/50 focus:border-primary"
                                required
                                maxLength={22}
                                disabled={registerSuccess}
                              />
                              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium">
                              Confirmar Senha
                            </Label>
                            <div className="relative">
                              <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={professionalData.confirmPassword}
                                onChange={handleProfessionalChange}
                                className="pl-10 bg-card/50 border-border/50 focus:border-primary"
                                required
                                maxLength={22}
                                disabled={registerSuccess}
                              />
                              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            </div>{' '}
                          </div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                        disabled={isRegisterLoading || registerSuccess}
                      >
                        {isRegisterLoading ? 'Cadastrando...' : 'Cadastrar como Profissional'}
                      </Button>
                    </form>
                  )}

                  {/* Shopkeeper Registration Form */}
                  {registerType === 'shopkeeper' && (
                    <form onSubmit={handleRegisterSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium">
                            Nome Fantasia
                          </Label>
                          <div className="relative">
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              value={shopkeeperData.name}
                              onChange={handleShopkeeperChange}
                              className="pl-10 bg-card/50 border-border/50 focus:border-primary"
                              placeholder="Nome"
                              required
                              disabled={registerSuccess}
                            />
                            <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="document" className="text-sm font-medium">
                            CNPJ
                          </Label>
                          <div className="relative">
                            <Input
                              id="document"
                              name="document"
                              type="text"
                              value={shopkeeperData.document}
                              onChange={handleShopkeeperChange}
                              className="pl-10 bg-card/50 border-border/50 focus:border-primary"
                              placeholder="00.000.000/0000-00"
                              required
                              disabled={registerSuccess}
                            />
                            <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="segmento" className="text-sm font-medium">
                            Segmento
                          </Label>
                          <div className="relative">
                            <Select
                              value={shopkeeperData.segment}
                              onValueChange={handleShopkeeperSelectChange}
                              disabled={registerSuccess}
                            >
                              <SelectTrigger className="pl-10 bg-card/50 border-border/50 focus:border-primary">
                                <SelectValue placeholder="Selecione o segmento" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Escritório de Arquitetura">Escritório de Arquitetura</SelectItem>
                                <SelectItem value="Design de Interiores">Design de Interiores</SelectItem>
                                <SelectItem value="Construção Civil">Construção Civil</SelectItem>
                                <SelectItem value="Móveis e Decoração">Móveis e Decoração</SelectItem>
                                <SelectItem value="Paisagismo">Paisagismo</SelectItem>
                                <SelectItem value="Outro">Outro</SelectItem>
                              </SelectContent>
                            </Select>
                            <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="shopkeeper-email" className="text-sm font-medium">
                            Email
                          </Label>
                          <div className="relative">
                            <Input
                              id="shopkeeper-email"
                              name="email"
                              type="email"
                              value={shopkeeperData.email}
                              onChange={handleShopkeeperChange}
                              className="pl-10 bg-card/50 border-border/50 focus:border-primary"
                              placeholder="contato@teste.com.br"
                              required
                              disabled={registerSuccess}
                            />
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-medium">
                            Telefone
                          </Label>
                          <div className="relative">
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={shopkeeperData.phone}
                              onChange={handleShopkeeperChange}
                              className="pl-10 bg-card/50 border-border/50 focus:border-primary"
                              placeholder="(00) 00000-0000"
                              required
                              disabled={registerSuccess}
                            />
                            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-sm font-medium">
                            Senha
                          </Label>
                          <div className="relative">
                            <Input
                              id="password"
                              name="password"
                              type="password"
                              value={shopkeeperData.password}
                              onChange={handleShopkeeperChange}
                              className="pl-10 bg-card/50 border-border/50 focus:border-primary"
                              required
                              disabled={registerSuccess}
                            />
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword" className="text-sm font-medium">
                            Confirmar Senha
                          </Label>
                          <div className="relative">
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              value={shopkeeperData.confirmPassword}
                              onChange={handleShopkeeperChange}
                              className="pl-10 bg-card/50 border-border/50 focus:border-primary"
                              required
                              disabled={registerSuccess}
                            />
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                        disabled={isRegisterLoading || registerSuccess}
                      >
                        {isRegisterLoading ? 'Cadastrando...' : 'Cadastrar como Lojista'}
                      </Button>
                    </form>
                  )}

                  <div className="text-center text-sm mt-6">
                    <span className="text-muted-foreground">Já tem uma conta?</span>{' '}
                    <Button variant="link" className="p-0 h-auto" onClick={() => setActiveTab('login')}>
                      Faça login
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground">
                  © {new Date().getFullYear()} UP Connection. Todos os direitos reservados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
