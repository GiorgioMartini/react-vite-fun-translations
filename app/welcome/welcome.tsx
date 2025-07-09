// Using a single logo from the public folder. The `dark:invert` class turns it white in dark mode.

export function Welcome() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="flex flex-col items-center gap-8">
        <div className="w-[500px] max-w-full">
          <img
            src="/noxtua.webp"
            alt="Noxtua Logo"
            className="w-full dark:invert"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 text-center">
          Jorge Martinez - Coding Challenge for Frontend Developer Position
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-center max-w-prose">
          Explore the Fun Translations demo app and see the translator in
          action.
        </p>
        <a
          href="/translate"
          className="px-6 py-3 rounded-md transition-colors text-amber-900 dark:text-amber-100 bg-amber-50 dark:bg-amber-900 border border-amber-400 dark:border-amber-600 hover:bg-amber-100 dark:hover:bg-amber-800"
        >
          Go to Translations
        </a>
      </div>
    </main>
  );
}
