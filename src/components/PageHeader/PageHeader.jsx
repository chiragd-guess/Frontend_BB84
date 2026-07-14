import StatusPill from "../StatusPill/StatusPill";

export default function PageHeader({ title }) {
  return (
    <header className="page-header">
      <h1>{title}</h1>
      <StatusPill label="System Status" value="Secure" />
    </header>
  );
}