import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Tasfiqul Alam Pabel</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Full-Stack Developer & Photographer specializing in creating beautiful, functional digital experiences.
            </p>
            <p className="text-muted-foreground text-sm">Based in Bangladesh, serving clients worldwide.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#hero" className="text-muted-foreground text-sm hover:text-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-muted-foreground text-sm hover:text-secondary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#work" className="text-muted-foreground text-sm hover:text-secondary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="text-muted-foreground text-sm hover:text-secondary transition-colors"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground text-sm hover:text-secondary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground text-sm">Web Development</li>
              <li className="text-muted-foreground text-sm">UI/UX Design</li>
              <li className="text-muted-foreground text-sm">E-commerce Solutions</li>
              <li className="text-muted-foreground text-sm">Photography</li>
              <li className="text-muted-foreground text-sm">Digital Marketing</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/30 text-center">
          <p className="text-muted-foreground text-sm">© {currentYear} Tasfiqul Alam Pabel. All rights reserved.</p>
          <div className="mt-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-secondary transition-colors">
              tasfiqulalampabel.com
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Named export for build/runtime importers
export { Footer }
