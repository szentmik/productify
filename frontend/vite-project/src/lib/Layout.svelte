<script>
    import Navbar from "./components/Navbar.svelte";
    import { ClerkProvider } from "svelte-clerk/client";

    const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

    let { children } = $props();
</script>

<ClerkProvider {publishableKey}>
    <div class="min-h-screen bg-base-100">
        <Navbar />
        <main class="max-w-5xl mx-auto px-4 py-8">
        {@render children()}
        </main>
    </div>
</ClerkProvider>

<style>
</style>
