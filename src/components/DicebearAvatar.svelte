<script lang="ts">
    const { seed = "", size = 64, hairColor = "000000" } = $props();
    const url = new URL(
        "https://via.mkchat.org/external/dicebear-avatars/lorelei/png",
    );
    url.searchParams.set("seed", seed);
    url.searchParams.set("size", size.toString());
    url.searchParams.set("hairColor", hairColor);
</script>

<img src={url.toString()} alt="Dicebear Avatar" />
