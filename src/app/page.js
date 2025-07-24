export default function HomePage() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white aspect-square max-w-[500px] w-full shadow-lg p-4 flex items-center justify-center">
        <img
          src="/portrait.jpg"
          alt="Anton Krasnikov"
          className="object-contain max-h-full max-w-full"
        />
      </div>
    </div>
  );
}
