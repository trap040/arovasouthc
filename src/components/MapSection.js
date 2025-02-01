const MapSection = () => {
    return (
      <section>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15814.426207358993!2d36.87871886352544!3d-1.3085740172118704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3e6deee041ad%3A0xd9f2519cd2450217!2sSouth%20C%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1685328842101!5m2!1sen!2ske"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="min-h-[480px] w-full"
        ></iframe>
      </section>
    );
  };
  
  export default MapSection;
  