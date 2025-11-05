<script lang="ts">
    import { room } from "$lib/state.svelte";
    import Command from "phosphor-svelte/lib/Command";
    import Folder from "phosphor-svelte/lib/Folder";
    import Gif from "phosphor-svelte/lib/Gif";
    import PaperPlaneRight from "phosphor-svelte/lib/PaperPlaneRight";
    import Smiley from "phosphor-svelte/lib/Smiley";

    let { onsubmit, content = $bindable("") } = $props();

    let root: HTMLFormElement;
    let attachmentInput: HTMLInputElement;

    let dragover = $state(false);

    const ondragenter = (event: DragEvent) => {
        if (!dragover) dragover = true;
    };
    const ondragover = (event: DragEvent) => event.preventDefault();
    const ondragleave = (event: DragEvent) => {
        if (
            event.relatedTarget === null ||
            !root.contains(event.relatedTarget as Node)
        ) {
            dragover = false;
            console.log("Drag left parent area");
        }
    };
    const ondrop = (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        dragover = false;
    };

    const onCommandClick = (event: MouseEvent) => {};
    const onAttachClick = (event: MouseEvent) => attachmentInput.click();
    const onGifClick = (event: MouseEvent) => {};
    const onEmojiClick = (event: MouseEvent) => {};
</script>

<form
    class="bg-stone-900 w-full h-fit border border-stone-800 -outline-offset-4"
    class:outline={dragover}
    class:outline-emerald-500={dragover}
    {ondragenter}
    {ondragover}
    {ondragleave}
    {ondrop}
    {onsubmit}
    bind:this={root}
>
    <div class="flex flex-row border-b border-stone-800 text-lg">
        <button
            type="button"
            class="border-r border-stone-800 p-2 hover:bg-stone-800 cursor-pointer"
        >
            <Command />
        </button>
        <button
            onclick={onAttachClick}
            type="button"
            class="border-r border-stone-800 p-2 hover:bg-stone-800 cursor-pointer"
            ><Folder weight="fill" />
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
    <div class="flex flex-row">
        <input
            type="file"
            class="hidden"
            name="attachments"
            bind:this={attachmentInput}
            multiple
        />
        <input
            bind:value={content}
            type="text"
            placeholder="Message #{room.name}"
            name="text-content"
            class="text-sm w-full border-none p-3 z-1 grow transition-all duration-200 ease-in-out border border-stone-800 outline outline-transparent focus:outline-emerald-500 -outline-offset-[5px] focus-ring-violet"
        />
        <button
            type="submit"
            class="border-l border-stone-800 text-xl py-2 px-3 hover:bg-stone-800 cursor-pointer"
        >
            <PaperPlaneRight weight="fill" />
        </button>
    </div>
</form>
<!-- #5ab290 -->
