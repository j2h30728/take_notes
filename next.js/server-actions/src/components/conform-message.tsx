export default function ConformMessage({ status, message }: { status: "success" | "error"; message: string }) {
  switch (status) {
    case "success":
      return (
        <div className={"w-full py-3 rounded-2xl flex gap-4 pl-7 *:font-semibold bg-green-300"}>
          <span className="border-2 border-stone-800 rounded-full size-6 flex justify-center items-center">✔︎</span>
          <span>{message}</span>
        </div>
      );
    case "error":
      return (
        <div className={"w-full py-3 rounded-2xl flex gap-4 pl-7 *:font-semibold bg-red-300"}>
          <span className="border-2 border-stone-800 rounded-full size-6 flex justify-center items-center">✗</span>
          <span>{message}</span>
        </div>
      );
    default:
      return null;
  }
}
