<script lang="ts">
    import GridFour from "phosphor-svelte/lib/GridFour";
    import ArrowsOutLineHorizontal from "phosphor-svelte/lib/ArrowsOutLineHorizontal";

    const { children } = $props();

    let bHovered = $state(false);
    const toggleHover = () => (bHovered = !bHovered);
    let bGridLayout = $state(false);
    const toggleLayout = () => (bGridLayout = !bGridLayout);
</script>

<div
    class="relative min-h-10 w-fit"
    onmouseenter={toggleHover}
    onmouseleave={toggleHover}
>
    <div
        class:bHovered={"hidden"}
        class="absolute w-full h-full flex items-center justify-center"
    >
        <button
            onclick={toggleLayout}
            class="text-stone-200 rounded-md p-1 bg-stone-950/50 transition-all cursor-pointer"
        >
            {#if bGridLayout}
                <ArrowsOutLineHorizontal weight="regular" size={36} />
            {:else}
                <GridFour weight="regular" size={36} />
            {/if}
        </button>
    </div>
    {#if bGridLayout}
        <div class="grid grid-cols-4 w-2xl gap-1">
            {@render children?.()}
        </div>
    {:else}
        <div
            class="max-h-60 p-1 gap-1 flex flex-row overflow-y-hidden overflow-x-auto"
        >
            {@render children?.()}
        </div>
    {/if}
</div>
