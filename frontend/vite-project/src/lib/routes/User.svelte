<script>
    import Layout from "../Layout.svelte";
    let { route } = $props();
    // console.log(route.result.path.params.param1);
    let id = $derived(route?.result?.path?.params?.param1 || "Loading...");
</script>

<Layout>
    <h1>User Page</h1>
    <p>Your id is: {id}</p>
</Layout>

<style>
    h1 {
        font-size: 10rem;
    }
    p {
        font-size: 4rem;
    }
</style>
