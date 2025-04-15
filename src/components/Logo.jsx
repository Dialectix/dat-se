import datLogo from '../assets/DAT_logo.png'; // Adjust if in public/

export default function Logo() {
  return (
    <div className="flex justify-center pt-6">
      <img
        src={datLogo}
        alt="DAT Logo"
        className="h-20 object-contain"
      />
    </div>
  );
}
