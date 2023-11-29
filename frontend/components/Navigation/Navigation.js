import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../public/logo.png'
import style from './Navigation.module.css'

const Navigation = () => {
  return (<nav className={style.nav}>
    <Link className={style.logoContainer} href="/">
      <Image className={style.logo} src={logo} width={40} alt="circuit board house logo"/>
      <h1>WebDev Town</h1>
    </Link>
    <input className={style.menuBtn} type="checkbox" id="menu-btn" />
    <label className={style.menuIcon} htmlFor="menu-btn"><span className={style.navIcon}></span></label>
    <div className={style.menu}>
      <Link href="/collections">Collections</Link>
      <Link href="/submit" className={style.submit}>Submit Resource</Link>
    </div>
  </nav>)
}

export default Navigation
