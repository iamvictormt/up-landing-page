'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, Crown, Users, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PlansModalProps {
  trigger: React.ReactNode;
}

export function PlansModal({ trigger }: PlansModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setSelectedPlan(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[900px] p-0 max-h-screen overflow-y-auto">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-center">Planos de associação</DialogTitle>
          <DialogDescription className="text-base sm:text-lg text-center">
            Confira abaixo os planos disponíveis e escolha aquele que melhor atende às suas necessidades para começar a
            aproveitar todos os benefícios do UP.
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-4 p-6">
          {/* Plano Básico */}
          <Card
            className={`border-2 transition-all duration-300 hover:shadow-md ${
              selectedPlan === 'basic' ? 'border-primary' : 'border-border'
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">Básico</CardTitle>
                </div>
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-3xl font-bold">R$99</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Acesso a eventos mensais</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Perfil básico na plataforma</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Newsletter exclusiva</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Plano Profissional */}
          <Card
            className={`border-2 transition-all duration-300 hover:shadow-md relative ${
              selectedPlan === 'pro' ? 'border-primary' : 'border-border'
            }`}
          >
            <div className="absolute top-0 inset-x-0">
              <Badge className="bg-primary text-white rounded-t-none rounded-b-md mx-auto block w-fit">
                Mais popular
              </Badge>
            </div>
            <CardHeader className="pb-2 pt-8">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">Profissional</CardTitle>
                </div>
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-3xl font-bold">R$199</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Todos os benefícios do plano Básico</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Acesso a workshops exclusivos</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Perfil destacado na plataforma</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Plano Premium */}
          <Card
            className={`border-2 transition-all duration-300 hover:shadow-md ${
              selectedPlan === 'premium' ? 'border-primary' : 'border-border'
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">Premium</CardTitle>
                </div>
                <Crown className="h-6 w-6 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-3xl font-bold">R$349</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Todos os benefícios do plano Profissional</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Até 3 membros da mesma empresa</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Consultoria mensal exclusiva</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="p-6 pt-0 flex flex-col sm:flex-row gap-4 justify-end items-center">
          <Button variant="outline" onClick={handleClose} className="sm:order-1 w-full sm:w-auto">
            Voltar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
