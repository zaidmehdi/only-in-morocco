export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-4xl px-3 py-8 sm:px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="text-sm text-gray-600">
            <p>
              Built by{" "}
              <a
                href="https://x.com/herrrolii"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                @herrrolii
              </a>
              <span className="mx-4">•</span>
              Find your country in{" "}
              <a
                href="https://onlyincountry.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                onlyincountry.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 