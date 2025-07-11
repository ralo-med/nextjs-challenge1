import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

interface Billionaire {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
}

async function getBillionaires(): Promise<Billionaire[]> {
  const res = await fetch("https://billions-api.nomadcoders.workers.dev/");
  return res.json();
}

export default async function Home() {
  const billionaires = await getBillionaires();

  return (
    <div className={styles.grid}>
      {billionaires.map((billionaire) => (
        <Link
          key={billionaire.id}
          href={`/person/${billionaire.id}`}
          className={styles.card}
        >
          <div className={styles.imageContainer}>
            <Image
              src={billionaire.squareImage}
              alt={billionaire.name}
              width={240}
              height={180}
              className={styles.image}
              unoptimized
            />
          </div>
          <div className={styles.info}>
            <h2 className={styles.name}>{billionaire.name}</h2>
            <p className={styles.netWorth}>
              ${(billionaire.netWorth / 1000).toFixed(1)} Billions
            </p>
            <p className={styles.industries}>
              {billionaire.industries.join(", ")}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
