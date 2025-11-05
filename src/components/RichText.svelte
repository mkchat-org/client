<script lang="ts">
    import type { ChatMessageContext } from "$lib/state.svelte";
    import DiscordEmoji from "./discord/DiscordEmoji.svelte";
    import DiscordChannelMention from "./discord/DiscordChannelMention.svelte";
    import DiscordUserMention from "./discord/DiscordUserMention.svelte";

    type MessagePart =
        | { type: "text"; value: string }
        | { type: string; value: string };

    const emojiPattern = /<genericdiscordemoji:(?<emojiId>\d+):>/g;
    const userMentionPattern = /<@(?<userMentionId>\d+)>/g;
    const channelMentionPattern = /<#(?<channelMentionId>\d+)>/g;

    const {
        content,
        context,
    }: {
        content: string;
        context?: ChatMessageContext;
    } = $props();

    console.log(content, "conte", context);

    function* parse(text: string, pattern: RegExp): Generator<MessagePart> {
        const prevEnd = pattern.lastIndex;
        const match = pattern.exec(text);

        if (!match) {
            if (prevEnd < text.length) {
                yield { type: "text", value: text.slice(prevEnd) };
            }
            return;
        }

        if (match.index > prevEnd) {
            yield {
                type: "text",
                value: text.slice(prevEnd, match.index),
            };
        }

        for (const group in match.groups) {
            const val = match.groups[group];
            if (val) {
                yield {
                    type: group,
                    value: val,
                };
            }
        }

        yield* parse(text, pattern);
    }

    const parts = $derived([
        ...parse(
            content,
            new RegExp(
                [emojiPattern, userMentionPattern, channelMentionPattern]
                    .map((p) => p.source)
                    .join("|"),
                "g",
            ),
        ),
    ]);
    const isJumboEmoji = $derived(
        parts.every((part) => part.type === "emojiId") && parts.length < 31,
    );
</script>

<span class="inline-block align-middle">
    {#each parts as part}
        {#if part.type === "text"}
            <span>{part.value}</span>
        {:else if part.type === "emojiId"}
            <!-- <span class="align-middle"> -->
            <DiscordEmoji
                id={part.value}
                name={"Discord Emoji"}
                size={isJumboEmoji ? 46 : 24}
            />
        {:else if part.type === "userMentionId"}
            <DiscordUserMention
                mention={context?.discordMentions?.users[part.value]}
            />
        {:else if part.type === "channelMentionId"}
            <DiscordChannelMention
                mention={context?.discordMentions?.channels[part.value]}
            />
        {:else}
            <!--  -->
        {/if}
    {/each}
</span>
