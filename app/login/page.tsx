'use client'

import { useState } from "react"
import { createBrowserSupabase } from "@/lib/supabase"

export default function Login() {
    const [email, setEmail] = useState('')
    const supabase = createBrowserSupabase()

        const handleLogin = async () => {
            const { error } = await supabase.auth.signWithOtp({ email })
              if (error) alert('Check your email!')
        }
    
  return (
    <div>
      <input 
      type="email"
      value={email}
      onChange={e => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Magic Link Logic</button>
    </div>
  )
}
