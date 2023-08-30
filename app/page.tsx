'use client';

import DrawingBoard from '@/components/drawing-board';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <DrawingBoard />
    </main>
  );
}
