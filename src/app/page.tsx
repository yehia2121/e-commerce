import CategorySlider from "./_components/categorySlider/CategorySlider";
import HomeProducts from "./_components/homeProducts/HomeProducts";
import Mainslider from "./_components/mainslider/Mainslider";

export default function Home() {
  return (
    <div className="lg:w-[90%] mx-auto w-full overflow-auto">
      <Mainslider />

      <div className="mt-4">
        <CategorySlider />
      </div>

      <div className="mt-3">
        <HomeProducts />
      </div>
    </div>
  );
}
