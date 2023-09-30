export default function CategoryBanner({ category, Icon }) {
  return (
    <div className="mb-4 bg-gray-400 dark:bg-[#091921] flex gap-6 items-center p-8">
      <div className="h-[55px] w-[55px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
        {/* <Icon className="h-10 w-10 text-white" /> */}
        Icon
      </div>
      <p className="text-xl md:text-3xl font-bold">{category}</p>
    </div>
  );
}
