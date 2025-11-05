<script>
    import Message from "./Message.svelte";
    import { room } from "$lib/state.svelte";
</script>

<div class="overflow-x-hidden overflow-y-auto grow">
    {#each room.messages as message}
        <Message
            author={message.author}
            content={message.content}
            date={message.date}
            context={message.context}
        />
    {/each}
</div>
