'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { createClient } from '@/lib/supabase/client'
import { getBaseUrl } from '@/lib/utils/url'

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
        const userEmail = formData.email.toLowerCase().trim()
        const isManubousky = userEmail === 'manubousky@gmail.com'
        
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: userEmail,
          password: formData.password,
        })

        if (signInError) throw signInError

        if (data.user && data.session) {
          // Pour manubousky@gmail.com : s'assurer qu'il a Premium MAX
          if (isManubousky) {
            // Vérifier/créer abonnement Premium MAX
            await supabase.from('subscriptions').upsert({
              user_id: data.user.id,
              plan_type: 'premium',
              plan_name: 'PREMIUM MAX',
              status: 'active',
              started_at: new Date().toISOString(),
              expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 an
            }, { onConflict: 'user_id' })

            // Créer/updater le profil
            await supabase.from('profiles').upsert({
              id: data.user.id,
              full_name: data.user.user_metadata?.company_name || 'Admin',
              company_name: data.user.user_metadata?.company_name || 'Admin',
            }, { onConflict: 'id' })
          }

          // Forcer la persistance de session
          await supabase.auth.setSession({
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
          })

          setSuccess(isManubousky ? 'Connexion Premium MAX réussie ! Redirection...' : 'Connexion réussie ! Redirection...')
          setTimeout(() => {
            router.push('/dashboard')
            router.refresh() // Forcer le rafraîchissement
          }, 1000)
        }
      } else {
        // Inscription
        const baseUrl = getBaseUrl()
        const userEmail = formData.email.toLowerCase().trim()
        const isManubousky = userEmail === 'manubousky@gmail.com'
        
        // Pour manubousky@gmail.com : bypass confirmation et créer Premium MAX directement
        if (isManubousky) {
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: userEmail,
            password: formData.password,
            options: {
              emailRedirectTo: `${baseUrl}/dashboard`,
              data: {
                company_name: formData.companyName || 'Admin',
                skip_email_confirmation: true, // Bypass pour manubousky
              },
            },
          })

          if (signUpError) {
            // Si le compte existe déjà, essayer de se connecter
            if (signUpError.message.includes('already registered') || signUpError.message.includes('User already registered')) {
              const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                email: userEmail,
                password: formData.password,
              })

              if (signInError) throw signInError

              if (signInData.user && signInData.session) {
                // Créer/updater le profil
                await supabase.from('profiles').upsert({
                  id: signInData.user.id,
                  full_name: formData.companyName || 'Admin',
                  company_name: formData.companyName || 'Admin',
                }, { onConflict: 'id' })

                // Créer abonnement Premium MAX
                await supabase.from('subscriptions').upsert({
                  user_id: signInData.user.id,
                  plan_type: 'premium',
                  plan_name: 'PREMIUM MAX',
                  status: 'active',
                  started_at: new Date().toISOString(),
                  expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 an
                }, { onConflict: 'user_id' })

                // Forcer la session
                await supabase.auth.setSession({
                  access_token: signInData.session.access_token,
                  refresh_token: signInData.session.refresh_token,
                })

                setSuccess('Connexion réussie en mode Premium MAX ! Redirection...')
                setTimeout(() => {
                  router.push('/dashboard')
                  router.refresh()
                }, 500)
                return
              }
            } else {
              throw signUpError
            }
          }

          // Si nouveau compte créé pour manubousky
          if (signUpData?.user) {
            // Créer le profil
            await supabase.from('profiles').upsert({
              id: signUpData.user.id,
              full_name: formData.companyName || 'Admin',
              company_name: formData.companyName || 'Admin',
            }, { onConflict: 'id' })

            // Créer abonnement Premium MAX
            await supabase.from('subscriptions').upsert({
              user_id: signUpData.user.id,
              plan_type: 'premium',
              plan_name: 'PREMIUM MAX',
              status: 'active',
              started_at: new Date().toISOString(),
              expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 an
            }, { onConflict: 'user_id' })

            // Si session disponible, connecter directement
            if (signUpData.session) {
              await supabase.auth.setSession({
                access_token: signUpData.session.access_token,
                refresh_token: signUpData.session.refresh_token,
              })

              setSuccess('Compte Premium MAX créé ! Redirection...')
              setTimeout(() => {
                router.push('/dashboard')
                router.refresh()
              }, 500)
              return
            }
          }

          setSuccess('Compte Premium MAX créé ! Vérifiez votre email (ou connectez-vous directement).')
          return
        }

        // Pour tous les autres emails : inscription normale
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: userEmail,
          password: formData.password,
          options: {
            emailRedirectTo: `${baseUrl}/dashboard`,
            data: {
              company_name: formData.companyName,
            },
          },
        })

        if (signUpError) {
          // Si le compte existe déjà, proposer de se connecter
          if (signUpError.message.includes('already registered') || signUpError.message.includes('User already registered')) {
            setError('Ce compte existe déjà. Veuillez vous connecter.')
            setIsLogin(true)
            return
          }
          throw signUpError
        }

        // Créer le profil automatiquement
        if (data?.user) {
          await supabase.from('profiles').upsert({
            id: data.user.id,
            full_name: formData.companyName || '',
            company_name: formData.companyName || '',
          }, { onConflict: 'id' })
        }

        // Si confirmation email désactivée, connecter directement
        if (data?.session) {
          await supabase.auth.setSession({
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
          })

          setSuccess('Compte créé avec succès ! Redirection...')
          setTimeout(() => {
            router.push('/dashboard')
            router.refresh()
          }, 1000)
        } else {
          setSuccess(
            'Compte créé avec succès ! Vérifiez votre email pour confirmer votre compte (ou connectez-vous directement si confirmation désactivée).'
          )
        }
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

          {/* Connexion Testeurs */}
          <div className="mt-8 pt-8 border-t-2 border-dashed border-primary-300 bg-primary-50/50 rounded-lg p-6">
            <p className="text-center text-sm font-bold text-primary-700 mb-2 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">science</span>
              Mode Testeur
            </p>
            <p className="text-center text-xs text-slate-600 mb-4">
              Accès rapide avec plan Growth pour tester toutes les fonctionnalités
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={async () => {
                setIsLoading(true)
                setError(null)
                try {
                  const supabase = createClient()
                  
                  // Utiliser la route API dédiée pour créer/se connecter au compte testeur
                  const response = await fetch('/api/auth/tester', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                  })

                  const result = await response.json()

                  if (!response.ok) {
                    // Afficher l'erreur détaillée
                    throw new Error(result.details || result.error || 'Erreur lors de la connexion testeur')
                  }

                  if (!result.session) {
                    throw new Error('Erreur: Session non créée')
                  }

                  // Forcer la session côté client
                  const { error: sessionError } = await supabase.auth.setSession({
                    access_token: result.session.access_token,
                    refresh_token: result.session.refresh_token,
                  })

                  if (sessionError) {
                    console.error('Erreur session:', sessionError)
                    throw new Error('Erreur lors de la création de la session')
                  }

                  // CRITIQUE: Attendre un peu pour que la session soit bien persistée
                  await new Promise(resolve => setTimeout(resolve, 500))

                  setSuccess('Connexion au compte testeur réussie ! Redirection...')

                  // Rediriger vers le dashboard
                  router.push('/dashboard')
                  router.refresh()
                } catch (err: any) {
                  console.error('Erreur connexion testeur:', err)
                  setError(err.message || 'Erreur lors de la connexion testeur. Veuillez réessayer.')
                } finally {
                  setIsLoading(false)
                }
              }}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined mr-2 animate-spin">sync</span>
                  Connexion en cours...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined mr-2">rocket_launch</span>
                  Se connecter en mode Testeur (Growth)
                </>
              )}
            </Button>
            {error && (
              <p className="mt-3 text-center text-xs text-danger-600 bg-danger-50 p-2 rounded">
                {error}
              </p>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default LoginPage
