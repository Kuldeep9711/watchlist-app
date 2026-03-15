'use client'

import { useState } from "react"
import { supabase } from "@/lib/supabase-client"

export default function Login() {
    const [email, setEmail] = useState('')
    
    
    
        const handleLogin = async () => {
            const { error } = await supabase.auth.signInWithOtp({ email })
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
