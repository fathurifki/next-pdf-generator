import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types/user'

interface PdfState {
  selectedUser: User | null
  template: 'professional' | 'modern'
  isPdfPreviewOpen: boolean
  editModal: boolean
  listData: User[]
  detailUserData: User | null
  setSelectedUser: (user: User | null) => void
  setTemplate: (template: 'professional' | 'modern') => void
  setIsPdfPreviewOpen: (isOpen: boolean) => void
  setEditModal: (isOpen: boolean) => void
  setListData: (listData: User[]) => void
  setDetailUserData: (detailUserData: User | null) => void
  resetState: () => void
}

const initialState = {
  selectedUser: null,
  template: 'professional' as const,
  isPdfPreviewOpen: false,
  editModal: false,
  listData: [],
  detailUserData: null,
}

export const usePdfStore = create<PdfState>()(
  persist(
    (set) => ({
      ...initialState,
      setSelectedUser: (user) => set({ selectedUser: user }),
      setTemplate: (template) => set({ template }),
      setIsPdfPreviewOpen: (isOpen) => set({ isPdfPreviewOpen: isOpen }),
      setEditModal: (isOpen) => set({ editModal: isOpen }),
      setListData: (listData) => set({ listData }),
      setDetailUserData: (detailUserData) => set({ detailUserData }),
      resetState: () => set(initialState),
    }),
    {
      name: 'pdf-storage',
    }
  )
) 