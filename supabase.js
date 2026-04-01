// Configuration Supabase — Devora Test
const SUPABASE_URL = 'https://vwkvumlgtwqatiixxleh.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3a3Z1bWxndHdxYXRpaXh4bGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNTY3MjcsImV4cCI6MjA5MDYzMjcyN30.Ux3WkEsAbliTdd0FrORduUVFWgIKqjtZBjzJQpRSQeE'

const { createClient } = supabase
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Vérifier si l'utilisateur est connecté
async function getUser() {
  const { data: { user } } = await db.auth.getUser()
  return user
}

// Récupérer le profil
async function getProfile(userId) {
  const { data, error } = await db
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) return null
  return data
}

// Rediriger si non connecté
async function requireAuth() {
  const user = await getUser()
  if (!user) {
    window.location.href = '/connexion.html'
    return null
  }
  return user
}

// Rediriger si déjà connecté
async function redirectIfAuth() {
  const user = await getUser()
  if (user) {
    window.location.href = '/dashboard.html'
  }
}
