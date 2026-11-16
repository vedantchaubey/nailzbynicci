import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-ink px-6 text-center relative overflow-hidden">
      {/* Background Mist Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] aura-blossom opacity-20 pointer-events-none" />

      <div className="max-w-md relative z-10">
        <span className="text-[10px] uppercase tracking-[0.24em] text-blossom font-sans block mb-4">
          404 · Atelier Sanctuary
        </span>
        <h1 className="font-serif text-5xl sm:text-6xl text-white font-light mb-4">
          Verloren im Archiv.
        </h1>
        <p className="text-sm font-sans text-fog-light leading-relaxed mb-8">
          Diese Seite oder dieses Set existiert leider nicht. Kehre zurück zur kuratierten Galerie oder schreibe Nicole auf Instagram.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center font-sans uppercase tracking-[0.16em] text-xs font-medium px-8 py-3.5 rounded-full bg-white text-ink hover:bg-blossom transition-colors shadow-lg"
        >
          Zurück zur Startseite ↗
        </Link>
      </div>
    </div>
  )
}
