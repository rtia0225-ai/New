import { startConversation } from "../actions";

export default function NewConversationPage({ searchParams }) {
  const artisanId = searchParams?.artisan;

  return (
    <div className="mx-auto max-w-md text-center">
      <h1 className="mb-4 text-xl font-bold text-brand-dark">
        Démarrer la conversation
      </h1>
      <form action={startConversation}>
        <input type="hidden" name="artisanId" value={artisanId} />
        <button
          type="submit"
          className="rounded-lg bg-brand px-6 py-2 font-medium text-white hover:bg-brand-dark"
        >
          Envoyer un premier message
        </button>
      </form>
    </div>
  );
}
