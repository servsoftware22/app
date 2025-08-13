import Link from "next/link";

export default function AuthHeader({ currentStep, totalSteps, stepTitle }) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-x-4 self-stretch lg:gap-x-6">
          <Link href="/" className="flex items-center">
            <img
              src="/logos/ToolpageIcon.png"
              alt="Toolpage"
              className="h-6 mb-1 w-auto"
            />
            <span
              className="ml-2 text-xl font-semibold text-[#191C27]"
              style={{ fontFamily: "Fustat, sans-serif" }}
            >
              ToolPage
            </span>
          </Link>
          <div className="flex flex-1" />
          {currentStep && totalSteps ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#848D6F]">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#FF5E00]/10 text-[#FF5E00]">
                {stepTitle || "Setup"}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
