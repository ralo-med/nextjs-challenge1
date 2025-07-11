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

  // 디버깅용 로그
  console.log(
    "Billionaires data:",
    billionaires.map((b) => ({
      name: b.name,
      squareImage: b.squareImage,
      hasImage: !!b.squareImage,
      imageType: typeof b.squareImage,
    }))
  );

  return (
    <div className={styles.grid}>
      {billionaires.map((billionaire) => (
        <Link
          key={billionaire.id}
          href={`/person/${billionaire.id}`}
          className={styles.card}
        >
          <div className={styles.imageContainer}>
            {billionaire?.squareImage &&
            billionaire.squareImage !== "" &&
            billionaire.squareImage !== "undefined" &&
            !billionaire.squareImage.includes("undefined") ? (
              <Image
                src={billionaire.squareImage}
                alt={billionaire?.name || "이름 없음"}
                width={240}
                height={180}
                className={styles.image}
                unoptimized
                style={{ width: "auto", height: "auto" }}
              />
            ) : (
              <div className={styles.noImage}>
                {billionaire?.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )}
          </div>
          <div className={styles.info}>
            <h2 className={styles.name}>{billionaire.name}</h2>
            <p className={styles.netWorth}>
              ${(billionaire?.netWorth / 1000).toFixed(1)} Billions
            </p>
            <p className={styles.industries}>
              {billionaire?.industries?.join(", ") || "정보 없음"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
