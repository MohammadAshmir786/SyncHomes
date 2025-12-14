import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard(props: { API: string }) {
  const [projectCount, setProjectCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [subscriberCount, setSubscriberCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const [projects, clients, contacts, subscribers] = await Promise.all([
        axios.get(`${props.API}/projects`),
        axios.get(`${props.API}/clients`),
        axios.get(`${props.API}/contacts`),
        axios.get(`${props.API}/subscribers`),
      ]);
      setProjectCount(projects.data.length);
      setClientCount(clients.data.length);
      setContactCount(contacts.data.length);
      setSubscriberCount(subscribers.data.length);
    };
    fetchCounts();
  }, [props.API]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-600 text-sm font-semibold">Projects</p>
            <p className="text-2xl font-bold text-blue-700 mt-2">
              {projectCount}
            </p>
          </div>
          <span className="text-3xl">🏠</span>
        </div>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-600 text-sm font-semibold">Clients</p>
            <p className="text-2xl font-bold text-green-700 mt-2">
              {clientCount}
            </p>
          </div>
          <span className="text-3xl">👥</span>
        </div>
      </div>
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-yellow-600 text-sm font-semibold">Contacts</p>
            <p className="text-2xl font-bold text-yellow-700 mt-2">
              {contactCount}
            </p>
          </div>
          <span className="text-3xl">📬</span>
        </div>
      </div>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-600 text-sm font-semibold">Subscribers</p>
            <p className="text-2xl font-bold text-purple-700 mt-2">
              {subscriberCount}
            </p>
          </div>
          <span className="text-3xl">📧</span>
        </div>
      </div>
    </div>
  );
}
