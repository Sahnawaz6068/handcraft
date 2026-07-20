const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#faf7f2]">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-orange-200/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center gap-14 px-6 py-24 lg:flex-row">
        {/* Left Content */}
        <div className="flex-1">
          <span className="inline-flex items-center rounded-full border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-700 shadow-sm">
            ✨ Trusted by 500+ Independent Jewelry Artists
          </span>

          <h1 className="mt-7 text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
            Handcrafted with Passion,
            <br />
            <span className="text-amber-700">
              Crafted by Real Artisans.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Discover handcrafted rings, necklaces, earrings, bracelets,
            and timeless creations from talented independent makers across
            the country. Every piece is unique. Every purchase supports an
            artisan.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-xl bg-amber-700 px-8 py-4 font-semibold text-white transition hover:bg-amber-800">
              Shop Collection
            </button>

            <button className="rounded-xl border border-gray-300 bg-white px-8 py-4 font-semibold text-gray-800 transition hover:border-amber-700 hover:text-amber-700">
              Become a Seller
            </button>
          </div>

          <div className="mt-12 flex flex-wrap gap-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">15K+</h2>
              <p className="text-gray-600">Unique Products</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900">600+</h2>
              <p className="text-gray-600">Verified Artisans</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900">50K+</h2>
              <p className="text-gray-600">Happy Customers</p>
            </div>
          </div>
        </div>

        {/* Right Images */}
        <div className="relative flex flex-1 items-center justify-center">
          <div className="grid grid-cols-2 gap-5">
            <img
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=600&q=80"
              alt=""
              className="h-72 w-56 rounded-3xl object-cover shadow-2xl"
            />

            <img
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80"
              alt=""
              className="mt-16 h-80 w-56 rounded-3xl object-cover shadow-2xl"
            />

            <img
              src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=80"
              alt=""
              className="-mt-8 h-72 w-56 rounded-3xl object-cover shadow-2xl"
            />

            <img
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=600&q=80"
              alt=""
              className="h-72 w-56 rounded-3xl object-cover shadow-2xl"
            />
          </div>

          {/* Floating Card */}
          <div className="absolute -left-10 bottom-8 rounded-2xl bg-white p-5 shadow-2xl">
            <div className="text-sm text-gray-500">
              Featured Artisan
            </div>
            <h3 className="mt-1 font-semibold text-gray-900">
              Aanya Jewelry Studio
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              ⭐ 4.9 • 3,000+ Sales
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;