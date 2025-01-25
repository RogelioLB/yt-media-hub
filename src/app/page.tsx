import { DownloadCard } from "@/components/download-card";
export default function App() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 text-black">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-3 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent animate-gradient">
          YT Media Hub
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Simple video and audio downloads powered by yt-converter
        </p>
        <DownloadCard />
      </div>
    </main>
  );
}
