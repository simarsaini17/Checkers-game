import { Board } from "@/components/Board";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen gap-7 bg-gradient-to-b from-white to-slate-700">
      <Board />
    </div>
  );
}
