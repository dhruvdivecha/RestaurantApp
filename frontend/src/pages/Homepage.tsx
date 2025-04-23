import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "../assets/sekela.jpeg";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const pageStyles = {
  scrollPaddingTop: "80px",
};

export default function Homepage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#about-us") {
      const selection = document.getElementById("about-us");
      if (selection) {
        const viewportHeight = window.innerHeight;
        const sectionHeight = selection.getBoundingClientRect().height;

        const offset =
          selection.offsetTop - (viewportHeight - sectionHeight) / 2;

        window.scrollTo({
          top: offset,
          behavior: "smooth",
        });
      }
    }

    if (location.hash === "#contact") {
      const selection = document.getElementById("contact");
      if (selection) {
        selection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div style={pageStyles} className="scroll-pt-20">
      <section className="min-h-screen flex items-start md:items-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
          <div className="max-w-xl text-white">
            <h1 className="text-5xl font-extrabold leading-tight">
              Welcome to <br /> our restaurant
            </h1>
            <p className="mt-4 text-lg">
              In our restaurant, you are sure to find something for yourself —
              we serve dishes from all over the world.
            </p>
            <Link to="/usermenu">
              <Button className="mt-6 px-6 py-3 bg-white text-gray-600 font-semibold rounded-full shadow-md hover:bg-gray-200 transition">
                View Our Menu
              </Button>
            </Link>
          </div>
          <div className="relative mt-10 md:mt-0">
            <img
              src={heroImage}
              alt="Delicious gajjar chicken"
              className="rounded-xl shadow-lg w-[400px] h-auto"
            />
            <div className="absolute top-4 left-4 w-10 h-10 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-4 right-6 w-12 h-12 border-2 border-white rotate-45"></div>
          </div>
        </div>
      </section>

      <section id="about-us" className="pt-20">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold mb-4 text-center">About Us</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="max-w-md text-lg">
              Located in the vibrant heart of Dar es Salaam, Tanzania,
              Restaurant XYZ is a culinary haven that embodies the rich flavors
              and traditions of East Africa. Our restaurant is nestled in a
              bustling neighborhood, offering a serene escape with its inviting
              atmosphere and stylish decor. Inspired by the city's diverse
              cultural heritage, we blend local ingredients with international
              flair to create dishes that are both innovative and authentic.
            </div>
            <div className="max-w-md text-lg">
              Our menu features a delightful array of dishes, from fresh seafood
              to expertly prepared meats and vibrant vegetarian options. We
              pride ourselves on using locally sourced ingredients, reflecting
              the region's rich culinary heritage. Whether you're looking for a
              casual meal or a special occasion, our knowledgeable staff are
              always ready to guide you through our offerings.
            </div>
            <div className="max-w-md text-lg">
              Step into our restaurant and enjoy the warm hospitality that Dar
              es Salaam is known for. Our dining area is designed to provide a
              comfortable and intimate setting, perfect for families, friends,
              and business gatherings alike. Whether you're watching the sunset
              or enjoying a quiet evening, our restaurant is your home away from
              home.
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-12 mt-30 rounded-md mb-30">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="max-w-md text-lg text-center">
              <h3 className="text-2xl font-bold mb-2">Get in Touch</h3>
              <p>
                For any inquiries or to make a reservation, please feel free to
                contact us.
              </p>
              <ul className="list-none mt-4">
                <li className="mb-2">
                  <span className="font-bold">Phone:</span> +255 712 345 678
                </li>
                <li className="mb-2">
                  <span className="font-bold">WhatsApp:</span> +255 712 345 678
                </li>
                <li className="mb-2">
                  <span className="font-bold">Instagram:</span>
                  <a
                    href="https://www.instagram.com/yourrestaurantname"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @yourrestaurantname
                  </a>
                </li>
              </ul>
            </div>
            <div className="max-w-md text-lg text-center">
              <h3 className="text-2xl font-bold mb-2">Follow Us</h3>
              <p>Stay updated with our latest news and promotions.</p>
              <div className="flex justify-center gap-4 mt-4">
                <a
                  href="https://www.instagram.com/yourrestaurantname"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="lg"
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  />
                </a>
                <a
                  href="https://wa.me/+255712345678"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faWhatsapp}
                    size="lg"
                    className="text-green-500 hover:text-green-700 transition-colors"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
