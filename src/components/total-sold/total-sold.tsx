export const TotalSold = ({ totalSoldPrice }: { totalSoldPrice: number }) => (
  <div className="total-sold">
    <h3 className="total-sold__title">Total Sold</h3>
    <div className="total-sold__text">${totalSoldPrice?.toFixed(2)}</div>
  </div>
);
