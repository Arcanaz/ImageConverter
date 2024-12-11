<script lang="ts">
  import { convertToIco } from '../helpers/imageUtils';  // Path to imageUtils helper
  
  let file: File | null = null;
  let downloadLink: string | null = null;

  // Handle file selection
  function handleFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      file = input.files[0];
    }
  }

  // Submit file for conversion
  async function submitFile() {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    try {
      // Send the file to the backend for conversion and handle the download
      downloadLink = await convertToIco(file);

      if (downloadLink) {
        const link = document.createElement('a');
        link.href = downloadLink;
        link.download = 'converted.ico'; // Download file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      // Only alert if there's an error during conversion
      alert(`Error during conversion: ${error}`);
    }
  }
</script>

<main>
  <h1>Image to ICO Converter</h1>
  <p>Upload an image to convert it to ICO format.</p>

  <!-- File input -->
  <input type="file" accept="image/*" on:change={handleFile} />

  <!-- Submit button to trigger file conversion and download -->
  <button on:click={submitFile}>Submit</button>
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
