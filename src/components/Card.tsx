interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`card ${className}`} data-testid="card">
      {children}
    </div>
  );
};

export default Card;
