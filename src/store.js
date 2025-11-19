import { create } from 'zustand'

const useStore = create((set) => ({
    brightness: 1.0,
    setBrightness: (val) => set({ brightness: val }),

    insight: null,
    setInsight: (text) => set({ insight: text }),
    clearInsight: () => set({ insight: null }),
}))

export default useStore
