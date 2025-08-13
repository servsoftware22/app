export default function UrbanTemplate() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎉 Subdomain Routing Working!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          This is a placeholder page for the Urban template.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700">
            Your website is successfully connected and routing through the
            subdomain.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Template: Urban | Status: Connected
          </p>
        </div>
      </div>
    </div>
  );
}
