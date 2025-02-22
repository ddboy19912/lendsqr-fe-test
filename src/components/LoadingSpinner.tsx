const LoadingSpinner = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <img
        loading="eager"
        className="size-[150px]"
        src="/loader.gif"
        alt="Loading...."
      />
    </div>
  );
};

export default LoadingSpinner;
