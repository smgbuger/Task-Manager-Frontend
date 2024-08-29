import React, { useEffect, useState } from "react";
import bigLogo from "../assets/bro.png";
import { Link } from "react-router-dom";
import man from "../assets/manondesktop.png";
import woman from "../assets/womanondesk.png";

const CoverPage = () => {
  const homeImages = [bigLogo, man, woman];

  //state to track the index of the current image being displayed
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  //state to control whether the transition effect is active
  const [isTransitioning, setIsTransitioning] = useState(false);

  //useEffect hook to handle the image transition logic
  useEffect(() => {
    //set up an interval to which the images changes every 2.5 seconds
    const animation = setInterval(() => {
      setIsTransitioning(true); // start the transition effect
      //after a certain amount of seconds , update the current image index and stop the transition effect.
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => {
          // calculate the next image index (loop back to the first image if at the end)
          return (prevIndex + 1) % homeImages.length;
        });
        setIsTransitioning(false); //end the transition effect
      }, 500);
    }, 1500);

    //clean up function of setInterval to when the components unmounts
    return () => {
      clearInterval(animation);
    };
  }, [homeImages.length]); //dependency array to re run the effect if the length of home images changes

  return (
    <main className="main-con">
      <div className=" home-content">
        <div className="text-start home-text">
          <h1 className="m-0">
            Manage your Tasks on <span>TaskDuty</span>
          </h1>
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non tellus,
            sapien, morbi ante nunc euismod ac felis ac. Massa et, at platea
            tempus duis non eget. Hendrerit tortor fermentum bibendum mi nisl
            semper porttitor. Nec accumsan.
          </p>
          <Link to={"/tasks"} className="butty">
            Go to My Tasks
          </Link>
        </div>

        <div className="big-image">
          <img
            //applying the change class name if transitioning is true and removing "change" when it is false
            className={`illu ${isTransitioning ? "change" : ""}`}
            src={homeImages[currentImageIndex]}
            alt=""
            style={{
              opacity: isTransitioning ? 0 : 1,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        </div>
      </div>
      {/* ================================ */}
    </main>
  );
};

export default CoverPage;
