import React from 'react';

const DashboardBox = ({
  title,
  value,
  icon,
  percentage,
  changeText,
  iconBg = '#eee',
  iconColor = '#000',
}) => {
  const isNegative = percentage?.includes('↓') || changeText.toLowerCase().includes('down');

  return (
    <div className="bg-white rounded-md p-4 shadow-sm w-full min-h-[130px] h-full">

      <div className="d-flex justify-content-between align-items-start">
        {/* Title and Value */}
        <div>
          <h6 className="mb-1 text-muted" style={{ fontSize: '14px' }}>{title}</h6>
          <div className="fw-bold" style={{ fontSize: '24px' }}>{value}</div>
        </div>

        {/* Icon Box */}
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: iconBg,
            color: iconColor,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
          }}
        >
          {icon}
        </div>
      </div>

      {/* Percentage Change */}
      <div className="d-flex align-items-center mt-3" style={{ fontSize: '13px' }}>
        <span style={{ color: isNegative ? 'red' : 'green', marginRight: 6 }}>
          {percentage}
        </span>
        <span className="text-muted">{changeText}</span>
      </div>
    </div>
  );
};

export default DashboardBox;
