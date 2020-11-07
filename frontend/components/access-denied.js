import { signIn } from 'next-auth/client'

export default function AccessDenied () {
  return (
    <>
      <h1>您的访问已被终止</h1>
      <p>
        <a href="/api/auth/signin"
           onClick={(e) => {
           e.preventDefault()
           signIn()
        }}>点击这里登录来浏览本页面吧!</a>
      </p>
    </>
  )
}
