const SectionTitle = ({ text }: { text: string }) => {
  return (
    <div className="flex justify-center items-center mb-6">
      <div className="bg-gradient-to-r from-[#105946] to-teal-700 text-white rounded-lg px-6 py-4 my-8 shadow-lg text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold">{text}</h1>
      </div>
    </div>
  );
};

export default SectionTitle;
