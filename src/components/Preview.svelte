<script lang="ts">
  export let file: File | null = null;  // Declare the 'file' prop
  export let size: number = 256; // Default size for preview

  let previewSrc: string | null = null;

  // Generate the preview on canvas
  $: if (file) {
    generatePreview(file);
  }

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
          // This will stretch the image to cover the entire area
          ctx.clearRect(0, 0, size, size); // Clear any previous content
          ctx.drawImage(img, 0, 0, size, size);  // Force the image to fit the square

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
