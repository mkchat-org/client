<script lang="ts">
    import type { Attachment } from "$lib/state.svelte";

    const { attachment }: { attachment: Attachment } = $props();
</script>

<span class="flex h-full rounded-sm relative">
    <img
        class="h-full rounded-sm grow"
        src={attachment.url}
        alt={attachment.name}
    />
    <button class="absolute">hey</button>
</span>
