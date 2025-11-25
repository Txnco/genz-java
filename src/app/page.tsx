import Link from 'next/link'
import { Navbar } from '@/components/navbar'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="hero">
          <div className="hero-content text-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
                Savladaj Javu kroz
                <span className="text-primary"> Praksu</span>
              </h1>
              <p className="mt-6 text-xl text-base-content/70">
                Vježbaj pitanja u stilu ispita, prati svoj napredak i podižri svoje programerske vještine s našom gamificiranom platformom za učenje.
              </p>
              <div className="mt-10 flex justify-center gap-4 flex-wrap">
                <Link href="/auth/register" className="btn btn-primary btn-lg">
                  Započni besplatno
                </Link>
                <Link href="/auth/login" className="btn btn-outline btn-lg">
                  Prijavi se
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            title="Učenje po lekcijama"
            description="Uči Java teme organizirane po strukturi sveučilišnih predavanja, od osnova do naprednih koncepata."
            icon="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
          <FeatureCard
            title="Pitanja u stilu ispita"
            description="Vježbaj s različitim vrstama pitanja uključujući analizu koda, višestruki izbor i dopuni."
            icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
          <FeatureCard
            title="Gamifikacija"
            description="Zarađuj XP, dižri razinu i održavaj nizove aktivnosti kako bi ostao motiviran na svom putu učenja."
            icon="M13 10V3L4 14h7v7l9-11h-7z"
          />
          <FeatureCard
            title="AI generirana pitanja"
            description="Opcionalno koristi svoj OpenAI API ključ za generiranje dodatnih pitanja za vježbu."
            icon="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </div>

        {/* Topics Preview */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Teme koje ćeš savladati
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Klase i objekti',
              'OOP koncepti',
              'Iznimke',
              'Collections Framework',
              'Generici',
              'Lambda izrazi',
              'Stream API',
              'Javadoc',
              'Sortiranje i komparatori',
            ].map(topic => (
              <div
                key={topic}
                className="card bg-base-200 p-4 text-center"
              >
                {topic}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content mt-24">
        <div>
          <p>GenZ Java - Nauči Javu interaktivno</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: string
}) {
  return (
    <div className="card bg-base-200 shadow-md">
      <div className="card-body">
        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
          </svg>
        </div>
        <h3 className="card-title text-lg">{title}</h3>
        <p className="text-base-content/70 text-sm">{description}</p>
      </div>
    </div>
  )
}
