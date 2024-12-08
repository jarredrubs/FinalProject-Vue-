<template>
    <form @submit.prevent="addNote" class="mb-4">
      <div class="mb-3">
        <input 
          type="text" 
          class="form-control" 
          v-model="title" 
          placeholder="Title" 
          required 
        />
      </div>
      <div class="mb-3">
        <textarea 
          class="form-control" 
          v-model="content" 
          placeholder="Content" 
          rows="3" 
          required
        ></textarea>
      </div>
      <button class="btn btn-primary">Add Note</button>
    </form>
  </template>
  
  <script>
  import { collection, addDoc } from "firebase/firestore";
  import { db } from "@/firebase/firebaseConfig";
  
  export default {
    name: "NoteForm",
    data() {
      return {
        title: "",
        content: "",
      };
    },
    methods: {
      async addNote() {
        await addDoc(collection(db, "notes"), {
          title: this.title,
          content: this.content,
        });
        this.title = "";
        this.content = "";
        this.$emit("note-added");
      },
    },
  };
  </script>
  