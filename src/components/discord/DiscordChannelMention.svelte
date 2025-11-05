<script lang="ts">
    import type { ChatMessageDiscordMentionChannel } from "$lib/state.svelte";
    import ConditionalLink from "../ConditionalLink.svelte";

    const {
        mention = {} as ChatMessageDiscordMentionChannel,
    }: {
        mention: ChatMessageDiscordMentionChannel;
    } = $props();
</script>

<span
    class="px-1 bg-emerald-500/10 transition-colors hover:bg-emerald-500/25 rounded-sm text-emerald-500 inline"
>
    <ConditionalLink
        condition={"guildId" in mention && "id" in mention}
        href="https://discord.com/channels/{mention.guildId}/{mention.id}"
        target="_blank"
    >
        <span>#</span>
        <span>{mention.name || "Unknown Channel"}</span>
    </ConditionalLink>
</span>
