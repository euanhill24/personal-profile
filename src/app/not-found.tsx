import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="text-center px-6">
        <h1 className="text-[clamp(4rem,10vw,8rem)] font-black text-primary/20 leading-none">
          404
        </h1>
        <p className="text-xl font-semibold text-text mt-4 mb-2">
          Page not found
        </p>
        <p className="text-text-muted mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex bg-primary text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
