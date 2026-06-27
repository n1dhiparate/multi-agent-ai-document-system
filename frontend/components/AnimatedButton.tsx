import styles from "./AnimatedButton.module.css";

export default function AnimatedButton() {
  return (
  <button className={`${styles.button} ${styles.buttonItem}`}>
    <span className={styles.buttonBg}>
      <span className={styles.buttonBgLayers}>
        <span className={`${styles.buttonBgLayer} ${styles.layer1} ${styles.purple}`} />
<span className={`${styles.buttonBgLayer} ${styles.layer2} ${styles.turquoise}`} />
<span className={`${styles.buttonBgLayer} ${styles.layer3} ${styles.yellow}`} />
      </span>
    </span>

    <span className={styles.buttonInner}>
      <span className={styles.buttonInnerStatic}>
        Upload PDF
      </span>

      <span className={styles.buttonInnerHover}>
        Upload PDF
      </span>
    </span>
  </button>
);
}