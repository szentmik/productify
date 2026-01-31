<script>
    import { route } from "@mateothegreat/svelte5-router";
    import {
        SignInButton,
        SignOutButton,
        SignUpButton,
        UserButton,
        useClerkContext,
    } from "svelte-clerk/client";
    import { ShoppingBagIcon, PlusIcon, UserIcon } from "@lucide/svelte";
    import ThemeSelector from "./ThemeSelector.svelte";

    const logoLink = { name: "Logo", path: "/" };
    let signedInLinks = $derived([
        { name: "New Product", path: "/create" },
        { name: "Profile", path: "/profile" },
    ]);

    const currentPath = $derived(window.location.pathname);

    const ctx = useClerkContext();

    const userId = $derived(ctx.auth?.userId);

    const userStatus = $derived(ctx.auth?.sessionStatus);
    const isSignedIn = $derived(userStatus === "active");
</script>

<nav class="navbar bg-base-300">
    <div class="max-w-5xl mx-auto w-full flex justify-between items-center">
        <a href={logoLink.path} use:route>
            <div class="flex gap-2 btn btn-ghost">
                <!-- LOGO  -->
                <ShoppingBagIcon class="size-6 text-primary" />
                <span
                    class="text-lg font-bold font-mono uppercase tracking-wide"
                    >Productify</span
                >
            </div>
        </a>
        {#if isSignedIn}
            <ul>
                <li><ThemeSelector /></li>
                {#each signedInLinks as link, i}
                    <li class="btn btn-sm gap-1 {i === signedInLinks.length - 1 ? 'btn-ghost' : 'btn-primary'}" class:active={currentPath === link.path}>
                        <a href={link.path} use:route>{link.name}</a>
                    </li>
                {/each}
            </ul>
        {:else}
            <ul>
                <li>
                    <SignInButton mode="modal">
                        <button class="btn btn-ghost btn-sm">Sign In</button>
                    </SignInButton>
                </li>
                <li>
                    <SignUpButton mode="modal">
                        <button class="btn btn-primary btn-sm">Sign Up</button>
                    </SignUpButton>
                </li>
            </ul>
        {/if}
    </div>
</nav>

<style>
    nav {
        display: flex;
        justify-content: end;
        width: 100%;
    }
    ul {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        list-style: none;
    }

    li {
        padding: 0.5rem 1rem;
    }
</style>
