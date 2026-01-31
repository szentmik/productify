<script>
    import { PaletteIcon } from "@lucide/svelte";
    let themes = $state([
        "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autunm",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
        "dim",
        "nord",
        "sunset",
    ]);

    let theme = $state(
        (typeof window !== "undefined" && localStorage.getItem("theme")) ||
            "business",
    );
    $effect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    });
</script>

<div class="dropdown dropdown-start">
    <div tabindex="0" role="button" class="btn btn-ghost m-1">
        <PaletteIcon class="size-5" />
        <span class="hidden sm:inline">Theme</span>
    </div>
    <ul
        tabindex="-1"
        class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm max-h-96 overflow-y-auto flex-nowrap"
    >
        {#each themes as t}
            <li>
                <button class="flex justify-between {theme === t ? "bg-primary text-primary-content" :""}" onclick={() => (theme = t)}>
                    {t}
                    <div class="flex" data-theme={t}>
                    <span class="w-2 h-4 bg-primary"></span>
                    <span class="w-2 h-4 bg-secondary"></span>
                    <span class="w-2 h-4 bg-accent"></span>
                    <span class="w-2 h-4 bg-neutral"></span>
                    </div>
                </button>
            </li>
        {/each}
    </ul>
</div>
