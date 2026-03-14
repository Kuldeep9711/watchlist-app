import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { createClientComponentClient } from "@supabase/ssr"

// For Server Components / Server Actions
export default function createServerSupabase() {
    const cookieStore = cookies()
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { cookies: () => cookieStore }
    )
}

// For Client Components
 export const createBrowserSupabase = () => 
    createClientComponentClient()
    