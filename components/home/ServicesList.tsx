import Link from "next/link";
import { services } from "@/data/services";
import { Star } from "@/components/ui/Elements";
export default function ServicesList() {
  return (
    <div className="service-list">
      {services.map((s, i) => (
        <Link className="service-row" href={`/services/#${s.id}`} key={s.id}>
          <span className="small">0{i + 1}</span>
          <h3>{s.title}</h3>
          <Star />
          <span className="row-arrow" aria-hidden="true">
            ↗
          </span>
        </Link>
      ))}
    </div>
  );
}
