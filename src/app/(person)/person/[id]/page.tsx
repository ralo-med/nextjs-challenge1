import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import styles from "./page.module.css";

interface Billionaire {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
  about: string[];
  financialAssets: Array<{
    exchange: string;
    ticker: string;
    companyName: string;
    numberOfShares: number;
    sharePrice: number;
    currencyCode: string;
    exchangeRate: number;
    interactive: boolean;
  }>;
}

async function getBillionaire(id: string): Promise<Billionaire> {
  const res = await fetch(
    `https://billions-api.nomadcoders.workers.dev/person/${id}`
  );
  return res.json();
}

async function BillionaireInfo({ id }: { id: string }) {
  const billionaire = await getBillionaire(id);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {billionaire?.squareImage &&
        billionaire.squareImage !== "" &&
        billionaire.squareImage !== "undefined" &&
        !billionaire.squareImage.includes("undefined") ? (
          <Image
            src={billionaire.squareImage}
            alt={billionaire?.name || "이름 없음"}
            width={128}
            height={128}
            className={styles.avatar}
            unoptimized
            style={{ width: "auto", height: "auto" }}
          />
        ) : (
          <div className={styles.noAvatar}>
            {billionaire?.name?.charAt(0)?.toUpperCase() || "?"}
          </div>
        )}
        <div className={styles.headerInfo}>
          <h1 className={styles.name}>{billionaire?.name || "이름 없음"}</h1>
          <p className={styles.netWorth}>
            ${(billionaire?.netWorth / 1000).toFixed(1)} Billions
          </p>
          <p className={styles.industries}>
            {billionaire?.industries?.join(", ") || "정보 없음"}
          </p>
        </div>
      </div>

      {billionaire?.about && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>소개</h2>
          <div className={styles.about}>
            {billionaire.about.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}

      {billionaire?.financialAssets?.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>주요 자산</h2>
          <div className={styles.assetsGrid}>
            {billionaire.financialAssets.map((asset, index) => (
              <div key={index} className={styles.assetCard}>
                <div className={styles.assetHeader}>
                  <div className={styles.assetInfo}>
                    <h3>{asset?.companyName || "회사명 없음"}</h3>
                    <p>
                      {asset?.exchange || "거래소 없음"}:{" "}
                      {asset?.ticker || "티커 없음"}
                    </p>
                  </div>
                  <div className={styles.assetStats}>
                    <p>{asset?.numberOfShares?.toLocaleString() || 0} 주</p>
                    <p>${asset?.sharePrice?.toLocaleString() || 0}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default async function PersonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← 홈으로 돌아가기
      </Link>

      <Suspense fallback={<p>Loading...</p>}>
        <BillionaireInfo id={id} />
      </Suspense>
    </div>
  );
}
