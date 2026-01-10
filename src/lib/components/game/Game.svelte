<script lang="ts">
	import { Game } from './game.svelte';

	let game = new Game();
</script>

<div class="flex w-fit flex-col gap-4 rounded-xs border p-4">
	<div class="flex flex-col gap-4 rounded-xs border p-4">
		<div class="info">bits: {game.bits}</div>
		<div class="flex flex-wrap gap-4">
			<div class="info">credits: {game.credits}</div>
			<div class="info">cpus: {game.compute_cpus}</div>
		</div>
	</div>
	<div class="flex flex-col gap-4 rounded-xs border p-4">
		<button onclick={game.process_bit} class="button">process bit</button>
		<button onclick={game.sell_bits} class="button"
			>sell bits ({game.bits_per_credit} credits)</button
		>
		<button onclick={game.toggle_autosell} class="button"
			>{game.autosell ? 'cancel auto-sell' : 'auto-sell bits'}</button
		>
		<button onclick={game.buy_cpu} class="button"
			>buy cpu ({game.compute_cost_per_cpu} credits)</button
		>
	</div>
</div>
