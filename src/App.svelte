<script lang="ts">
  import FileUploader from './components/FileUploader.svelte';
  import Preview from './components/Preview.svelte';

  let selectedFile: File | null = null;

  async function submitFile() {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/convert", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to convert the image.");
      }

      const blob = await response.blob();
      const icoUrl = URL.createObjectURL(blob);

      // Trigger file download
      const link = document.createElement("a");
      link.href = icoUrl;
      link.download = "converted.ico";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert(`Error during conversion: ${error}`);
    }
  }
</script>

<main>
  <h1>Image to ICO Converter</h1>
  <FileUploader onFileSelect={(file) => (selectedFile = file)} />

  {#if selectedFile}
    <Preview file={selectedFile} /> <!-- Pass the correct prop: file={selectedFile} -->
  {/if}

  <button on:click={submitFile}>Convert to ICO</button>
</main>

<style>
  main {
    text-align: center;
    margin: 50px auto;
    max-width: 500px;
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #ff3e00;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #e03500;
  }
</style>
