"use client";
import { SearchProduct } from "@/Utils/SearchFunction";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

function Search() {
  const [resultSearching, setResultSearching] = useState([]);
  const [selectedItems, setSelectedItems] = useState("Batteries,Chargers");
  const inputRef = createRef();
  const pathname = usePathname();
  const route = useRouter();

  return (
    <div className={"lg:flex lg:w-[500px] items-center justify-center"}>
      <form className="flex-grow-1 w-full">
        <div className="relative outline-none">
          <select
            className=" border py-4 pl-2 bg-gray-50 absolute h-full min-w-[100px] max-w-[100px] rounded-tl-lg rounded-bl-lg text-gray-900 outline-none border-r-2 border-l-gray-800/40 text-sm text-ellipsis cursor-pointer"
            onChange={(e) => {
              setSelectedItems(e.target.value);
            }}>
            <option value={"Batteries,Chargers"}>Batteries ,chargeures</option>
            <option value={"Electrical components"}>
              Composants électriques
            </option>
            <option value={"Joysticks"}>Les Manettes</option>
            <option value={"Wheels,tires"}>Roues, pneus</option>
            <option value={"Nacelle"}>Nacelle</option>
            <option value={"Chariot"}>Chariot</option>
          </select>
          <input
            ref={inputRef}
            type="search"
            id="default-search"
            className="block rounded-lg border border-gray-300 bg-gray-50 p-4 pl-28 text-sm text-gray-900 transition-all ease-in-out w-full outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Chercher tous nos produits ..."
            spellCheck={true}
            required
          />
          <button
            type="submit"
            className={
              "absolute bottom-2.5 right-2.5 rounded-lg bg-secondaryAmbsi px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-4"
            }
            onClick={(e) => {
              e.preventDefault();
              setResultSearching(
                SearchProduct(inputRef.current.value, selectedItems)
              );
            }}>
            <svg
              className="h-4 w-4 text-gray-50 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
        {resultSearching.length > 0 && (
          <div
            className={
              "absolute w-[400px] min-h-[100px] max-h-[500px] translate-y-1 bg-white rounded-b-2xl overflow-auto z-[100] focus:ring-secondaryAmbsi transition-all ease-in-out delay-200"
            }>
            <ul className={"w-full flex flex-col bg-white justify-between"}>
              <div
                className={
                  "w-full h-10 flex items-center justify-between p-4 border-b-2 border-b-zinc-500/20 sticky top-0 bg-white"
                }>
                <h1
                  className="text-black font-semibold px-2  cursor-pointer hover:text-white hover:rounded-full hover:bg-secondaryAmbsi transition-all ease-in-out delay-100"
                  onClick={() => {
                    inputRef.current.value = "";
                  }}>
                  Effacer
                </h1>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setResultSearching([]);
                  }}
                  className={
                    "h-full text-black flex items-center justify-center"
                  }>
                  <IoCloseOutline
                    size={25}
                    className={
                      "hover:bg-amber-600 hover:text-white hover:border-none aspect-auto  text-secondaryAmbsi  rounded-full transition-all ease-in-out"
                    }
                  />
                </button>
              </div>
              {resultSearching.map((result) => (
                <div
                  key={`${result.id}`}
                  className={
                    "peer last:border-none text-black w-full min-h-[100px] border-b-2 border-b-zinc-500/20 p-3 flex cursor-pointer hover:bg-zinc-200 transition-all ease-in-out delay-100"
                  }
                  onClick={() => {
                    // Convert result to a JSON string
                    const jsonString = JSON.stringify(result).trim();

                    // Encode the JSON string to Base64 using Buffer
                    let codedQuery = Buffer.from(jsonString).toString("base64");

                    const query = encodeURIComponent(codedQuery);

                    if (pathname.split("/").includes("Search")) {
                      route.push(`/${pathname.split("/")[1]}/${query}`);
                    } else {
                      route.push(`/Search/${query}`);
                    }
                    setResultSearching([]);
                  }}>
                  <div
                    className={
                      "peer-hover:bg-red-600 w-[80%] overflow-hidden flex flex-col gap-3 pointer-events-none"
                    }>
                    <h1 className={"text-sm font-semibold text-amber-500"}>
                      {result.type}
                    </h1>
                    <p
                      className={"overflow-ellipsis text-base text-foreground"}>
                      {result.Designation}
                    </p>
                  </div>
                  <div
                    className={
                      "peer-hover:bg-zinc-200 flex items-center justify-center"
                    }>
                    <Image
                      src={`/images/Products${result.Img[0]}`}
                      alt={"Logo"}
                      width={80}
                      height={80}
                      loading={"eager"}
                      className={"peer-hover:brightness-50"}
                    />
                  </div>
                </div>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}

export default Search;
