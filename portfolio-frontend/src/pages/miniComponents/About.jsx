import React from "react";

const About = () => {
  const user = {
    avatar: {
      url: "https://res.cloudinary.com/dgdtyohfm/image/upload/v1742872343/PORTFOLIO%20RESUME/tngq8jdll9mo54mnqpdk.png", // Reemplaza con el URL real de tu avatar
    },
    fullName: "Milton Casco",
  };

  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      <div className="relative">
        <h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          ABOUT <span className="text-tubeLight-effect font-extrabold"> ME </span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="text-center">
        <p className="uppercase text-xl text-slate-400">
          Allow me to introduce myself.
        </p>
      </div>
      <div>
        <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
          <div className="flex justify-center items-center">
            <img
              src={user.avatar.url}
              alt={user.fullName}
              className="bg-white p-2 sm:p-4 rounded-lg shadow-lg h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
            />
          </div>
          <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">
            <p>
              My name is Milton Casco. I will graduate in licenciatura de
              informatica administrativa around 2026. Actualmente trabajo como
              auxiliar contable. My hobbies include watching movies, series,
              playing video games y jugar al futbol.
            </p>
            <p>
              I have interests not only in technology but also las movies,
              series, video games asi como tambien las contabilidades.
              I excel in meeting deadlines for my work.
            </p>
          </div>
        </div>
        <p className="tracking-[1px] text-xl">
          My dedication and perseverance in timely delivery of work are integral
          to me. I maintain the courage to face any challenges for extended
          periods.
        </p>
      </div>
    </div>
  );
};

export default About;
