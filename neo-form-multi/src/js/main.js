import '../styles/main.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MOBILE_ROOT = '.neo-root'

function initMenu() {
  const toggle = document.querySelector('[data-menu-toggle]')
  const panel = document.querySelector('[data-menu-panel]')
  const overlay = document.querySelector('[data-menu-overlay]')
  const links = document.querySelectorAll('[data-menu-panel] a')

  if (!toggle || !panel) return

  let open = false

  const setOpen = (next) => {
    open = next
    toggle.setAttribute('aria-expanded', String(open))
    document.body.classList.toggle('overflow-hidden', open)

    gsap.to(overlay, {
      autoAlpha: open ? 1 : 0,
      duration: 0.45,
      ease: 'power2.out',
      onStart: () => {
        overlay?.style.setProperty('pointer-events', open ? 'auto' : 'none')
      },
      onComplete: () => {
        if (!open) overlay?.style.setProperty('pointer-events', 'none')
      },
    })

    gsap.to(panel, {
      x: open ? 0 : '100%',
      duration: 0.55,
      ease: 'power3.inOut',
    })

    if (open) {
      gsap.fromTo(
        links,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          delay: 0.15,
        }
      )
    }
  }

  gsap.set(panel, { x: '100%' })
  gsap.set(overlay, { autoAlpha: 0 })
  overlay?.style.setProperty('pointer-events', 'none')
  panel.style.pointerEvents = 'auto'

  toggle.addEventListener('click', () => setOpen(!open))
  overlay?.addEventListener('click', () => setOpen(false))
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
      header.classList.toggle('border-neo-line/80', self.scroll() > 24)
      header.classList.toggle('bg-black/90', self.scroll() > 24)
      header.classList.toggle('backdrop-blur-md', self.scroll() > 24)
    },
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initMenu()
  initReveal()
  initHeader()
})
