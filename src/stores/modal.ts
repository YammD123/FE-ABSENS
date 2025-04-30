// stores/modal.ts
import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: () => ({
    activeModal: null as string | null, // menyimpan ID modal yang sedang dibuka
  }),
  actions: {
    openModal(id: string) {
      this.activeModal = id;
    },
    closeModal() {
      this.activeModal = null;
    },
    isOpen(id: string) {
      return this.activeModal === id;
    },
  },
});
