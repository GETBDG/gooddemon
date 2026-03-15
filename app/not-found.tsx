import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-shell flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
      <p className="eyebrow">404 / Lost in the ritual</p>
      <h1 className="font-serif text-5xl uppercase sm:text-6xl">The page is gone.</h1>
      <p className="max-w-xl text-bone/70">
        Some pieces disappear by design. Return to the home sequence or step into the current drop.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="rounded-full border border-bone/20 px-6 py-3 text-sm uppercase tracking-[0.18em] text-bone transition hover:border-bone/50"
        >
          Return Home
        </Link>
        <Link
          href="/collections/the-betrayal"
          className="rounded-full bg-bone px-6 py-3 text-sm uppercase tracking-[0.18em] text-abyss transition hover:bg-white"
        >
          Shop the Drop
        </Link>
      </div>
    </div>
  );
}
