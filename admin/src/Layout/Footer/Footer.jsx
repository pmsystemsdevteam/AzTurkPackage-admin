import React from 'react'
import './Footer.scss'

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>© {year} PM Systems tərəfindən yaradılmışdır</p>
    </footer>
  )
}

export default Footer