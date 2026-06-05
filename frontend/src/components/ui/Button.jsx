function Button({ title }) {
  return (
    <button className="badge badge-primary btn btn-xs sm:btn-sm md:btn-md sm:text-sm md:text-md">
      {title}
    </button>
  );
}
export default Button;
