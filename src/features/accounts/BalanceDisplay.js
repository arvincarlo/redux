function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "PHP",
  }).format(value);
}

function BalanceDisplay() {
  return <div className="balance">{formatCurrency(59234)}</div>;
}

export default BalanceDisplay;
