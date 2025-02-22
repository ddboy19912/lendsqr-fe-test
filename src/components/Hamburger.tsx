interface HamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

const Hamburger = ({ isOpen, onClick }: HamburgerProps) => {
  return (
    <button
      name="hamburger"
      aria-label="Hamburger"
      aria-expanded={isOpen}
      aria-controls="sidebar"
      className="flex h-[14px] w-[18px] flex-col items-center justify-center focus:outline-none"
      onClick={onClick}
    >
      <span
        className={`h-[2px] w-[18px] transform rounded-full bg-gray-600 transition-all duration-300 ease-in-out ${
          isOpen ? "translate-y-[6px] rotate-45" : ""
        }`}
      />
      <span
        className={`mt-[4px] h-[2px] w-[18px] rounded-full bg-gray-600 transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`mt-[4px] h-[2px] w-[18px] transform rounded-full bg-gray-600 transition-all duration-300 ease-in-out ${
          isOpen ? "-translate-y-[6px] -rotate-45" : ""
        }`}
      />
    </button>
  );
};

export default Hamburger;
