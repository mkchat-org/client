<script lang="ts">
    import { DotLottieSvelte } from "@lottiefiles/dotlottie-svelte";
    import { UserRole, type ChatMessage } from "$lib/state.svelte";
    import DicebearAvatar from "./DicebearAvatar.svelte";
    import Avatar from "./Avatar.svelte";
    import Trash from "phosphor-svelte/lib/Trash";
    import { marked } from "marked";
    import RichText from "./RichText.svelte";

    const { author, content, date, context }: ChatMessage = $props();
    const timeStr = new Date(date).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });

    function removeHtml(text: string) {
        if (!text) return "";

        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/`/g, "&#x60;")
            .replace(/\(/g, "&#40;")
            .replace(/\)/g, "&#41;");
    }
</script>

<div class="flex flex-row gap-2 p-2 hover:bg-stone-800 w-full h-fit relative">
    <!-- <div class="absolute bottom-full right-0">
        <button
            type="button"
            class="p-2 bg-stone-800 cursor-pointer text-red-500"
        >
            <Trash weight="fill" />
        </button>
    </div> -->
    <div
        class="bg-linear-180 to-stone-500/15 from-stone-900 rounded-sm overflow-hidden h-fit w-fit"
    >
        {#if author.avatarURL}
            <Avatar url={author.avatarURL} alt="Avatar URL" size={48} />
        {:else}
            <DicebearAvatar
                size={48}
                seed={author.alias}
                hairColor={author.color}
            />
        {/if}
    </div>
    <div class="flex flex-col w-full">
        <div class="flex flex-row gap-1 items-center">
            <span style="color: #{author.color};">{author.alias}</span>
            {#if author.role === UserRole.DiscordUser}
                <span
                    class="text-xs bg-stone-700 bg-linear-180 to-stone-700 from-stone-800 border border-stone-700 px-1 rounded-none"
                    >Discord User</span
                >
            {:else if author.role === UserRole.System}
                <span
                    class="text-xs bg-stone-700 bg-linear-180 to-stone-700 from-stone-800 border border-stone-700 px-1 rounded-none"
                    >System</span
                >
            {/if}
            <span class="text-xs text-stone-400">{timeStr}</span>
        </div>
        <span class="break-all">
            <RichText content={content.text} {context} />
        </span>
        <!-- <span class="break-all">{@html marked(removeHtml(content.text))}</span> -->
        {#if content.attachments && content.attachments.length}
            <div
                class="max-h-60 p-1 gap-1 flex flex-row overflow-y-hidden overflow-x-auto"
            >
                {#each content.attachments as attachment}
                    <img
                        class="h-full rounded-sm"
                        src={attachment.url}
                        alt={attachment.name}
                    />
                {/each}
            </div>
        {/if}
        {#if content.stickers && content.stickers.length}
            <div class="max-h-60 p-1 gap-1 flex flex-row">
                {#each content.stickers as sticker}
                    <div class="w-32 h-32 flex items-center justify-center">
                        {#if sticker.type === 1}
                            <img
                                class="w-full"
                                src={sticker.url}
                                alt="discord-sticker"
                            />
                        {:else}
                            <DotLottieSvelte
                                src={sticker.url}
                                backgroundColor="transparent"
                                speed={1}
                                autoplay
                                loop
                            />
                        {/if}
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>
