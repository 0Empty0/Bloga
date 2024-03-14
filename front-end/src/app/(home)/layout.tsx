import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <>
    <header></header>
    <main>{children}</main>
    <footer></footer>
  </>;
}
