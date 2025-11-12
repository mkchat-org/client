<script lang="ts">
    import "@fontsource/geist";
    import Composer from "../components/Composer.svelte";
    import Multiplexer from "../components/Multiplexer.svelte";
    import Sidebar from "../components/Sidebar.svelte";
    import {
        room,
        UserRole,
        type ChatMessage,
        type ChatMessageContent,
    } from "$lib/state.svelte";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

    const time = new Date().toLocaleTimeString("en-US", {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    const logger = {
        info: (str: string) => {
            console.log(
                `%c[${time}] [INF] ${str}`,
                "color: #ffffff; background: #31C192; padding: .5rem; font-family: 'Lucida Console', monospace;",
            );
        },
        error: (str: string) => {
            console.log(
                `%c[${time}] [ERR] ${str}`,
                "color: #ffffff; background: #BE454F; padding: .5rem; font-family: 'Lucida Console', monospace;",
            );
        },
    };

    onMount(() => {
        const ws = new WebSocket("ws://localhost:4003/ws");
        // const ws = new WebSocket("wss://mkchat.net");
        window.ws = ws;

        ws.onopen = () => {
            logger.info("Websocket Connection Opened");

            ws.send(
                JSON.stringify({
                    type: "join",
                    data: {
                        username: "Nickk",
                        room: "main",
                    },
                }),
            );
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const { type, [type]: _, ...data } = message;

            console.log(data);
            switch (type) {
                case "connect":
                    console.log(data);
                    break;
                case "message":
                    const userId = btoa(data.author);
                    const userRole = fetchUserRole(data.badge);
                    console.log(data.context);
                    room.messages.push({
                        author: {
                            id: userId,
                            alias: data.author || "Unknown User",
                            color: data.color
                                ? data.color.replace("#", "")
                                : "",
                            avatarURL:
                                userRole === UserRole.DiscordUser
                                    ? data.avatar
                                    : null,
                            role: userRole,
                        },
                        content: {
                            ...parseMessageText(data.text),
                            stickers: data.sticker ? [data.sticker] : [],
                        },
                        date: data.date,
                        referenceId: "0",
                        context: data.context || {},
                    });
                    break;
                case "updateusers":
                    room.users = data.users.map(({ username, color }) => {
                        const userId = btoa(username);
                        return {
                            id: userId,
                            alias: username,
                            color: color,
                            avatarURL: null,
                        };
                    });
                    break;
                default:
                    break;
            }
        };

        ws.onclose = (event) => {
            logger.error("Websocket Connection Closed");
            console.debug(event);
        };
    });

    let composerContent = "";

    const onComposerSubmit = (event: SubmitEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const textContent = formData.get("text-content");
        const attachments = formData.get("attachments");

        console.log(attachments);
        // for (const file of attachments) {
        //     console.debug("Composer File", file);
        // }

        composerContent = "";
        window.ws.send(
            JSON.stringify({
                type: "message",
                text: textContent,
            }),
        );
    };

    // const getTextContentFromDirtyText = (text: string): string => {
    //     if (!browser) return "";

    //     const parser = new DOMParser();
    //     const doc = parser.parseFromString(text, "text/html");
    //     return doc.body.textContent || "";
    // };

    const parseMessageText = (text: string): ChatMessageContent => {
        if (!browser) return { text: "" };

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const body = doc.body;

        for (const emojiEl of body.querySelectorAll<HTMLImageElement>(
            "img.discordEmoji",
        )) {
            if (!emojiEl.src) continue;
            const emojiId = emojiEl.src.split("/").pop()!.split(".")[0];
            emojiEl.replaceWith(emojiEl, `<genericdiscordemoji:${emojiId}:>`);
        }

        console.log(
            body.querySelectorAll<HTMLImageElement>("img.discordEmoji"),
        );

        return {
            text: body.textContent,
            attachments: Array.from(
                body.querySelectorAll<HTMLImageElement>("img.attachment"),
            ).map((attachmentEl) => {
                return {
                    name: attachmentEl.alt,
                    url: attachmentEl.src,
                };
            }),
        };
    };

    const fetchUserRole = (badgeData: string): UserRole => {
        const parsedStr = parseMessageText(badgeData).text.toLowerCase().trim();

        if (parsedStr === "discord user") return UserRole.DiscordUser;
        if (parsedStr === "system") return UserRole.System;
        return UserRole.Guest;
    };
</script>

<div
    class="bg-stone-950 w-screen overflow-hidden h-screen text-stone-100 flex p-3 gap-3"
>
    <div
        class="absolute lg:relative flex lg:p-0 pl-2 pt-12 lg:w-min w-full h-full overflow-hidden"
    >
        <Sidebar />
    </div>
    <div class="flex flex-col grow gap-3">
        <Multiplexer />
        <Composer onsubmit={onComposerSubmit} bind:content={composerContent} />
    </div>
</div>
