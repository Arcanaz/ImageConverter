<script lang="ts">
  let file: File | null = null;

  // Handle file selection
  function handleFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      file = input.files[0];
    }
  }

  async function submitFile() {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      // Send the image to the backend
      const response = await fetch("http://localhost:5000/convert", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to convert the image");
      }

      // Set the response as an ICO file
      const blob = await response.blob();
      const icoUrl = URL.createObjectURL(blob);

      // Create a download link and trigger the download
      const link = document.createElement("a");
      link.href = icoUrl;
      link.download = "converted.ico";  // Name for the downloaded file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);  // Clean up

      // alert(`File converted and downloaded as converted.ico`);
    } catch (error) {
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
