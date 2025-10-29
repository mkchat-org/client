<script lang="ts">
    import { DotLottieSvelte } from "@lottiefiles/dotlottie-svelte";
    import type { ChatMessage } from "$lib/state.svelte";
    import DicebearAvatar from "./DicebearAvatar.svelte";

    const { author, content, date }: ChatMessage = $props();
    const timeStr = new Date(date).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });
</script>

<div class="flex flex-row gap-2 p-2 hover:bg-stone-800 w-full h-fit">
    <div class="bg-transparent rounded-sm overflow-hidden">
        {#if author.avatarURL}
            <img
                class="rounded-sm"
                src={author.avatarURL}
                height="48px"
                width="48px"
                alt="Avatar URL"
            />
        {:else}
            <DicebearAvatar
                size={48}
                seed={author.alias}
                hairColor={author.color}
            />
        {/if}
    </div>
    <div class="flex flex-col w-full">
        <div class="">
            <span style="color: #{author.color};">{author.alias}</span>
            <span class="text-xs text-stone-400">{timeStr}</span>
        </div>
        <span class="break-all">{content.text}</span>
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
                    <div class="w-32 h-32">
                        {#if sticker.type === 1}
                            <img
                                class="w-full h-full"
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
