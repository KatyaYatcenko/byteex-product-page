import { useEffect, useRef, useState } from 'react';
import { loadContent } from './cms.js';

const img = (n, alt = '', props = {}) => (
  <img
    src={`/img/${n}.jpg`}
    alt={alt}
    loading="lazy"
    decoding="async"
    {...props}
  />
);


const asset = (n, alt = '', props = {}) => (
  <img
    src={`/img/${n}.png`}
    alt={alt}
    loading="lazy"
    decoding="async"
    {...props}
  />
);

const Stars = () => (
  <span className="stars" aria-label="5 stars">★★★★★</span>
);

const Arrow = () => (
  <svg width="22" height="10" viewBox="0 0 22 10" aria-hidden>
    <path
      d="M0 5h20M16 1l4 4-4 4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

/* Старі декоративні іконки залишаємо тільки там,
   де поки немає окремої картинки з Figma */
const Icon = ({ i }) => (
  <span className="icon" aria-hidden>
    {['◔', '✦', '☾', '≋'][i % 4]}
  </span>
);

/* ---------- Inline SVG-іконки (не залежать від файлів у /public/img) ---------- */
const ICON_PATHS = {
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />,
  cloud: <path d="M6.5 18.5a4 4 0 0 1-.6-7.96 5.5 5.5 0 0 1 10.6-1.2 4.5 4.5 0 0 1 1 9.16z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
    </>
  ),
  home: <path d="M3 11l9-7.5 9 7.5M5.5 9.5V20h13V9.5M10 20v-6h4v6" />,
  tag: (
    <>
      <path d="M3 12.2V4h8.2l9.3 9.3a1.5 1.5 0 0 1 0 2.1l-5.7 5.7a1.5 1.5 0 0 1-2.1 0z" />
      <circle cx="7.5" cy="8.5" r="1.3" />
    </>
  ),
  smile: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 14c1 1.6 2.4 2.4 4 2.4s3-.8 4-2.4" />
      <path d="M9 9.5h.01M15 9.5h.01" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7.5 3v5.5c0 4.6-3.1 8-7.5 9.5-4.4-1.5-7.5-4.9-7.5-9.5V6z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  )
};

const Ico = ({ n }) => (
  <svg
    className="ico"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {ICON_PATHS[n]}
  </svg>
);

/* png, які реально є в public/img */
const PNG_ICONS = ['Express', 'Leaf', 'CO2', 'H2O', 'Energy'];
const renderIcon = (name) =>
  PNG_ICONS.includes(name) ? asset(name) : <Ico n={name} />;

/* Don't apologize for being comfortable — three ticks under the H1 */
const TickIcon = ({ i }) => {
  const icons = [
    'Theme Toggle',
    'Eco Cart Icon',
    'Waves'
  ];

  return (
    <span className="icon image-icon tick-icon" aria-hidden>
      {asset(icons[i])}
    </span>
  );
};

/* Find something you love — three benefit badges */
const BenefitIcon = ({ i }) => {
  const icons = [
    'Express',
    'Verified',
    'Eco Cart Icon'
  ];

  return (
    <span className="find-benefit-icon" aria-hidden>
      {asset(icons[i])}
    </span>
  );
};

/* Comfort made easy — three cards */
const ComfortIcon = ({ i }) => {
  const icons = [
    'Eco Cart Icon',
    'Express',
    'Theme Toggle'
  ];

  return (
    <span className="icon image-icon comfort-icon" aria-hidden>
      {asset(icons[i])}
    </span>
  );
};

/* Loungewear you can be proud of */
const FeatureIcon = ({ i }) => {
  const icons = [
    'Eco Cart Icon',
    'Leaf',
    'Theme Toggle',
    'Waves'
  ];

  return (
    <span className="icon image-icon feature-icon" aria-hidden>
      {asset(icons[i])}
    </span>
  );
};

/* Our total green impact */
const ImpactIcon = ({ i }) => {
  const icons = [
    'CO2',
    'H2O',
    'Energy'
  ];

  return (
    <span className="impact-icon" aria-hidden>
      {asset(icons[i])}
    </span>
  );
};

function Cta({ c, line }) {
  return (
    <div className="cta-wrap">
      <a className="btn" href="#customize">
        {c.cta} <Arrow />
      </a>

      {line && (
        <p className="rev-line">
          <Stars /> {c.reviewsLine}
        </p>
      )}
    </div>
  );
}

function Features({ f }) {
  const [i, setI] = useState(0);
  const n = f.gallery.length;

  return (
    <section className="features wrap">
      <div className="features-copy">
        <h2>{f.title}</h2>

        <ul className="feat-list">
          {f.items.map((it, k) => (
            <li key={k}>
              <FeatureIcon i={k} />

              <div>
                <h3>{it.t}</h3>
                <p>{it.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <figure className="slider">
        <button
          className="arrow"
          aria-label="Previous"
          onClick={() => setI((i + n - 1) % n)}
        >
          <svg
            width="10.46"
            height="20.93"
            viewBox="0 0 11 21"
            aria-hidden
          >
            <path
              d="M9 1L1 10.5L9 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>

        <div className="slide-card">
          <div className="slide-img">
            {img(f.gallery[i], f.caption)}
          </div>

          <div className="thumbs">
            {f.gallery.map((g, k) => (
              <button
                key={k}
                className={k === i ? 'on' : ''}
                onClick={() => setI(k)}
                aria-label={`Photo ${k + 1}`}
              >
                {img(g)}
              </button>
            ))}
          </div>

          <figcaption>{f.caption}</figcaption>
        </div>

        <button
          className="arrow"
          aria-label="Next"
          onClick={() => setI((i + 1) % n)}
        >
          <svg
            width="10.46"
            height="20.93"
            viewBox="0 0 11 21"
            aria-hidden
          >
            <path
              d="M1 1L9 10.5L1 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>
      </figure>
    </section>
  );
}

function Reviews({ list }) {
  const ref = useRef();

  const go = (d) => {
    ref.current.scrollBy({
      left: d * 360,
      behavior: 'smooth'
    });
  };

  return (
    <div className="reviews wrap">
      <button
        className="review-arrow"
        aria-label="Previous review"
        onClick={() => go(-1)}
      >
        <svg
          width="10.46"
          height="20.93"
          viewBox="0 0 11 21"
          aria-hidden
        >
          <path
            d="M9 1L1 10.5L9 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>

      <div className="rev-track" ref={ref}>
        {list.map((r, k) => (
          <article key={k} className="rev-card">
            <div className="avatar">
              {asset('User Avatar', r.name)}
            </div>

            <div>
              <Stars />
              <h4>{r.name}</h4>
            </div>

            <p>{r.text}</p>
          </article>
        ))}
      </div>

      <button
        className="review-arrow"
        aria-label="Next review"
        onClick={() => go(1)}
      >
        <svg
          width="10.46"
          height="20.93"
          viewBox="0 0 11 21"
          aria-hidden
        >
          <path
            d="M1 1L9 10.5L1 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>
    </div>
  );
}

function Faq({ f }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq wrap">
      <div>
        <h2>{f.title}</h2>

        {f.items.map((it, k) => (
          <div key={k} className="faq-item">
            <button
              aria-expanded={open === k}
              onClick={() => setOpen(open === k ? -1 : k)}
            >
              {it.q}
              <span>{open === k ? '−' : '+'}</span>
            </button>

            {open === k && <p>{it.a}</p>}
          </div>
        ))}
      </div>

      <div className="collage">
        {f.images.map((n, k) =>
          img(n, '', {
            key: k,
            className: `c${k}`
          })
        )}
      </div>
    </section>
  );
}

function PressLogos() {
  const logos = [
    'ECO',
    'Artboard',
    'Artboard4',
    'Artboard2',
    'Artboard5'
  ];

  return (
    <div className="press-logos">
      {logos.map((name) => (
        <img
          key={name}
          src={`/img/${name}.png`}
          alt={name}
        />
      ))}
    </div>
  );
}

function CheckoutBadges() {
  return (
    <div className="checkout-badges">
      <div className="shipping-badge">
        {asset('Time', 'Ships in 1-2 Days')}
        <span>Ships in 1-2 Days</span>
      </div>

      <div className="badge-divider" />

      <div className="payment-badges">
        {asset('Carts', 'Accepted payment methods', { className: 'cards-strip' })}
      </div>
    </div>
  );
}

export default function App() {
  const [c, setC] = useState(null);

  useEffect(() => {
    loadContent().then(setC);
  }, []);

  if (!c) {
    return <div className="loading">Loading…</div>;
  }

  const {
    hero,
    story,
    comfort,
    fans,
    impact,
    find
  } = c;

  return (
    <>
      <div className="promo">
        {c.promo.map((p, k) => (
          <span key={k}>{p}</span>
        ))}
      </div>

      <header className="wrap">
        <a className="logo" href="/">
          {asset('Logotype', 'BYTEEX')}
        </a>
      </header>

      <main>
        <section className="hero wrap">
          <div className="hero-copy">
            <h1>{hero.title}</h1>

            <ul className="ticks">
              {hero.bullets.map((b, k) => (
                <li key={k}>
                  <TickIcon i={k} />
                  {b}
                </li>
              ))}
            </ul>

            <a className="btn" href="#customize">
              {c.cta} <Arrow />
            </a>

            <article className="quote">
              <div className="avatar">
                {asset('User Avatar', hero.review.name)}
              </div>

              <p className="q-head">
                <b>{hero.review.name}</b>
                <Stars />
                <small>{hero.review.meta}</small>
              </p>

              <p>{hero.review.text}</p>
            </article>
          </div>

          <div className="hero-imgs">
            {hero.images.map((n, k) =>
              img(n, '', {
                key: k,
                className: `h${k}`,
                loading: 'eager'
              })
            )}
          </div>
        </section>

        <section className="press">
          <p>as seen in</p>
          <PressLogos />
        </section>

        <Features f={c.features} />

        <section className="story">
          <div className="wrap">
            <div className="story-imgs">
              {story.images.map((n, k) =>
                img(n, '', {
                  key: k,
                  className: `s${k}`
                })
              )}
            </div>

            <div className="story-copy">
              <h2>{story.title}</h2>

              {story.paragraphs.map((p, k) => (
                <p key={k}>{p}</p>
              ))}

              <a className="btn" href="#customize">
                {c.cta}
              </a>
            </div>
          </div>
        </section>

        <section className="comfort wrap">
          <h2>{comfort.title}</h2>

          <div className="cards">
            {comfort.cards.map((cd, k) => (
              <div
                key={k}
                className={`card ${k === 1 ? 'cream' : ''}`}
              >
                <ComfortIcon i={k} />
                <h3>{cd.t}</h3>
                <p>{cd.d}</p>
              </div>
            ))}
          </div>

          <Cta c={c} line />
        </section>

        <section className="fans">
          <div className="wrap narrow">
            <h2>{fans.title}</h2>
            <p>{fans.text}</p>
          </div>

          <div className="grid">
            {fans.grid.map((n, k) =>
              img(n, '', {
                key: k
              })
            )}
          </div>

          <Reviews list={fans.reviews} />

          <Cta c={c} line />
        </section>

        <Faq f={c.faq} />

        <section className="impact">
          <h2>{impact.title}</h2>

          <div className="wrap stats">
            {impact.stats.map(([v, l], k) => (
              <div key={l}>
                <ImpactIcon i={k} />
                <b>{v}</b>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="find wrap" id="customize">
          <h2>{find.title}</h2>

          <p>{find.text}</p>

          <div className="find-imgs">
            {find.images.map((n, k) =>
              img(n, '', {
                key: k
              })
            )}
          </div>

     <Cta c={c} />

<div className="find-benefits">
  {(c.badges || []).map((text, k) => (
    <div className="find-benefit" key={k}>
      <BenefitIcon i={k} />
      <span>{text}</span>
    </div>
  ))}
</div>

<CheckoutBadges />
        </section>
      </main>
    </>
  );
}