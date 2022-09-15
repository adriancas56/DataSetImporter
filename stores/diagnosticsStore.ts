import { defineStore } from "pinia";

export const useDiagnosticsStore = defineStore('diagnosticsStore', {
    state: () => ({ diagnostics: []}),
    getters: {
      getDiagnostics: (state) => state.diagnostics,
    },
    actions: {
      setDiagnostics(diagnostics) {
        this.diagnostics = diagnostics
      }
    }
  })