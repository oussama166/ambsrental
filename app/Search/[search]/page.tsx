"use client";
import Image from "next/image";

interface dataRr {
  id: string;
  type: string;
  Info: string[];
  Designation: string;
  Img: string[];
}

export default function SearchingWithData({
  params,
}: {
  params: { search: string };
}) {
  let slug = params.search.split("/")[0];
  const decodedQuery = decodeURIComponent(slug as string);

  const decodedResult = Buffer.from(decodedQuery, "base64").toString("utf-8");

  let data: dataRr = JSON.parse(decodedResult);
  return (
    <div className={"w-full flex flex-col justify-center"}>
      <h1 className="px-10 py-5 text-3xl text-gray-400">
        Ce resulat est par la recherche direct ...
      </h1>
      <div className="px-14 py-3 flex flex-row">
        <div className={`w-1/2 flex flex-col items-start justify-center gap-5`}>
          <Image
            src={`/assets/logo/Company/Haulotte.png`}
            width={200}
            height={200}
            alt={`logo_${data.type}`}
            loading={"eager"}
            className={"object-cover"}
          />
          <div className={"text-xl font-semibold"}>
            <h1 className={"text-xl text-gray-500 font-medium"}>
              {data.Info.map((elem: string, index: number) => (
                <p
                  key={`${elem}_${index}`}
                  className={
                    "first:text-black first:text-2xl first:font-semibold"
                  }>
                  {elem}
                </p>
              ))}
            </h1>
            <p className={"w-full text-xl font-semibold text-black"}>
              {data.Designation}
            </p>
          </div>
        </div>
        <div className={`w-1/2 flex items-center justify-center`}>
          {data.Img.map((elem: string, index: Number) => (
            <Image
              key={`${index}`}
              src={`/images/Products${elem}`}
              alt={`${params.search}_${index}_img`}
              width={300}
              height={200}
              loading={"eager"}
              className={"object-cover"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
