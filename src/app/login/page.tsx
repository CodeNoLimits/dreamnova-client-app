'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'

const LoginPage = () => {
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Connexion</h1>
          <p className="text-slate-600 mb-6">
            Accédez à votre espace client pour gérer votre conformité
          </p>

          <form className="space-y-4">
            <Input
              label="Email professionnel"
              type="email"
              id="email"
              name="email"
              placeholder="vous@entreprise.fr"
              required
            />

            <Input
              label="Mot de passe"
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" className="rounded border-slate-300" />
                <span>Se souvenir de moi</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-primary-600 hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Se connecter
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-center text-sm text-slate-600">
              Pas encore de compte ?{' '}
              <Link href="/register" className="text-primary-600 font-semibold hover:underline">
                Créer un compte
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default LoginPage

