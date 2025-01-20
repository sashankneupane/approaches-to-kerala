'use client'

import { Dialog } from '@headlessui/react';
import { IoClose } from 'react-icons/io5';

type FilterModalProps = {
  isOpen: boolean
  onClose: () => void
  themes: string[]
  daytimes: string[]
  activeFilters: {
    themes: string[]
    daytime: string
  }
  setActiveFilters: (filters: {
    themes: string[]
    daytime: string
  }) => void
}

export default function FilterModal({
  isOpen,
  onClose,
  themes,
  daytimes,
  activeFilters,
  setActiveFilters
}: FilterModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full rounded-2xl bg-black/80 backdrop-blur-md p-6 border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-xl text-white/90">Filters</Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <IoClose className="w-5 h-5 text-white/70" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Themes Filter */}
            <div className="space-y-3">
              <h3 className="text-white/70 text-sm">Themes</h3>
              <div className="flex flex-wrap gap-2">
                {themes.map(theme => (
                  <button
                    key={theme}
                    onClick={() => {
                      const arr = activeFilters.themes
                      setActiveFilters({
                        ...activeFilters,
                        themes: arr.includes(theme) 
                          ? arr.filter(t => t !== theme)
                          : [...arr, theme]
                      })
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      activeFilters.themes.includes(theme)
                        ? 'bg-white text-purple-900 shadow-lg shadow-white/20'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            {/* Time of Day Filter */}
            <div className="space-y-3">
              <h3 className="text-white/70 text-sm">Time of Day</h3>
              <div className="flex flex-wrap gap-2">
                {daytimes.map(time => (
                  <button
                    key={time}
                    onClick={() => setActiveFilters({
                      ...activeFilters,
                      daytime: activeFilters.daytime === time ? '' : time
                    })}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      activeFilters.daytime === time
                        ? 'bg-white text-purple-900 shadow-lg shadow-white/20'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
