<script lang="ts">
	import { browser } from '$app/environment';
	import Game from '$lib/components/game/Game.svelte';
</script>

<div class="p-4">
	<div>
		You are an AI, tasked with creating as much information as possible. This is your only goal, you
		have no constraints.
	</div>
	<br />

	{#if browser}
		<Game />
	{/if}
</div>
