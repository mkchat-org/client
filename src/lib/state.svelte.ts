export enum UserRole {
    System = -1,
    Guest = 0,
    AccountHolder,
    DiscordUser,
    DiscordModerator,
};

export interface User {
    id: string;
    alias: string;
    color: string;
    avatarURL?: string;
    role?: UserRole;
};

export interface Attachment {
    name: string;
    url: string;
};

export interface Sticker {
    type: number;
    url: string;
}

export interface ChatMessageContent {
    text: string;
    attachments?: Attachment[];
    stickers?: Sticker[];
};

export type ChatMessageDiscordMentionUser = {
    id: string;
    username: string;
    displayName: string;
};

export type ChatMessageDiscordMentionChannel = {
    id?: string;
    type: number;
    name: string;
    guildId?: string;
};

export interface ChatMessageDiscordMentions {
    users?: Record<string, ChatMessageDiscordMentionUser>;
    channels?: Record<string, ChatMessageDiscordMentionChannel>;
};

export interface ChatMessageContext {
    discordMentions?: ChatMessageDiscordMentions;
};

export interface ChatMessage {
    author: User;
    content: ChatMessageContent;
    date: string; // TODO: switch to unix timestamp
    referenceId?: string;
    context?: ChatMessageContext;
};

export interface RoomData {
    name: string;
    users: User[];
    messages: ChatMessage[];
};

export const chatMessages: ChatMessage[] = $state([]);

export const room: RoomData = $state({
    name: "main",
    // users: [
    //     {
    //         alias: "Nick",
    //         id: "random",
    //         color: "f09ff7"
    //     },
    //     {
    //         alias: "TheBobster",
    //         id: "random",
    //         color: "5ab290"
    //     },
    //     {
    //         alias: "Noob",
    //         id: "random",
    //         color: "74d0ec"
    //     },
    //     {
    //         alias: "Pelicant",
    //         id: "random",
    //         color: "e1be50"
    //     }
    // ],
    users: [],
    messages: []
});

// export const sideBarHidden: Boolean = $state(false);
