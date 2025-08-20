export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Customer Reviews
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what our clients say about our services.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-8">
          <p className="text-gray-600 text-center">
            Customer reviews will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
}
