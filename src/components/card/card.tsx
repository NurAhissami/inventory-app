import { ReactNode } from "react";

interface CardProps {
  title: string;
  icon: ReactNode;
  value: string;
  backgroundColor: string;
}

export const Card = ({ title, icon, value, backgroundColor }: CardProps) => (
  <div className="card" style={{ backgroundColor }}>
    <div>
      <h3 className="card__title">{title}</h3>
      <div className="card__text">{value}</div>
    </div>
    <div className="card__icon">
      {icon}
    </div>
  </div>
);
