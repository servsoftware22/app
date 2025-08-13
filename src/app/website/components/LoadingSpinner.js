export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-orange-500 mx-auto mb-6"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Loading Website
        </h2>
        <p className="text-gray-600">
          Please wait while we generate your website...
        </p>
      </div>
    </div>
  );
}
