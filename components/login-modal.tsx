"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, User, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "sonner"

interface LoginModalProps {
  trigger: React.ReactNode
  onLoginSuccess: () => void
}

export function LoginModal({ trigger, onLoginSuccess }: LoginModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  })
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpa o erro quando o usuário começa a digitar novamente
    if (error) setError(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validação das credenciais fixas
    if (formData.email === "usuario@email.com" && formData.senha === "senha123") {
      // Login bem-sucedido
      onLoginSuccess()
      setOpen(false)
      setFormData({ email: "", senha: "" })
    } else {
      // Login falhou
      toast.error("Email ou senha incorretos. Tente novamente.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>Entre com suas credenciais para acessar sua conta no UP Club.</DialogDescription>
          </DialogHeader>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 py-4">
            <div className="relative">
              <Label htmlFor="email" className="mb-2 block">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="seu@email.com"
                  required
                />
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <Label htmlFor="senha" className="mb-2 block">
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
                  value={formData.senha}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              <p>Para teste, use:</p>
              <p>Email: usuario@email.com</p>
              <p>Senha: senha123</p>
            </div>
          </div>
          <DialogFooter className="flex flex-col gap-2 sm:flex-row">
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
