<script lang="ts">
  import FileUploader from './components/FileUploader.svelte';
  import Preview from './components/Preview.svelte';

  let selectedFile: File | null = null;
  let backendUrl = '';

  // Load backend URL dynamically
  async function loadBackendUrl() {
    try {
      const response = await fetch('/config.json'); // Adjust this path as necessary
      const config = await response.json();
      // Use 'host.docker.internal' for Docker container networking or fallback to localhost
      backendUrl = config.backendUrl || 'http://host.docker.internal:5000'; // Default fallback for Docker
    } catch (error) {
      console.error('Failed to load backend URL:', error);
      backendUrl = 'http://host.docker.internal:5000'; // Default fallback for Docker
    }
  }

  // Call the function to load the backend URL when the component initializes
  loadBackendUrl();

  async function submitFile() {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch(`${backendUrl}/convert`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to convert the image.');
      }

      const blob = await response.blob();
      const icoUrl = URL.createObjectURL(blob);

      // Trigger file download
      const link = document.createElement('a');
      link.href = icoUrl;
      link.download = 'converted.ico';
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
    <Preview file={selectedFile} />
  {/if}

  <button on:click={submitFile}>Convert to ICO</button>
</main>

<footer>
  <img src="/orange-brush-stroke.png" alt="Footer Decoration" class="footer-banner" />
</footer>

<style>
  /* Ensure the main content doesn't scroll unnecessarily */

  main {
    text-align: center;
    margin: 50px auto;
    max-width: 500px;
    position: relative;
    padding-bottom: 150px; /* Adjust space for footer height */
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #ff3e00;
    color: white;
    border: 1px solid black;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #b52e05;
  }

  /* Footer settings to position it at the bottom */
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 150px; /* Adjust height for footer */
    z-index: -1; /* Place it below other content */
    overflow: hidden; /* Only show the top part of the image */
  }

  .footer-banner {
    width: 100%;
    height: 200%; /* Stretch the image to zoom in */
    object-fit: cover;
    object-position: top; /* Focus on the top part of the image */
  }
</style>
