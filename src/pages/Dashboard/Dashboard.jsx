import Navbar from "../../components/Navbar/Navbar";
import PageHeader from "../../components/PageHeader/PageHeader";
import MessageComposer from "../../components/MessageComposer/MessageComposer";
import ProgressTimeline from "../../components/ProgressTimeline/ProgressTimeline";
import TechnicalDetails from "../../components/TechnicalDetails/TechnicalDetails";
import CommunicationPreview from "../../components/CommunicationPreview/CommunicationPreview";

export default function Dashboard() {
  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <PageHeader title="New Secure Message" />

        <div className="content-grid content-grid--row-1">
          <MessageComposer />
          <ProgressTimeline />
        </div>

        <div className="content-grid content-grid--row-2">
          <TechnicalDetails />
          <CommunicationPreview />
        </div>
      </main>
    </div>
  );
}