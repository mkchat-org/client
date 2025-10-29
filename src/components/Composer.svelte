<script lang="ts">
    import { room } from "$lib/state.svelte";
    import Command from "phosphor-svelte/lib/Command";
    import Folder from "phosphor-svelte/lib/Folder";
    import Gif from "phosphor-svelte/lib/Gif";
    import PaperPlaneRight from "phosphor-svelte/lib/PaperPlaneRight";
    import Smiley from "phosphor-svelte/lib/Smiley";

    let { onsubmit, content = $bindable("") } = $props();
</script>

<div class="bg-stone-900 w-full h-fit border border-stone-800">
    <div class="flex flex-row border-b border-stone-800 text-lg">
        <button
            type="button"
            class="border-r border-stone-800 p-2 hover:bg-stone-800 cursor-pointer"
        >
            <Command />
        </button>
        <button
            type="button"
            class="border-r border-stone-800 p-2 hover:bg-stone-800 cursor-pointer"
        >
            <Folder weight="fill" />
        </button>
        <button
            type="button"
            class="border-r border-stone-800 p-2 hover:bg-stone-800 cursor-pointer"
        >
            <Gif weight="fill" />
        </button>
        <button
            type="button"
            class="border-r border-stone-800 p-2 hover:bg-stone-800 cursor-pointer"
        >
            <Smiley weight="fill" />
        </button>
    </div>
    <form class="flex flex-row" {onsubmit}>
        <input
            bind:value={content}
            type="text"
            placeholder="Message #{room.name}"
            name="message-content"
            class="text-sm w-full border-none p-3 z-1 grow transition-all duration-200 ease-in-out border border-stone-800 outline outline-transparent focus:outline-emerald-500 -outline-offset-[5px] focus-ring-violet"
        />
        <button
            type="submit"
            class="border-l border-stone-800 text-xl py-2 px-3 hover:bg-stone-800 cursor-pointer"
        >
            <PaperPlaneRight weight="fill" />
        </button>
    </form>
</div>
<!-- #5ab290 -->
