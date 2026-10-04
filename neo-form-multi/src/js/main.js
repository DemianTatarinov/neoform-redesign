import '../styles/main.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MOBILE_ROOT = '.neo-root'

function initMenu() {
  const toggle = document.querySelector('[data-menu-toggle]')
  const panel = document.querySelector('[data-menu-panel]')
  const links = document.querySelectorAll('[data-menu-panel] a')
  const header = document.querySelector('[data-header]')

  if (!toggle || !panel) return

  let open = false

  gsap.set(panel, { height: 0, overflow: 'hidden', opacity: 0 })

  const setOpen = (next) => {
    open = next
    toggle.setAttribute('aria-expanded', String(open))
    panel.classList.toggle('border-neo-text/20', open)
    header?.classList.toggle('border-neo-text/30', open)

    if (open) {
      panel.style.height = 'auto'
      const targetHeight = panel.offsetHeight
      panel.style.height = '0px'

      gsap.to(panel, {
        height: targetHeight,
        opacity: 1,
        duration: 0.42,
        ease: 'power2.out',
        onComplete: () => {
          panel.style.height = 'auto'
        },
      })

      gsap.fromTo(
        links,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.38,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.08,
        }
      )
    } else {
      gsap.to(panel, {
        height: 0,
        opacity: 0,
        duration: 0.32,
        ease: 'power2.in',
        onComplete: () => {
          panel.classList.remove('border-neo-text/20')
          header?.classList.remove('border-neo-text/30')
        },
      })
    }
  }

  toggle.addEventListener('click', () => setOpen(!open))
  links.forEach((link) => link.addEventListener('click', () => setOpen(false)))
}

function initReveal() {
  const root = document.querySelector(MOBILE_ROOT)
  if (!root) return

  const heroItems = root.querySelectorAll('[data-animate="hero"]')
  if (heroItems.length) {
    gsap.fromTo(
      heroItems,
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.15,
      }
    )
  }

  const reveals = root.querySelectorAll('[data-animate="reveal"]')
  reveals.forEach((el) => {
    gsap.fromTo(
      el,
      { y: 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  })
}

function initHeader() {
  const header = document.querySelector('[data-header]')
  if (!header) return

  ScrollTrigger.create({
    start: 'top -40',
    onUpdate: (self) => {
      const scrolled = self.scroll() > 24
      header.classList.toggle('bg-neo-bg/90', scrolled)
      header.classList.toggle('border-neo-text/20', scrolled)
    },
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initMenu()
  initReveal()
  initHeader()
})
