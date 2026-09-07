import Link from 'next/link';
import { FaCookieBite, FaBirthdayCake, FaBreadSlice, FaGift } from 'react-icons/fa';

const services = [
  {
    icon: FaCookieBite,
    title: 'Artisan Cookies',
    description: 'Handcrafted cookies made with premium chocolate chips and natural ingredients. Perfect for any occasion.',
    link: '/products?category=cookies',
    color: 'bg-brand-gold'
  },
  {
    icon: FaBirthdayCake,
    title: 'Custom Cakes',
    description: 'Beautiful custom cakes for weddings, birthdays, and special events. Made to your exact specifications.',
    link: '/products?category=cakes',
    color: 'bg-brand-pink'
  },
  {
    icon: FaBreadSlice,
    title: 'Fresh Pastries',
    description: 'Flaky croissants, muffins, and pastries baked fresh every morning using traditional techniques.',
    link: '/products?category=pastries',
    color: 'bg-brand-green'
  },
  {
    icon: FaGift,
    title: 'Gift Boxes',
    description: 'Curated assortments of our best treats, beautifully packaged for gifting to loved ones or corporate events.',
    link: '/products',
    color: 'bg-brand-brown'
  }
];

export default function ServicesGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-brown mb-4">
            Our Specialties
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We devote our craft to giving you sweet, lasting memories with every bite
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.link}
              className="group p-6 rounded-xl border-2 border-gray-100 hover:border-brand-green/30 hover:shadow-xl transition duration-300 bg-white"
            >
              <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                <service.icon className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-brand-brown mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}