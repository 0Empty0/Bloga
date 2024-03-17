import Providers from "@/components/providers";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <>
    <Providers>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </Providers>
  </>;
}
