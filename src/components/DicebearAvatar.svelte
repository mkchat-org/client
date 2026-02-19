<script lang="ts">
    import Avatar from "./Avatar.svelte";

    const { seed = "", size = 64, hairColor = "000000" } = $props();
    const url = new URL(
        "https://via.mkchat.org/external/dicebear-avatars/lorelei/png",
    );
    url.searchParams.set("seed", seed);
    url.searchParams.set("size", "64"); // size.toString()
    url.searchParams.set("hairColor", hairColor);
</script>

<Avatar url={url.toString()} alt="Dicebear Avatar" {size} />
