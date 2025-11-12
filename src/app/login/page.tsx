'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { createClient } from '@/lib/supabase/client'

const LoginPage = () => {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyName: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const supabase = createClient()

      if (isLogin) {
        // Connexion
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })

        if (signInError) throw signInError

        if (data.user && data.session) {
          // Forcer la persistance de session
          await supabase.auth.setSession({
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
          })

          setSuccess('Connexion réussie ! Redirection...')
          setTimeout(() => {
            router.push('/dashboard')
            router.refresh() // Forcer le rafraîchissement
          }, 1000)
        }
      } else {
        // Inscription
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              company_name: formData.companyName,
            },
          },
        })

        if (signUpError) throw signUpError

        setSuccess(
          'Compte créé avec succès ! Vérifiez votre email pour confirmer votre compte.'
        )
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link href="/" className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 bg-gradient-dreamnova rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <span className="text-2xl font-display font-bold text-slate-900">
            DreamNova Compta
          </span>
        </Link>

        <Card className="p-8">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => {
                setIsLogin(true)
                setError(null)
                setSuccess(null)
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                isLogin
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => {
                setIsLogin(false)
                setError(null)
                setSuccess(null)
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                !isLogin
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Inscription
            </button>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {isLogin ? 'Connexion' : 'Créer un compte'}
          </h1>
          <p className="text-slate-600 mb-6">
            {isLogin
              ? 'Accédez à votre espace client pour gérer votre conformité'
              : 'Commencez votre parcours vers la conformité 2026'}
          </p>

          {error && (
            <div className="mb-4 p-4 bg-danger-50 border border-danger-200 rounded-lg text-danger-700 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-success-50 border border-success-200 rounded-lg text-success-700 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Input
                label="Nom de l'entreprise"
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Ma Super Entreprise SAS"
                required={!isLogin}
              />
            )}

            <Input
              label="Email professionnel"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="vous@entreprise.fr"
              required
            />

            <Input
              label="Mot de passe"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" className="rounded border-slate-300" />
                  <span>Se souvenir de moi</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary-600 hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              {isLogin ? 'Se connecter' : 'Créer mon compte'}
            </Button>
          </form>

          {isLogin && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-center text-sm text-slate-600">
                Pas encore de compte ?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-primary-600 font-semibold hover:underline"
                >
                  Créer un compte
                </button>
              </p>
            </div>
          )}

          {/* Connexion invité test */}
          <div className="mt-8 pt-8 border-t-2 border-dashed border-primary-300 bg-primary-50/50 rounded-lg p-6">
            <p className="text-center text-sm font-bold text-primary-700 mb-4 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">science</span>
              Connexion Invité Test
            </p>
            <p className="text-center text-xs text-slate-600 mb-4">
              Testez rapidement avec différents niveaux d'accès
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                variant="secondary"
                size="md"
                onClick={async () => {
                  setIsLoading(true)
                  try {
                    const supabase = createClient()
                    const { data, error } = await supabase.auth.signInAnonymously()
                    if (!error && data.user) {
                      await supabase.from('profiles').upsert({
                        id: data.user.id,
                        full_name: 'Invité (Sans abonnement)',
                        company_name: 'Test Company',
                      })
                      if (data.session) {
                        await supabase.auth.setSession({
                          access_token: data.session.access_token,
                          refresh_token: data.session.refresh_token,
                        })
                      }
                      router.push('/dashboard')
                      router.refresh()
                    }
                  } catch (err: any) {
                    setError(err.message || 'Erreur lors de la connexion invité')
                  } finally {
                    setIsLoading(false)
                  }
                }}
                disabled={isLoading}
                className="bg-white border-2 border-slate-300 hover:border-primary-500 hover:bg-primary-50"
              >
                <span className="material-symbols-outlined mr-2 text-sm">person</span>
                Sans abonnement
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={async () => {
                  setIsLoading(true)
                  try {
                    const supabase = createClient()
                    const { data, error } = await supabase.auth.signInAnonymously()
                    if (!error && data.user) {
                      await supabase.from('profiles').upsert({
                        id: data.user.id,
                        full_name: 'Invité (Growth)',
                        company_name: 'Test Company',
                      })
                      await supabase.from('subscriptions').upsert({
                        user_id: data.user.id,
                        plan_type: 'growth',
                        status: 'active',
                        started_at: new Date().toISOString(),
                        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                      })
                      if (data.session) {
                        await supabase.auth.setSession({
                          access_token: data.session.access_token,
                          refresh_token: data.session.refresh_token,
                        })
                      }
                      router.push('/dashboard')
                      router.refresh()
                    }
                  } catch (err: any) {
                    setError(err.message || 'Erreur lors de la connexion invité')
                  } finally {
                    setIsLoading(false)
                  }
                }}
                disabled={isLoading}
              >
                <span className="material-symbols-outlined mr-2 text-sm">trending_up</span>
                Growth
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={async () => {
                  setIsLoading(true)
                  try {
                    const supabase = createClient()
                    const { data, error } = await supabase.auth.signInAnonymously()
                    if (!error && data.user) {
                      await supabase.from('profiles').upsert({
                        id: data.user.id,
                        full_name: 'Invité (Premium)',
                        company_name: 'Test Company',
                      })
                      await supabase.from('subscriptions').upsert({
                        user_id: data.user.id,
                        plan_type: 'premium-monthly',
                        status: 'active',
                        started_at: new Date().toISOString(),
                        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                      })
                      if (data.session) {
                        await supabase.auth.setSession({
                          access_token: data.session.access_token,
                          refresh_token: data.session.refresh_token,
                        })
                      }
                      router.push('/dashboard')
                      router.refresh()
                    }
                  } catch (err: any) {
                    setError(err.message || 'Erreur lors de la connexion invité')
                  } finally {
                    setIsLoading(false)
                  }
                }}
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              >
                <span className="material-symbols-outlined mr-2 text-sm">star</span>
                Premium
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default LoginPage
