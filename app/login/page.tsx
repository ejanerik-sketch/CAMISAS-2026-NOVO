'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem('logged_in_user');
    if (user) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      // Master admin fallback
      if (email === 'ejanerik@gmail.com' && password === 'camisa2026') {
        sessionStorage.setItem('logged_in_user', JSON.stringify({ name: 'Admin Master', email, role: 'Administrador' }));
        router.push('/admin');
        return;
      }

      const storedUsers = JSON.parse(localStorage.getItem('app_users') || '[]');
      const user = storedUsers.find((u: any) => u.email === email);

      // In a real app we'd check password, but here we just check if user exists and is active
      if (user && user.status === 'Ativo') {
        sessionStorage.setItem('logged_in_user', JSON.stringify(user));
        router.push('/admin');
      } else {
        setError('E-mail não encontrado ou usuário inativo.');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 py-12 relative">
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-[#1E3A8A] transition-colors font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar para Home
      </Link>

      <div className="bg-white w-full max-w-md rounded-[2rem] p-10 shadow-xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden">
        {/* Top blue accent line */}
        <div className="absolute top-0 left-10 right-10 h-1.5 bg-[#2563EB] rounded-b-full"></div>

        <div className="flex flex-col items-center mb-10 mt-4">
          <div className="w-20 h-20 bg-[#F0F6FF] rounded-2xl flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-[#2563EB]" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] mb-2">Bem-vindo</h1>
          <p className="text-slate-500 font-medium">Acesse o painel administrativo</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 placeholder:text-slate-300 font-medium"
                placeholder="exemplo@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 placeholder:text-slate-300 font-medium tracking-widest"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 mt-4 bg-[#1E3A8A] text-white font-bold rounded-xl hover:bg-blue-900 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                PROCESSANDO...
              </>
            ) : (
              <>
                ENTRAR NO SISTEMA
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
