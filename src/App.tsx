import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import { Provider } from "react-redux";
import store from "@/store";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScroll } from "@/components/smooth-scroll";

interface AppProps {
  queryClient: QueryClient;
}

export default function App({ queryClient }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SmoothScroll />
        <Outlet />
        <Toaster theme="light" position="top-right" richColors closeButton />
      </QueryClientProvider>
    </Provider>
  );
}
