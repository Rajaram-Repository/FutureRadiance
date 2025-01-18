import React from 'react';
import styles from './HomePage.module.scss';
import heroImage from '../../../assets/images/hero_image.jpg';
import society from '../../../assets/images/society.jpg';
import unity from '../../../assets/images/unity.jpg';

const HomePage = () => {
  return (
    <div className={styles.homepage}>

      {/* Header Section */}
      <header className={styles.header}>
        {/*<nav className={styles.nav}>*/}
        {/*  <div className={styles.logo}>LOGO</div>*/}
        {/*  <ul>*/}
        {/*    <li>Home</li>*/}
        {/*    <li>About</li>*/}
        {/*    <li>Programs</li>*/}
        {/*    <li>Partners</li>*/}
        {/*    <li>Contact</li>*/}
        {/*  </ul>*/}
        {/*</nav>*/}
      </header>

      {/* Hero Section */}
      <section className={styles.hero} style={{ backgroundImage: `url(${heroImage})` }}>
        <div className={styles.heroOverlay}>
          <h1>Making Primary Healthcare Accessible for All</h1>
          <p>Transforming lives with impactful healthcare programs</p>
        </div>
      </section>

      {/* Impact Summary Section */}
      <section className={styles.impact}>
        <div className={styles.stats}>
          <div>
            <h2>15+</h2>
            <p>Years of Impact</p>
          </div>
          <div>
            <h2>2000+</h2>
            <p>Active Volunteers</p>
          </div>
          <div>
            <h2>400+</h2>
            <p>Projects Completed</p>
          </div>
          <div>
            <h2>25+</h2>
            <p>Partners in Change</p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className={styles.programs}>
        <h2>Our Programs</h2>
        <div className={styles.programList}>
          <div className={styles.programCard}>Healthcare Outreach</div>
          <div className={styles.programCard}>Women Empowerment</div>
          <div className={styles.programCard}>Education for All</div>
          <div className={styles.programCard}>Nutrition and Health</div>
        </div>
      </section>

      {/* Sustainable Development Goals */}
      <section className={styles.sdg}>
        <h2>Aligning with SDGs</h2>
        <div className={styles.sdgGrid}>
          <div className={styles.sdgItem}>Goal 1</div>
          <div className={styles.sdgItem}>Goal 2</div>
          <div className={styles.sdgItem}>Goal 3</div>
          <div className={styles.sdgItem}>Goal 4</div>
          <div className={styles.sdgItem}>Goal 5</div>
        </div>
      </section>

      {/* Stories and Videos */}
      <section className={styles.stories}>
        <h2>Stories & Vision</h2>
        <div className={styles.storyGrid}>
          <div>Story 1</div>
          <div>Video 1</div>
          <div>Story 2</div>
        </div>
      </section>

      {/* Support a Cause */}
      <section className={styles.support}>
        <h2>Support a Cause</h2>
        <div className={styles.supportCards}>
          <div>Donate for Healthcare</div>
          <div>Empower Women</div>
          <div>Educate a Child</div>
        </div>
      </section>

      {/* Partners */}
      <section className={styles.partners}>
        <h2>Our Partners in Change</h2>
        <div className={styles.partnerLogos}>
          <img src={society} alt="Partner Logo 1" className={styles.imgpartners}/>
          <img src={unity} alt="Partner Logo 2" className={styles.imgpartners}/>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div>
            <h3>Certifications</h3>
            <p>ISO 9001 Certified</p>
          </div>
          <div>
            <h3>Contact Us</h3>
            <p>email@example.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
