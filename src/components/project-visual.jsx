const MiniHeader = ({ title }) => (
  <div className="visual-window-header">
    <span className="visual-dots"><i /><i /><i /></span>
    <span>{title}</span>
    <b>•••</b>
  </div>
);

function TaskVisual() {
  return (
    <div className="visual-window task-window">
      <MiniHeader title="Today / Workspace" />
      <div className="task-layout">
        <aside><i /><i /><i /><i /></aside>
        <div className="task-board">
          <div className="task-greeting"><span>Good morning, Askar</span><b>12 tasks</b></div>
          <div className="task-columns">
            {["To do", "In progress", "Done"].map((column, index) => (
              <div className="task-column" key={column}>
                <small>{column}</small>
                <span className={`task-ticket ticket-${index}`}><i />Product research<b>{index + 2}h</b></span>
                <span className="task-ticket"><i />Interface review<b>{index + 1}h</b></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LowCodeVisual() {
  return (
    <div className="visual-window builder-window">
      <MiniHeader title="Form builder / Customer" />
      <div className="builder-layout">
        <aside><small>Components</small>{["Text input", "Select", "Date", "Upload"].map((item) => <span key={item}><i />{item}</span>)}</aside>
        <div className="builder-canvas">
          <span className="canvas-label">Customer details</span>
          <div className="form-row"><i /><i /></div>
          <div className="form-row wide"><i /></div>
          <div className="form-row"><i /><i /></div>
          <b className="drop-marker">Drop component here</b>
        </div>
        <div className="builder-settings"><small>Properties</small><i /><i /><i /><span /></div>
      </div>
    </div>
  );
}

function FinanceVisual() {
  return (
    <div className="visual-window finance-window">
      <MiniHeader title="Finance / Overview" />
      <div className="finance-content">
        <div className="finance-stats">
          <span><small>Revenue</small><b>₹ 8.42L</b><i>+12.8%</i></span>
          <span><small>Receivables</small><b>₹ 1.26L</b><i>8 open</i></span>
          <span><small>Inventory</small><b>1,284</b><i>Healthy</i></span>
        </div>
        <div className="finance-chart">
          <small>Cash flow</small>
          <svg viewBox="0 0 500 160" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 125 C55 118 72 76 120 88 S190 132 230 82 S300 31 340 61 S405 116 500 24" />
            <path className="chart-fill" d="M0 125 C55 118 72 76 120 88 S190 132 230 82 S300 31 340 61 S405 116 500 24 L500 160 L0 160 Z" />
          </svg>
          <div className="chart-axis"><span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span></div>
        </div>
      </div>
    </div>
  );
}

function FacilityVisual() {
  return (
    <div className="visual-window facility-window">
      <MiniHeader title="Operations / Live view" />
      <div className="facility-map">
        <div className="map-grid" />
        <span className="map-pin pin-one"><i />04</span>
        <span className="map-pin pin-two"><i />12</span>
        <span className="map-pin pin-three"><i />07</span>
        <div className="work-order-card">
          <small>Work order #2048</small>
          <b>HVAC inspection</b>
          <span><i /> In progress</span>
          <div><em>AK</em><em>MR</em><small>Due today</small></div>
        </div>
      </div>
    </div>
  );
}

function WebsiteVisual() {
  return (
    <div className="browser-stack">
      <div className="browser-shadow" />
      <div className="visual-window website-window">
        <MiniHeader title="digicognit.com" />
        <div className="website-nav"><b>DIGICOGNIT</b><span>Products&nbsp;&nbsp; Solutions&nbsp;&nbsp; Company</span><i>Book a demo</i></div>
        <div className="website-hero">
          <small>Enterprise technology, made human</small>
          <b>Build better.<br />Move faster.</b>
          <span>Connected products for modern operations.</span>
          <i>Explore products →</i>
          <div className="website-orbit"><span /><span /></div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectVisual({ type }) {
  const visuals = {
    tasks: <TaskVisual />,
    builder: <LowCodeVisual />,
    finance: <FinanceVisual />,
    facility: <FacilityVisual />,
    website: <WebsiteVisual />,
  };

  return <div className={`project-visual project-visual-${type}`} aria-hidden="true">{visuals[type]}</div>;
}
