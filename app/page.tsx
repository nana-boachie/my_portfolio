import Image from "next/image";
import Repos from "./components/Repos";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <Repos />
    </main>
  );
}
