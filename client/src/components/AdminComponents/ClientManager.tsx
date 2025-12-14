import type { Client } from "../../types";

interface ClientManagerProps {
  clients: Client[];
  API: string;
  onRefresh?: () => void;
}

export default function ClientManager({
  clients,
  API,
  onRefresh,
}: ClientManagerProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Clients</h3>
          <p className="text-sm text-gray-500">
            View existing clients and their roles.
          </p>
        </div>
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            className="px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Refresh
          </button>
        )}
      </div>

      {clients.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500">
          No clients yet. Use Add Client to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {clients.map((client) => (
            <div
              key={client._id}
              className="border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 border border-gray-200 flex-shrink-0">
                  {client.image ? (
                    <img
                      src={`${API}/${client.image}`}
                      alt={client.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      No image
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {client.name}
                  </p>
                  <p className="text-sm text-gray-600">{client.designation}</p>
                  <p className="text-xs text-gray-500">{client.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
