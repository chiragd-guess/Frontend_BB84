

export default function AnalyticsChart({ simulation }) {

  const api = simulation?.apiResult;


  if (!api) {
    return (
      <div className="analytics-chart">

        <p>Photon Transmission Overview</p>

        <p style={{
          opacity: 0.45,
          fontStyle: "italic",
          fontSize: 13,
          marginTop: 8
        }}>
          Run a simulation to see live data.
        </p>

      </div>
    );
  }


  const stats = api.statistics;

  const photons = api.analytics?.photon_history || [];



  const bars = [

    {
      label:"Sent",
      value:stats.photons_sent,
      color:"var(--accent)"
    },

    {
      label:"Received",
      value:stats.photons_received,
      color:"var(--success,#22c55e)"
    },

    {
      label:"Lost",
      value:stats.photons_lost,
      color:"var(--danger,#ef4444)"
    },

    {
      label:"Noisy",
      value:stats.noise_events,
      color:"var(--warning,#f59e0b)"
    },

    {
      label:"Detected",
      value:stats.detected_photons,
      color:"#a78bfa"
    },

    {
      label:"Eve",
      value:stats.eve_intercepted,
      color:"#f97316"
    }

  ];



  const max = Math.max(
    ...bars.map(item=>item.value),
    1
  );


  const chartH = 90;



  return (

    <div className="analytics-chart"
      style={{
        padding:"12px 16px"
      }}
    >


      <p>
        Photon Transmission Overview
      </p>



      {/* SUMMARY BAR GRAPH */}

      <svg
        viewBox={`0 0 ${bars.length*44} ${chartH+28}`}
        width="100%"
        style={{
          marginTop:10,
          overflow:"visible"
        }}
      >


      {
        bars.map((bar,index)=>{


          const height =
            Math.max(
              2,
              Math.round(
                (bar.value/max)*chartH
              )
            );


          const x=index*44+4;

          const y=chartH-height;



          return (

            <g key={bar.label}>


              <rect
                x={x}
                y={y}
                width={32}
                height={height}
                fill={bar.color}
                opacity={0.85}
                rx={2}
              />


              <text
                x={x+16}
                y={y-4}
                textAnchor="middle"
                fill="var(--text-primary)"
                fontSize={9}
              >
                {bar.value}
              </text>


              <text
                x={x+16}
                y={chartH+14}
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize={8}
              >
                {bar.label}
              </text>


            </g>

          )

        })
      }


      </svg>






      {/* QBER */}

      <div
        style={{
          marginTop:12,
          display:"flex",
          justifyContent:"space-between",
          padding:"6px 10px",
          border:"1px solid var(--border-color)",
          fontSize:12,
          fontFamily:"monospace"
        }}
      >

        <span>
          QBER
        </span>


        <span
          style={{
            fontWeight:700,
            color:
              api.security.secure
              ?
              "var(--success,#22c55e)"
              :
              "var(--danger,#ef4444)"
          }}
        >

          {stats.qber}%

          {
            api.security.secure
            ?
            " ✓ Safe"
            :
            " ✗ Too High"
          }

        </span>


      </div>


    </div>

  )

}