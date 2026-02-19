<script lang="ts">
    import type { ChatMessageContext } from "$lib/state.svelte";
    import DiscordEmoji from "./discord/DiscordEmoji.svelte";
    import DiscordChannelMention from "./discord/DiscordChannelMention.svelte";
    import DiscordUserMention from "./discord/DiscordUserMention.svelte";

    type MessagePart =
        | { type: "text"; value: string }
        | { type: string; value: string };

    const emojiPattern = /<genericdiscordemoji:(?<emojiId>\d+):>/;
    const userMentionPattern = /<@(?<userMentionId>\d+)>/;
    const channelMentionPattern = /<#(?<channelMentionId>\d+)>/;
    const urlPattern =
        /^(?<url>https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*))$/;
    const headingPattern = /^(?<heading>#\s+.*)$/;
    // const urlPattern =
    //     /^(?<url>(?<protocol>https?):\/\/(?:(?<subdomain>www)\.)?(?<domain>[-a-zA-Z0-9@:%._\+~#=]{1,256})\.(?<tld>[a-zA-Z0-9()]{1,6})\b(?<path>[-a-zA-Z0-9()@:%_\+.~#?&\/=]*))$/;

    const {
        content,
        context,
    }: {
        content: string;
        context?: ChatMessageContext;
    } = $props();

    console.log((() => content)(), "conte", (() => context)());

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
                [
                    headingPattern,
                    urlPattern,
                    emojiPattern,
                    userMentionPattern,
                    channelMentionPattern,
                ]
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
        {:else if part.type === "url"}
            <a
                class="text-blue-500 font-extralight hover:underline"
                rel="noreferrer noopener"
                title={part.value}
                href={part.value}
                target="_blank">{part.value}</a
            >
        {:else if part.type === "heading"}
            <h1 class="text-4xl font-bold leading-tight">
                {part.value.replace(/^#\s+/, "")}
            </h1>
        {:else}
            <!--  -->
        {/if}
    {/each}
</span>
