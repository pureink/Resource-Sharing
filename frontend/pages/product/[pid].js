import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import Layout from '../../components/layout'
import AccessDenied from '../../components/access-denied'
export default function Page () {
  const [ session, loading ] = useSession()
  const [ content , setContent ] = useState()
  const router = useRouter()
  const {pid} = router.query
  // Fetch content from protected route
  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3001/api/product/${pid}`)
      const json = await res.json()
      console.log(json)
      if (json) { setContent(JSON.stringify(json.response)) }
    }
    fetchData()
  },[session])
  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return  <Layout><AccessDenied/></Layout> }

  // If session exists, display content
  return (
    <Layout>
      <h1>Protected Page</h1>
      <p><strong>{content}</strong></p>
    </Layout>
  )
}