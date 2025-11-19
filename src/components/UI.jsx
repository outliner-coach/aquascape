import React from 'react'
import useStore from '../store'

export default function UI() {
    const brightness = useStore((state) => state.brightness)
    const setBrightness = useStore((state) => state.setBrightness)

    return (
        <div className="fixed inset-0 pointer-events-none">
            {/* Brightness Control */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-auto">
                <div className="bg-black/40 backdrop-blur-sm rounded-full px-8 py-4 flex items-center gap-4">
                    <span className="text-white/80 text-sm font-medium">Brightness</span>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={brightness}
                        onChange={(e) => setBrightness(parseFloat(e.target.value))}
                        className="w-48 h-2 bg-white/20 rounded-full appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-4
                     [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:bg-cyan-400
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:shadow-lg
                     [&::-webkit-slider-thumb]:shadow-cyan-400/50"
                    />
                </div>
            </div>
        </div>
    )
}
