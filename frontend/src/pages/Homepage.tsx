import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "../assets/sekela.jpeg";

export default function Homepage() {
  return (
    <div>
        <section className="min-h-screen flex items-start md:items-center">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
                <div className="max-w-xl text-white">
                <h1 className="text-5xl font-extrabold leading-tight">
                    Welcome to <br />  our restaurant
                </h1>
                <p className="mt-4 text-lg">
                    In our restaurant, you are sure to find something for yourself — we serve dishes from all over the world.
                </p>
                <Link to="/order">
                    <Button className="mt-6 px-6 py-3 bg-white text-gray-600 font-semibold rounded-full shadow-md hover:bg-gray-200 transition">
                    Order now
                    </Button>
                </Link>
                </div>
                <div className="relative mt-10 md:mt-0">
                <img
                    src={heroImage}
                    alt="Delicious burger"
                    className="rounded-xl shadow-lg w-[400px] h-auto"
                />
                <div className="absolute top-4 left-4 w-10 h-10 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-4 right-6 w-12 h-12 border-2 border-white rotate-45"></div>
                </div>
            </div>
        </section>
    </div>
 
  );
}
