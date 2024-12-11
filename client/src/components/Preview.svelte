<script lang="ts">
  export let file: File | null = null; // Declare the 'file' prop
  export let size: number = 256; // Default size for ICO preview

  let previewSrc: string | null = null;
  let originalSrc: string | null = null;
  let fileName: string = ""; // To store the file name with extension

  // Generate the preview on canvas
  $: if (file) {
    generatePreview(file);
  }

  // Function to generate preview of the image
  function generatePreview(file: File) {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const img = new Image();
      img.src = e.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (ctx) {
          // Set the canvas size to the preview size (default is 256x256)
          canvas.width = size;
          canvas.height = size;

          // Stretch or compress the image to fit the square canvas
          ctx.clearRect(0, 0, size, size); // Clear any previous content
          ctx.drawImage(img, 0, 0, size, size); // Force the image to fit the square

          // Generate the preview as a data URL for ICO preview
          previewSrc = canvas.toDataURL("image/png");

          // Also set the original image source for the left preview window
          originalSrc = e.target?.result as string;

          // Extract file name with extension
          fileName = file.name; // Keep the file extension
        }
      };
    };

    reader.readAsDataURL(file);
  }
</script>

<div class="preview-container">
  <!-- Original Image Preview (Left) -->
  <div class="preview-box">
    {#if originalSrc}
      <div class="preview-title">
        {fileName.length > 20 ? fileName.slice(0, 20) + "..." : fileName}
      </div>
      <img
        src={originalSrc}
        alt="Original Image Preview"
        class="preview original"
      />
    {/if}
  </div>

  <!-- ICO Preview (Right) -->
  <div class="preview-box">
    {#if previewSrc}
      <div class="preview-title">ICO Preview</div>
      <div class="preview-content">
        <img src={previewSrc} alt="ICO Image Preview" class="preview ico" />
      </div>
    {/if}
  </div>
</div>

<style>
  .preview-container {
    display: flex;
    justify-content: space-around;
    margin: 20px auto;
    align-items: flex-start; /* Align to the top */
  }

  .preview-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 256px;
    min-height: 320px;
    position: relative;
  }

  .preview-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    width: 100%;
    height: 256px; /* Match the original image container height */
  }

  .preview {
    display: block;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 10px;
  }

  .original {
    width: 256px;
    height: 256px;
    object-fit: contain;
  }

  .ico {
    width: 128px;
    height: 128px;
    object-fit: cover;
  }

  .preview-title {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    padding: 5px;
    border-radius: 4px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    width: fit-content;
    box-sizing: border-box;
    margin-bottom: 10px;
  }
</style>
