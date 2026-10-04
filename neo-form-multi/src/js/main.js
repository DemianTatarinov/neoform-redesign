import '../styles/main.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MOBILE_ROOT = '.neo-root'

function initMenu() {
  const toggle = document.querySelector('[data-menu-toggle]')
  const panel = document.querySelector('[data-menu-panel]')
  const links = document.querySelectorAll('[data-menu-panel] a')

  if (!toggle || !panel) return

  let open = false

  gsap.set(panel, { autoAlpha: 0 })
  panel.classList.add('pointer-events-none')

  const setOpen = (next) => {
    open = next
    toggle.setAttribute('aria-expanded', String(open))
    panel.setAttribute('aria-hidden', String(!open))
    panel.classList.toggle('is-open', open)

    if (open) {
      panel.classList.remove('pointer-events-none')
      panel.style.pointerEvents = 'auto'

      gsap.to(panel, {
        autoAlpha: 1,
        duration: 0.45,
        ease: 'power2.out',
      })

      gsap.fromTo(
        links,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power3.out',
          delay: 0.1,
          pointerEvents: 'auto',
        }
      )
    } else {
      gsap.to(panel, {
        autoAlpha: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          panel.classList.remove('is-open')
          panel.classList.add('pointer-events-none')
          panel.style.pointerEvents = 'none'
        },
      })
    }
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation()
    setOpen(!open)
  })
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
      header.classList.toggle('shadow-md', scrolled)
    },
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initMenu()
  initReveal()
  initHeader()
})
