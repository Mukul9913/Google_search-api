import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import Loading from "./Loading";
import { useResultContext } from "../contexts/ResultContextProvider";
const Results = () => {
  const { result:{result,image_results,entries:news}, loading, getResult, searchTerm } =useResultContext()
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname == "/videos") {
        getResult(`search/q=${searchTerm}&resources=video`);
      } else {
        alert("ssdsd")
        getResult(`${location.pathname}?q=${searchTerm}`);
      }
    }
  }, [searchTerm]);

  if (loading) return <Loading />;
  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {result?.map(({ url, title }, index) => (
            <>
              <div key={index} className="md:w-2/5 w-full">
                <a href={url} target="blank" rel="noreferrer">
                  <p className="text-sm">
                    {url.length > 30 ? url.substring(0, 30) : url}
                  </p>
                  <p className="text-lg hover:underline data:text-blue-300 text-blue-700">
                    {title}
                  </p>
                </a>
              </div>
            </>
          ))}
        </div>
      );
    case "/image":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {image_results?.map(
            ({ image, url: { href, title } }, index) => (
              <a
                className="sm:p-3 p-5"
                key={index}
                href={href}
                target="blank"
                rel="noreferrer"
              >
                <img src={image?.src} alt={title} loading="lazy" />
                <p className="w-36 break-words text-sm mt-2">{title}</p>
              </a>
            )
          )}
        </div>
      );
    case "/news":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
          {news?.map(({ links, id, source, title }) => (
            <>
              <div key={id} className="md:w-2/5 w-full">
                <a
                  href={links?.[0].href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  <p className="text-lg  data:text-blue-300 text-blue-700">
                    {title}
                  </p>
                  <div className="flex gap-4">
                    <a href={source?.href} target="_blank" rel="norefferrer">
                      {source?.href}
                    </a>
                  </div>
                </a>
              </div>
            </>
          ))}
        </div>
      );

    default:
      return "ERROR";
  }
};

export default Results;
