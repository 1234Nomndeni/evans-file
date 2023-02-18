// import { CodeIcon } from '@heroicons/react/outline'
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import CodeIcon from "@mui/icons-material/Code";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notifyUpdate = () =>
  toast("Oops!, Our Amazing Developers are working on This", {
    position: "top-left",
  });

const FilterCategory = () => {
  return (
    <div className="mb-6">
      <h3 className="text-bold text-md mb-3">Reading Category</h3>
      <section className="mt-2">
        <span
          onClick={notifyUpdate}
          className="flex space-x-2 text-sm items-center cursor-pointer hover:text-purple-800 mb-2"
        >
          <BorderAllIcon className="w-8 h-6 text-green-600 font-bold" />
          <p> All Categories</p>
        </span>
        <span
          onClick={notifyUpdate}
          className="flex space-x-2 text-sm items-center cursor-pointer hover:text-purple-800 mb-2"
        >
          <CodeIcon className="w-8 h-6 text-pink-600 font-bold" />
          <p>Programming</p>
        </span>
        <span
          onClick={notifyUpdate}
          className="flex space-x-2 text-sm items-center cursor-pointer hover:text-purple-800 mb-2"
        >
          <CurrencyBitcoinIcon className="w-8 h-6 text-yellow-600 font-bold" />
          <p>Crypto & Money</p>
        </span>
        <span
          onClick={notifyUpdate}
          className="flex space-x-2 text-sm items-center cursor-pointer hover:text-purple-800 mb-2"
        >
          <TheaterComedyIcon className="w-8 h-6 text-green-600 font-bold" />
          <p>Poetry & Fun</p>
        </span>
      </section>
    </div>
  );
};

export default FilterCategory;
