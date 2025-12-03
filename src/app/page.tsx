'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] relative">
      {/* Subtle dot pattern background */}
      <div className="absolute inset-0 dot-pattern pointer-events-none" />
      
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <DailyQuestion />
        <StudyTracks />
        <TipsAndTricks />
        <MemeStrip />
        <MiniQuizzes />
        <FAQ />
        <Footer />
      </main>
    </div>
  )
}

// ============================================
// HERO SECTION
// ============================================
function Hero() {
  const [activeTab, setActiveTab] = useState<'questions' | 'tips' | 'memes'>('questions')
  
  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-6 pt-16 pb-24 lg:pt-24 lg:pb-32">
      <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
        {/* Left side - Copy & CTAs */}
        <div className="text-center lg:text-left space-y-6 mb-12 lg:mb-0">
          {/* Badge */}
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] px-3 py-1 text-xs uppercase tracking-wide text-[var(--text-muted)]">
              ☕ JAVA, ALI NEKA BUDE GEN Z
            </span>
          </div>
          
          {/* Main headline */}
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-up stagger-1"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="block text-[var(--text-primary)]">Savladaj Javu brže</span>
            <span className="block text-[var(--text-muted)] mt-2">nego što profesor kaže</span>
            <span className="block text-[var(--text-primary)]">"polimorfizam"</span>
          </h1>
          
          {/* Subtext */}
          <p className="text-lg text-[var(--text-muted)] leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-up stagger-2">
            Kratka pitanja, začinjeni savjeti i objašnjenja bez gluposti – plus memeovi da ti mozak ne baci segfault.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 pt-4 animate-fade-up stagger-3">
            <Link href="/auth/register" className="btn-modern btn-modern-primary text-base px-6 py-3">
              Započni Dnevni Kviz
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a href="#tips" className="btn-modern btn-modern-ghost text-base px-6 py-3 border border-[var(--border-color)]">
              Pregledaj Savjete
            </a>
          </div>
        </div>
        
        {/* Right side - Interactive card stack */}
        <div className="animate-fade-up stagger-4">
          <div className="card-float p-0 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-[var(--border-color)]">
              <button
                onClick={() => setActiveTab('questions')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'questions'
                    ? 'text-[var(--text-primary)] bg-[var(--border-color)]' 
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                Pitanja
              </button>
              <button
                onClick={() => setActiveTab('tips')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'tips'
                    ? 'text-[var(--text-primary)] bg-[var(--border-color)]' 
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                Savjeti
              </button>
              <button
                onClick={() => setActiveTab('memes')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'memes'
                    ? 'text-[var(--text-primary)] bg-[var(--border-color)]' 
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                Memeovi
              </button>
            </div>
            
            {/* Content */}
            <div className="p-5">
              {activeTab === 'questions' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-[var(--border-color)] text-[var(--text-muted)]">OOP</span>
                    <span className="px-2 py-0.5 rounded bg-[var(--border-color)] text-[var(--text-muted)]">Srednje</span>
                  </div>
                  <p className="font-medium text-[var(--text-primary)]">Što će ispisati ovaj kod?</p>
                  <pre className="text-sm bg-[var(--code-bg)] text-slate-300 p-4 rounded-lg overflow-x-auto">
{`class Animal {
    void sound() { 
        System.out.println("..."); 
    }
}
class Dog extends Animal {
    void sound() { 
        System.out.println("Bark!"); 
    }
}
Animal a = new Dog();
a.sound();`}
                  </pre>
                  <div className="space-y-2">
                    {['A) ...', 'B) Bark!', 'C) Compilation Error', 'D) Runtime Error'].map((opt, i) => (
                      <button
                        key={i}
                        className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                          i === 1 
                            ? 'border-[var(--text-primary)] bg-[var(--accent-bg)] text-[var(--accent-text)]' 
                            : 'border-[var(--border-color)] hover:border-[var(--text-muted)] text-[var(--text-primary)]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'tips' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-lg">
                    <span>💡</span>
                    <span className="font-medium text-[var(--text-primary)]">Pro Savjet</span>
                  </div>
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    Koristi <code className="bg-[var(--border-color)] px-1.5 py-0.5 rounded text-sm">.equals()</code> za usporedbu sadržaja, a <code className="bg-[var(--border-color)] px-1.5 py-0.5 rounded text-sm">==</code> za usporedbu referenci.
                  </p>
                  <pre className="text-sm bg-[var(--code-bg)] text-slate-300 p-4 rounded-lg">
{`String a = new String("hello");
String b = new String("hello");

a == b      // false (različiti objekti)
a.equals(b) // true  (isti sadržaj)`}
                  </pre>
                </div>
              )}
              
              {activeTab === 'memes' && (
                <div className="space-y-4 text-center py-4">
                  <div className="text-6xl mb-4">🤔</div>
                  <p className="font-mono text-sm text-[var(--text-muted)] italic">
                    "Kad tvoj kod radi, a ne znaš zašto"
                  </p>
                  <div className="border-t border-[var(--border-color)] pt-4 mt-4">
                    <p className="font-mono text-xs text-[var(--text-muted)]">
                      System.out.println("Nemam pojma što se događa");
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Meme sticker corner */}
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-[var(--accent-bg)] rounded-full flex items-center justify-center transform rotate-12 shadow-lg">
              <span className="text-2xl">🔥</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// DAILY QUESTION SECTION
// ============================================
function DailyQuestion() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  
  return (
    <section id="questions" className="py-20 border-t border-[var(--border-color)]">
      <div className="max-w-4xl mx-auto px-4 lg:px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            ☕ Dnevno Java Pitanje
          </h2>
          <p className="text-[var(--text-muted)]">
            Imaš 3 / 10 dana u nizu. Nemoj prekinuti 
          </p>
          {/* Progress bar */}
          <div className="mt-4 max-w-xs mx-auto">
            <div className="progress-modern">
              <div className="progress-modern-fill" style={{ width: '30%' }} />
            </div>
          </div>
        </div>
        
        {/* Question card */}
        <div className="card-float p-6 sm:p-8">
          {/* Difficulty pills */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="tag">Početnik</span>
            <span className="tag">OOP</span>
            <span className="tag">Kolekcije</span>
          </div>
          
          {/* Question */}
          <p className="text-lg font-medium text-[var(--text-primary)] mb-5">
            Koja od navedenih tvrdnji točno opisuje razliku između ArrayList i LinkedList u Javi?
          </p>
          
          {/* Options */}
          <div className="space-y-3 mb-6">
            {[
              'ArrayList je bolji za nasumični pristup, LinkedList je bolji za umetanje/brisanje',
              'LinkedList koristi manje memorije od ArrayList-a',
              'ArrayList je sinkroniziran, LinkedList nije',
              'Imaju identične performanse'
            ].map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelectedAnswer(i)}
                className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${
                  selectedAnswer === i
                    ? showAnswer
                      ? i === 0
                        ? 'border-green-500 bg-green-500/10 text-green-700'
                        : 'border-red-500 bg-red-500/10 text-red-700'
                      : 'border-[var(--text-primary)] bg-[var(--accent-bg)] text-[var(--accent-text)]'
                    : showAnswer && i === 0
                      ? 'border-green-500 bg-green-500/5'
                      : 'border-[var(--border-color)] hover:border-[var(--text-muted)] text-[var(--text-primary)]'
                }`}
              >
                {String.fromCharCode(65 + i)}) {opt}
              </button>
            ))}
          </div>
          
          {/* Reveal answer button */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="btn-modern btn-modern-secondary text-sm"
            >
              {showAnswer ? 'Sakrij Odgovor' : 'Prikaži Odgovor'}
            </button>
            
            <div className="flex items-center gap-3">
              <span className="badge-modern">
                <span>⚡</span> XP +15
              </span>
              <span className="badge-success-modern">
                <span>🧠</span> +1 Moždana stanica
              </span>
            </div>
          </div>
          
          {/* Answer explanation */}
          {showAnswer && (
            <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
              <p className="text-[var(--text-primary)] font-medium mb-2">✅ Točno! ArrayList je bolji za nasumični pristup.</p>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                ArrayList koristi dinamičko polje interno, što čini nasumični pristup O(1). LinkedList koristi dvostruko povezanu listu,
                što čini umetanje/brisanje na poznatim pozicijama O(1), ali nasumični pristup O(n).
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ============================================
// STUDY TRACKS SECTION
// ============================================
function StudyTracks() {
  const tracks = [
    {
      title: 'Java Osnove (GenZ mode)',
      description: 'Varijable, petlje, metode, tipovi podataka.',
      note: 'null memeovi uključeni',
      icon: '📚',
      progress: 45,
    },
    {
      title: 'OOP & Stvarni svijet',
      description: 'Klase, nasljeđivanje, sučelja, polimorfizam.',
      note: 'Zašto ti je "private" najbolji frend',
      icon: '🏗️',
      progress: 20,
    },
    {
      title: 'Kolekcije, Streamovi & Generici',
      description: 'List, Map, Set, Stream API, var u Javi 10+.',
      note: 'Funkcionalno programiranje vibe',
      icon: '🌊',
      progress: 0,
    },
    {
      title: 'Priprema za Ispit & Intervju',
      description: 'Klasična trik pitanja: == vs .equals, stack vs heap.',
      note: 'Big brain time',
      icon: '🎯',
      progress: 0,
    },
  ]
  
  return (
    <section id="tracks" className="py-20 border-t border-[var(--border-color)] bg-[var(--bg-surface)]">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Odaberi svoj put.
          </h2>
          <p className="text-[var(--text-muted)]">
            Odaberi svoj put do Java majstorstva
          </p>
        </div>
        
        {/* Track cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {tracks.map((track, i) => (
            <div key={i} className="card-modern p-6 group cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{track.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-[var(--text-primary)] group-hover:underline">
                    {track.title}
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm mt-1">{track.description}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-2 italic">💬 {track.note}</p>
                  
                  {/* Progress */}
                  {track.progress > 0 && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1">
                        <span>Napredak</span>
                        <span>{track.progress}%</span>
                      </div>
                      <div className="progress-modern">
                        <div className="progress-modern-fill" style={{ width: `${track.progress}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// TIPS & TRICKS SECTION
// ============================================
function TipsAndTricks() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null)
  
  const quickTips = [
    'Koristi .equals() za usporedbu sadržaja, == za reference.',
    'Preferiraj List.of(...) za male fiksne liste.',
    'Koristi var za lokalne varijable, ne za javne API-je.',
    "Streamovi = manje for-petlji, ali nemoj ih zloupotrebljavati za sve.",
    "U switch izrazima (Java 14+), ne zaboravi yield.",
  ]
  
  const explainers = [
    {
      title: 'Zašto su private/protected/public zapravo važni',
      content: 'Modifikatori pristupa kontroliraju enkapsulaciju. Private = samo klasa. Protected = klasa + podklase + isti paket. Public = svi. Default (bez modifikatora) = paket-privatno. Koristi najrestriktivniju razinu moguću.',
    },
    {
      title: 'Checked vs unchecked iznimke – opušteno objašnjenje',
      content: 'Checked iznimke (IOException, SQLException) = kompajler te tjera da ih obradiš. Unchecked (RuntimeException) = kompajleru je svejedno. Pravilo: popravljive greške = checked, greške u programiranju = unchecked.',
    },
    {
      title: 'Što radi Garbage Collector & zašto te treba biti briga samo malo',
      content: 'GC automatski oslobađa memoriju od nekorištenih objekata. Ne moraš ručno brisati stvari kao u C++. Samo nemoj držati reference na objekte koje ne trebaš i bit ćeš ok. Ne razbijaj glavu time.',
    },
  ]
  
  return (
    <section id="tips" className="py-20 border-t border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            💡 Savjeti i Trikovi
          </h2>
          <p className="text-[var(--text-muted)]">
            Pro savjeti za level-up tvog Java znanja
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Quick Tips - Left column */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[var(--text-primary)]">Brzi Savjeti</h3>
            <div className="space-y-3">
              {quickTips.map((tip, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)]"
                >
                  <span className="text-lg">→</span>
                  <p className="text-sm text-[var(--text-muted)]">{tip}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Longer Explainers - Right column */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[var(--text-primary)]">Dublje analize</h3>
            <div className="space-y-3">
              {explainers.map((item, i) => (
                <div
                  key={i}
                  className="border border-[var(--border-color)] rounded-lg overflow-hidden bg-[var(--bg-surface)]"
                >
                  <button
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--border-color)] transition-colors"
                  >
                    <span className="font-medium text-sm text-[var(--text-primary)]">{item.title}</span>
                    <svg
                      className={`w-5 h-5 text-[var(--text-muted)] transition-transform ${openAccordion === i ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openAccordion === i && (
                    <div className="px-4 pb-4 text-sm text-[var(--text-muted)] leading-relaxed border-t border-[var(--border-color)] pt-4">
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// MEME STRIP SECTION
// ============================================
function MemeStrip() {
  const [memes, setMemes] = useState<Array<{ emoji?: string, caption: string, url?: string }>>([
    { emoji: '😅', caption: 'Kad tvoj kod radi, a ne znaš zašto' },
    { emoji: '🔥', caption: 'Ja: Samo ću popraviti ovaj bug. Također ja, 3 sata kasnije:' },
    { emoji: '💀', caption: 'Kad zaboraviš točku-zarez u Javi' },
    { emoji: '🤡', caption: 'Korištenje == umjesto .equals() na Stringovima' },
    { emoji: '😤', caption: 'NullPointerException je ušao u chat' },
    { emoji: '🧠', caption: 'Napokon razumiješ rekurziju razumijevanjem rekurzije' },
    { emoji: '😭', caption: 'Kad test prolazi lokalno ali pada u CI' },
    { emoji: '🎉', caption: 'Kompajliranje iz prve bez grešaka' },
  ])

  useEffect(() => {
    // Fetch fresh memes from our API proxy
    const fetchMemes = async () => {
      try {
        const res = await fetch('/api/memes')
        if (res.ok) {
          const data = await res.json()
          if (data.memes && Array.isArray(data.memes) && data.memes.length > 0) {
            setMemes(prev => [...data.memes, ...prev])
          }
        }
      } catch (err) {
        console.error('Failed to fetch memes', err)
      }
    }
    
    fetchMemes()
  }, [])
  
  return (
    <section id="memes" className="py-20 border-t border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            😂 Pauza za Memeove
          </h2>
          <p className="text-[var(--text-muted)]">
            Jer učenje ne bi trebalo biti dosadno
          </p>
        </div>
      </div>
      
      {/* Horizontal scroll meme strip */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-4 pb-4">
          {memes.map((meme, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-64 snap-center card-modern p-0 text-center overflow-hidden bg-[var(--bg-primary)]"
            >
              {meme.url ? (
                <div className="w-full h-48 bg-gray-100 relative">
                  <img 
                    src={meme.url} 
                    alt={meme.caption} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="w-full h-48 flex items-center justify-center text-5xl bg-[var(--bg-primary)]">
                  {meme.emoji}
                </div>
              )}
              <div className="p-4">
                <p className="text-sm text-[var(--text-muted)] italic">"{meme.caption}"</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Gradient overlays for scroll hint */}
        <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-[var(--bg-surface)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-[var(--bg-surface)] to-transparent pointer-events-none" />
      </div>
    </section>
  )
}

// ============================================
// MINI QUIZZES / FLASHCARDS SECTION
// ============================================
function MiniQuizzes() {
  const [activeTab, setActiveTab] = useState<'mcq' | 'truefalse' | 'flashcards'>('mcq')
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())
  
  const mcqQuestions = [
    { q: 'Koja kolekcija dopušta duple elemente?', a: 'List' },
    { q: 'Zadana vrijednost booleana u Javi?', a: 'false' },
    { q: 'Ključna riječ za sprječavanje nasljeđivanja?', a: 'final' },
  ]
  
  const trueFalseQuestions = [
    { statement: 'ArrayList je thread-safe.', answer: false },
    { statement: 'Java podržava višestruko nasljeđivanje kroz sučelja.', answer: true },
    { statement: 'Stringovi u Javi su promjenjivi (mutable).', answer: false },
  ]
  
  const flashcards = [
    { q: 'Što je enkapsulacija?', a: 'Grupiranje podataka i metoda koje rade na tim podacima u jednu jedinicu (klasu) i ograničavanje izravnog pristupa.' },
    { q: 'Što je polimorfizam?', a: 'Sposobnost objekata da poprime više oblika. Isto ime metode, različite implementacije ovisno o tipu objekta.' },
    { q: 'Što je JVM?', a: 'Java Virtual Machine - izvršava Java bytecode, omogućuje platformsku neovisnost (napiši jednom, pokreni bilo gdje).' },
  ]
  
  const toggleFlip = (index: number) => {
    const newFlipped = new Set(flippedCards)
    if (newFlipped.has(index)) {
      newFlipped.delete(index)
    } else {
      newFlipped.add(index)
    }
    setFlippedCards(newFlipped)
  }
  
  return (
    <section className="py-20 border-t border-[var(--border-color)]">
      <div className="max-w-4xl mx-auto px-4 lg:px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            🎮 Mini Kvizovi
          </h2>
          <p className="text-[var(--text-muted)]">
            Brza vježba za provjeru znanja
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('mcq')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'mcq'
                ? 'bg-[var(--accent-bg)] text-[var(--accent-text)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-[var(--bg-surface)] border border-[var(--border-color)]'
            }`}
          >
            MCQ
          </button>
          <button
            onClick={() => setActiveTab('truefalse')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'truefalse'
                ? 'bg-[var(--accent-bg)] text-[var(--accent-text)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-[var(--bg-surface)] border border-[var(--border-color)]'
            }`}
          >
            Točno / Netočno
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'flashcards'
                ? 'bg-[var(--accent-bg)] text-[var(--accent-text)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-[var(--bg-surface)] border border-[var(--border-color)]'
            }`}
          >
            Kartice
          </button>
        </div>
        
        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'mcq' && (
            <div className="grid gap-4">
              {mcqQuestions.map((item, i) => (
                <div key={i} className="card-modern p-5">
                  <p className="font-medium text-[var(--text-primary)] mb-3">{item.q}</p>
                  <p className="text-sm text-[var(--text-muted)]">
                    Odgovor: <span className="font-mono bg-[var(--border-color)] px-2 py-0.5 rounded">{item.a}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'truefalse' && (
            <div className="grid gap-4">
              {trueFalseQuestions.map((item, i) => (
                <div key={i} className="card-modern p-5">
                  <p className="font-medium text-[var(--text-primary)] mb-3">{item.statement}</p>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                    item.answer 
                      ? 'bg-green-500/10 text-green-600' 
                      : 'bg-red-500/10 text-red-600'
                  }`}>
                    {item.answer ? '✓ Točno' : '✗ Netočno'}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'flashcards' && (
            <div className="grid md:grid-cols-3 gap-4">
              {flashcards.map((card, i) => (
                <div
                  key={i}
                  onClick={() => toggleFlip(i)}
                  className={`flip-card cursor-pointer h-48 ${flippedCards.has(i) ? 'flipped' : ''}`}
                >
                  <div className="flip-card-inner">
                    <div className="flip-card-front card-modern p-5 flex items-center justify-center text-center h-full">
                      <p className="font-medium text-[var(--text-primary)]">{card.q}</p>
                    </div>
                    <div className="flip-card-back bg-[var(--accent-bg)] text-[var(--accent-text)] p-5 flex items-center justify-center text-center h-full">
                      <p className="text-sm">{card.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ============================================
// FAQ SECTION
// ============================================
function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  
  const faqs = [
    {
      q: 'Može li ovo zamijeniti moj kolegij iz Jave?',
      a: 'Ne! Gledaj na ovo kao na frenda za učenje, a ne profesora. Koristi ovo uz svoj faks za dodatnu vježbu i drugačiju perspektivu na teme.',
    },
    {
      q: 'Je li ovo besplatno?',
      a: 'Da! Sav sadržaj je potpuno besplatan.',
    },
    {
      q: 'Je li ovo za potpune početnike?',
      a: 'Najbolje je ako imaš neko osnovno predznanje programiranja. Pretpostavljamo da znaš što je varijabla i kako napisati for-petlju.',
    },
    {
      q: 'Trebam li IntelliJ ili mogu koristiti VS Code? 😅',
      a: 'Koristi što god ti paše! IntelliJ, VS Code, Eclipse, Notepad ako si hrabar... Koncepti su isti svugdje.',
    },
  ]
  
  return (
    <section id="faq" className="py-20 border-t border-[var(--border-color)] bg-[var(--bg-surface)]">
      <div className="max-w-3xl mx-auto px-4 lg:px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            ❓ Česta Pitanja
          </h2>
          <p className="text-[var(--text-muted)]">
            Imaš pitanja? Imamo odgovore.
          </p>
        </div>
        
        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-[var(--border-color)] rounded-lg overflow-hidden bg-[var(--bg-primary)]"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--border-color)] transition-colors"
              >
                <span className="font-medium text-[var(--text-primary)]">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-[var(--text-muted)] transition-transform flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 text-[var(--text-muted)] leading-relaxed border-t border-[var(--border-color)] pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// FOOTER SECTION
// ============================================
function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="font-semibold text-[var(--text-primary)]">GenZ</span>
            <span className="text-[var(--text-muted)]">Java</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              GitHub
            </a>
            <a 
              href="mailto:contact@example.com"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              Kontakt
            </a>
            <a 
              href="https://buymeacoffee.com/aivanovic"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              Kupi mi kavu ☕
            </a>
          </div>
          
          <p className="text-sm text-[var(--text-muted)]">
            © 2025 GenZ Java
          </p>
        </div>
      </div>
    </footer>
  )
}
