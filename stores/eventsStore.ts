import { defineStore } from "pinia";

export const useEventsStore = defineStore('eventsStore', {
    state: () => ({ events: []}),
    getters: {
      getEvents: (state) => state.events,
    },
    actions: {
      setEvents(events) {
        this.events = events
      }
    }
  })