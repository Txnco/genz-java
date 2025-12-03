'use client'

import { useEffect, useState, useCallback } from 'react'
import { BadgeType } from '@prisma/client'

interface BadgeDefinition {
  type: BadgeType
  name: string
  description: string
  icon: string
  color: string
  gradient: string
}

const BADGES: Record<BadgeType, BadgeDefinition> = {
  FIRST_STEPS: {
    type: 'FIRST_STEPS',
    name: 'Prvi koraci',
    description: 'Odgovori na svoje prvo pitanje',
    icon: '🌱',
    color: '#22c55e',
    gradient: 'from-green-400 to-emerald-600',
  },
  KNOWLEDGE_SEEKER: {
    type: 'KNOWLEDGE_SEEKER',
    name: 'Tragač za znanjem',
    description: 'Odgovori na 50 pitanja',
    icon: '📚',
    color: '#3b82f6',
    gradient: 'from-blue-400 to-indigo-600',
  },
  JAVA_WARRIOR: {
    type: 'JAVA_WARRIOR',
    name: 'Java ratnik',
    description: 'Odgovori na 200 pitanja',
    icon: '⚔️',
    color: '#f59e0b',
    gradient: 'from-amber-400 to-orange-600',
  },
  STREAK_MASTER: {
    type: 'STREAK_MASTER',
    name: 'Majstor nizova',
    description: 'Postani aktivni 7 dana zaredom',
    icon: '🔥',
    color: '#ef4444',
    gradient: 'from-red-400 to-rose-600',
  },
  PERFECTIONIST: {
    type: 'PERFECTIONIST',
    name: 'Perfekcionist',
    description: 'Odgovori točno 10 pitanja zaredom',
    icon: '💎',
    color: '#8b5cf6',
    gradient: 'from-violet-400 to-purple-600',
  },
}

interface ConfettiPiece {
  id: number
  x: number
  color: string
  delay: number
  duration: number
  rotation: number
  scale: number
}

interface BadgePopupProps {
  badgeType: BadgeType | null
  onClose: () => void
}

export function BadgePopup({ badgeType, onClose }: BadgePopupProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const generateConfetti = useCallback(() => {
    const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#c56cf0', '#ff9ff3', '#54a0ff', '#5f27cd']
    const pieces: ConfettiPiece[] = []
    
    for (let i = 0; i < 100; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
      })
    }
    
    setConfetti(pieces)
  }, [])

  useEffect(() => {
    if (badgeType) {
      setIsVisible(true)
      setIsClosing(false)
      generateConfetti()
      
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        handleClose()
      }, 5000)
      
      return () => clearTimeout(timer)
    }
  }, [badgeType, generateConfetti])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      setConfetti([])
      onClose()
    }, 300)
  }

  if (!badgeType || !isVisible) return null

  const badge = BADGES[badgeType]

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="confetti-piece absolute"
            style={{
              left: `${piece.x}%`,
              backgroundColor: piece.color,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
              transform: `rotate(${piece.rotation}deg) scale(${piece.scale})`,
            }}
          />
        ))}
      </div>

      {/* Badge Card */}
      <div 
        className={`relative z-10 max-w-sm w-full mx-4 transform transition-all duration-500 ${
          isClosing ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={{ animation: 'badgeBounce 0.6s ease-out' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 text-center relative overflow-hidden">
          {/* Glow effect */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${badge.color}, transparent 70%)`,
            }}
          />
          
          {/* Sparkle decorations */}
          <div className="absolute top-4 left-4 text-2xl animate-pulse-soft">✨</div>
          <div className="absolute top-4 right-4 text-2xl animate-pulse-soft" style={{ animationDelay: '0.3s' }}>✨</div>
          <div className="absolute bottom-4 left-8 text-xl animate-pulse-soft" style={{ animationDelay: '0.6s' }}>⭐</div>
          <div className="absolute bottom-4 right-8 text-xl animate-pulse-soft" style={{ animationDelay: '0.9s' }}>⭐</div>
          
          {/* Content */}
          <div className="relative z-10">
            <p className="text-sm font-medium text-base-content/60 uppercase tracking-wider mb-4">
              Nova značka otključana!
            </p>
            
            {/* Badge Icon */}
            <div 
              className={`w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br ${badge.gradient} flex items-center justify-center shadow-lg`}
              style={{ 
                animation: 'badgeGlow 2s ease-in-out infinite',
                boxShadow: `0 0 40px ${badge.color}40`,
              }}
            >
              <span className="text-6xl" style={{ animation: 'iconBounce 0.6s ease-out 0.3s both' }}>
                {badge.icon}
              </span>
            </div>
            
            {/* Badge Name */}
            <h2 className="text-2xl font-bold mb-2">{badge.name}</h2>
            
            {/* Badge Description */}
            <p className="text-base-content/60 mb-6">{badge.description}</p>
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="btn-modern btn-modern-primary px-8"
            >
              Nastavi 🎉
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes badgeBounce {
          0% {
            transform: scale(0.3) translateY(50px);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes badgeGlow {
          0%, 100% {
            box-shadow: 0 0 30px ${badge.color}40;
          }
          50% {
            box-shadow: 0 0 50px ${badge.color}60;
          }
        }
        
        @keyframes iconBounce {
          0% {
            transform: scale(0) rotate(-180deg);
          }
          60% {
            transform: scale(1.2) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
          }
        }
        
        .confetti-piece {
          width: 10px;
          height: 10px;
          animation: confettiFall linear forwards;
        }
        
        .confetti-piece:nth-child(odd) {
          border-radius: 50%;
        }
        
        .confetti-piece:nth-child(even) {
          border-radius: 2px;
        }
        
        .confetti-piece:nth-child(3n) {
          width: 8px;
          height: 14px;
          border-radius: 2px;
        }
      `}</style>
    </div>
  )
}

// Hook to manage badge popup state
export function useBadgePopup() {
  const [earnedBadge, setEarnedBadge] = useState<BadgeType | null>(null)
  const [badgeQueue, setBadgeQueue] = useState<BadgeType[]>([])

  const showBadge = useCallback((badgeType: BadgeType) => {
    setBadgeQueue(prev => [...prev, badgeType])
  }, [])

  const showBadges = useCallback((badgeTypes: BadgeType[]) => {
    setBadgeQueue(prev => [...prev, ...badgeTypes])
  }, [])

  useEffect(() => {
    if (badgeQueue.length > 0 && !earnedBadge) {
      setEarnedBadge(badgeQueue[0])
      setBadgeQueue(prev => prev.slice(1))
    }
  }, [badgeQueue, earnedBadge])

  const closeBadge = useCallback(() => {
    setEarnedBadge(null)
  }, [])

  return {
    earnedBadge,
    showBadge,
    showBadges,
    closeBadge,
  }
}

