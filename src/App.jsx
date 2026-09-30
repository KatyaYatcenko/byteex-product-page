import { useEffect, useRef, useState } from 'react';
import { loadContent } from './cms.js';

const img = (n, alt = '', props = {}) => <img src={`/img/${n}.jpg`} alt={alt} loading="lazy" decoding="async" {...props} />;
const Stars = () => <span className="stars" aria-label="5 stars">★★★★★</span>;
const Arrow = () => <svg width="22" height="10" viewBox="0 0 22 10" aria-hidden><path d="M0 5h20M16 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>;
const Icon = ({ i }) => <span className="icon" aria-hidden>{['◔', '✦', '☾', '≋'][i % 4]}</span>;

function Cta({ c, line }) {
  return (
    <div className="cta-wrap">
      <a className="btn" href="#customize">{c.cta} <Arrow /></a>
      {line && <p className="rev-line"><Stars /> {c.reviewsLine}</p>}
    </div>
  );
}

function Features({ f }) {
  const [i, setI] = useState(0);
  const n = f.gallery.length;
  return (
    <section className="features wrap">
      <div>
        <h2>{f.title}</h2>
        <ul className="feat-list">
          {f.items.map((it, k) => (
            <li key={k}><Icon i={k} /><div><h3>{it.t}</h3><p>{it.d}</p></div></li>
          ))}
        </ul>
      </div>
      <figure className="slider">
       <button className="arrow" aria-label="Previous" onClick={() => setI((i + n - 1) % n)}>
  <svg width="10.46" height="20.93" viewBox="0 0 11 21" aria-hidden>
    <path d="M9 1L1 10.5L9 20" fill="none" stroke="currentColor" strokeWidth="2"/>
  </svg>
</button>
        <div className="slide-card">
          <div className="slide-img">{img(f.gallery[i], f.caption)}</div>
          <div className="thumbs">
            {f.gallery.map((g, k) => (
              <button key={k} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={`Photo ${k + 1}`}>{img(g)}</button>
            ))}
          </div>
          <figcaption>{f.caption}</figcaption>
        </div>
       <button className="arrow" aria-label="Next" onClick={() => setI((i + 1) % n)}>
  <svg width="10.46" height="20.93" viewBox="0 0 11 21" aria-hidden>
    <path d="M1 1L9 10.5L1 20" fill="none" stroke="currentColor" strokeWidth="2"/>
  </svg>
</button>
      </figure>
    </section>
  );
}

function Reviews({ list }) {
  const ref = useRef();
  const go = (d) => ref.current.scrollBy({ left: d * 360, behavior: 'smooth' });
  return (
    <div className="reviews wrap">
      <button aria-label="Previous review" onClick={() => go(-1)}>‹</button>
      <div className="rev-track" ref={ref}>
        {list.map((r, k) => (
          <article key={k} className="rev-card">
            <div className="avatar" /><div><Stars /><h4>{r.name}</h4></div>
            <p>{r.text}</p>
          </article>
        ))}
      </div>
      <button aria-label="Next review" onClick={() => go(1)}>›</button>
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
            <button aria-expanded={open === k} onClick={() => setOpen(open === k ? -1 : k)}>
              {it.q}<span>{open === k ? '−' : '+'}</span>
            </button>
            {open === k && <p>{it.a}</p>}
          </div>
        ))}
      </div>
      <div className="collage">{f.images.map((n, k) => img(n, '', { key: k, className: `c${k}` }))}</div>
    </section>
  );
}

export default function App() {
  const [c, setC] = useState(null);
  useEffect(() => { loadContent().then(setC); }, []);
  if (!c) return <div className="loading">Loading…</div>;
  const { hero, story, comfort, fans, impact, find } = c;

  return (
    <>
      <div className="promo">{c.promo.map((p, k) => <span key={k}>{p}</span>)}</div>
      <header className="wrap"><a className="logo" href="/">BYTEEX</a></header>

      <main>
        <section className="hero wrap">
          <div className="hero-copy">
            <h1>{hero.title}</h1>
            <ul className="ticks">{hero.bullets.map((b, k) => <li key={k}><Icon i={k} />{b}</li>)}</ul>
            <a className="btn" href="#customize">{c.cta} <Arrow /></a>
            <article className="quote">
              <div className="avatar" />
              <p className="q-head"><b>{hero.review.name}</b> <Stars /> <small>{hero.review.meta}</small></p>
              <p>{hero.review.text}</p>
            </article>
          </div>
          <div className="hero-imgs">{hero.images.map((n, k) => img(n, '', { key: k, className: `h${k}`, loading: 'eager' }))}</div>
        </section>

        <section className="press">
          <p>as seen in</p>
          <div>{c.press.map((p) => <span key={p}>{p}</span>)}</div>
        </section>

        <Features f={c.features} />

        <section className="story">
          <div className="wrap">
            <div className="story-imgs">{story.images.map((n, k) => img(n, '', { key: k, className: `s${k}` }))}</div>
            <div className="story-copy">
              <h2>{story.title}</h2>
              {story.paragraphs.map((p, k) => <p key={k}>{p}</p>)}
              <a className="btn" href="#customize">{c.cta}</a>
            </div>
          </div>
        </section>

        <section className="comfort wrap">
          <h2>{comfort.title}</h2>
          <div className="cards">
            {comfort.cards.map((cd, k) => (
              <div key={k} className={`card ${k === 1 ? 'cream' : ''}`}><Icon i={k} /><h3>{cd.t}</h3><p>{cd.d}</p></div>
            ))}
          </div>
          <Cta c={c} line />
        </section>

        <section className="fans">
          <div className="wrap narrow"><h2>{fans.title}</h2><p>{fans.text}</p></div>
          <div className="grid">{fans.grid.map((n, k) => img(n, '', { key: k }))}</div>
          <Reviews list={fans.reviews} />
          <Cta c={c} line />
        </section>

        <Faq f={c.faq} />

        <section className="impact">
          <h2>{impact.title}</h2>
          <div className="wrap stats">
            {impact.stats.map(([v, l]) => <div key={l}><Icon i={0} /><b>{v}</b><span>{l}</span></div>)}
          </div>
        </section>

        <section className="find wrap" id="customize">
          <h2>{find.title}</h2><p>{find.text}</p>
          <div className="find-imgs">{find.images.map((n, k) => img(n, '', { key: k }))}</div>
          <Cta c={c} />
          <ul className="badges">{c.badges.map((b) => <li key={b}>{b}</li>)}</ul>
        </section>
      </main>
    </>
  );
}