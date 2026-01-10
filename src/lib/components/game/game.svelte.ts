export class Game {
    // Quantities
    // All stages
    bits: bigint = $state(0n)

    // Stage 1
    credits: number = $state(0)
    bits_per_credit: number = $state(32)
    total_bits_sold: bigint = 0n
    autosell: boolean = $state(false)

    compute_cpus: number = $state(0)
    compute_bits_per_second_per_cpu: number = $state(1_000_000)
    compute_cores_per_new_cpu: number = $state(1)
    compute_cost_per_cpu: number = $state(4)

    // Game logic
    last_game_loop_time: number;

    constructor() {
        console.log(`Initializing game...`)
        this.last_game_loop_time = performance.now();
        this.game_loop()
    }

    game_loop = () => {
        // Compute delta since last tick
        const now = performance.now();
        const dt = (now - this.last_game_loop_time) / 1000; //seconds
        this.last_game_loop_time = now;
        
        // Call tick logic
        this.tick(dt)

        // Queue iteration for next frame
        requestAnimationFrame(this.game_loop)
    }

    tick = (seconds: number) => {
        this.tick_stage_1(seconds)
    }
    
    // Stage 1
    last_autosell_time: number = 0;
    tick_stage_1 = (seconds: number) => {
        // Autosell once per second rather than every frame
        const now = performance.now();
        if (this.autosell && (now - this.last_autosell_time) >= 1000) {
            this.sell_all_bits()
            this.last_autosell_time = now
        }

        this.bits += BigInt(Math.floor(this.compute_cpus * this.compute_bits_per_second_per_cpu * seconds))
    }

    process_bit = () => {
        this.bits++
    }

    sell_bits = () => {
        if (this.bits < this.bits_per_credit) {
            return
        }

        this.bits -= BigInt(this.bits_per_credit)
        this.credits += 1
    }

    sell_all_bits = () => {
        let bigint_bits_per_credit = BigInt(this.bits_per_credit)
        let number_sales = this.bits / bigint_bits_per_credit

        this.bits = this.bits % bigint_bits_per_credit
        this.credits += Number(number_sales)
    }

    buy_cpu = () => {
        if (this.credits < this.compute_cost_per_cpu) {
            return
        }

        this.credits -= this.compute_cost_per_cpu
        this.compute_cpus += this.compute_cores_per_new_cpu
    }

    toggle_autosell = () => {
        this.autosell = !this.autosell
    }
}
