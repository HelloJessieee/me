import { create } from 'zustand';

interface SceneState {
  sceneIndex: number;
  setSceneIndex: (idx: number) => void;
  nextScene: () => void;
  prevScene: () => void;
}

export const useSceneStore = create<SceneState>((set: (state: Partial<SceneState>) => void, get: () => SceneState) => ({
  sceneIndex: 0,
  setSceneIndex: (idx: number) => set({ sceneIndex: idx }),
  nextScene: () => {
    const next = Math.min(get().sceneIndex + 1, 4);
    set({ sceneIndex: next });
  },
  prevScene: () => {
    const prev = Math.max(get().sceneIndex - 1, 0);
    set({ sceneIndex: prev });
  },
})); 