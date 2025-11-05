<script lang="ts">
    const { children, condition, href, target } = $props();
</script>

{#if condition}
    <a {href} {target}>
        {@render children?.()}
    </a>
{:else}
    {@render children?.()}
{/if}
