import {
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Hero = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/user/me/portfolio",
          { withCredentials: true }
        );
        setUser(data.user);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    };
    getMyProfile();
  }, []);
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-green-400 rounded-full h-2 w-2"></span>
        <p>Online</p>
      </div>
      <h1 className="overflow-x-hidden text-[1.3rem] sm:text-[1.75rem] 
      md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4">
        Hey, I'm Milton Casco
      </h1>
      <h1 className="text-tubeLight-effect overflow-x-hidden text-[1.3rem] 
      sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px]">
        <Typewriter
          words={["FULLSTACK DEVELOPER", "YOUTUBER", "FREELANCER"]}
          loop={50}
          cursor
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>
      <div className="w-fit px-5 py-2 bg-slate-50 rounded-[20px] flex gap-5 
      items-center mt-4 md:mt-8 lg:mt-10">
        <Link to={"https://www.youtube.com/@miltoncasco4555"} target="_blank">
          <Youtube className="text-red-500 w-7 h-7"/>
        </Link>
        <Link to={"https://www.instagram.com/jonnathancasco/profilecard/?igsh=MXZhaGNiMnlkdjhveA=="} target="_blank">
          <Instagram className="text-pink-500 w-7 h-7" />
        </Link>
        <Link to={"https://www.facebook.com/share/18mtHcVf2k/"} target="_blank">
          <Facebook className="text-blue-800 w-7 h-7" />
        </Link>
        <Link to={"https://www.linkedin.com/in/jonnathan-casco-14b335222/"} target="_blank">
          <Linkedin className="text-sky-500 w-7 h-7" />
        </Link>
        <Link to={"https://x.com/miltoncascor24"} target="_blank">
          <Twitter className="text-blue-800 w-7 h-7" />
        </Link>
      </div>
      <div className="mt-4 md:mt-8 lg:mt-10  flex gap-3">
        <Link to={"https://github.com/casco0224/MERN-PORTFOLIO.git"} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <span>
              <Github />
            </span>
            <span>Github</span>
          </Button>
        </Link>
        <Link to="/api/v1/user/resume" target="_blank" download>
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <span>
              <ExternalLink />
            </span>
            <span>Resume</span>
          </Button>
        </Link>
      </div>
      <p className="mt-8 text-xl tracking-[2px]">{user.aboutMe}</p>
      <hr className="my-8 md::my-10 " />
    </div>
  );
};

export default Hero;
