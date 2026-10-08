import Link from "next/link";

const ProductCard = ({ product }) => {
  const unitNames = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    piece: "প্রতি পিস",
    dozen: "প্রতি ডজন",
  };

  const { nameBn, image, unit, today, change, slug } = product;

  const changeColor = {
    up: "bg-green-100 text-green-700",
    down: "bg-red-100 text-red-700",
    flat: "bg-gray-100 text-gray-600",
  };

  const changeIcon = {
    up: "▲",
    down: "▼",
    flat: "—",
  };

  return (
    <Link
      href={`/product/${slug}`}
      className="block rounded-2xl border border-border bg-white p-4 transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex h-24 items-center justify-center rounded-xl bg-green-50 text-5xl">
        {image}
      </div>

      <p className="mt-4 font-bold">{nameBn}</p>

      <p className="mt-1 text-sm text-muted">
        {unitNames[unit] || `প্রতি ${unit}`}
      </p>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-muted">আজকের দাম</p>
          <p className="mt-1 font-bold text-primary">
            {today.toLocaleString("bn-BD")} টাকা
          </p>
        </div>

        <span
          className={`rounded-full px-2 py-1 text-xs ${changeColor[change.dir]}`}
        >
          {changeIcon[change.dir]}{" "}
          {Math.abs(change.pct).toLocaleString("bn-BD")}%
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;

