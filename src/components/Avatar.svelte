<script lang="ts">
    const {
        url = "",
        alt = "Avatar",
        size = 64,
    }: {
        url: string;
        alt: string;
        size: number;
    } = $props();
</script>

<img class="rounded-sm" src={url} {alt} height="{size}px" width="{size}px" />
