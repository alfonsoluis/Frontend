const Button = ({ children, ...props }) => {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-5 hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
