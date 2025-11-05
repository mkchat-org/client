<script lang="ts">
    import type { ChatMessageDiscordMentionUser } from "$lib/state.svelte";
    import ConditionalLink from "../ConditionalLink.svelte";

    const {
        mention = {} as ChatMessageDiscordMentionUser,
    }: {
        mention: ChatMessageDiscordMentionUser;
    } = $props();
</script>

<span
    class="px-1 bg-emerald-500/10 transition-colors hover:bg-emerald-500/25 rounded-sm text-emerald-500 inline"
>
    <ConditionalLink
        condition={"id" in mention}
        href="https://discord.com/users/{mention.id}"
        target="_blank"
    >
        <span>@</span>
        <span>{mention.username || "Unknown User"}</span>
    </ConditionalLink>
</span>
