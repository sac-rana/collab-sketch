'use client';

import DrawingBoard from '@/components/drawing_board';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <DrawingBoard />
    </main>
  );
}
