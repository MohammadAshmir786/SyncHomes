import type { Contact } from "@/types";

interface ContactResponsesProps {
  contacts: Contact[];
}

export default function ContactResponses({ contacts }: ContactResponsesProps) {
  return (
    <section className="mb-10 bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            📬 Contact Submissions
          </h2>
          <p className="text-sm text-gray-500">
            All inbound leads from the contact form.
          </p>
        </div>
        <span className="px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-full">
          {contacts.length} total
        </span>
      </div>

      {contacts.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
          No contact submissions yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                  {contact.name?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {contact.name}
                  </p>
                  <p className="text-sm text-gray-600 break-all">
                    {contact.email}
                  </p>
                  <p className="text-sm text-gray-600">{contact.phone}</p>
                  <p className="text-sm text-gray-500">{contact.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
