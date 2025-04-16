import datLogo from '../assets/DAT_logo_transparent.png';

export default function Logo({ spacing = 'default' }) {
  const marginClass = spacing === 'about' ? 'mt-4 mb-4' : 'mt-[-3rem] mb-4';

  return (
    <div className={`flex justify-center ${marginClass}`}>
      <img
        src={datLogo}
        alt="DAT Logo"
        className="h-36 md:h-44 object-contain drop-shadow-lg"
      />
    </div>
  );
}
