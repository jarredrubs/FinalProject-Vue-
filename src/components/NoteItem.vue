<template>
    <div class="card note-item" :class="{ 'fade-in': fadeIn }">
      <div v-if="isEditing" class="card-body">
        <input 
          type="text" 
          class="form-control mb-2" 
          v-model="editTitle" 
        />
        <textarea 
          class="form-control mb-2" 
          v-model="editContent" 
          rows="3"
        ></textarea>
        <button class="btn btn-success btn-sm me-2" @click="saveNote">Save</button>
        <button class="btn btn-secondary btn-sm" @click="cancelEdit">Cancel</button>
      </div>
      <div v-else class="card-body">
        <h5 class="card-title">{{ note.title }}</h5>
        <p class="card-text">{{ note.content }}</p>
        <button class="btn btn-primary btn-sm me-2" @click="startEdit">Edit</button>
        <button class="btn btn-danger btn-sm" @click="deleteNote">Delete</button>
      </div>
    </div>
  </template>
  
  <script>
  import { doc, deleteDoc, updateDoc } from "firebase/firestore";
  import { db } from "@/firebase/firebaseConfig";
  
  export default {
    name: "NoteItem",
    props: ["note"],
    data() {
      return {
        isEditing: false,
        fadeIn: true,
        editTitle: this.note.title,
        editContent: this.note.content,
      };
    },
    methods: {
      startEdit() {
        this.isEditing = true;
      },
      cancelEdit() {
        this.isEditing = false;
        this.editTitle = this.note.title;
        this.editContent = this.note.content;
      },
      async saveNote() {
        const noteRef = doc(db, "notes", this.note.id);
        await updateDoc(noteRef, {
          title: this.editTitle,
          content: this.editContent,
        });
        this.isEditing = false;
        this.$emit("note-updated");
      },
      async deleteNote() {
        await deleteDoc(doc(db, "notes", this.note.id));
        this.$emit("note-deleted");
      },
    },
    mounted() {
      setTimeout(() => {
        this.fadeIn = false;
      }, 1000);
    },
  };
  </script>
  
  <style>
  .note-item {
    transition: all 0.5s ease-in-out;
  }
  .fade-in {
    opacity: 0;
    transform: translateY(10px);
  }
  </style>
  