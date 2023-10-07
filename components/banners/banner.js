import Image from "next/image";

export default function Banner({ name, src }) {
  return (
    <div className="mb-4 bg-gray-400 dark:bg-[#091921] flex gap-6 items-center p-8">
      <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center overflow-hidden">
        <Image src={src} alt="NF" width={75} height={75} />
      </div>
      <p className="text-xl md:text-3xl font-bold">{name}</p>
    </div>
  );
}
