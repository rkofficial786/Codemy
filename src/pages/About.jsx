import React from "react";
import HighLightText from "../components/core/HomePage/HighLightText";
import img1 from "../assets/Images/aboutus1.webp";
import img2 from "../assets/Images/aboutus2.webp";
import img3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/About/Quote";
import img4 from "../assets/Images/FoundingStory.png";
import Stats from "../components/core/About/Stats";
import LearningGrid from "../components/core/About/LearningGrid";
import ContactForm from "../components/core/About/ContactForm";
import ContactUsForm from "../components/core/Contact/ContactUsForm";
import Footer from './../components/common/Footer';

const About = () => {
  return (
    <div className="text-richblack-5">
      {/* section 1 */}
      <section className="bg-richblack-700">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
            Driving Innovation in Online Education for a
            <HighLightText text={"Brighter Future"} />
            <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <img src={img1} alt="" />
            <img src={img2} alt="" />
            <img src={img3} alt="" />
          </div>
        </div>
      </section>

      {/* section 2 */}

      <section className="border-b border-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section>

      {/* section 3 */}

      <section className="mt-[50px]">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          {/* founding story div */}
          <div className="flex gap-20 lg:flex-nowrap flex-wrap justify-center items-center ">
            {/* left box */}
            <div className="lg:w-[50%] flex flex-col gap-4">
              <h1 className="text-4xl">
                <HighLightText text={"Our Foundation Story"} />
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium ipsam eveniet alias animi perferendis? Quo
                voluptatibus laborum, provident eius esse quos, iure similique,
                omnis voluptates magni natus quam. Quae autem quia repellat
                ipsum quos? Nostrum a illum amet vitae labore? Lorem ipsum d
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                temporibus expedita ad dolorem voluptas, eveniet asperiores eos
                dicta deleniti rerum. Excepturi provident quibusdam magni
              </p>
            </div>

            {/* right box */}

            <div className="lg:w-[50%]">
              <img src={img4} alt="" className="shadow-xl shadow-pink-300" />
            </div>
          </div>

          {/* vision mission div */}
          <div className="h-[50px]"></div>

          <div className="flex  lg:flex-nowrap flex-wrap gap-20 justify-center ">
            {/* left box */}
            <div className="lg:w-[50%] flex gap-4 flex-col">
              <h1 className="text-4xl">
                <HighLightText text={"Our Mission"} />
              </h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum
                possimus quidem vel quisquam consectetur quas tenetur officia
                dicta eligendi explicabo dolores saepe nobis accusamus
                laboriosam, nostrum neque, accusantium ullam, aliquid suscipit
                facere praesentium esse blanditiis? Natus earum deleniti odio
                incidunt. numquam eum libero similique, beatae eligendi? Lorem
                ipsum dolor sit amet consectetur, adipisicing elit. Non
                consequuntur harum dignissimos eum, expedita eligendi rerum!
                Ipsam atque excepturi sit!
              </p>
            </div>
            {/* right box */}
            <div className="lg:w-[50%] flex gap-4 flex-col">
              <h1 className="text-4xl">
                <HighLightText text={"Our Vision"} />
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                quaerat fugiat rerum perferendis quisquam, nisi officia
                praesentium, totam ad impedit nam earum fuga. Possimus, dicta
                doloremque cum odit at ab impedit, hic minus natus rerum nihil
                quam harum? Nulla, non.olor sit amet consectetur, adipisicing
                elit. Quibusdam, cum. Asperiores facere impedit quas officiis et
                provident dolores nemo neque?
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* section 4 */}
      <section className="mx-auto  w-11/12 max-w-maxContent mt-10">
        <Stats />
      </section>

      {/* section 5 */}

      <section className="mx-auto flex flex-col justify-center items-center gap-10 mt-[100px] w-11/12">
        <LearningGrid />
        <ContactForm />
      </section>

      {/* section 6 */}
      <div>
        <h1>Review from other Learners</h1>
      </div>

      <Footer/>
    </div>
  );
};

export default About;
