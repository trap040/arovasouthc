const BlogsSection = () => (
  <section className="py-16 px-3 bg-nero">
    <div className="container max-w-[1200px] mx-auto">
      <h2 className="font-gilda font-normal text-3xl sm:text-[46px] tracking-[.04em] text-center text-white mb-3">
        Blogs & News
      </h2>

      <div className="grid mt-10 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-10">
        {/* Blog Cards */}
        {[
          { img: "../images/blogs-1.png", text: "Hon Duale During Opening 2025" },
          { img: "../images/blogs-2.png", text: "Grand Opening 2025 By Former Ps Interior" },
          { img: "../images/blogs-3.png", text: "Best Destinations for Relaxation" },
        ].map((blog, index) => (
          <a href="#" key={index} className="transition duration-300 ease-in-out hover:-translate-y-5">
            <div className="min-h-[400px]">
              <img src={blog.img} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="bg-white text-coyote text-center text-lg sm:text-xl font-gilda font-medium tracking-widest uppercase py-6 px-4">
              {blog.text}
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default BlogsSection;
