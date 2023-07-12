import Button from "./Button";
import { useRef } from "react";

const Home: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollIntoTopMeal = () => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <>
      <section className="w-full" id="home">
        <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
          <p className="text-[1.5rem] sm:text-[2rem] lg:text-[3.5rem] font-bold tracking-wide sm:self-start self-center text-headingColor">
            Delicious Meals <br />
            Delivered with
            <span className="text-orange-600 pl-3 text-[2rem] sm:text-[2.5rem] lg:text-[4rem]">
              Delight!
            </span>
          </p>

          <p className="text-base text-textColor text-center md:text-left ">
            Welcome to Food Delight, your one-stop destination for exploring
            delicious meals and satisfying your cravings. With our vast
            collection of delectable recipes, you'll discover a world of
            culinary wonders at your fingertips. From traditional classics to
            exotic delights, we bring you the finest meals from around the
            globe.
          </p>
          <p className="text-base text-textColor text-center md:text-left ">
            Browse through our enticing selection of 10 meals, each displayed in
            a captivating card view. Use the name filter to quickly find your
            favorite dish or explore new and exciting options. Once you've found
            a meal that catches your eye, simply click on it to dive into a
            gastronomic adventure.
          </p>
          <p className="text-base text-textColor text-center md:text-left ">
            Food Delight is committed to bringing joy and satisfaction to your
            dining experiences. Explore, order, and enjoy the convenience of a
            delicious meal delivered right to your doorstep. Start your culinary
            <span ref={ref}>journey with us today!</span>
          </p>
          <Button title="Order Now" onClick={scrollIntoTopMeal} />
        </div>
      </section>
    </>
  );
};

export default Home;
