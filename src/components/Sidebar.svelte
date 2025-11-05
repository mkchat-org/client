<script lang="ts">
    import { room } from "$lib/state.svelte";
    import DicebearAvatar from "./DicebearAvatar.svelte";
</script>

<div
    class="bg-stone-900 h-full border border-stone-800 w-fit divide-y divide-stone-800"
>
    <div class="w-80 opacity-0 text-transparent bg-transparent h-0">
        __spacekeeper
    </div>
    <div class="py-2 px-3 w-full">
        <span>#{room.name}</span>
    </div>
    <div class="flex flex-col w-full">
        {#each room.users as user}
            <div class="flex items-center w-full p-1 gap-1 hover:bg-stone-800">
                <div
                    class="bg-linear-180 to-stone-500/15 from-stone-900 rounded-sm overflow-hidden h-fit w-fit"
                >
                    <DicebearAvatar
                        size={36}
                        seed={user.alias}
                        hairColor={user.color}
                    />
                </div>
                <span>{user.alias}</span>
            </div>
        {/each}
    </div>
</div>
