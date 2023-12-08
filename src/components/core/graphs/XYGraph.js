// components/XYGraph.js

const XYGraph = ({ data = [], width = 300, height = 300, xAxisLabel = "x", yAxisLabel = "y", graphTitle = "Graph Title" }) => {
   const gridLinesCount = 5;

   const isDate = (value) => value && !isNaN(Date.parse(value));

   const hasData = data.length > 0;

   const minX = hasData && isDate(data[0].x) ? new Date(Math.min(...data.map((point) => new Date(point.x)))) : 0;

   const maxX = hasData && isDate(data[0].x) ? new Date(Math.max(...data.map((point) => new Date(point.x)))) : hasData ? Math.max(...data.map((point) => point.x)) : 0;

   const maxY = hasData ? Math.max(...data.map((point) => point.y)) : 0;
   const yInterval = maxY / gridLinesCount;
   const pointRadius = 5;
   const padding = 35 + pointRadius;

   const scaleX = (width - 2 * padding) / (maxX - minX);
   const scaleY = (height - 2 * padding) / maxY;

   const getXPosition = (x) => {
      return padding + (isDate(x) ? new Date(x) - minX : x) * scaleX;
   };

   const getYPosition = (y) => {
      return height - padding - y * scaleY;
   };

   const generatePath = () => {
      if (!hasData) return "";

      let pathD = `M ${getXPosition(data[0].x)} ${getYPosition(data[0].y)}`;

      for (let i = 1; i < data.length; i++) {
         const endX = getXPosition(data[i].x);
         const endY = getYPosition(data[i].y);
         pathD += ` L ${endX}, ${endY}`;
      }

      return pathD;
   };

   return (
      <div style={{ width: width + 60, height: height + 100, padding: 16 }} className={"rounded-md bg-white"}>
         <div className="text-black mb-2">{graphTitle}</div>
         <div className="relative">
            <svg width={width + padding} height={height + padding}>
               {/* Render vertical grid lines */}
               {Array.from({ length: gridLinesCount }).map((_, i) => (
                  <line key={i} x1={((width - 2 * padding) / gridLinesCount) * (i + 1) + padding} y1={padding} x2={((width - 2 * padding) / gridLinesCount) * (i + 1) + padding} y2={height - padding} stroke="#e0e0e0" strokeWidth="1" />
               ))}
               {/* Render horizontal grid lines */}
               {Array.from({ length: gridLinesCount }).map((_, i) => (
                  <line key={i} x1={padding} y1={((height - 2 * padding) / gridLinesCount) * (i + 1) + padding} x2={width - padding} y2={((height - 2 * padding) / gridLinesCount) * (i + 1) + padding} stroke="#e0e0e0" strokeWidth="1" />
               ))}
               {/* Render the data points */}
               {data.map((point, index) => (
                  <g key={index}>
                     <circle cx={getXPosition(point.x)} cy={getYPosition(point.y)} r={pointRadius} fill="rgba(75,192,192,0.4)" stroke="rgba(75,192,192,1)" strokeWidth="1" className="hover:fill-opacity-70" />
                     <title>{`${xAxisLabel}: ${isDate(point.x) ? new Date(point.x).toLocaleDateString() : point.x}\n${yAxisLabel}: ${point.y}`}</title>
                  </g>
               ))}

               {/* Render the connecting line */}
               <path d={generatePath()} fill="none" stroke="rgba(75,192,192,1)" />

               {/* X and Y axis lines */}
               <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="black" />
               <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="black" />

               {/* Render Y axis labels */}
               {Array.from({ length: gridLinesCount }).map((_, i) => (
                  <text
                     key={i}
                     x={padding - 10} // Adjust this value to position the labels to the left of the Y-axis
                     y={getYPosition(yInterval * (i + 1)) + 5} // Adjust this value to vertically center the text with the gridline
                     textAnchor="end"
                     fontSize="10"
                  >
                     {(yInterval * (i + 1)).toFixed(2)} {/* You can adjust the precision as needed */}
                  </text>
               ))}
               {/* X axis date labels */}
               {hasData &&
                  isDate(data[0].x) &&
                  data.map((point, index) => (
                     <text
                        key={index}
                        x={padding + (new Date(point.x) - new Date(Math.min(...data.map((p) => new Date(p.x))))) * scaleX}
                        y={height - padding + 20}
                        textAnchor="end" // Adjust anchor to make sure the text rotates around its end
                        fontSize="10"
                        transform={`rotate(-45, ${padding + (new Date(point.x) - new Date(Math.min(...data.map((p) => new Date(p.x))))) * scaleX}, ${height - padding + 20})`} // Rotate by -45 degrees
                     >
                        {new Date(point.x).toLocaleDateString()}
                     </text>
                  ))}

               {/* X and Y axis labels */}
               <text x={width / 2} y={height + padding / 1 - pointRadius} textAnchor="middle" fontSize="12">
                  {xAxisLabel}
               </text>
               {/* Y axis label */}
               <text
                  x={padding - 20} // Adjust this value to position the yAxisLabel to the left of the Y-axis labels
                  y={height / 1.75 - 15}
                  textAnchor="middle"
                  fontSize="12"
                  transform={`rotate(-90, ${padding - 20}, ${height / 2}) `}
               >
                  {yAxisLabel}
               </text>
            </svg>
            {!hasData && (
               <div className="absolute inset-0 flex items-center justify-center text-black opacity-50" style={{ pointerEvents: "none" }}>
                  No data
               </div>
            )}
         </div>
      </div>
   );
};

export default XYGraph;
