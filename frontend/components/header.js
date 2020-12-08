import Nlink from './Link'
import { signIn, signOut, useSession } from 'next-auth/client'
import styles from './header.module.css'
import {Formik} from 'formik'
import {Button,Select} from '@geist-ui/react'
// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header () {
  const [ session, loading ] = useSession()
  const handler = val => {
    window.location.href =val
  }
  //存在用户时才显示个人界面的nav
  let mepage = null;
  let menu = null;
  if(session) mepage=<>
  <li className={styles.navItem}><Nlink className="linka" href="/me"><a>我的商品</a></Nlink></li>
  <li className={styles.navItem}><Nlink className="linka" href="/myorder"><a>我的购买</a></Nlink></li>
  <li className={styles.navItem}><Nlink className="linka" href="/mysell"><a>我的出售</a></Nlink></li>
  </>
  if(session) memu=<>
    <Select.Option value="/me">我的商品</Select.Option>
    <Select.Option value="/myorder">我的购买</Select.Option>
    <Select.Option value="/mysell">我的出售</Select.Option>
  </>

  let top=<>
  <div className={styles.signedInStatus}>
    <div className={`nojs-show ${(!session && loading) ? styles.loading : styles.loaded}`}>
      <Select id={styles.select} placeholder="菜单" onChange={handler}>
        <Select.Option value="/">首页</Select.Option>
        <Select.Option value="/pages/1">所有商品</Select.Option>
        {menu}
        <Select.Option value="/form">创建商品</Select.Option>
        <Select.Option value="/about">关于</Select.Option>
      </Select>
      <Formik initialValues={{
                name: ""
              }}
              onSubmit={(values) => {
                window.location.href =`/search/`+values.name
              }}
              render={props=>
                <form className={styles.form}onSubmit={props.handleSubmit}>
                  <label className="slabel"><input placeholder="Search product..." className="searchbox" type="text" id="name" name="name" value={props.values.name}
                                  onChange={props.handleChange} onBlur={props.handleBlur}/>
                    {props.touched.name && props.errors.name && <div>{props.errors.name}</div>}
                  </label>
                </form>
              }
      />
      {!session && <>
        <span className={styles.notSignedInText}>请先完成登录</span>
        <Button
          auto
          size="small"
          type="success"
          href={`/api/auth/signin`}
          className={styles.buttonPrimary}
          onClick={(e) => {
            e.preventDefault()
            signIn()
          }}
        >
          登录
        </Button>
      </>}

      {session && <>   
        <span className={styles.signedInText}>
          <strong>{session.user.email || session.user.name}</strong>
        </span>
        <Button auto size="small"
                type="success"
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
        >
          登出
        </Button>
      </>}
  </div>
</div>
</>

  return (
    <>
    {top}
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <h1 className={styles.h1}>Resoure - Sharing</h1>
      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}><Nlink href="/pages/1"><a className="linka">所有商品</a></Nlink></li>
          {mepage}
          <li className={styles.navItem}><Nlink href="/form"><a className="linka">创建商品</a></Nlink></li>
          <li className={styles.navItem}><Nlink href="/about"><a className="linka">关于</a></Nlink></li>
        </ul>
      </nav>
      <style global jsx>{`
  .selected{
    text-decoration: none;
    background-color: #81bbff;
    border-radius:5px;
    padding:5px 10px;
    color:#fff;
    font-family:PTMono;
}
  `}
  </style>
    </header>
    </>
  )
}
