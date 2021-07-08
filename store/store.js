import create from 'zustand'

const useStore = create(set => ({
  bears: 0,
  bearName: 'Tim',
  changeName: (e) => set(state => ({ bearName: e.target.value })),
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 })
}))

export default useStore