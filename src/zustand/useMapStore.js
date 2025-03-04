import { create } from 'zustand';
import { initialMapState } from './map/useMapState';
import { createMapActions } from './map/useMapActions';

export const useMapStore = create((set, get) => ({
  ...initialMapState, // 초기 상태
  ...createMapActions(set, get), // 액션 추가
}));
