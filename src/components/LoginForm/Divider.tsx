const Divider = () => {
  return (
    <div className="relative mb-5">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t"></span>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="text-muted-foreground px-2 bg-background">または</span>
      </div>
    </div>
  );
};

export default Divider;
