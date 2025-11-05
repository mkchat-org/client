<script lang="ts">
    const { id, name, size = 24 } = $props();
    const src = `https://via.mkchat.org/external/discord/emojis/${id}.png`;
    const alt = name || "Discord Emoji";
</script>

<img
    class="rounded-none inline-block"
    {src}
    {alt}
    height="{size}px"
    width="{size}px"
/>
