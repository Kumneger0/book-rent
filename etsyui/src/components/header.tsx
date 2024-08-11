import { Menu, X, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full border-b-2 shadow-xl shadow-gray-50">
      <div className="w-full h-28 max-w-[1400px] mx-auto mt-3">
        <div className="flex justify-between flex-wrap place-items-center ">
          <h2 className="logo text-orange-500 text-3xl">Etsy</h2>
          <div className="flex justify-center">
            <div>
              <Menu />
            </div>
            <div>categories</div>
          </div>
          <div className="w-2/3 relative">
            <input className="w-full px-3 py-3 rounded-3xl border-black border-2" />
            <div className="absolute right-3 top-1 flex gap-1">
              <X className="w-10 h-10" />
              <Search className="bg-orange-400 text-white p-2 h-10 w-10 rounded-full" />
            </div>
          </div>
          <div className="justify-self-start ">sing in</div>
          <div>Etsy</div>
          <div className="flex justify-around gap-1 w-2/3 mx-auto mt-3">
            <div>hellow</div>
            <div>hellow</div>
            <div>hellow</div>
            <div>hellow</div>
            <div>hellow</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
