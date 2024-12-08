<template>
    <div class="home text-center">
      <h1 class="mb-4 text-primary">Note Nest</h1>
      <NoteForm @note-added="fetchNotes" />
      <NoteList 
        :notes="notes" 
        @note-updated="fetchNotes" 
        @note-deleted="fetchNotes" 
      />
    </div>
  </template>
  
  <script>
  import { collection, getDocs } from "firebase/firestore";
  import { db } from "@/firebase/firebaseConfig";
  import NoteForm from "@/components/NoteForm.vue";
  import NoteList from "@/components/NoteList.vue";
  
  export default {
    name: "Home",
    components: { NoteForm, NoteList },
    data() {
      return {
        notes: [],
      };
    },
    methods: {
      async fetchNotes() {
        const querySnapshot = await getDocs(collection(db, "notes"));
        this.notes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      },
    },
    mounted() {
      this.fetchNotes();
    },
  };
  </script>
  