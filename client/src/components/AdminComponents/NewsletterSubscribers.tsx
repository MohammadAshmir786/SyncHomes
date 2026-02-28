import type { Subscriber } from "@/types";

interface NewsletterSubscribersProps {
  subscribers: Subscriber[];
}

export default function NewsletterSubscribers({
  subscribers,
}: NewsletterSubscribersProps) {
  return (
    <section className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            📧 Newsletter Subscribers
          </h2>
          <p className="text-sm text-gray-500">Emails opted in to updates.</p>
        </div>
        <span className="px-3 py-1 text-sm font-semibold text-purple-700 bg-purple-50 border border-purple-200 rounded-full">
          {subscribers.length} total
        </span>
      </div>

      {subscribers.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
          No subscribers yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {subscribers.map((sub) => (
            <div
              key={sub._id}
              className="border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-semibold">
                  {sub.email?.charAt(0)?.toUpperCase() || "@"}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 break-all">
                    {sub.email}
                  </p>
                  <p className="text-xs text-gray-500">Subscribed</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
