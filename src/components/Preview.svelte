<script lang="ts">
  export let file: File | null = null;  // Declare the 'file' prop
  export let size: number = 256; // Default size for preview

  let previewSrc: string | null = null;

  // Generate the preview on canvas whenever the file changes
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
          // Calculate aspect ratio and scaling
          const scale = Math.max(size / img.width, size / img.height); // Ensure the image scales to fill the canvas
          const x = (size - img.width * scale) / 2; // Center the image horizontally
          const y = (size - img.height * scale) / 2; // Center the image vertically

          // Fill the canvas with the image, scaling it to cover the entire square
          canvas.width = size;
          canvas.height = size;
          ctx.clearRect(0, 0, size, size); // Clear any previous content
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

          // Generate the preview as a data URL
          previewSrc = canvas.toDataURL("image/png");
        }
      };
    };

    reader.readAsDataURL(file);
  }
</script>

<div class="preview-container">
  {#if previewSrc}
    <img src={previewSrc} alt="Image Preview" class="preview" />
  {/if}
</div>

<style>
  .preview-container {
    text-align: center;
    margin: 20px auto;
  }

  .preview {
    display: block;
    width: 128px; /* Preview window size */
    height: 128px;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>
