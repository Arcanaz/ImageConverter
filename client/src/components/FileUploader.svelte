<script lang="ts">
  export let onFileSelect: (file: File) => void;

  // Explicitly specify the event type as ChangeEvent
  function handleFile(event: Event) {
    const input = event.target as HTMLInputElement;

    // Make sure to type check if the file is present
    if (input.files && input.files[0]) {
      const file: File = input.files[0]; // Add type declaration here
      onFileSelect(file); // Pass file to the parent component
    }
  }
</script>

<div class="uploader">
  <input type="file" accept="image/*" on:change={handleFile} />
</div>

<style>
  .uploader {
    text-align: center;
    margin: 20px auto;
  }

  input[type="file"] {
    margin-top: 10px;
  }
</style>
