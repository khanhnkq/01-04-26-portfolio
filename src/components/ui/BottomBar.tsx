export default function BottomBar() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-[48px] bg-brand-yellow flex items-center justify-between px-6 z-50">
      <span className="text-brand-blue font-bold text-sm uppercase tracking-wider">
        Project Collection
      </span>
      <span className="  text-brand-blue font-bold text-sm uppercase tracking-wider md:block hidden">
        Project Collection
      </span>
    </div>
  );
}
