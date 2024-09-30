import { FaDollarSign } from "react-icons/fa";


export const TotalSold = ({ totalSoldPrice }: { totalSoldPrice: number }) => (
  <div className="total-sold">
    <div>
      <h3 className="total-sold__title">Total paid orders</h3>
      <div className="total-sold__text">${totalSoldPrice?.toFixed(2)}</div>
    </div>
    <div className="total-sold__icon">
      <FaDollarSign />
    </div>
  </div>
);
