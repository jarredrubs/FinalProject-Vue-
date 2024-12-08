<template>
    <div class="note-list row">
      <NoteItem 
        v-for="note in notes" 
        :key="note.id" 
        :note="note" 
        class="col-md-4 mb-3"
        @note-updated="handleUpdate"
        @note-deleted="handleDelete"
      />
    </div>
  </template>
  
  <script>
  import NoteItem from "@/components/NoteItem.vue";
  
  export default {
    name: "NoteList",
    props: ["notes"],
    components: { NoteItem },
    methods: {
      handleUpdate() {
        this.$emit("note-updated");
      },
      handleDelete() {
        this.$emit("note-deleted");
      },
    },
  };
  </script>
  