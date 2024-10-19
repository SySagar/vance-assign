'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@app/components/ui/button";
import { StoreAvatar } from "./components/StoreAvatar";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  const containerRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const img4Ref = useRef(null);

  const bgRef = useRef(null);
  const textRef = useRef<HTMLDivElement>(null); 
  const prevtextRef = useRef(null); 
  const parentRef = useRef(null);
  const nextTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "7% top",
        end: "bottom top", 
        pin: true,
        scrub: 3,
        markers: true,
        anticipatePin: 1,
      },
    });

    tl.to(img1Ref.current, {
      opacity: 0,
      scale: 1,
      duration: 3,
      ease: "power1.out", // Smooth easing for image transitions
    })
      .to(img2Ref.current, {
        opacity: 1,
        scale: 1.2,
        y: 30,
        duration: 3,
        ease: "power1.out",
      }, "<")
      .to(img2Ref.current, {
        opacity: 0,
        scale: 1,
        y: 30,
        duration: 2,
        ease: "power1.out",
      }, "+=3")
      .to(containerRef.current, {
        backgroundColor: "black",
        duration: 1,
        ease: "power1.out",
      }, "-=2")
      .to(img3Ref.current, {
        opacity: 1,
        scale: 2,
        y: -60,
        duration: 2,
        ease: "power1.out",
      }, "<")
      .to(textRef.current, {
        opacity: 0,
        x: 100,
        scale: 1,
        duration: 2,
        ease: "power1.out",
          onStart: () => {
            if(textRef.current ){
              textRef.current.style.display = "none";
              textRef.current.style.transition = "all 0.5s";
            }
          },
          onReverseComplete: () => {
            if(textRef.current ){

              textRef.current.style.display = "flex";
              textRef.current.style.transition = "all 0.5s";
            }
          }
          
      }, "<")
      .to(nextTextRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 2,
        ease: "power1.out",
          onStart: () => {
            if(nextTextRef.current )
            if(nextTextRef.current ){
              nextTextRef.current.style.display = "flex";
              nextTextRef.current.style.transition = "all 0.5s";
            }
          },
          onReverseComplete: () => {
            if(nextTextRef.current ){
              nextTextRef.current.style.display = "none";
              nextTextRef.current.style.transition = "all 0.5s";
            }
          }
      }, "<")
      .to(img3Ref.current, {
        opacity: 0,
        scale: 0.8,
        y: -190,
        duration: 1,
        ease: "power1.out",
      }, "+=1")
      .to(img4Ref.current, {
        opacity: 1,
        scale: 1.2,
        duration: 2,
        y: -190,
        ease: "power1.out",
      }, "<")
      

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-items-center min-h-screen  pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div  ref={parentRef} className="hero-section flex flex-col justify-start items-center p-4  w-[90vw]">
        <div  className="hero-text flex flex-col items-center gap-9 sticky top-0">
          <div ref={textRef} className='flex gap-5 items-center text-center justify-center flex-col'>

          <h1  className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Send money to India at Google rates.
          </h1>
          <h2>
            Say goodbye to forex fees- get the best value for your transfers
          </h2>
          </div>
          
          <div ref={nextTextRef} className='text-white hidden items-center text-center justify-center flex-col gap-9'>

<h1  className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
Always know when it’s a {<br/>}
good time to transfer with
</h1>
<h2>
Whether you're sending money home, paying for services in a{<br/>} different currency, or managing investments - Set a desired rate, and{<br/>} we'll notify you when it's time to make your move.z

</h2>
</div>
          <div className="flex flex-row gap-8">
            <button className="group relative overflow-hidden bg-black rounded-[100px] p-2">
              <div className="absolute inset-0 bg-white opacity-10"></div>
              <div className="flex items-center px-4 py-2 gap-3">
                <StoreAvatar id="iosstore" alt="apple" />
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-400">Download on the</span>
                  <span className="text-xl font-semibold text-white">App Store</span>
                </div>
              </div>
            </button>
            <button className="group relative overflow-hidden bg-black rounded-[100px] p-2">
              <div className="absolute inset-0 bg-white opacity-10"></div>
              <div className="flex items-center px-4 py-2 gap-3">
                <StoreAvatar id="playstore" alt="playstore" />
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-400">Download on the</span>
                  <span className="text-xl font-semibold text-white">Play Store</span>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="relative w-full h-[700px] mt-24">
          <Image
            ref={img1Ref}
            src="framers/p1.svg"
            alt="hero"
            layout="fill"
            objectFit="contain"
            className="absolute top-0 left-0 scale-110"
          />
          <Image
            ref={img2Ref}
            src="/f2.svg"
            alt="hero 2"
            layout="fill"
            objectFit="contain"
            className="absolute top-0 left-0 opacity-0 scale-100"
          />
          <Image
            ref={img3Ref}
            src="/f3.svg"
            alt="hero 3"
            layout="fill"
            objectFit="contain"
            className="absolute top-0 left-0 pb-[250px] opacity-0 scale-125"
          />
          <Image
            ref={img4Ref}
            src="/f4.svg"
            alt="hero 4"
            layout="fill"
            objectFit="contain"
            className="absolute top-0 left-0 opacity-0 scale-125"
          />
        </div>
      </div>
    </div>
  );
}
