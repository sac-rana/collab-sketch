import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          justifyContent: 'center',
          width: 620,
          padding: 100,
          border: '2px solid black',
        }}
      >
        <h1>Welcome to Collab Sketch</h1>
        <Link
          href={'/create-sketch'}
          style={{
            padding: 4,
            textDecoration: 'none',
            textAlign: 'center',
            color: 'purple',
            fontSize: 20,
          }}
        >
          Create Sketch
        </Link>
      </div>
    </main>
  );
}
