import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../../__root";
import { CustomerShell } from "@/components/customer-shell";

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

function AboutPage() {
  return (
    <CustomerShell>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-display text-4xl mt-2">About Us</h1>
        <p className="mt-4 text-muted-foreground">Premium on-demand laundry service in Pakistan.</p>
      </section>
    </CustomerShell>
  );
}
