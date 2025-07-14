// components/Loader.tsx
import Image from "next/image";
import Logo from "../../public/Shape.png"; // Adjust if your path is different

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-50">
      <Image
        src={Logo}
        alt="Loading Logo"
        width={60}
        height={60}
        className="animate-spin-slow"
      />
      
    </div>
  );
}
