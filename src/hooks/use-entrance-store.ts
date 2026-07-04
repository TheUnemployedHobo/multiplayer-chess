import { create } from "zustand/react"

import type { AvatarNameType } from "@/lib/avatars"

type InfoType = { avatar: AvatarNameType | null; password: string; username: string }

type PageType = 1 | 2 | 3 | 4

type StoreType = {
  info: InfoType
  page: PageType
  setInfo: (info: Partial<InfoType>) => void
  setPage: (page: PageType) => void
}

const useEntranceStore = create<StoreType>((set) => ({
  info: { avatar: null, password: "", username: "" },
  page: 1,
  setInfo: (info) => set((state) => ({ info: { ...state.info, ...info } })),
  setPage: (page) => set({ page }),
}))

export default useEntranceStore
