<script>
  // import svelteLogo from './assets/svelte.svg'
  // import viteLogo from '/vite.svg'
  // import Counter from './lib/Counter.svelte'
  import Home from "./lib/routes/Home.svelte";
  import Products from "./lib/routes/Products.svelte";
  import { Router } from "@mateothegreat/svelte5-router";
  import User from "./lib/routes/User.svelte";
  import EditProduct from "./lib/routes/EditProduct.svelte";
  import Create from "./lib/routes/Create.svelte";
  import Profile from "./lib/routes/Profile.svelte";

  const routes = [
    {
      path: "/",
      component: Home,
    },
    {
      path: "products",
      component: Products,
    },
    {
      path: "products/(?<param1>.*)",
      component: User,
    },
    {
      path: "profile",
      component: Profile,
    },

    {
      path: "create",
      component: Create,
    },
    {
      path: "edit/(?<param1>.*)",
      component: EditProduct,
    },
  ];
</script>

<Router {routes} />
