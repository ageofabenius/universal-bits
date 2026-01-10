<script lang="ts">
	import { Game } from './Game.svelte.ts';
	let game = new Game();
</script>

<div>
    <div>
        <span>bits: </span>
        <span>{game.bits}</span>
    </div>
</div>