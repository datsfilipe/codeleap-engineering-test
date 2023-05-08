'use client'

import { type KeyboardEvent, useEffect, useRef } from 'react'

type Modal = {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  darkBg?: boolean;
  onClickOutside?: () => void;
};

export default function Modal({ onClickOutside, darkBg, isOpen, title, children }: Modal) {
  const modal = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClickOutside && onClickOutside()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modal.current && !modal.current.contains(e.target)) {
        onClickOutside && onClickOutside()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [onClickOutside])

  if (!isOpen) return null

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className={`fixed inset-0 ${darkBg ? 'bg-muted bg-opacity-80' : 'bg-transparent'}`} />
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all max-w-2xl w-full" ref={modal}>
          <div className="p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-[22px] leading-6 font-bold text-black">
                {title}
              </h3>
            </div>
            <div className="space-y-4 mt-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
