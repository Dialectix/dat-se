import datLogo from '../assets/DAT_logo_transparent.png';

export default function Logo({ spacing = 'default' }) {
  const marginClass = spacing === 'about' ? 'mt-2 mb-2' : 'mt-[-1rem] mb-4';

  return (
    <div className={`flex justify-center ${marginClass}`}>
      <img
        src={datLogo}
        alt="DAT Logo"
        style={{
          height: '240px',
          width: 'auto',
          maxWidth: '720px',
          objectFit: 'contain',
          display: 'block'
        }}
      />
    </div>
  );
}
